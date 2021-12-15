<!DOCTYPE html>
<html>
<body>
<div>Sehr geehrter Kunde,</div>
<div>&nbsp;</div>
@if ($ticket_type == 'error_hw')
    @if ($planned_date)
        <div>im Folgenden bestätigen wir Ihnen den vereinbarten Termin am {{$planned_date}}.</div>
    @else
        <div>im Folgenden bestätigen wir Ihnen den Eingang des Tickets. Dieses wird innerhalb der vereinbarten Wiederherstellungszeit erledigt.</div>
    @endif
@endif
@if ($ticket_type == 'error_sw')
    <div>gerne bestätigen wir Ihnen den Eingang der gemeldeten Störung. Unser Solution Team kümmert sich umgehend darum und informiert Sie über weitere Schritte.</div>
@endif
@if ($ticket_type == 'revisit')
    @if ($planned_date)
        <div>im Folgenden bestätigen wir Ihnen den vereinbarten Termin am {{$planned_date}}.</div>
    @else
        <div>die Störung konnte heute nicht behoben werden.</div><div>Es wird ein Folgeticket angelegt das wir selbstverständlich schnellstmöglich einplanen.</div>
    @endif
@endif
@if ($ticket_type == 'catch_hw')
    @if ($planned_date)
        <div>im Folgenden bestätigen wir Ihnen den vereinbarten Termin zur Abholung am {{$planned_date}}.</div>
    @else
        <div>hiermit informieren wir Sie über den Eingang des Abholauftrags.</div>
    @endif
@endif
@if ($ticket_type == 'installation')
    @if ($planned_date)
        <div>im Folgenden bestätigen wir Ihnen den vereinbarten Termin zur Anlieferung am {{$planned_date}}.</div>
    @else
        <div>hiermit informieren wir Sie über den Eingang des Installationauftrags.</div>
    @endif
@endif
@if ($ticket_type == 'transposition_hw')
    <div>nachfolgend teilen wir Ihnen den Eingang des Umzugauftrags mit.</div>
@endif
@if ($ticket_type == 'no_access')
    <div>leider wurde uns der Zutritt in Ihr Unternehmen nicht gewährt.</div><div>Teilen Sie uns bitte einen Ausweichtermin als Antwort auf diese E-Mail mit.</div>
@endif
@if ($ticket_type == 'bsd')
    <div>hiermit bestätigen wir den Eingang Ihrer Bestellung. Diese wird umgehend bearbeitet und zeitnah in den Versand gebracht.</div>
@endif
@if ($ticket_type == 'reschedule')
    <div>wir bedauern Ihnen mitteilen zu müssen, dass der Techniker den heutigen Termin aus Zeitgründen nicht mehr anfahren kann. Ein Ausweichtermin ist bereits für {{$planned_date}} festgelegt worden.</div>
@endif

<div>&nbsp;</div>
@if ($serial_number && !$ticket_type == 'Installation')
    <div><b>Standortinformationen:</b> {{$location_info}}</div>
    <div>&nbsp;</div>
@endif
<div><b>Details</b></div>
@if ($customer_ticket_ident)
    <div>Ihre Ticketnummer: {{$customer_ticket_ident}}</div>
@endif
<div>MSH-Ticketnummer: {{$ticket_ident}}</div>
@if ($serial_number)
    <div>Modell: {{$model_ident}}</div>
    <div>Seriennummer: {{$serial_number}}</div>
    @if ($host_name && !$ticket_type == 'Installation')
        <div>Hostname: {{$host_name}}</div>
    @endif
@endif
<div>Ansprechpartner: {{$contact_person}}</div>
<div>Telefon: {{$contact_phone}}</div>
<div>&nbsp;</div>
@if ($ticket_type == 'error_hw' || $ticket_type == 'error_sw')
    <div><b>Fehlermeldung / Grund des Einsatzes:</b></div>
    <div>{{$ticket_notes}}</div>
@endif

<div>&nbsp;</div>

@if ($ticket_type == 'error_hw')
    <div><b>Standortadresse:</b></div>
    <div>{{$name_1}}</div>
    <div>{{$name_2}}</div>
    <div>{{$street}}</div>
    <div>{{$zip}} {{$city}}</div>
@endif

@if ($ticket_type == 'error_sw')
    <div><b>Standortadresse:</b></div>
    <div>{{$name_1}}</div>
    <div>{{$name_2}}</div>
    <div>{{$street}}</div>
    <div>{{$zip}} {{$city}}</div>
@endif

@if ($ticket_type == 'no_access')
    <div><b>Standortadresse:</b></div>
    <div>{{$name_1}}</div>
    <div>{{$name_2}}</div>
    <div>{{$street}}</div>
    <div>{{$zip}} {{$city}}</div>
@endif

@if ($ticket_type == 'bsd')
    <div><b>Standortadresse:</b></div>
    <div>{{$name_1}}</div>
    <div>{{$name_2}}</div>
    <div>{{$street}}</div>
    <div>{{$zip}} {{$city}}</div>
@endif

@if ($ticket_type == 'installation')
    <div><b>Lieferadresse:</b></div>
    <div>{{$name_1}}</div>
    <div>{{$name_2}}</div>
    <div>{{$street}}</div>
    <div>{{$zip}} {{$city}}</div>
@endif

@if ($ticket_type == 'transposition_hw')
    <div><b>Abholadresse:</b></div>
    <div>{{$name_1}}</div>
    <div>{{$name_2}}</div>
    <div>{{$street}}</div>
    <div>{{$zip}} {{$city}}</div>
    <div>&nbsp;</div>
    <div><b>Lieferadresse:</b></div>
    <div>{{$new_name_1}}</div>
    <div>{{$new_name_2}}</div>
    <div>{{$new_street}}</div>
    <div>{{$new_zip}} {{$new_city}}</div>
@endif

@if ($ticket_type == 'catch_hw')
    <div><b>Abholadresse:</b></div>
    <div>{{$name_1}}</div>
    <div>{{$name_2}}</div>
    <div>{{$street}}</div>
    <div>{{$zip}} {{$city}}</div>
@endif


<div>&nbsp;</div>
<div>&nbsp;</div>
<div>Sofern Ihnen ein Fehler bei der Ticketübersicht aufgefallen ist, bitten wir Sie um Rückmeldung.</div>
<div>&nbsp;</div>
<div>&nbsp;</div>
Mit freundlichen Grüßen</div>
<div>&nbsp;</div>
Ihr MSH-Serviceteam</div>
<div>&nbsp;</div>
<div>msh-print & service GmbH</div>
<div>Gewerbering 3</div>
<div>86510 Ried</div>
<div>Tel: 08233-7412-14</div>
<div>Fax: 08233-74-12-20</div>
<div>e-mail: service@msh-print.de</div>
<div>homepage: www.msh-print.de</div>
<div>Sitz der Gesellschaft: Ried</div>
<div>Geschäftsführerin: Gabriele Ettmüller</div>
<div>HRB: Augsburg 27542</div>
<div>St-Nr.: 102/132/80614</div>
<div>&nbsp;</div>
</body>
</html>