<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <title>Sales Dashboard</title>
    <script type="text/javascript" src="lib/js/jquery.min.js"></script>
    <script type="text/javascript" src="lib/js/dx.all.js"></script>
    <link rel="stylesheet" href="lib/css/dx.common.css" />
    <link rel="stylesheet" href="lib/css/dx.light.css" />

    <style>
        body {
            padding: 0;
            margin: 0;
        }

        .dx-toolbar {
            background-color: #0a4d85;
            padding: 10px 10px;
            color: #fff;
        }

        .dx-button {
            border: 0;
            background-color: transparent;
            color: #fff;
        }

        .dx-button-mode-contained .dx-icon {
            color: #fff;
        }

        .dx-state-hover,
        .dx-state-focused {
            background-color: transparent;
            border: 0;
        }

        .toolbar-label,
        .toolbar-label>b {
            font-size: 18px;
        }

        .drawer-container {
            background-color: #27313D;
        }

        .dx-list-item,
        .dx-list-item .dx-icon {
            color: #fff !important;
            border: 0;
        }

        .dx-list-item-icon-container {
            margin-right: 10px !important;
            margin-left: 8px !important;
        }

    </style>

    <script>
        $(function () {

            function getContainerHeight() {
                return $(window).height() - $('#toolbar-container').dxToolbar('instance').option('height');
            }

            $(window).resize(function () {
                $('#drawer-container').dxDrawer('instance').option('height', getContainerHeight());
            });

            $('#toolbar-container').dxToolbar({
                height: 60,
                items: [{
                    widget: 'dxButton',
                    location: 'before',

                    options: {
                        border: false,
                        icon: 'menu',
                        onClick: function () {
                            drawer.toggle();
                        }
                    }
                },
                {
                    location: 'center',
                    locateInMenu: 'never',
                    template: function () {
                        return $('<div class="toolbar-label"</div>');
                    }
                }
                ]

            }).dxToolbar('instance');

            let drawer = $('#drawer-container').dxDrawer({
                opened: false,
                height: getContainerHeight(),
                minSize: 55,
                // revealMode: 'shrink',
                openedStateMode: 'push',
                template: function (e) {
                    const list = $('<div/>').dxList({
                        items: [{
                            id: 1,
                            text: 'Inbox',
                            icon: 'message',
                            path: 'inbox',
                        },
                        {
                            id: 2,
                            text: 'Sent Mail',
                            icon: 'check',
                            path: 'sent-mail'
                        },
                        {
                            id: 3,
                            text: 'Trash',
                            icon: 'trash',
                            path: 'trash'
                        },
                        {
                            id: 4,
                            text: 'Spam',
                            icon: 'mention',
                            path: 'spam'
                        }
                        ],
                        width: 200,
                        selectionMode: 'single',
                        onSelectionChanged: function (e) {
                            $('#view').load('./pages/' + e.addedItems[0].path + '.html');
                        }
                    });
                    return list;
                }
            }).dxDrawer('instance');

            $('#tab-container').dxTabPanel(
                {
                    height: '100%',
                    items: [
                        {
                            title: 'Employee',
                            icon: 'floppy',
                            template: function (itemData, itemIndex, element) {
                                $('<div style="padding: 10px">').dxDataGrid(
                                    {
                                        columns: [
                                            {
                                                caption: 'Nummer',
                                                dataField: 'ident',
                                                width: 100
                                            },
                                            {
                                                caption: 'Name 1',
                                                dataField: 'name_1',
                                            },
                                            {
                                                caption: 'Name 2',
                                                dataField: 'name_2',
                                                width: 180
                                            },
                                            {
                                                caption: 'Straße',
                                                dataField: 'street',
                                                width: 180

                                            },
                                            {
                                                caption: 'PLZ',
                                                dataField: 'zip',
                                                width: 100
                                            },
                                            {
                                                caption: 'Ort',
                                                dataField: 'city',
                                                width: 180

                                            }
                                        ],

                                    }
                                ).appendTo(element);
                            }

                        },
                        {
                            title: 'Notes',
                            icon: 'comment',

                        },
                        {
                            title: 'Role',
                            icon: 'isnotblank',
                            badge: 'new',
                        }
                    ]
                }).dxTabPanel('instance');

        });

    </script>


</head>

<body class="dx-viewport">
    <div id="toolbar-container"></div>
    <div id="drawer-container" class="drawer-container">
        <div id="tab-container"></div>
    </div>
</body>

</html>
