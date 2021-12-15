<!DOCTYPE html>
<style>
    table, td, th {
        border: 1px solid black;
        padding: 2px;
        border-collapse: collapse;;
    }
</style>
<html>
<body>
Datum: {{$order_date}}
<br>
Kunde: {{$customer_ident}} {{$customer_name}}<br>
Vertrag: {{$contract_ident}}
<br><br>
<br>
Lieferung an:<br><br>
{{$location_name_1}}<br>
{{$location_name_2}}<br>
{{$location_street}}<br>
{{$location_country_ident}} {{$location_zip}} {{$location_city}}<br>
<br>
<br><br>
Seriennummer: {{$serial_number}}
<br><br>
Modell: {{$model_ident}}
<br><br>
Zuordnung: {{$system_assignment}}
<br><br>
<table>
    <tr>
        <td>Artikel</td>
        <td>Bezeichnung</td>
        <td style="text-align: end">Menge</td>
        <td>FM Audit</td>
    </tr>

    @foreach ($spare_parts as $sparePart)
        <tr>
            <td>{{$sparePart->item_ident}}</td>
            <td>{{$sparePart->item_description}}</td>
            <td style="text-align: end">{{$sparePart->qty}}</td>
            <td>
                - {{$alert_id}}}: {{$alert_message}}<br>
                - {{$alert_supply_type}} - {{$alert_supply_name}}<br>
                - {{$alert_colorant}}
            </td>
        </tr>
    @endforeach
</table>
</body>
</html>
