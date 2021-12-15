<?php

namespace App\Utils;

use App\Models\hv\HVLog;
use DateTime;
use DateTimeZone;
use Exception;
use Illuminate\Support\Facades\DB;

use PhpOffice\PhpSpreadsheet\Cell\DataType;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Style\Border;
use function DeepCopy\deep_copy;
use GuzzleHttp\Client;

class Utils
{
    public static function varFromArray($array, $name, $default = null)
    {
        if (!isset($name))
            return $default;

        if (is_array($array))
            return array_key_exists($name, $array) ? $array[$name] : $default;
        else
            if (is_object($array))
                return $array->$name;
            else return $default;
    }

    public static function varFromObject($object, $name, $default = null)
    {
        if (isset($object->$name))
            return $object->$name;
        else
            return $default;
    }

    public static function dbDate($iso = false, $format = null)
    {
        if ($iso)
            return date(DATE_ISO8601);
        else
            if ($format)
                return date($format);
            else
                return date('Y-m-d H:i:s');
    }

    public static function dateFormat($dt, $format = 'Y-m-d H:i:s')
    {
        if ($format == 'LEXMARK') {
            $nd = deep_copy($dt);
            $nd->setTimeZone(new DateTimeZone('GMT'));
            $helpStr = $nd->format('Y-m-d H:i:s.000');
            return str_replace(' ', 'T', $helpStr);
        } else
            return $dt->format($format);
    }

    public static function convertDateTimeFromMobile($value)
    {
        try {
            return DateTime::createFromFormat('YmdHisv', $value);
        } catch (Exception $ex) {
            return null;
        }
    }

    public static function console($text = '', $level = 0, $cr = true)
    {
        print (($level > 0) ? str_pad(' ', $level) : '') . $text . (($cr) ? chr(13) . chr(10) : '');
    }

    public static function generatePassword($length = 10): string
    {
        $alphabet = "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
        $pass = array(); //remember to declare $pass as an array
        $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
        for ($i = 0; $i < $length; $i++) {
            $n = rand(0, $alphaLength);
            $pass[] = $alphabet[$n];
        }
        return implode($pass); //turn the array into a string
    }

    public static function unique(): string
    {
        return md5(uniqid(mt_rand(), true));
    }

    public static function uuid_v4(): string
    {
        return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
            mt_rand(0, 0xffff), mt_rand(0, 0xffff),
            mt_rand(0, 0xffff),
            mt_rand(0, 0x0fff) | 0x4000,
            mt_rand(0, 0x3fff) | 0x8000,
            mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
        );
    }

    public static function encrypt_decrypt($action, $string)
    {
        $output = false;

        $encrypt_method = "AES-256-CBC";
        $secret_key = 'abc';
        $secret_iv = 'def';

        // hash
        $key = hash('sha256', $secret_key);

        // iv - encrypt method AES-256-CBC expects 16 bytes - else you will get a
        // warning
        $iv = substr(hash('sha256', $secret_iv), 0, 16);

        if ($action == 'encrypt') {
            $output = openssl_encrypt($string, $encrypt_method, $key, 0, $iv);
            $output = base64_encode($output);
        } else {
            if ($action == 'decrypt') {
                $output = openssl_decrypt(base64_decode($string), $encrypt_method, $key, 0, $iv);
            }
        }

        return $output;
    }

    public static function addToDateStr($dateStr, $addStr, $format = "Y-m-d H:i:s")
    {
        return date($format, strtotime($dateStr . ' ' . $addStr));
    }

    public static function buildSort($query, $sortStr)
    {
        $sorter = json_decode($sortStr, false);
        if ($sorter)
            foreach ($sorter as $sort) {
                if ($sort && $sort->property)
                    $query->orderBy($sort->property, $sort->direction);
            }
    }

    public static function buildGroup($query, $groupStr)
    {
        $group = json_decode($groupStr, false);
        if ($group)
            if ($group->property)
                $query->orderBy($group->property);
    }

    public static function buildLimit($query, $start, $limit)
    {
        $query->offset($start)->limit($limit);
    }

    public static function getFilterParam($filterStr, $param, $defaultValue = null)
    {
        $filters = json_decode($filterStr, false);

        if ($filters) {
            foreach ($filters as $filter) {
                if ($filter->property == $param)
                    return $filter->value;
            }
        }
        return $defaultValue;
    }

    public static function buildFilter($query, $filterStr, $ignoreStr = null)
    {
        $filters = json_decode($filterStr, false);
        $ignoredValue = null;

        if ($filters)
            foreach ($filters as $filter) {

                $isLowerCase = false;

                if ($filter->property == 'current_company_id') continue;

                if ($filter->property == $ignoreStr) {
                    $ignoredValue = $filter->value;
                    continue;
                }

                if (substr(strtolower($filter->property), 0, 6) == 'lcase:') {
                    $isLowerCase = true;
                    $filter->property = substr($filter->property, 6);
                }

                if (!isset($filter->operator))
                    $filter->operator = 'like';

                if ($filter->value || $filter->value == '0' || $filter->value === false) {

                    switch ($filter->operator) {
                        case '!=':
                            $filter->operator = '<>';
                            break;
                        case 'eq':
                        case '==':
                            $filter->operator = '=';
                            break;
                        case 'gt':
                            $filter->operator = '>';
                            break;
                        case 'lt':
                            $filter->operator = '<';
                            break;

                    }
                    if ($filter->operator == 'in') {
                        $query->whereIn($filter->property, $filter->value);
                    } else if ($filter->operator == 'between') {
                        $query->whereBetween($filter->property, $filter->value);
                    } else {
                        $explValue = explode('::', $filter->value);
                        $query->where(function ($query) use ($filter, $explValue, $isLowerCase) {
                            foreach ($explValue as $v) {
                                if ($filter->operator == 'like') $v = '%' . $v . '%';
                                if ($isLowerCase) {
                                    $v = strtolower($v);
                                    $query->orWhere(DB::raw('LCASE(' . $filter->property . ')'), $filter->operator, $v);
                                } else
                                    $query->orWhere($filter->property, $filter->operator, $v);

                            }
                        });
                    }
                }
            }
        return $ignoredValue;
    }

    public static function alreadyExists($class, $companyId, $fieldName, $value, $id): bool
    {
        if ($value !== '') {
            if ($id)
                return $class::where('id', '<>', $id)
                        ->where('hv_company_id', $companyId)
                        ->where($fieldName, $value)->first() != null;
            else
                return $class::where('hv_company_id', $companyId)
                        ->where($fieldName, $value)->first() != null;
        } else
            return false;
    }

    public static function msaAlreadyExists($class, $companyId, $fieldName, $value, $id): bool
    {
        if ($value !== '') {
            if ($id)
                return $class::where('id', '<>', $id)
                        ->where('msa_origin_id', $companyId)
                        ->where($fieldName, $value)->first() != null;
            else
                return $class::where('msa_origin_id', $companyId)
                        ->where($fieldName, $value)->first() != null;
        } else
            return false;
    }

    public static function iaboAlreadyExists($class, $fieldName, $value, $id): bool
    {
        if ($value !== '') {
            if ($id)
                return $class::where('id', '<>', $id)
                        ->where($fieldName, $value)->first() != null;
            else
                return $class::where($fieldName, $value)->first() != null;
        } else
            return false;
    }

    public static function exportXLS($sheetName, $columns, $data, $header = null, $dateFormat = 'DD.MM.YY hh:mm:ss')
    {

        set_time_limit(500);
        $spreadsheet = new Spreadsheet();
        if ($sheetName) {
            $sheetName = str_replace(' ', '_', $sheetName);
            $sheetName = str_replace(':', '_', $sheetName);
            $spreadsheet->getActiveSheet()->setTitle(substr($sheetName, 0, 30));
        }

        $row = 1;
        $col = 1;

        if ($header) {
            foreach ($header as $line) {
                $spreadsheet->getActiveSheet()->setCellValueExplicitByColumnAndRow($col, $row, $line['caption'], DataType::TYPE_STRING);
                $spreadsheet->getActiveSheet()->setCellValueExplicitByColumnAndRow($col + 1, $row, $line['value'], DataType::TYPE_STRING);
            }

            $row += 2;
        }

        foreach ($columns as $column) {
            $spreadsheet->getActiveSheet()->setCellValueExplicitByColumnAndRow($col, $row, $column['text'], DataType::TYPE_STRING);
            $spreadsheet->getActiveSheet()->getStyleByColumnAndRow($col, $row)->getBorders()->getBottom()->setBorderStyle(Border::BORDER_THIN);
            $col++;
        }

        $row++;

        foreach ($data['data'] as $rowData) {
            $col = 1;
            foreach ($columns as $column) {
                switch ($column['xtype']) {
                    case 'gridcolumn':
                    case 'templatecolumn':
                        $spreadsheet->getActiveSheet()->setCellValueExplicitByColumnAndRow($col, $row, self::varFromArray($rowData, $column['dataIndex']), DataType::TYPE_STRING);
                        break;
                    case 'numbercolumn':
                        $spreadsheet->getActiveSheet()->setCellValueExplicitByColumnAndRow($col, $row, self::varFromArray($rowData, $column['dataIndex']), DataType::TYPE_NUMERIC);
                        break;
                    case 'datecolumn':
                        $dateStr = self::varFromArray($rowData, $column['dataIndex'], null);

                        if ($dateStr && $dateStr !== '' && $dateStr !== '0000-00-00 00:00:00') {
                            $gmtPos = strpos($dateStr, 'GMT');

                            if ($gmtPos) {
                                $dateStr = substr($dateStr, 0, $gmtPos + 8);
                            }

                            $d = new DateTime($dateStr);
                            $excelD = Date::PHPToExcel($d);
                            $spreadsheet->getActiveSheet()->setCellValueByColumnAndRow($col, $row, $excelD);
                            $spreadsheet->getActiveSheet()->getStyleByColumnAndRow($col, $row)
                                ->getNumberFormat()
                                ->setFormatCode($dateFormat);
                        }
                        break;
                }
                $col++;
            }
            $row++;
        }

        $sheet = $spreadsheet->getActiveSheet();
        $cellIterator = $sheet->getRowIterator()->current()->getCellIterator();
        $cellIterator->setIterateOnlyExistingCells(true);

        foreach ($cellIterator as $cell) {
            $sheet->getColumnDimension($cell->getColumn())->setAutoSize(true);
        }

        $writer = IOFactory::createWriter($spreadsheet, 'Xlsx');


        $fileName = $sheetName . '_' . date('Y-m-d-His') . '.xlsx';

        $writer->save('tmp/' . $fileName);


        return array('success' => true, 'filename' => '/tmp/' . $fileName);
    }

    public static function rtfToPlain($text): string
    {

        $text = trim(str_ireplace('\u252', '', $text));
        $text = preg_replace('"{\*?\\\\.+(;})|\\s?\\\[A-Za-z0-9]+|\\s?{\\s?\\\[A-Za-z0-9‹]+\\s?|\\s?}\\s?"', '', $text);

        $text = trim(str_ireplace('{\*', '', $text));
        $text = trim(str_ireplace("\'fc", 'ü', $text));
        $text = trim(str_ireplace("\'c4", 'Ä', $text));
        $text = trim(str_ireplace("\'dc", 'Ü', $text));
        $text = trim(str_ireplace("\'e4", 'ä', $text));
        $text = trim(str_ireplace("\'f6", 'ö', $text));
        $text = trim(str_ireplace("\'96", ' -', $text));

        return $text;
    }

    public static function plainToRTF($text): string
    {
        $rtf = '{\rtf1' . PHP_EOL;
        $lines = explode(PHP_EOL, $text);
        foreach ($lines as $line) {
            $rtf .= $line . ' \par' . PHP_EOL;
        }
        $rtf .= '}';
        return $rtf;
    }

    public static function getHostName($request)
    {
        return str_replace('www.', '', strtolower($request->getHost()));
    }

    public static function geocode($address)
    {
        try {

            $googleKey = 'AIzaSyBoGEsyYZ30VYxAm7j0vQFS1kD43s-WhlM';

            $address = urlencode($address);
            $url = "https://maps.google.com/maps/api/geocode/json?key=" . $googleKey . "&address={$address}";

            $client = new Client();
            $response = $client->request('GET', $url);

            if ($response->getStatusCode() == 200) {
                $body = $response->getBody();
                $resp = json_decode($body->getContents(), true);


                if ($resp['status'] == 'OK') {

                    $lat = $resp['results'][0]['geometry']['location']['lat'];
                    $lon = $resp['results'][0]['geometry']['location']['lng'];
                    $formatted_address = $resp['results'][0]['formatted_address'];

                    if ($lat && $lon && $formatted_address) {

                        $data_arr = array();

                        array_push(
                            $data_arr,
                            $lat,
                            $lon,
                            $formatted_address
                        );

                        return $data_arr;

                    }
                }
            }
            return false;
        } catch (Exception $ex) {
            return false;
        }
    }

    public static function reverseGeocode($lat, $lon)
    {
        try {

            $googleKey = 'AIzaSyBoGEsyYZ30VYxAm7j0vQFS1kD43s-WhlM';
            $url = "https://maps.google.com/maps/api/geocode/json?key=" . $googleKey . "&latlng=" . $lat . ',' . $lon;

            $client = new Client();
            $response = $client->request('GET', $url);

            if ($response->getStatusCode() == 200) {
                $body = $response->getBody();
                $resp = json_decode($body->getContents(), true);
                if ($resp['status'] == 'OK') {
                    $formatted_address = $resp['results'][0]['formatted_address'];
                    if ($formatted_address) {
                        return $formatted_address;
                    }
                }
            }
            return false;
        } catch (Exception $ex) {
            return false;
        }
    }

    public static function floor($number)
    {
        $negative = 1;
        if ($number < 0) {
            $negative = -1;
            $number *= -1;
        }
        return floor($number) * $negative;
    }

    public static function fraction($number)
    {
        $negative = 1;
        if ($number < 0) {
            $negative = -1;
            $number *= -1;
        }

        $whole = floor($number);
        return ($number - $whole) * $negative;
    }

    public static function logDB($context, $log)
    {
        $logObj = new HVLog();
        $logObj->context = $context;
        $logObj->log = $log;
        $logObj->save();
    }
}
