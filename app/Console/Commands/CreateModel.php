<?php

//php artisan create:model

namespace App\Console\Commands;

use App\Utils\Utils;
use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class CreateModel extends Command
{
    protected $signature = 'create:model {part} {class} {table}';

    protected $description = 'Create model';

    private function getFieldType($colType): string
    {

        if (strpos($colType, 'bigint') !== false) {
            return 'integer';
        }

        if (strpos($colType, 'longtext') !== false) {
            return 'string';
        }

        if (strpos($colType, 'tinyint') !== false) {
            return 'boolean';
        }

        if (strpos($colType, 'int') !== false) {
            return 'integer';
        }

        if (strpos($colType, 'varchar') !== false) {
            return 'string';
        }

        if (strpos($colType, 'timestamp') !== false) {
            return 'date';
        }

        if (strpos($colType, 'datetime') !== false) {
            return 'datetime';
        }

        if (strpos($colType, 'date') !== false) {
            return 'date';
        }

        if (strpos($colType, 'double') !== false) {
            return 'number';
        }
        return 'unknown';
    }

    private function createLaravelHttpController($partName, $className)
    {
        $view = view('hv/buildTemplates/laravel_http_controller_tpl',
            [
                'partName' => $partName,
                'className' => $className,
            ]);

        Config::set('filesystems.disks.LaravelHttpController', [
            'driver' => 'local',
            'root' => "app/Http/Controllers/$partName"
        ]);

        Storage::disk('LaravelHttpController')->put($className . 'Controller.php', '<?php' . PHP_EOL . PHP_EOL . $view->render());

    }

    private function createLaravelModel($partName, $className, $tableName)
    {
        $tableColumns = DB::select(DB::raw('SHOW COLUMNS FROM ' . $tableName));
        $columnArr = array();

        foreach ($tableColumns as $column) {
            $columnArr[] = array('name' => $column->Field, 'type' => $this->getFieldType($column->Type));
        }

        $baseView = view('hv.buildTemplates.laravel_base_model_tpl',
            [
                'partName' => $partName,
                'tableName' => $tableName,
                'className' => $className,
                'columnArr' => $columnArr
            ]);

        $view = view('hv.buildTemplates.laravel_model_tpl',
            [
                'partName' => $partName,
                'className' => $className,
            ]);

        Config::set('filesystems.disks.LaravelModel', [
            'driver' => 'local',
            'root' => "app/Models/$partName"
        ]);

        Storage::disk('LaravelModel')->put('Base/' . $className . '.php', '<?php' . PHP_EOL . PHP_EOL . $baseView->render());

        if (!Storage::disk('LaravelModel')->exists($className . '.php'))
            Storage::disk('LaravelModel')->put($className . '.php', '<?php' . PHP_EOL . PHP_EOL . $view->render());
    }

    private function createExtJSModel($partName, $className, $tableName)
    {
        $tableColumns = DB::select(DB::raw('SHOW COLUMNS FROM ' . $tableName));
        $columnArr = array();

        foreach ($tableColumns as $column) {
            Utils::console($column->Type);
            $columnArr[] = array('name' => $column->Field, 'type' => $this->getFieldType($column->Type));
        }

        $view = view('hv/buildTemplates/extjs_model_tpl',
            [
                'partName' => $partName,
                'className' => $className,
                'columnArr' => $columnArr
            ]);

        Config::set('filesystems.disks.ExtJSModel', [
            'driver' => 'local',
            'root' => "public/app/model/$partName"
        ]);

        Storage::disk('ExtJSModel')->put($className . '.js', $view->render());

        Utils::console($view->render());
    }

    public function handle()
    {
//        $this->createLaravelModel($this->argument('part'), $this->argument('class'), $this->argument('table'));
        $this->createExtJSModel($this->argument('part'), $this->argument('class'), $this->argument('table'));
        $this->createLaravelHttpController($this->argument('part'), $this->argument('class'));
    }

}
