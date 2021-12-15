/**
 * Created by kko on 2019-07-10.
 */
Ext.define('MyApp.view.tm.item.ItemGrid', {
    extend: 'MyApp.view.abstract.AbstractGrid',

    requires: [
        'Ext.grid.column.Column',
        'MyApp.view.tm.item.ItemGridController',
        'MyApp.view.tm.item.ItemGridModel'
    ],

    xtype: 'tmItemGrid',

    viewModel: {
        type: 'tmItemGrid'
    },

    controller: 'tmItemGrid',

    stateId: 'tmItemGrid',

    editClass: 'MyApp.view.tm.item.ItemEdit',
    editPostId: 'TMItem',
    modelClass: 'MyApp.model.tm.TMItem',

    initComponent: function (config) {
        let me = this;

        Ext.apply(me, config || {

            columns: [
                {
                    xtype: 'gridcolumn',
                    text: 'Artikel',
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
                    text: 'Beschreibung',
                    dataIndex: 'description',
                    stateId: 'description',
                    minWidth: 180,
                    flex: 1,
                    filterType: {
                        type: 'string',
                        operator: 'like'
                    },
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Artikelgruppe',
                    dataIndex: 'item_group_ident',
                    stateId: 'item_group_ident',
                    width: 100,
                    flex: 1,
                    filterType: {
                        type: 'string',
                        operator: 'like'
                    },
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Artikelgruppenname',
                    dataIndex: 'item_group_name',
                    stateId: 'item_group_name',
                    width: 100,
                    flex: 1,
                    filterType: {
                        type: 'string',
                        operator: 'like'
                    },
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Hersteller Artikelnummer',
                    dataIndex: 'manufacturer_item_ident',
                    stateId: 'manufacturer_item_ident',
                    width: 100,
                    flex: 1,
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
