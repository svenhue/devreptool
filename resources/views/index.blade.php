<!DOCTYPE HTML>
<html manifest="">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=10, user-scalable=yes">

    <!--    customer declaration-->
<link rel="shortcut icon" id="dynamic-favicon" type="image/x-icon" href="resources/images/ths/favicon.ico">
<title>THS</title>

    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyA6VNJjVHc6S_lXXL64MKbY8Kvz8M7dKKQ&libraries=geometry,places"></script>
    <script src="lib/keydragzoom.js"></script>
    <script src="lib/markerclusterer.js"></script>
    <script src="lib/markerwithlabel.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/OverlappingMarkerSpiderfier/1.0.3/oms.min.js"></script>

    <style>
        .loader {
            width: 40px;
            height: 40px;
            background-color: #e2e2e2;
            position: fixed;
            top: 45%;
            left: 50%;
            -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;
            animation: sk-rotateplane 1.2s infinite ease-in-out;
        }

        @-webkit-keyframes sk-rotateplane {
            0% {
                -webkit-transform: perspective(120px)
            }
            50% {
                -webkit-transform: perspective(120px) rotateY(180deg)
            }
            100% {
                -webkit-transform: perspective(120px) rotateY(180deg) rotateX(180deg)
            }
        }

        @keyframes sk-rotateplane {
            0% {
                transform: perspective(120px) rotateX(0deg) rotateY(0deg);
                -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg)
            }
            50% {
                transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
                -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg)
            }
            100% {
                transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
                -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
            }
        }
    </style>


    <script type="text/javascript">
        var Ext = Ext || {}; // Ext namespace won't be defined yet...

        // This function is called by the Microloader after it has performed basic
        // device detection. The results are provided in the "tags" object. You can
        // use these tags here or even add custom tags. These can be used by platform
        // filters in your manifest or by platformConfig expressions in your app.
        //
        Ext.beforeLoad = function (tags) {
            var s = location.search,  // the query string (ex "?foo=1&bar")
                profile;

            // For testing look for "?classic" or "?modern" in the URL to override
            // device detection default.
            //
            if (s.match(/\bclassic\b/)) {
                profile = 'classic';
            }
            else if (s.match(/\bmodern\b/)) {
                profile = 'modern';
            }
            else {
                profile = tags.desktop ? 'classic' : 'modern';
                //profile = tags.phone ? 'modern' : 'classic';
            }

            Ext.manifest = profile; // this name must match a build profile name

            // This function is called once the manifest is available but before
            // any data is pulled from it.
            //
            //return function (manifest) {
                // peek at / modify the manifest object
            //};
        };
    </script>

    <!-- The line below must be kept intact for Sencha Cmd to build your application -->
    <script id="microloader" data-app="a65f9985-f771-4732-b8bc-156169c73b46" type="text/javascript" src="bootstrap.js"></script>
    <script defer src="resources/js/all.js"></script>
</head>
<body>
<div id="loader" class="loader"></div>
<!--<link href="resources/css/all.css" rel="stylesheet">-->
</body>
</html>