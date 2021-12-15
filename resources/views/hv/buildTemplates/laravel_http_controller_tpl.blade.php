namespace App\Http\Controllers\{{$partName}};

use App\Models\{{$partName}}\{{$className}};
use App\Utils\Utils;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class {{$className}}Controller extends Controller
{
    public function all(Request $request)
    {
        $query = {{$className}}::select()->where('hv_resource_type.hv_company_id', $request->current_company_id);

        if ($request->input('query', null))
            $query->where('ident', 'like', '%' . $request->input('query', null) . '%');
        else
            Utils::buildFilter($query, $request->filter);

        $total = $query->count();

        Utils::buildSort($query, $request->sort);

        if ($request->limit)
            Utils::buildLimit($query, $request->start, $request->limit);


        return array('success' => true, 'data' => $query->get(), 'total' => $total);
    }

    public function createOrUpdate(Request $request, $id = null)
    {
        $all = $request->all();

        if ($id) {
            $obj = {{$className}}::find($id);
            $obj->updated_by = $request->current_user_id;
        } else {
            $obj = new {{$className}}();
            $obj->hv_company_id = $request->current_company_id;
            $obj->created_by = $request->current_user_id;
        }

        foreach ($all as $property => $value) {
            switch ($property) {
                case 'id':
                case 'token':
                case '_dc':
                    break;
                default:
                    $obj->$property = $value;

            }
        }

        if (Utils::alreadyExists({{$className}}::class, $request->current_company_id,'ident', $obj->ident, $obj->id)) {
            return array('success' => false, 'error' => 'exists', 'field' => 'ident');
        }

        $obj->save();

        return array('success' => true, 'data' => $obj);
    }

    public function delete(Request $request, $id)
    {
        $obj = {{$className}}::find($id);
        $obj->delete();
        return array('success' => true);
    }

    public function exportXLS(Request $request)
    {
        $all = self::all($request);
        return Utils::exportXLS($request->caption, json_decode($request->columns, true), $all);
    }
}
