/**
 * Created by kko on 2019-07-10.
 */
Ext.define('MyApp.view.tm.building.BuildingGrid', {
    extend: 'MyApp.view.abstract.AbstractGrid',

    requires: [
        'Ext.grid.column.Column',
        'MyApp.view.tm.building.BuildingGridController',
        'MyApp.view.tm.building.BuildingGridModel'
    ],

    xtype: 'tmBuildingGrid',

    viewModel: {
        type: 'tmBuildingGrid'
    },

    controller: 'tmBuildingGrid',

    stateId: 'tmBuildingGrid',

    editClass: 'MyApp.view.tm.building.BuildingEdit',
    editPostId: 'TMBuilding',
    modelClass: 'MyApp.model.tm.TMBuilding',

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
                    text: 'Ort',
                    dataIndex: 'city',
                    stateId: 'city',
                    minWidth: 120,
                    flex: 1,
                    filterType: {
                        type: 'string',
                        operator: 'like'
                    },
                },
            ]
        });

        me.callParent(arguments);
    }
});
