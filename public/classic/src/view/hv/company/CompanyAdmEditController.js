/**
 * Created by kko on 2019-08-10.
 */
Ext.define('MyApp.view.hv.company.CompanyAdmEditController', {
    extend: 'MyApp.view.abstract.AbstractEditController',
    alias: 'controller.hvCompanyAdmEdit',

    /**
     * Called when the view is created
     */
    init: function () {

    },

    /**
     * @param {Ext.data.TreeModel} node
     * @param {Boolean} checked
     * @param {Ext.event.Event} e
     */
    onMenuCheckChange: function (node, checked, e, eOpts) {
        let me = this;

        me.getViewModel().set('menuChanged', true);

        node.cascadeBy(function (n) {
            n.set('checked', checked);
        });

        if (checked) {
            if (node.parentNode) {
                node.parentNode.set('checked', checked);
            }
        }
    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onSaveBtnClick: function (component, e) {
        let me = this,
            currentRecord = me.getViewModel().get('currentRecord'),
            menuStore = me.getStore('MenuStore'),
            menuConfig = [];

        menuStore.each(function (node, index, all) {
            if (node.get('checked'))
                menuConfig.push({
                    id: node.get('id'),
                    checked: node.get('checked')
                });
        });

        currentRecord.set('menu_config', menuConfig);

        me.callParent(arguments);
    },

    /**
     * @param {Ext.Component} component
     */
    onAfterRender: function (component) {
        let me = this,
            store = me.getStore('MenuStore'),
            viewModel = me.getViewModel(),
            currentRecord = viewModel.get('currentRecord');

        store.getProxy().setUrl('/api/hv/companies/menu/' + (currentRecord.phantom ? 0 : currentRecord.get('id')));
        store.load();

    }
});