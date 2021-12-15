<!DOCTYPE html>
<html>
<body>
<div>Hallo zusammen,</div>
<div>&nbsp;</div>
<div>anbei die Ticket {{$ticket_ident}} mit der Bitte um Bearbeitung.</div>
<div>&nbsp;</div>
<div>
    <table border="1" cellpadding="5" cellspacing="0" style="border-collapse:collapse;">
        <tr><td style="width: 50px">Ticketnummer</td><td style="width: 500px">{{$ticket_ident}}</td></tr>
        <tr><td>Servicepartner</td><td style="width: 500px">{{$service_provider_ident}}</td></tr>
        <tr><td>Auftragsart</td><td style="width: 500px">{{$order_type_ident}}</td></tr>
        <tr><td>Störmelder</td><td style="width: 500px">{{$caller}}</td></tr>
        <tr><td>Rufnummer</td><td style="width: 500px">{{$location_phone}}</td></tr>
        <tr><td>Mailadresse</td><td style="width: 500px">{{$location_email}}</td></tr>
        <tr><td>Seriennummer</td><td style="width: 500px">{{$serial_number}}</td></tr>
        <tr><td>Druckermodell</td><td style="width: 500px">{{$model_ident}}</td></tr>
        <tr><td>Herst. Art.-Nr.</td><td style="width: 500px">{{$vendor_item_ident}}</td></tr>
        <tr><td>Gerätestandort</td><td style="width: 500px">{{$location_info}}</td></tr>
        <tr><td>Garantie (Teile)</td><td style="width: 500px">{{$manufacturer_warranty_end_at}}</td></tr>
        <tr><td>Fehlercode</td><td style="width: 500px">{{$errorcode}}</td></tr>
        <tr><td>Fehler</td><td style="width: 500px">{{$ticket_notes}}</td></tr>
        <tr><td>Zusatzinfo</td><td style="width: 500px">{{$technician_info}}</td></tr>
        <tr><td>Anschrift</td><td style="width: 500px">{{$destination_name_1}}<br>@if ($destination_name_2){{$destination_name_2}}<br>@endif{{$destination_street}}<br>{{$destination_zip}} {{$destination_city}}</td></tr>
    </table>
</div>
<div>&nbsp;</div>
<div>Mit freundlichen Grüßen</div>
<div>&nbsp;</div>
<div>Ihr tec.direct Serviceteam</div>
<div>&nbsp</div>
<div>&nbsp</div>
<div><b>tec.direct IT Systems GmbH</b></div>
<div>&nbsp</div>
<div>Gewerbegebiet II</div>
<div>D-54533 Laufeld</div>
<div>&nbsp</div>
<div>Tel: +49 (0) 6104 / 670 65-50</div>
<div>E-Mail: service@tecdirect-gmbh.com</div>
<div>Web: https://www.tecdirect-gmbh.de</div>
<div>&nbsp</div>
<div>Sitz der Gesellschaft: Laufeld</div>
<div>Geschäftsführer: Tim Kunz, Christian Müller</div>
<div>HRB 45350</div>
<div>Amtsgericht Wittlich</div>
<div>&nbsp</div>
</body>
</html>
