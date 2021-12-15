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

    <title>{{$pageObj->Überschrift}}</title>
    <link rel="stylesheet" href="/resources/iabo/presence/theme_001/nicepage_dataspecs.css" media="screen">
    <style>
        body {
            font-family: 'Open Sans', 'Helvetica Neue', helvetica, arial, verdana, sans-serif
        }

        .u-section-1 {
            background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url("/resources/iabo/images/{{$providerCh}}_{{$pageObj->Bild_Datei_1}}.png")
        }

        .u-section-1 .u-sheet-1 {
            min-height: 100vh
        }

        .u-section-1 .u-text-1 {
            animation-duration: 1000ms;
            margin: 60px auto 0 0
        }

        .u-section-1 .u-text-2 {
            animation-duration: 1000ms;
            margin: 20px 0 60px
        }

        @media (max-width: 1199px) {
            .u-section-1 {
                background-position: 50% 50%
            }
        }

        @media (max-width: 575px) {
            .u-section-1 .u-sheet-1 {
                min-height: 287px
            }
        }

        .u-section-2 {
            background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url("/resources/iabo/images/{{$providerCh}}_{{$pageObj->Bild_Datei_1}}.png");
            margin-top: 0;
            margin-bottom: 0;
            min-height: 118px
        }

        .u-section-2 .u-text-1 {
            font-size: 3rem;
            text-transform: none;
            font-weight: bold;
            margin: 33px calc(((100% - 1140px) / 2) + 273px) 33px calc(((100% - 1140px) / 2))
        }

        @media (max-width: 1199px) {
            .u-section-2 {
                background-position: 50% 50%;
                min-height: 106px
            }

            .u-section-2 .u-text-1 {
                width: auto;
                margin: 28px calc(((100% - 940px) / 2) + 73px) 28px calc(((100% - 940px) / 2))
            }
        }

        @media (max-width: 991px) {
            .u-section-2 {
                min-height: 102px
            }

            .u-section-2 .u-text-1 {
                width: auto;
                margin: 25px 0
            }
        }

        @media (max-width: 767px) {
            .u-section-2 {
                min-height: 75px
            }

            .u-section-2 .u-text-1 {
                font-size: 2.25rem;
                margin-top: 18px;
                margin-bottom: 18px
            }
        }

        .u-section-3 {
            background-image: none;
            margin-top: 0;
            margin-bottom: 0
        }

        .u-section-3 .u-sheet-1 {
            min-height: 128px
        }

        .u-section-3 .u-text-1 {
            font-size: 1.25rem;
            margin: 52px 0
        }

        @media (max-width: 1199px) {
            .u-section-3 .u-text-1 {
                width: 803px
            }
        }

        @media (max-width: 991px) {
            .u-section-3 .u-text-1 {
                width: 720px
            }
        }

        @media (max-width: 767px) {
            .u-section-3 .u-text-1 {
                width: 540px
            }
        }

        @media (max-width: 575px) {
            .u-section-3 .u-text-1 {
                width: 340px
            }
        }

        @media (max-width: 575px) {
            .u-section-3 .u-text-1 {
                width: 340px
            }
        }

        .u-section-4 {
            background-image: none;
            margin-top: 0;
            margin-bottom: 0
        }

        .u-section-4 .u-sheet-1 {
            min-height: 300px;
            margin-bottom: 50px;
        }

        .u-section-4 .u-image-1 {
            width: 900px;
            height: 360px;
            margin: 44px auto 0 112px
        }

        .u-section-4 .u-text-1 {
            margin: 46px 46px 10px 0
        }

        .u-section-4 .u-image-2 {
            width: 900px;
            height: 360px;
            margin: 33px auto 0 112px
        }

        .u-section-4 .u-text-2 {
            font-size: 1rem;
            line-height: 26px;
            letter-spacing: normal;
            margin: 1px 0 0
        }

        .u-section-4 .u-image-3 {
            width: 900px;
            height: 360px;
            margin: 59px auto 59px 112px
        }

        @media (max-width: 1199px) {
            .u-section-4 .u-image-1 {
                margin-left: 40px
            }

            .u-section-4 .u-text-1 {
                margin-right: 0;
                margin-left: 0
            }

            .u-section-4 .u-image-2 {
                margin-left: 40px
            }

            .u-section-4 .u-image-3 {
                margin-left: 40px
            }
        }

        @media (max-width: 991px) {
            .u-section-4 .u-sheet-1 {
                min-height: 300px
            }

            .u-section-4 .u-image-1 {
                width: 720px;
                height: 288px;
                margin-left: 0
            }

            .u-section-4 .u-image-2 {
                width: 720px;
                height: 288px;
                margin-left: 0
            }

            .u-section-4 .u-image-3 {
                width: 720px;
                height: 288px;
                margin-left: 0
            }
        }

        @media (max-width: 767px) {
            .u-section-4 .u-sheet-1 {
                min-height: 300px
            }

            .u-section-4 .u-image-1 {
                width: 540px;
                height: 216px
            }

            .u-section-4 .u-image-2 {
                width: 540px;
                height: 216px
            }

            .u-section-4 .u-image-3 {
                width: 540px;
                height: 216px
            }
        }

        @media (max-width: 575px) {
            .u-section-4 .u-sheet-1 {
                min-height: 300px
            }

            .u-section-4 .u-image-1 {
                width: 340px;
                height: 136px;
                margin-right: 0
            }

            .u-section-4 .u-image-2 {
                width: 340px;
                height: 136px;
                margin-right: 0
            }

            .u-section-4 .u-image-3 {
                width: 340px;
                height: 136px;
                margin-right: 0
            }
        }

        .u-section-5 {
            margin-top: 0;
            margin-bottom: 0
        }

        .u-section-5 {
            margin-top: 0;
            margin-bottom: 0
        }

        .u-section-5 .u-sheet-1 {
            min-height: 714px
        }

        .u-section-5 .u-text-1 {
            width: 550px;
            font-weight: 700;
            background-image: none;
            line-height: 1.8;
            margin: 80px auto 0
        }

        .u-section-5 .u-form-1 {
            width: 570px;
            margin: auto auto 60px
        }

        .u-section-5 .u-form-group-1 {
            margin-left: 0
        }

        .u-section-5 .u-input-1 {
            margin-left: 0;
            margin-top: 0;
            margin-bottom: 10px
        }

        .u-section-5 .u-form-group-2 {
            margin-left: 0
        }

        .u-section-5 .u-input-2 {
            margin-left: 0;
            margin-top: 0;
            margin-bottom: 10px
        }

        .u-section-5 .u-form-group-3 {
            margin-left: 0
        }

        .u-section-5 .u-input-3 {
            margin-left: 0;
            margin-top: 0;
            margin-bottom: 10px
        }

        .u-section-5 .u-form-group-4 {
            margin-left: 0
        }

        .u-section-5 .u-input-4 {
            margin-left: 0;
            margin-top: 0;
            margin-bottom: 10px
        }

        .u-section-5 .u-form-group-5 {
            margin-left: 0
        }

        .u-section-5 .u-input-5 {
            margin-left: 0;
            margin-top: 0;
            margin-bottom: 10px
        }

        @media (max-width: 1199px) {
            .u-section-5 .u-form-group-1 {
                margin-top: 0;
                margin-bottom: 10px
            }

            .u-section-5 .u-form-group-2 {
                margin-top: 0;
                margin-bottom: 10px
            }

            .u-section-5 .u-form-group-3 {
                margin-top: 0;
                margin-bottom: 10px
            }

            .u-section-5 .u-form-group-4 {
                margin-top: 0;
                margin-bottom: 10px
            }

            .u-section-5 .u-form-group-5 {
                margin-top: 0;
                margin-bottom: 10px
            }

            .u-section-5 .u-form-group-6 {
                margin-top: 0;
                margin-bottom: 0
            }
        }

        @media (max-width: 767px) {
            .u-section-5 .u-text-1 {
                width: 540px
            }

            .u-section-5 .u-form-1 {
                width: 540px
            }
        }

        @media (max-width: 575px) {
            .u-section-5 .u-text-1 {
                width: 340px
            }

            .u-section-5 .u-form-1 {
                width: 340px
            }

            .u-section-5 .u-form-group-1 {
                width: 100%
            }

            .u-section-5 .u-form-group-2 {
                width: 100%
            }

            .u-section-5 .u-form-group-3 {
                width: 100%
            }

            .u-section-5 .u-form-group-4 {
                width: 100%
            }

            .u-section-5 .u-form-group-5 {
                width: 100%
            }

            .u-section-5 .u-form-group-6 {
                width: 100%
            }
        }

        .u-section-6 {
            margin-top: 0;
            margin-bottom: 0
        }

        .u-section-6 .u-sheet-1 {
            min-height: 40px
        }

        .u-section-7 {
            margin-top: 0;
            margin-bottom: 0
        }

        .u-section-7 .u-sheet-1 {
            min-height: 173px
        }

        .u-section-7 .u-layout-wrap-1 {
            margin: 21px 0
        }

        .u-section-7 .u-layout-cell-1 {
            min-height: 132px
        }

        .u-section-7 .u-container-layout-1 {
            padding: 0 30px 2px 0
        }

        .u-section-7 .u-image-1 {
            height: 130px;
            object-position: 50% 21.37%;
            animation-duration: 1000ms;
            width: 310px;
            margin: 0 0 0 auto
        }

        .u-section-7 .u-layout-cell-2 {
            min-height: 132px
        }

        .u-section-7 .u-container-layout-2 {
            padding: 0
        }

        .u-section-7 .u-text-1 {
            animation-duration: 1000ms;
            margin: 28px 0 0
        }

        .u-section-7 .u-text-2 {
            animation-duration: 1000ms;
            font-size: 1.125rem;
            margin: 7px 0 0
        }

        @media (max-width: 1199px) {
            .u-section-7 .u-sheet-1 {
                min-height: 192px
            }

            .u-section-7 .u-layout-wrap-1 {
                margin-right: initial;
                margin-left: initial
            }

            .u-section-7 .u-layout-cell-1 {
                min-height: 109px;
                background-position: 50% 21.37%
            }

            .u-section-7 .u-layout-cell-2 {
                min-height: 109px
            }

            .u-section-7 .u-text-1 {
                margin-top: 32px
            }

            .u-section-7 .u-text-2 {
                margin-top: 28px
            }
        }

        @media (max-width: 991px) {
            .u-section-7 .u-sheet-1 {
                min-height: 153px
            }

            .u-section-7 .u-layout-cell-1 {
                min-height: 100px
            }

            .u-section-7 .u-image-1 {
                height: 103px;
                width: 246px
            }

            .u-section-7 .u-layout-cell-2 {
                min-height: 100px
            }

            .u-section-7 .u-text-1 {
                margin-top: 20px
            }

            .u-section-7 .u-text-2 {
                margin-top: 20px
            }
        }

        @media (max-width: 767px) {
            .u-section-7 .u-sheet-1 {
                min-height: 247px
            }

            .u-section-7 .u-container-layout-1 {
                padding-right: 10px
            }

            .u-section-7 .u-image-1 {
                margin-right: auto
            }
        }

        @media (max-width: 575px) {
            .u-section-7 .u-sheet-1 {
                min-height: 239px
            }

            .u-section-7 .u-layout-wrap-1 {
                margin-top: 20px;
                margin-bottom: 20px;
                margin-right: initial;
                margin-left: initial
            }

            .u-section-7 .u-layout-cell-1 {
                min-height: 63px
            }

            .u-section-7 .u-layout-cell-2 {
                min-height: 63px
            }
        }

        .u-section-8 {
            margin-top: 0;
            margin-bottom: 0
        }

        .u-section-8 .u-sheet-1 {
            min-height: 173px
        }

        .u-section-8 .u-layout-wrap-1 {
            margin: 21px 0
        }

        .u-section-8 .u-layout-cell-1 {
            min-height: 132px
        }

        .u-section-8 .u-container-layout-1 {
            padding: 30px 30px 2px 0
        }

        .u-section-8 .u-image-1 {
            height: 130px;
            object-position: 50% 21.37%;
            animation-duration: 1000ms;
            width: 310px;
            margin: -30px 0 0 auto
        }

        .u-section-8 .u-layout-cell-2 {
            min-height: 132px
        }

        .u-section-8 .u-container-layout-2 {
            padding: 0
        }

        .u-section-8 .u-text-1 {
            animation-duration: 1000ms;
            margin: 0
        }

        @media (max-width: 1199px) {
            .u-section-8 .u-sheet-1 {
                min-height: 192px
            }

            .u-section-8 .u-layout-wrap-1 {
                margin-right: initial;
                margin-left: initial
            }

            .u-section-8 .u-layout-cell-1 {
                min-height: 109px;
                background-position: 50% 21.37%
            }

            .u-section-8 .u-layout-cell-2 {
                min-height: 109px
            }

            .u-section-8 .u-text-1 {
                margin-top: 32px
            }
        }

        @media (max-width: 991px) {
            .u-section-8 .u-sheet-1 {
                min-height: 153px
            }

            .u-section-8 .u-layout-cell-1 {
                min-height: 100px
            }

            .u-section-8 .u-image-1 {
                height: 103px;
                width: 246px
            }

            .u-section-8 .u-layout-cell-2 {
                min-height: 100px
            }

            .u-section-8 .u-text-1 {
                margin-top: 20px
            }
        }

        @media (max-width: 767px) {
            .u-section-8 .u-sheet-1 {
                min-height: 247px
            }

            .u-section-8 .u-container-layout-1 {
                padding-right: 10px
            }

            .u-section-8 .u-image-1 {
                margin-right: auto
            }
        }

        @media (max-width: 575px) {
            .u-section-8 .u-sheet-1 {
                min-height: 208px
            }

            .u-section-8 .u-layout-cell-1 {
                min-height: 63px
            }

            .u-section-8 .u-layout-cell-2 {
                min-height: 63px
            }
        }

        .u-section-9 {
            margin-top: 0;
            margin-bottom: 0
        }

        .u-section-9 .u-sheet-1 {
            min-height: 88px
        }

        .u-section-9 .u-layout-wrap-1 {
            margin: 8px auto 8px 0
        }

        .u-section-9 .u-layout-cell-1 {
            min-height: 62px
        }

        .u-section-9 .u-container-layout-1 {
            padding: 24px 30px 0
        }

        .u-section-9 .u-text-1 {
            animation-duration: 1000ms;
            font-size: 1.875rem;
            margin: -5px 0 19px
        }

        @media (max-width: 1199px) {
            .u-section-9 .u-sheet-1 {
                min-height: 192px
            }

            .u-section-9 .u-layout-wrap-1 {
                margin-right: initial;
                margin-left: initial
            }

            .u-section-9 .u-layout-cell-1 {
                min-height: 51px
            }

            .u-section-9 .u-text-1 {
                margin-top: 32px
            }
        }

        @media (max-width: 991px) {
            .u-section-9 .u-sheet-1 {
                min-height: 153px
            }

            .u-section-9 .u-layout-cell-1 {
                min-height: 100px
            }

            .u-section-9 .u-text-1 {
                margin-top: 20px
            }
        }

        @media (max-width: 767px) {
            .u-section-9 .u-sheet-1 {
                min-height: 102px
            }

            .u-section-9 .u-layout-wrap-1 {
                margin-top: 15px;
                margin-bottom: 15px;
                margin-right: initial;
                margin-left: initial
            }

            .u-section-9 .u-layout-cell-1 {
                min-height: 72px
            }

            .u-section-9 .u-container-layout-1 {
                padding-left: 10px;
                padding-right: 10px
            }

            .u-section-9 .u-text-1 {
                font-size: 1.5rem;
                margin-top: 0;
                margin-bottom: 0
            }
        }

        @media (max-width: 575px) {
            .u-section-9 .u-sheet-1 {
                min-height: 89px
            }

            .u-section-9 .u-layout-wrap-1 {
                margin-top: 18px;
                margin-bottom: 18px;
                margin-right: initial;
                margin-left: initial
            }

            .u-section-9 .u-layout-cell-1 {
                min-height: 54px
            }

            .u-section-9 .u-text-1 {
                margin-top: -10px
            }
        }

        .u-section-10 {
            margin-top: 0;
            margin-bottom: 0
        }

        .u-section-10 .u-sheet-1 {
            min-height: 40px
        }
    </style>
    <script class="u-script" type="text/javascript" src="/resources/iabo/presence/theme_001/jquery.js"
            defer=""></script>
    <script class="u-script" type="text/javascript" src="/resources/iabo/presence/theme_001/nicepage.js"
            defer=""></script>

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
        <a href="{{$presenceObj->Seite_Start}}{{$urlQuery}}" class="u-image u-logo u-image-1" title="Startseite">
            <img width="122" src="resources/iabo/images/{{$providerCh}}_{{$presenceObj->Logo}}.png"
                 class="u-logo-image u-logo-image-1">
        </a>
        <nav class="u-menu u-menu-dropdown u-offcanvas u-menu-1">
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

<section class=" u-align-left u-clearfix u-image u-section-2" id="page_header"
         data-image-width="100%" data-image-height="60">
    <h1 class="u-text u-text-body-alt-color u-title u-text-1" style="color:white">{{$pageObj->Überschrift}}</h1>
</section>

<section class="u-clearfix u-section-4" id="page_body">
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


<footer class="u-align-left u-clearfix u-footer u-grey-80" id="sec-c465">
    <div class="u-clearfix u-sheet u-valign-middle-lg u-valign-middle-xl u-sheet-1">
        <div class="u-clearfix u-expanded-width-lg u-expanded-width-xl u-expanded-width-xs u-gutter-30 u-layout-wrap u-layout-wrap-1">
            <div class="u-gutter-0 u-layout">
                <div class="u-layout-row">
                    <div class="u-align-left u-container-style u-layout-cell u-left-cell u-size-60 u-layout-cell-1">
                        <div class="u-container-layout u-valign-top u-container-layout-1"><!--position-->
                            <div data-position="" class="u-position u-position-1"><!--block-->
                                <div class="u-block">
                                    <div class="u-block-container u-clearfix"><!--block_header-->
                                        <h5 class="u-block-header u-text u-text-1"><!--block_header_content--> Addresse<!--/block_header_content--></h5><!--/block_header--><!--block_content-->
                                        <div class="u-block-content u-text u-text-2"><!--block_content_content-->{{$presenceObj->Kontakt_Name_1}}<br>{{$presenceObj->Kontakt_Strasse}}<br>{{$presenceObj->Kontakt_Plz}} {{$presenceObj->Kontakt_Ort}}<!--/block_content_content-->
                                        </div><!--/block_content-->
                                    </div>
                                </div><!--/block-->
                            </div><!--/position--><!--position-->
                            <div data-position="" class="u-position u-position-2"><!--block-->
                                <div class="u-block">
                                    <div class="u-block-container u-clearfix"><!--block_header-->
                                        <h5 class="u-block-header u-text u-text-3"><!--block_header_content--> Kontakt<!--/block_header_content--></h5><!--/block_header--><!--block_content-->
                                        <div class="u-block-content u-text u-text-4"><!--block_content_content-->Telefon: {{$presenceObj->Kontakt_Telefon}}<br>Telefax: {{$presenceObj->Kontakt_Fax}}<br>E-Mail: <a href="mailto:{{$presenceObj->Kontakt_E_Mail}}">{{$presenceObj->Kontakt_E_Mail}}</a>
                                            <!--/block_content_content-->
                                        </div><!--/block_content-->
                                    </div><!--/block-->
                                </div><!--/block-->
                            </div><!--/position-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>
</body>
</html>