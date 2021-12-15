/**
 * Created by kko on 2019-07-10.
 */
Ext.define('MyApp.view.tm.stock.StockGrid', {
    extend: 'MyApp.view.abstract.AbstractGrid',

    requires: [
        'Ext.grid.column.Column',
        'MyApp.view.tm.stock.StockGridController',
        'MyApp.view.tm.stock.StockGridModel'
    ],

    xtype: 'tmStockGrid',

    viewModel: {
        type: 'tmStockGrid'
    },

    controller: 'tmStockGrid',

    stateId: 'tmStockGrid',

    editClass: 'MyApp.view.tm.stock.StockEdit',
    editPostId: 'TMStock',
    modelClass: 'MyApp.model.tm.TMStock',

    initComponent: function (config) {
        let me = this;

        Ext.apply(me, config || {

            columns: [
                {
                    xtype: 'gridcolumn',
                    text: 'Kennung',
                    dataIndex: 'ident',
                    stateId: 'ident',
                    width: 120,
                    filterType: {
                        type: 'string',
                        operator: 'like'
                    },
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Bezeichnung',
                    dataIndex: 'term',
                    stateId: 'term',
                    minWidth: 180,
                    flex: 1,
                    filterType: {
                        type: 'string',
                        operator: 'like'
                    },
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Gebäude',
                    dataIndex: 'building_ident',
                    stateId: 'building_ident',
                    width: 180,
                    filterType: {
                        type: 'string',
                        operator: 'like'
                    },
                }
            ]
        });

        me.callParent(arguments);
    }
});
