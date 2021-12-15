<!DOCTYPE html>
<html style="font-size: 16px;">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta charset="utf-8">
    <meta name="keywords" content="Über uns">
    <meta name="description" content="">
    <meta name="page_type" content="np-template-header-footer-from-plugin">
    @if ($presentationObj)
        <meta http-equiv="refresh"
              content="{{$presentationObj->interval}}; url=/presentation/{{$presentationObj->ident}}?n={{$presentationObj->nextPage}}">
    @endif
    <title>{{$pageObj->Überschrift}}</title>
    <link rel="stylesheet" href="/resources/iabo/presence/theme_001/nicepage.css" media="screen">
    <style>
        .u-section-1 {background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url("/resources/iabo/images/{{$providerCh}}_{{$pageObj->Bild_Datei_1}}.png")}  .u-section-1 .u-sheet-1 {min-height: 100vh}  .u-section-1 .u-text-1 {animation-duration: 1000ms;margin: 60px auto 0 0}  .u-section-1 .u-text-2 {animation-duration: 1000ms;margin: 20px 0 60px}  @media (max-width: 1199px) {  .u-section-1 {background-position: 50% 50%}  }  @media (max-width: 575px) {  .u-section-1 .u-sheet-1 {min-height: 287px}  }  .u-section-2 {background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url("/resources/iabo/images/{{$providerCh}}_{{$pageObj->Bild_Datei_1}}.png");margin-top: 0;margin-bottom: 0;min-height: 118px}  .u-section-2 .u-text-1 {font-size: 3rem;text-transform: none;font-weight: bold;margin: 33px calc(((100% - 1140px) / 2) + 273px) 33px calc(((100% - 1140px) / 2))}  @media (max-width: 1199px) {  .u-section-2 {background-position: 50% 50%;min-height: 106px}  .u-section-2 .u-text-1 {width: auto;margin: 28px calc(((100% - 940px) / 2) + 73px) 28px calc(((100% - 940px) / 2))}  }  @media (max-width: 991px) {  .u-section-2 {min-height: 102px}  .u-section-2 .u-text-1 {width: auto;margin: 25px 0}  }  @media (max-width: 767px) {  .u-section-2 {min-height: 75px}  .u-section-2 .u-text-1 {font-size: 2.25rem;margin-top: 18px;margin-bottom: 18px}  }  .u-section-3 {background-image: none;margin-top: 0;margin-bottom: 0}  .u-section-3 .u-sheet-1 {min-height: 128px}  .u-section-3 .u-text-1 {font-size: 1.25rem;margin: 52px 0}  @media (max-width: 1199px) {  .u-section-3 .u-text-1 {width: 803px}  }  @media (max-width: 991px) {  .u-section-3 .u-text-1 {width: 720px}  }  @media (max-width: 767px) {  .u-section-3 .u-text-1 {width: 540px}  }  @media (max-width: 575px) {  .u-section-3 .u-text-1 {width: 340px}  }  @media (max-width: 575px) {  .u-section-3 .u-text-1 {width: 340px}  }  .u-section-4 {background-image: none;margin-top: 0;margin-bottom: 0}  .u-section-4 .u-sheet-1 {min-height: 300px;margin-bottom: 50px;}  .u-section-4 .u-image-1 {width: 900px;height: 360px;margin: 44px auto 0 112px}  .u-section-4 .u-text-1 {margin: 46px 46px 10px 0}  .u-section-4 .u-image-2 {width: 900px;height: 360px;margin: 33px auto 0 112px}  .u-section-4 .u-text-2 {font-size: 1rem;line-height: 26px;letter-spacing: normal;margin: 1px 0 0}  .u-section-4 .u-image-3 {width: 900px;height: 360px;margin: 59px auto 59px 112px}  @media (max-width: 1199px) {  .u-section-4 .u-image-1 {margin-left: 40px}  .u-section-4 .u-text-1 {margin-right: 0;margin-left: 0}  .u-section-4 .u-image-2 {margin-left: 40px}  .u-section-4 .u-image-3 {margin-left: 40px}  }  @media (max-width: 991px) {  .u-section-4 .u-sheet-1 {min-height: 300px}  .u-section-4 .u-image-1 {width: 720px;height: 288px;margin-left: 0}  .u-section-4 .u-image-2 {width: 720px;height: 288px;margin-left: 0}  .u-section-4 .u-image-3 {width: 720px;height: 288px;margin-left: 0}  }  @media (max-width: 767px) {  .u-section-4 .u-sheet-1 {min-height: 300px}  .u-section-4 .u-image-1 {width: 540px;height: 216px}  .u-section-4 .u-image-2 {width: 540px;height: 216px}  .u-section-4 .u-image-3 {width: 540px;height: 216px}  }  @media (max-width: 575px) {  .u-section-4 .u-sheet-1 {min-height: 300px}  .u-section-4 .u-image-1 {width: 340px;height: 136px;margin-right: 0}  .u-section-4 .u-image-2 {width: 340px;height: 136px;margin-right: 0}  .u-section-4 .u-image-3 {width: 340px;height: 136px;margin-right: 0}  }  .u-section-5 {margin-top: 0;margin-bottom: 0}  .u-section-5 {margin-top: 0;margin-bottom: 0}  .u-section-5 .u-sheet-1 {min-height: 714px}  .u-section-5 .u-text-1 {width: 550px;font-weight: 700;background-image: none;line-height: 1.8;margin: 80px auto 0}  .u-section-5 .u-form-1 {width: 570px;margin: auto auto 60px}  .u-section-5 .u-form-group-1 {margin-left: 0}  .u-section-5 .u-input-1 {margin-left: 0;margin-top: 0;margin-bottom: 10px}  .u-section-5 .u-form-group-2 {margin-left: 0}  .u-section-5 .u-input-2 {margin-left: 0;margin-top: 0;margin-bottom: 10px}  .u-section-5 .u-form-group-3 {margin-left: 0}  .u-section-5 .u-input-3 {margin-left: 0;margin-top: 0;margin-bottom: 10px}  .u-section-5 .u-form-group-4 {margin-left: 0}  .u-section-5 .u-input-4 {margin-left: 0;margin-top: 0;margin-bottom: 10px}  .u-section-5 .u-form-group-5 {margin-left: 0}  .u-section-5 .u-input-5 {margin-left: 0;margin-top: 0;margin-bottom: 10px}  @media (max-width: 1199px) {  .u-section-5 .u-form-group-1 {margin-top: 0;margin-bottom: 10px}  .u-section-5 .u-form-group-2 {margin-top: 0;margin-bottom: 10px}  .u-section-5 .u-form-group-3 {margin-top: 0;margin-bottom: 10px}  .u-section-5 .u-form-group-4 {margin-top: 0;margin-bottom: 10px}  .u-section-5 .u-form-group-5 {margin-top: 0;margin-bottom: 10px}  .u-section-5 .u-form-group-6 {margin-top: 0;margin-bottom: 0}  }  @media (max-width: 767px) {  .u-section-5 .u-text-1 {width: 540px}  .u-section-5 .u-form-1 {width: 540px}  }  @media (max-width: 575px) {  .u-section-5 .u-text-1 {width: 340px}  .u-section-5 .u-form-1 {width: 340px}  .u-section-5 .u-form-group-1 {width: 100%}  .u-section-5 .u-form-group-2 {width: 100%}  .u-section-5 .u-form-group-3 {width: 100%}  .u-section-5 .u-form-group-4 {width: 100%}  .u-section-5 .u-form-group-5 {width: 100%}  .u-section-5 .u-form-group-6 {width: 100%}  }  .u-section-6 {margin-top: 0;margin-bottom: 0}  .u-section-6 .u-sheet-1 {min-height: 40px}  .u-section-7 {margin-top: 0;margin-bottom: 0}  .u-section-7 .u-sheet-1 {min-height: 173px}  .u-section-7 .u-layout-wrap-1 {margin: 21px 0}  .u-section-7 .u-layout-cell-1 {min-height: 132px}  .u-section-7 .u-container-layout-1 {padding: 0 30px 2px 0}  .u-section-7 .u-image-1 {height: 130px;object-position: 50% 21.37%;animation-duration: 1000ms;width: 310px;margin: 0 0 0 auto}  .u-section-7 .u-layout-cell-2 {min-height: 132px}  .u-section-7 .u-container-layout-2 {padding: 0}  .u-section-7 .u-text-1 {animation-duration: 1000ms;margin: 28px 0 0}  .u-section-7 .u-text-2 {animation-duration: 1000ms;font-size: 1.125rem;margin: 7px 0 0}  @media (max-width: 1199px) {  .u-section-7 .u-sheet-1 {min-height: 192px}  .u-section-7 .u-layout-wrap-1 {margin-right: initial;margin-left: initial}  .u-section-7 .u-layout-cell-1 {min-height: 109px;background-position: 50% 21.37%}  .u-section-7 .u-layout-cell-2 {min-height: 109px}  .u-section-7 .u-text-1 {margin-top: 32px}  .u-section-7 .u-text-2 {margin-top: 28px}  }  @media (max-width: 991px) {  .u-section-7 .u-sheet-1 {min-height: 153px}  .u-section-7 .u-layout-cell-1 {min-height: 100px}  .u-section-7 .u-image-1 {height: 103px;width: 246px}  .u-section-7 .u-layout-cell-2 {min-height: 100px}  .u-section-7 .u-text-1 {margin-top: 20px}  .u-section-7 .u-text-2 {margin-top: 20px}  }  @media (max-width: 767px) {  .u-section-7 .u-sheet-1 {min-height: 247px}  .u-section-7 .u-container-layout-1 {padding-right: 10px}  .u-section-7 .u-image-1 {margin-right: auto}  }  @media (max-width: 575px) {  .u-section-7 .u-sheet-1 {min-height: 239px}  .u-section-7 .u-layout-wrap-1 {margin-top: 20px;margin-bottom: 20px;margin-right: initial;margin-left: initial}  .u-section-7 .u-layout-cell-1 {min-height: 63px}  .u-section-7 .u-layout-cell-2 {min-height: 63px}  }  .u-section-8 {margin-top: 0;margin-bottom: 0}  .u-section-8 .u-sheet-1 {min-height: 173px}  .u-section-8 .u-layout-wrap-1 {margin: 21px 0}  .u-section-8 .u-layout-cell-1 {min-height: 132px}  .u-section-8 .u-container-layout-1 {padding: 30px 30px 2px 0}  .u-section-8 .u-image-1 {height: 130px;object-position: 50% 21.37%;animation-duration: 1000ms;width: 310px;margin: -30px 0 0 auto}  .u-section-8 .u-layout-cell-2 {min-height: 132px}  .u-section-8 .u-container-layout-2 {padding: 0}  .u-section-8 .u-text-1 {animation-duration: 1000ms;margin: 0}  @media (max-width: 1199px) {  .u-section-8 .u-sheet-1 {min-height: 192px}  .u-section-8 .u-layout-wrap-1 {margin-right: initial;margin-left: initial}  .u-section-8 .u-layout-cell-1 {min-height: 109px;background-position: 50% 21.37%}  .u-section-8 .u-layout-cell-2 {min-height: 109px}  .u-section-8 .u-text-1 {margin-top: 32px}  }  @media (max-width: 991px) {  .u-section-8 .u-sheet-1 {min-height: 153px}  .u-section-8 .u-layout-cell-1 {min-height: 100px}  .u-section-8 .u-image-1 {height: 103px;width: 246px}  .u-section-8 .u-layout-cell-2 {min-height: 100px}  .u-section-8 .u-text-1 {margin-top: 20px}  }  @media (max-width: 767px) {  .u-section-8 .u-sheet-1 {min-height: 247px}  .u-section-8 .u-container-layout-1 {padding-right: 10px}  .u-section-8 .u-image-1 {margin-right: auto}  }  @media (max-width: 575px) {  .u-section-8 .u-sheet-1 {min-height: 208px}  .u-section-8 .u-layout-cell-1 {min-height: 63px}  .u-section-8 .u-layout-cell-2 {min-height: 63px}  }  .u-section-9 {margin-top: 0;margin-bottom: 0}  .u-section-9 .u-sheet-1 {min-height: 88px}  .u-section-9 .u-layout-wrap-1 {margin: 8px auto 8px 0}  .u-section-9 .u-layout-cell-1 {min-height: 62px}  .u-section-9 .u-container-layout-1 {padding: 24px 30px 0}  .u-section-9 .u-text-1 {animation-duration: 1000ms;font-size: 1.875rem;margin: -5px 0 19px}  @media (max-width: 1199px) {  .u-section-9 .u-sheet-1 {min-height: 192px}  .u-section-9 .u-layout-wrap-1 {margin-right: initial;margin-left: initial}  .u-section-9 .u-layout-cell-1 {min-height: 51px}  .u-section-9 .u-text-1 {margin-top: 32px}  }  @media (max-width: 991px) {  .u-section-9 .u-sheet-1 {min-height: 153px}  .u-section-9 .u-layout-cell-1 {min-height: 100px}  .u-section-9 .u-text-1 {margin-top: 20px}  }  @media (max-width: 767px) {  .u-section-9 .u-sheet-1 {min-height: 102px}  .u-section-9 .u-layout-wrap-1 {margin-top: 15px;margin-bottom: 15px;margin-right: initial;margin-left: initial}  .u-section-9 .u-layout-cell-1 {min-height: 72px}  .u-section-9 .u-container-layout-1 {padding-left: 10px;padding-right: 10px}  .u-section-9 .u-text-1 {font-size: 1.5rem;margin-top: 0;margin-bottom: 0}  }  @media (max-width: 575px) {  .u-section-9 .u-sheet-1 {min-height: 89px}  .u-section-9 .u-layout-wrap-1 {margin-top: 18px;margin-bottom: 18px;margin-right: initial;margin-left: initial}  .u-section-9 .u-layout-cell-1 {min-height: 54px}  .u-section-9 .u-text-1 {margin-top: -10px}  }  .u-section-10 {margin-top: 0;margin-bottom: 0}  .u-section-10 .u-sheet-1 {min-height: 40px}
    </style>
    <script class="u-script" type="text/javascript" src="/resources/iabo/presence/theme_001/jquery.js"
            defer=""></script>
    <script class="u-script" type="text/javascript" src="/resources/iabo/presence/theme_001/nicepage.js"
            defer=""></script>
    <meta name="generator" content="Nicepage 2.20.2, nicepage.com">


    <link id="u-theme-google-font" rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i|Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i">
    <script type="application/ld+json">{
		"@context": "http://schema.org",
		"@type": "Organization",
		"name": "theme_001",
		"url": "index.html",
		"logo": @if($presentationObj)"/resources/iabo/images/{{$providerCh}}_{{$presentationObj->Logo}}.png"@else "" @endif
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
        <a href="@if($viewType=='preview')#@else/{{$presenceObj->Seite_Start}}{{$urlQuery}}@endif" class="u-image u-logo u-image-1" title="Startseite">
            @if($presentationObj)<img src="/resources/iabo/images/{{$providerCh}}_{{$presentationObj->Logo}}.png" class="u-logo-image u-logo-image-1" data-image-width="121.4444">@endif
        </a>
        <nav class="u-menu u-menu-dropdown u-offcanvas u-menu-1">
            @if (!$presentationObj)
            <div class="menu-collapse" style="font-size: 1rem; letter-spacing: 0;">
                <a class="u-button-style u-custom-left-right-menu-spacing u-custom-padding-bottom u-custom-top-bottom-menu-spacing u-nav-link u-text-active-palette-1-base u-text-grey-60 u-text-hover-palette-2-base"
                   href="#">
                    <svg>
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#menu-hamburger"></use>
                    </svg>
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
            </div>
            @endif
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
@if($pageTemplate == 'start_page')
    <section class="skrollable u-align-center u-clearfix u-image u-parallax u-shading u-section-1" src=""
             id="start_page_header" data-image-width="60" data-image-height="60">
        <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
            <h1 class="u-align-left u-text u-text-default u-title u-text-1">{{$pageObj->Überschrift}}</h1>
            <h2 class="u-align-left u-subtitle u-text u-text-2">{!! $pageObj->Kurztext !!}</h2>
        </div>
    </section>
@else
    <section class="skrollable u-align-left u-clearfix u-image u-parallax u-shading u-section-2" id="page_header"
             data-image-width="60" data-image-height="60">
        <h1 class="u-text u-text-body-alt-color u-title u-text-1">{{$pageObj->Überschrift}}</h1>
    </section>
@endif
@if($pageTemplate == 'start_page')
    <section class="u-clearfix u-grey-5 u-section-3" id="start_page_body">
        <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
            <h4 class="u-text u-text-1">{!! $pageObj->Langtext !!}</h4>
        </div>
    </section>
@else
    <section class="u-clearfix u-grey-5 u-section-4" id="page_body">
        <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
            @if ($pageObj->Bild_Datei_2 != "")
                <img src="/resources/iabo/images/{{$providerCh}}_{{$pageObj->Bild_Datei_2}}.png" alt=""
                     class="u-image u-image-contain u-image-default u-image-1" data-image-width="60" data-image-height="60">
            @endif
            <h3 class="u-text u-text-1">{!! $pageObj->Kurztext !!}</h3>
            @if ($pageObj->Bild_Datei_3 != "")
                <img src="/resources/iabo/images/{{$providerCh}}_{{$pageObj->Bild_Datei_3}}.png" alt=""
                     class="u-image u-image-contain u-image-default u-image-2" data-image-width="60" data-image-height="60">
            @endif
            <p class="u-text u-text-2">{!! $pageObj->Langtext !!}</p>
            @if ($pageObj->Bild_Datei_4 != "")
                <img src="/resources/iabo/images/{{$providerCh}}_{{$pageObj->Bild_Datei_4}}.png" alt=""
                     class="u-image u-image-contain u-image-default u-image-3" data-image-width="60" data-image-height="60">
            @endif
        </div>
    </section>
@endif

@if ($pageTemplate == 'contact_page')
    <section class="u-align-center u-clearfix u-section-5" id="form_body">
        <div class="u-clearfix u-sheet u-sheet-1">
            <h2 class="u-text u-text-1">Kontaktieren Sie uns:</h2>
            <div class="u-form u-form-1">
                <form action="api/iabo/presence/contact?ch={{$providerCh}}&page_ident={{$pageObj->Kennung}}&page_id={{$pageObj->Nummer}}"
                      method="POST" class="u-clearfix u-form-spacing-10 u-form-vertical u-inner-form"
                      style="padding: 8px;"
                      source="custom" name="form">
                    <div class="u-form-group u-form-group-1">
                        <label for="text-e272" class="u-form-control-hidden u-label"></label>
                        <input type="text" placeholder="Firmenname / Name" id="text-e272" name="name_1"
                               class="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white u-input-1"
                               required="required">
                    </div>
                    <div class="u-form-group u-form-group-2">
                        <label for="text-600b" class="u-form-control-hidden u-label"></label>
                        <input type="text" placeholder="Zusatz / Vorname" id="text-600b" name="name_2"
                               class="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white u-input-2">
                    </div>
                    <div class="u-form-group u-form-group-3">
                        <label for="text-99e7" class="u-form-control-hidden u-label"></label>
                        <input type="text" placeholder="Telefon" id="text-99e7" name="phone"
                               class="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white u-input-3">
                    </div>
                    <div class="u-form-email u-form-group u-form-group-4">
                        <label for="text-11c9" class="u-form-control-hidden u-label"></label>
                        <input type="email" placeholder="E-Mail" id="text-11c9" name="email"
                               class="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white u-input-4"
                               required="required">
                    </div>
                    <div class="u-form-group u-form-group-5">
                        <label for="textarea-eeec" class="u-form-control-hidden u-label"></label>
                        <textarea placeholder="Bemerkungen" rows="4" cols="50" id="textarea-eeec" name="message"
                                  class="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white u-input-5"
                                  required="required"></textarea>
                    </div>
                    <div class="u-align-center u-form-group u-form-submit u-form-group-6">
                        <a href="#" class="u-btn u-btn-submit u-button-style">Absenden</a>
                        <input type="submit" value="submit" class="u-form-control-hidden">
                    </div>
                    <div class="u-form-send-message u-form-send-success">Ihr Nachricht wurde erfolgreich
                        versendet!
                    </div>
                    <div class="u-form-send-error u-form-send-message">Beim Versand Ihrer Nachricht ist ein Fehler
                        aufgetreten.
                    </div>
                    <input type="hidden" value="" name="recaptchaResponse">
                </form>
            </div>
        </div>
    </section>
@endif
@if (!$presentationObj)
    @if (count($linkArr) > 0)
        <section class="u-clearfix u-section-6" id="page_links_header">
            <div class="u-clearfix u-sheet u-sheet-1"></div>
        </section>
        @foreach ($linkArr as $linkObj)
            @if ($linkObj->Type =='Infobox_groß')
                <section class="u-clearfix u-section-7" id="start_page_links">
                    <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
                        <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
                            <div class="u-layout">
                                <div class="u-layout-row">
                                    <div class="u-container-style u-layout-cell u-left-cell u-size-23 u-layout-cell-1"
                                         data-href="{{$linkObj->Zielseite}}{{$urlQuery}}">
                                        <div class="u-container-layout u-valign-middle u-container-layout-1">
                                            <img class="u-expand-resize u-image u-image-contain u-image-1"
                                                 src="/resources/iabo/images/{{$providerCh}}_{{$linkObj->Bild_Datei_1}}.png"
                                                 data-image-width="60" data-image-height="60"
                                                 data-href="{{$linkObj->Zielseite}}{{$urlQuery}}"
                                                 data-animation-name="fadeIn"
                                                 data-animation-duration="1000" data-animation-delay="0">
                                        </div>
                                    </div>
                                    <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2">
                                        <div class="u-container-layout u-container-layout-2">
                                            <h2 class="u-text u-text-1" data-animation-name="fadeIn"
                                                data-animation-duration="1000"
                                                data-animation-delay="0" data-animation-direction="">
                                                <a href="{{$linkObj->Zielseite}}{{$urlQuery}}">{{$linkObj->Überschrift}}</a>
                                            </h2>
                                            <p class="u-text u-text-2" data-animation-name="fadeIn"
                                               data-animation-duration="1000"
                                               data-animation-delay="0"
                                               data-animation-direction="">{{$linkObj->Kurztext}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            @endif
            @if ($linkObj->Type =='Infobox_mittel')
                <section class="u-clearfix u-section-8" id="carousel_2c70">
                    <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
                        <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
                            <div class="u-layout">
                                <div class="u-layout-row">
                                    <div class="u-container-style u-layout-cell u-left-cell u-size-23 u-layout-cell-1"
                                         data-href="{{$linkObj->Zielseite}}{{$urlQuery}}">
                                        <div class="u-container-layout u-container-layout-1">
                                            <img class="u-expand-resize u-image u-image-contain u-image-1"
                                                 src="/resources/iabo/images/{{$providerCh}}_{{$linkObj->Bild_Datei_1}}.png"
                                                 data-image-width="60" data-image-height="60"
                                                 data-href="{{$linkObj->Zielseite}}{{$urlQuery}}"
                                                 data-animation-name="fadeIn"
                                                 data-animation-duration="1000" data-animation-delay="0">
                                        </div>
                                    </div>
                                    <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2">
                                        <div class="u-container-layout u-valign-middle u-container-layout-2">
                                            <h2 class="u-text u-text-1" data-animation-name="fadeIn"
                                                data-animation-duration="1000"
                                                data-animation-delay="0" data-animation-direction="">
                                                <a href="{{$linkObj->Zielseite}}{{$urlQuery}}">{{$linkObj->Überschrift}}</a>
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            @endif
            @if ($linkObj->Type =='Infobox_klein')
                <section class="u-clearfix u-section-9" id="page_links_small">
                    <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
                        <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
                            <div class="u-layout">
                                <div class="u-layout-row">
                                    <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-60 u-layout-cell-1">
                                        <div class="u-container-layout u-valign-middle u-container-layout-1">
                                            <h2 class="u-text u-text-1" data-animation-name="fadeIn"
                                                data-animation-duration="1000"
                                                data-animation-delay="0" data-animation-direction="">
                                                <a href="{{$linkObj->Zielseite}}{{$urlQuery}}">{{$linkObj->Überschrift}}</a>
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            @endif
        @endforeach
        <section class="u-clearfix u-section-10" id="page_links_footer">
            <div class="u-clearfix u-sheet u-sheet-1"></div>
        </section>
    @endif

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
                                                <a href="@if($viewType=='preview')#@else/imprint{{$urlQuery}}@endif">Impressum</a>
                                                <br>
                                                <a href="@if($viewType=='preview')#@else/privacy{{$urlQuery}}@endif">Datenschutzvereinbarung</a>
                                                <br>
                                                <a href="@if($viewType=='preview')#@else/terms{{$urlQuery}}@endif">AGB's</a><!--/block_content_content-->
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
@endif
</body>
</html>