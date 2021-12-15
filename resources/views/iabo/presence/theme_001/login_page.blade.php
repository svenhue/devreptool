<!DOCTYPE html>
<html style="font-size: 16px;">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8">
    <meta name="keywords" content="Über uns">
    <meta name="description" content="">
    <meta name="page_type" content="np-template-header-footer-from-plugin">
    <title>{{$pageObj->Überschrift}}</title>
    <link rel="stylesheet" href="/resources/iabo/presence/theme_001/nicepage.css" media="screen">
    <style>
        .u-section-1 {margin-top: 0; margin-bottom: 0}
        .u-section-1 .u-sheet-1 {min-height: 100vh}
        .u-section-1 .u-text-1 {font-weight: 700; background-image: none; line-height: 1.8; width: 550px; margin: 60px auto 0}
        .u-section-1 .u-form-1 {height: 197px; width: 390px; margin: 12px auto 0}
        .u-section-1 .u-form-group-1 {margin-left: 0}
        .u-section-1 .u-input-1 {margin-left: 0; margin-top: 0; margin-bottom: 10px}
        .u-section-1 .u-form-group-2 {margin-left: 0}
        .u-section-1 .u-input-2 {margin-left: 0; margin-top: 0; margin-bottom: 10px}
        .u-section-1 .u-custom-html-1 {min-height: 145px; height: auto; margin: 30px 0 60px}

        @media (max-width: 1199px){ .u-section-1 .u-form-group-1 {margin-top: 0; margin-bottom: 10px}
            .u-section-1 .u-form-group-2 {margin-top: 0; margin-bottom: 10px}
            .u-section-1 .u-form-group-3 {margin-top: 0; margin-bottom: 0}
            .u-section-1 .u-custom-html-1 {margin-right: initial; margin-left: initial} }

        @media (max-width: 767px){ .u-section-1 .u-text-1 {width: 540px} }

        @media (max-width: 575px){ .u-section-1 .u-sheet-1 {min-height: 676px}
            .u-section-1 .u-text-1 {width: 340px}
            .u-section-1 .u-form-1 {width: 340px}
            .u-section-1 .u-form-group-1 {width: 100%}
            .u-section-1 .u-form-group-2 {width: 100%}
            .u-section-1 .u-form-group-3 {width: 100%} }
    </style>
    <script class="u-script" type="text/javascript" src="/resources/iabo/presence/theme_001/jquery.js"
            defer=""></script>
    <script class="u-script" type="text/javascript" src="/resources/iabo/presence/theme_001/nicepage_login.js"
            defer=""></script>
    <meta name="generator" content="Nicepage 2.20.2, nicepage.com">


    <link id="u-theme-google-font" rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i|Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i">
    <script type="application/ld+json">{
		"@context": "http://schema.org",
		"@type": "Organization",
		"name": "theme_001",
		"url": "index.html",
		"logo": "resources/iabo/images/{{$providerCh}}_{{$presenceObj->Logo}}.png"
}






    </script>
    <meta property="og:title" content="start_page">
    <meta property="og:type" content="website">
    <meta name="theme-color" content="#478ac9">
    <link rel="canonical" href="index.html">
    <meta property="og:url" content="index.html">
</head>
<body class="u-body">
<header class="u-clearfix u-header u-sticky u-white u-header" id="header">
    <div class="u-clearfix u-sheet u-sheet-1">
        <a href="#" class="u-image u-logo u-image-1" title="Startseite">
            <img src="resources/iabo/images/{{$providerCh}}_{{$presenceObj->Logo}}.png"
                 class="u-logo-image u-logo-image-1" data-image-width="121.4444">
        </a>
        <nav class="u-menu u-menu-dropdown u-offcanvas u-menu-1">
            @if (!$presentationObj)
            <div class="menu-collapse" style="font-size: 1rem; letter-spacing: 0;">
                <a class="u-button-style u-custom-left-right-menu-spacing u-custom-padding-bottom u-custom-top-bottom-menu-spacing u-nav-link u-text-active-palette-1-base u-text-grey-60 u-text-hover-palette-2-base"
                   href="#">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <defs>
                            <symbol id="menu-hamburger" viewBox="0 0 16 16" style="width: 16px; height: 16px;">
                                <rect y="1" width="16" height="2"></rect>
                                <rect y="7" width="16" height="2"></rect>
                                <rect y="13" width="16" height="2"></rect>
                            </symbol>
                        </defs>
                    </svg>
                </a>
                @endif
            </div>
            <div class="u-custom-menu u-nav-container">
            </div>
            <div class="u-custom-menu u-nav-container-collapse">
                <div class="u-black u-container-style u-inner-container-layout u-opacity u-opacity-95 u-sidenav u-sidenav-1"
                     data-offcanvas-width="282">
                    <div class="u-menu-close"></div>
                </div>
                <div class="u-black u-menu-overlay u-opacity u-opacity-70"></div>
            </div>
        </nav>
    </div>
</header>
<section class="u-align-center u-clearfix u-section-1" id="form_body">
    <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
        <h2 class="u-text u-text-1">Anmeldung</h2>
        <div class="u-form u-form-1">
            <form action="api/iabo/presence/login{{$urlQuery}}" method="POST" class="u-clearfix u-form-spacing-10 u-form-vertical u-inner-form" style="padding: 8px;" source="custom" name="form">
                <div class="u-form-group u-form-group-1">
                    <label for="text-e272" class="u-form-control-hidden u-label"></label>
                    <input type="text" placeholder="Anmeldekennung" id="text-e272" name="loginname" class="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white u-input-1" required="required" autofocus="autofocus">
                </div>
                <div class="u-form-group u-form-group-2">
                    <label for="text-600b" class="u-form-control-hidden u-label"></label>
                    <input  type="password" placeholder="Kennwort" id="text-600b" name="password" class="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white u-input-2" required="required">
                </div>
                <div class="u-align-center u-form-group u-form-submit u-form-group-3">
                    <a href="#" class="u-btn u-btn-submit u-button-style">Anmelden</a>
                    <input type="submit" value="submit" class="u-form-control-hidden">
                </div>
                <div class="u-form-send-message u-form-send-success">Anmeldung war erfolgreich</div>
                <div class="u-form-send-error u-form-send-message">Überpüfen Sie bitte Ihre Anmeldedaten!</div>
                <input type="hidden" value="" name="recaptchaResponse">
            </form>
        </div>
        <div class="u-clearfix u-custom-html u-expanded-width u-custom-html-1"></div>
    </div>
</section>
<footer class="u-clearfix u-footer u-grey-80" id="footer">
    <div class="u-clearfix u-sheet u-sheet-1">
        <div class="u-clearfix u-expanded-width u-gutter-30 u-layout-wrap u-layout-wrap-1">
            <div class="u-gutter-0 u-layout">
                <div class="u-layout-row">
                    <div class="u-align-left u-container-style u-layout-cell u-left-cell u-size-18 u-size-20-md u-layout-cell-1">
                        <div class="u-container-layout u-valign-top u-container-layout-1"><!--position-->
                            <div data-position="" class="u-position u-position-1"><!--block-->
                                <div class="u-block">
                                    <div class="u-block-container u-clearfix"><!--block_header-->
                                        <h5 class="u-block-header u-text u-text-1"><!--block_header_content-->
                                            Adresse
                                            <!--/block_header_content--></h5><!--/block_header-->
                                        <!--block_content-->
                                        <div class="u-block-content u-text u-text-2">
                                            <!--block_content_content-->{{$presenceObj->Kontakt_Name_1}}
                                            <br>{{$presenceObj->Kontakt_Strasse}}
                                            <br>{{$presenceObj->Kontakt_Plz}} {{$presenceObj->Kontakt_Ort}}<!--/block_content_content-->
                                        </div><!--/block_content-->
                                    </div>
                                </div><!--/block-->
                            </div><!--/position--><!--position-->
                            <div data-position="" class="u-position u-position-2"><!--block-->
                                <div class="u-block">
                                    <div class="u-block-container u-clearfix"><!--block_header-->
                                        <h5 class="u-block-header u-text u-text-3"><!--block_header_content-->
                                            Kontakt
                                            <!--/block_header_content--></h5><!--/block_header-->
                                        <!--block_content-->
                                        <div class="u-block-content u-text u-text-4"><!--block_content_content-->
                                            Telefon: {{$presenceObj->Kontakt_Telefon}}
                                            <br>Telefax: {{$presenceObj->Kontakt_Fax}}<br>E-Mail: <a
                                                    href="mailto:{{$presenceObj->Kontakt_E_Mail}}">{{$presenceObj->Kontakt_E_Mail}}</a>
                                            <!--/block_content_content-->
                                        </div><!--/block_content-->
                                    </div>
                                </div><!--/block-->
                            </div><!--/position-->
                        </div>
                    </div>
                    <div class="u-align-left u-container-style u-layout-cell u-size-20 u-size-20-md u-layout-cell-2">
                        <div class="u-container-layout u-valign-top u-container-layout-2"><!--position-->
                            <div data-position="" class="u-position u-position-3"><!--block-->
                                <div class="u-block">
                                    <div class="u-block-container u-clearfix"><!--block_header-->
                                        <h5 class="u-block-header u-text u-text-5"><!--block_header_content--> Links
                                            <!--/block_header_content--></h5><!--/block_header-->
                                        <!--block_content-->
                                        <div class="u-block-content u-text u-text-6"><!--block_content_content-->
                                            <a href="@if($viewType=='preview')#@else/{{$presenceObj->Seite_Impressum}}{{$urlQuery}}@endif">Impressum</a>
                                            <br>
                                            <a href="@if($viewType=='preview')#@else/{{$presenceObj->Seite_Datenschutz}}{{$urlQuery}}@endif">Datenschutzvereinbarung</a>
                                            <br>
                                            <a href="@if($viewType=='preview')#@else/{{$presenceObj->Seite_AGBs}}{{$urlQuery}}@endif">AGB's</a><!--/block_content_content-->
                                        </div><!--/block_content-->

                                    </div>
                                </div><!--/block-->
                            </div><!--/position--><!--position-->
                            <div data-position="" class="u-position u-position-4"><!--block-->
                                <div class="u-block">
                                    <div class="u-block-container u-clearfix"><!--block_header-->
                                        <h5 class="u-block-header u-text u-text-7"><!--block_header_content-->
                                            Rechtliches<!--/block_header_content--></h5><!--/block_header-->
                                        <!--block_content-->
                                        <div class="u-block-content u-text u-text-8"><!--block_content_content-->
                                            Steuernummer: {{$presenceObj->Kontakt_Steuernummer}}
                                            <br>Ust-ID: {{$presenceObj->Kontakt_Ust_ID}}&nbsp;<br>
                                            <br><!--/block_content_content-->
                                        </div><!--/block_content-->
                                    </div>
                                </div><!--/block-->
                            </div><!--/position-->
                        </div>
                    </div>
                    <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-20-md u-size-22 u-layout-cell-3">
                        <div class="u-container-layout u-valign-bottom-xl u-container-layout-3"><!--position-->
                            <div data-position="" class="u-position u-position-5"><!--block-->
                                <div class="u-block">
                                    <div class="u-block-container u-clearfix"><!--block_header-->
                                        <h5 class="u-block-header u-text u-text-9"><!--block_header_content-->
                                            <!--/block_header_content--></h5><!--/block_header-->
                                        <!--block_content-->
                                        <div class="u-block-content u-text u-text-10"><!--block_content_content-->
                                            <!--/block_content_content--></div><!--/block_content-->
                                    </div>
                                </div><!--/block-->
                            </div><!--/position-->
                            <div class="u-expanded-width-lg u-expanded-width-md u-expanded-width-sm u-expanded-width-xs u-grey-light-2 u-map u-map-1">
                                <div class="embed-responsive">
                                    <iframe class="embed-responsive-item"
                                            src="//maps.google.com/maps?output=embed&amp;key=AIzaSyA6VNJjVHc6S_lXXL64MKbY8Kvz8M7dKKQ&amp;q={{$presenceObj->Kontakt_Plz}}%20{{$presenceObj->Kontakt_Ort}}%2C{{$presenceObj->Kontakt_Strasse}}&amp;z=18&amp;t=m"
                                            data-map="JTdCJTIycG9zaXRpb25UeXBlJTIyJTNBJTIybWFwLWFkZHJlc3MlMjIlMkMlMjJhZGRyZXNzJTIyJTNBJTIyX19QcmVzZW5jZVppcF9fJTIwX19QcmVzZW5jZUNpdHlfXyUyQ19fUHJlc2VuY2VTdHJlZXRfXyUyMiUyQyUyMnpvb20lMjIlM0ExOCUyQyUyMnR5cGVJZCUyMiUzQSUyMnJvYWQlMjIlMkMlMjJsYW5nJTIyJTNBJTIyJTIyJTJDJTIyYXBpS2V5JTIyJTNBJTIyQUl6YVN5QTZWTkpqVkhjNlNfbFhYTDY0TUtiWThLdno4TTdkS0tRJTIyJTdE"></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>
</body>
</html>