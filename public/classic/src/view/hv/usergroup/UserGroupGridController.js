/**
 * Created by kko on 2019-07-10.
 */
Ext.define('MyApp.view.hv.usergroup.UserGroupGridController', {
    extend: 'MyApp.view.abstract.AbstractGridController',
    alias: 'controller.hvUserGroupGrid',

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
        if (MyApp.userGroupId === record.get('id')) {
            Ext.showError('Sie können nicht die Benutzergruppe löschen, der Sie selbst zugeordnet sind!');
            return;
        }
        me.callParent(arguments);

    }
});