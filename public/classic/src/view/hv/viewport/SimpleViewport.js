/**
 * Created by kko on 2019-06-30.
 */
Ext.define('MyApp.view.hv.viewport.SimpleViewport', {
    extend: 'Ext.container.Viewport',

    requires: [
        'Ext.layout.container.Card',
        'Ext.layout.container.Fit',
        'Ext.panel.Panel',
        'Ext.state.Manager',
        'MyApp.view.hv.ViewportModel',
        'MyApp.view.hv.viewport.SimpleViewportController'
    ],

    /*
    Uncomment to give this component an xtype
    xtype: 'hvSimpleViewport',
    */

    viewModel: {
        type: 'hvViewport'
    },

    ex: false,

    controller: 'hvSimpleViewport',

    layout: 'fit',

    items: [
        {
            xtype: 'panel',
            reference: 'modulePanel',

            layout:'card',

            removeView: function (id) {
                let view = Ext.getCmp(id);
                if (view) {
                    this.remove(view);
                }
            },

            viewExists: function (id) {
                let view = Ext.getCmp(id);
                if (view) {
                    this.setActiveItem(view);
                    return view;
                } else return false;
            },

            addView: function (view, index) {
                if (index || index === 0)
                    this.insert(index, view);
                else
                    this.add(view);
                return this.setActiveItem(view);
            },

            addViewById: function (id, index, params) {
                let me = this,
                    store = MyApp.mainView.getController().getStore('NavigationStore'),
                    view = me.viewExists(id),
                    record = store.getNodeById(id);

                if (record) {
                    if (!view) {

                        if (!params) params = {};

                        params.id = id;
                        params.title = record.get('text');
                        params.iconCls = record.get('iconCls');
                        params.closable = record.get('closable');

                        view = Ext.create(record.get('moduleClass'), params);

                        if (index || index === 0)
                            this.insert(index, view);
                        else
                            this.add(view);
                        this.setActiveItem(view);
                    }
                }
                return view;
            },

            resetView: function (view) {
                let me = this,
                    id = view.getId(),
                    title = view.getTitle(),
                    iconCls = view.getIconCls(),
                    closable = view.getClosable(),
                    className = view.$className,
                    pos = me.items.indexOf(view),
                    cp = Ext.state.Manager.getProvider();

                cp.delay = 0;
                cp.set(view.getXType(), '');
                cp.delay = 750;

                this.remove(view, true);

                Ext.defer(function () {

                    let module = Ext.create(className, {
                        id: id,
                        title: title,
                        iconCls: iconCls,
                        closable: closable
                    });

                    me.addView(module, pos);
                }, 500);
            },
            listeners: {
                remove: 'onViewRemoved'
            }
        }
    ],
    listeners: {
        afterrender: 'onAfterRender'
    }
});
