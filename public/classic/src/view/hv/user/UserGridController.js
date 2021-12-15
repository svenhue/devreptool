/**
 * Created by kko on 2019-07-10.
 */
Ext.define('MyApp.view.hv.user.UserGridController', {
    extend: 'MyApp.view.abstract.AbstractGridController',
    alias: 'controller.hvUserGrid',

    /**
     * Called when the view is created
     */
    init: function () {

    },

    /**
     * @param {Ext.button.Button} component
     * @param {Event} e
     */
    onDeleteBtnClick: function (component, e) {
        let me = this,
            view = me.getView(),
            record = view.getSelection()[0];

        if (MyApp.userId === record.get('id')) {
            Ext.showError('Sie können sich nicht selbst löschen!');
            return;
        }
        me.callParent(arguments);

    }
});