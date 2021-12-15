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
            background-color: #27313D;
            padding: 5px 10px;
        }

        .dx-button {
            border: 0;
            background-color: transparent;
        }

        .toolbar-label,
        .toolbar-label>b {
            font-size: 20px;
        }

        .drawer-container {
            background-color: #0a4d85;
        }

        .dx-list-item,
        .dx-list-item .dx-icon {
            color: #fff !important;
            border: 0;
            font-size: 18px;
        }

        .dx-list-item-icon-container {
            margin-right: 10px !important;
            margin-left: 8px !important;
        }

        .dx-data-row.dx-state-hover:not(.dx-selection):not(.dx-row-inserted):not(.dx-row-removed):not(.dx-edit-row)>td:not(.dx-focused) {
            background-color: #6f8aa5;
            color: #333;
        }

        .dx-data-row.dx-state-hover:not(.dx-selection):not(.dx-row-inserted):not(.dx-row-removed):not(.dx-edit-row)>td:not(.dx-focused).dx-datagrid-group-space {
            border-right-color: #6f8aa5;
        }

        .dx-data-row.dx-state-hover:not(.dx-selection):not(.dx-row-inserted):not(.dx-row-removed):not(.dx-edit-row)>.dx-datagrid-readonly .dx-texteditor .dx-texteditor-input {
            background-color: #6f8aa5;
            color: #333;
        }

        .grid-container {
            height: 100%
        }
    </style>

    <script>
        $(function () {

            function isNotEmpty(value) {
                return value !== undefined && value !== null && value !== "";
            }

            let SERVICE_URL = 'http://halvar/api/tecd/customers';

            let customerStore = new DevExpress.data.CustomStore({

                load: function (loadOptions) {
                    let deferred = $.Deferred(),
                        args = {};
                    [
                        "skip",
                        "take",
                        "requireTotalCount",
                        "requireGroupCount",
                        "sort",
                        "filter",
                        "totalSummary",
                        "group",
                        "groupSummary"
                    ].forEach(function (i) {
                        if (i in loadOptions && isNotEmpty(loadOptions[i]))
                            args[i] = JSON.stringify(loadOptions[i]);
                    });
                    $.ajax({
                        url: SERVICE_URL,
                        dataType: "json",
                        data: args,
                        success: function (result) {
                            deferred.resolve(result.data, {
                                totalCount: result.totalCount,
                                summary: result.summary,
                                groupCount: result.groupCount
                            });
                        },
                        error: function () {
                            deferred.reject("Data Loading Error");
                        },
                        timeout: 5000
                    });

                    return deferred.promise();
                },

                byKey: function (key) {
                    return $.getJSON(SERVICE_URL + "/" + encodeURIComponent(key));
                },

                insert: function (values) {
                    return $.post(SERVICE_URL, values);
                },

                update: function (key, values) {
                    return $.ajax({
                        url: SERVICE_URL + "/" + encodeURIComponent(key),
                        method: "PUT",
                        data: values
                    });
                },

                remove: function (key) {
                    return $.ajax({
                        url: SERVICE_URL + "/" + encodeURIComponent(key),
                        method: "DELETE",
                    });
                },

                onBeforeSend: function (method, ajaxOptions) {
                    ajaxOptions.xhrFields = {
                        withCredentials: true
                    };
                }

            });

            let drawer = $('#drawer-container').dxDrawer({
                opened: false,
                height: function () {
                    return $(window).height() - 45;
                },
                minSize: 55,
                // revealMode: 'shrink',
                openedStateMode: 'push',
                template: function (e) {
                    const list = $("<div/>").dxList({
                        items: [{
                            id: 1,
                            text: "Inbox",
                            icon: "message",
                            path: "inbox"
                        },
                        {
                            id: 2,
                            text: "Sent Mail",
                            icon: "check",
                            path: "sent-mail"
                        },
                        {
                            id: 3,
                            text: "Trash",
                            icon: "trash",
                            path: "trash"
                        },
                        {
                            id: 4,
                            text: "Spam",
                            icon: "mention",
                            path: "spam"
                        }
                        ],
                        width: 200,
                        selectionMode: "single",
                        onSelectionChanged: function (e) {
                            $("#view").load("./pages/" + e.addedItems[0].path + ".html");
                        }
                    });
                    return list;
                }
            }).dxDrawer("instance");

            $('#toolbar-container').dxToolbar({
                height: 45,
                items: [{
                    widget: "dxButton",
                    location: "before",

                    options: {
                        border: false,
                        icon: "menu",
                        onClick: function () {
                            drawer.toggle();
                        }
                    }
                },
                {
                    location: 'center',
                    locateInMenu: 'never',
                    template: function () {
                        return $("<div class='toolbar-label'><b>Tom's Club</b> Products</div>");
                    }
                }
                ]

            }).dxToolbar('instance');

            $('#grid-container').dxDataGrid({
                selection: {
                    mode: "single"
                },
                showBorders: false,
                dataSource: customerStore,
                allowColumnResizing: true,
                allowColumnReordering: true,
                filterRow: {
                    visible: true
                },
                autoFit: true,
                columnAutoWidth: true,
                columnChooser: {
                    enabled: true
                },
                columnFixing: {
                    enabled: true
                },
                // searchPanel: {visible: true},
                filterPanel: {
                    visible: true
                },
                remoteOperations: {
                    paging: true,
                    filtering: true,
                    sorting: true
                },
                scrolling: {
                    // mode: 'infinite',
                    // rowRenderingMode: 'virtual'
                },
                paging: {
                    pageSize: 60
                },
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

                onRowDblClick: function (e) {
                    $("<div>").dxPopup({
                        title: 'vvvvv',
                        width: 500,
                        height: 500,
                        resizeEnabled: true,
                        visible: true,
                        closeOnOutsideClick: true
                    }).show();

                    const popup = $("<div>").dxPopup("instance");
                }
            }).dxDataGrid('instance');
        });

        $(window).resize(function () {
            $("#drawer-container").dxDrawer("instance").option("height", (($(window).height()) - 45));
        });
    </script>


</head>

<body class="dx-viewport">
    <div id="toolbar-container"></div>
    <div id="drawer-container" class="drawer-container">
        <div id="grid-container" class="grid-container"></div>
    </div>
    <div id="popup"></div>
</body>

</html>
