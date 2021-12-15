<!DOCTYPE html>
<html>
<head>
    <title>Kendo Test</title>
    <meta charset="utf-8">
    <style>html { font-size: 14px; font-family: Arial, Helvetica, sans-serif; }</style>
    <link href="/kendoui/styles/kendo.common.min.css" rel="stylesheet">
    <link href="/kendoui/styles/kendo.default.min.css" rel="stylesheet">
    <script src="/kendoui/js/jquery.min.js"></script>
    <script src="/kendoui/js/kendo.all.min.js"></script>
    <style>


        html,
        body,
        #parent,
        #grid {
            margin: 0;
            padding: 0;
            border-width: 0;
            height: 100%; /* DO NOT USE !important for setting the Grid height! */
        }

        html {
            overflow: hidden;
            font: 13px sans-serif;
        }

        .k-grid td {
            white-space: nowrap;
        }
    </style>
</head>
<body>
<div id="parent">
    <div id="grid"></div>
</div>
<script>
    $(document).ready(function () {

        kendo.culture("de-DE");

        let gridElement = $("#grid");

        function resizeGrid() {
            gridElement.data("kendoGrid").resize();
        }

        $(window).resize(function () {
            resizeGrid();
        });

        gridElement.kendoGrid({
            dataSource: {
                transport: {
                    read: "api/customers"
                },
                pageSize: 60,
                serverPaging: true,
                serverFiltering: true,
                schema: {
                    data: "data",
                    total: 'total',
                    model: {
                        fields: {
                            id: 'id',
                            name_1: {
                                type: 'string'
                            },
                            name_2: {
                                type: 'string'
                            },
                            street: {
                                type: 'string'
                            },
                            is_test: {
                                type: 'boolean'
                            },

                            created_at: {
                                type: 'date',
                            }
                        }

                    }
                },

            },
            groupable: true,
            sortable: true,
            resizable: true,
            height: '100%',

            pageable: {
                refresh: true,
                buttonCount: 5
            },

            mobile: true,

            // pageable: {
            //     numeric: false,
            //     previousNext: false,
            //     messages: {
            //         display: "Showing {2} data items"
            //     }
            // },
            // scrollable: {
            //     endless: true
            // },

            filterable: {
                mode: "row"
            },

            editable: {
                mode: 'popup',
            },

            toolbar: ["create", 'pdf', 'excel', 'search',],
            search: {
                fields: ["name_1"]
            },
            dddd: {},
            reorderable: true,
            columns: [
                {
                    field: "name_1",
                    title: "Name 1",
                    sticky: true,
                    minResizableWidth: 200,
                    filterable: {
                        cell: {
                            operator: "contains",
                            template: function (args) {
                                args.element.css("width", "100%").addClass("k-textbox").attr("data-value-update", "input");
                            },
                            showOperators: true
                        }
                    }

                },
                {
                    field: "name_2",
                    title: "Name 2"
                },
                {
                    field: "street",
                    title: "Strasse"
                },
                // {
                //     field: "is_test",
                //     title: "Test"
                // },

                {
                    field: "created_at",
                    title: "Erzeugt",
                    culture: "de-DE",
                    locale: "de-DE",
                    format: "{0: dd.MM.yyyy HH:mm:s}"
                },
                {
                    title: 'Edit',
                    command: [
                        {
                            name: "xyz", title: 'Edit',click: function(e) {
                                e.preventDefault();
                                let record = this.dataItem($(e.currentTarget).closest("tr"));
                                console.log(record);
                            }
                        }
                    ]
                }
            ]
        });
        gridElement.on("click", function (e) {
            e.preventDefault();
            gridElement.data("kendoGrid").editRow($("#grid tr:eq(1)"));
        });
    });

</script>
</body>
</html>
