/**
* Created by kko on 2019-07-04.
*/
Ext.define('MyApp.model.{{$partName}}.{{$className}}',
{
extend: 'Ext.data.Model',

requires: [
'Ext.data.proxy.Rest',
'Ext.data.reader.Json',
'Ext.data.validator.Presence'
],

fields: [
@foreach ($columnArr as $columnObj)
    @if ($columnObj['type'] == 'date')
        @if($columnObj['name'] == 'created_at' || $columnObj['name'] == 'updated_at')
            {name: '{{$columnObj['name']}}', type: '{{$columnObj['type']}}',  dateFormat: 'Y-m-d H:i:s', persist: true},
        @else
            {name: '{{$columnObj['name']}}', type: '{{$columnObj['type']}}',  dateFormat: 'Y-m-d H:i:s'},
        @endif
    @else
        @if($columnObj['name'] == 'hv_company_id' || $columnObj['name'] == 'created_by' || $columnObj['name'] == 'updated_by')
            {name: '{{$columnObj['name']}}', type: '{{$columnObj['type']}}', persist: false},
        @else
            {name: '{{$columnObj['name']}}', type: '{{$columnObj['type']}}'},
        @endif
    @endif
@endforeach
],

validators: [],

proxy: {
type: 'rest',
url: '/api/{{$partName}}/{{Str::lower($className)}}s',
reader: {
type: 'json',
rootProperty: 'data'
}
}
});
