namespace App\Models\{{$partName}}\Base;

use Illuminate\Database\Eloquent\Model;

abstract class {{$className}} extends Model
{
    protected $table = '{{$tableName}}';

    protected $attributes = [
@foreach($columnArr as $columnObj)
@if($columnObj['type'] == 'boolean')
    '{{$columnObj['name']}}' => 0,
@endif
@endforeach
    ];

    protected $casts = [
@foreach($columnArr as $columnObj)
    '{{$columnObj['name']}}' => '{{$columnObj['type']}}',
@endforeach
    ];
}
