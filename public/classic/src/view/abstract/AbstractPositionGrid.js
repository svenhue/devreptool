/**
 * Created by kko on 21.11.20.
 */
Ext.define('MyApp.view.abstract.AbstractPositionGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.positiongrid',

    requires: [
        'Ext.button.Button',
        'Ext.grid.plugin.RowEditing',
        'MyApp.view.abstract.AbstractPositionGridController',
        'MyApp.view.abstract.AbstractPositionGridModel'
    ],

    /*
    Uncomment to give this component an xtype
    xtype: 'abstractpositiongrid',
    */

    askBeforeDelete: false,

    modelClass: null,

    autoSync: false,

    entityName: '',

    viewModel: {
        type: 'abstractpositiongrid'
    },

    controller: 'abstractpositiongrid',


    dockedItems: [
        {
            xtype: 'toolbar',
            items: [
                {
                    xtype: 'button',
                    text: 'Neu',
                    iconCls: 'far fa-file',
                    listeners: {
                        click: 'onNewBtnClick'
                    }
                },
                {
                    xtype: 'button',
                    text: 'Löschen',
                    iconCls: 'far fa-trash-alt',
                    bind: {
                        disabled: '{noSelection}'
                    },
                    disabled: true,
                    listeners: {
                        click: 'onDeleteBtnClick'
                    }
                }
            ]
        },
        // {
        //     xtype: 'pagingtoolbar',
        //     dock: 'bottom',
        //     displayInfo: true
        // }
    ],

    plugins: [
        {
            ptype: 'rowediting',
            clicksToEdit: 1,
            // autoCancel: true,
            errorSummary: false,
            listeners: {
                cancelEdit: 'onCancelEdit',
                edit: 'onCompleteEdit'
            }
        }
    ],

    listeners: {
        itemdblclick: 'onItemDblClick',
        select: 'onItemSelect',
        afterrender: 'onAfterRender'
    }

});
