/**
 * A column displaying the earliest possible start date of a task.
 * This value is calculated based on earliest end dates of task's incoming dependencies.
 * If a task has no incoming dependencies then its start date is taken as earliest start date.
 *
 * ```javascript
 *     var gantt = Ext.create('Gnt.panel.Gantt', {
 *         height      : 600,
 *         width       : 1000,
 *
 *         columns         : [
 *             ...
 *             {
 *                 xtype       : 'earlystartdatecolumn',
 *                 width       : 80
 *             }
 *             ...
 *         ],
 *         ...
 *     });
 * ```
 *
 * **Note**, that this class inherits from Ext.grid.column.Date and supports its configuration options, notably the "format".
 */
Ext.define('Gnt.column.EarlyStartDate', {
    extend              : 'Ext.grid.column.Date',

    mixins              : ['Gnt.mixin.Localizable'],

    requires            : ['Ext.util.Format'],

    alias               : [
        'widget.earlystartdatecolumn',
        'widget.ganttcolumn.earlystartdate'
    ],

    isEarlyStartDateColumn : true,

    /**
     * @cfg {Number} width The width of the column.
     */
    width               : 100,

    /**
     * @cfg {String} align The alignment of the text in the column.
     */
    align               : 'left',

    /**
     * @cfg {Boolean} adjustMilestones
     * If `true`, the start/end dates of the milestones will be adjusted -1 day *during rendering and editing*.
     * The task model will still hold the raw unmodified date.
     *
     * **Note:** No adjustments will be applied if {@link Gnt.panel.Gantt#disableDateAdjustments} is set to `true`.
     */
    adjustMilestones    : true,

    earlyStartDateFnOptions : null,

    constructor : function (config) {
        config        = config || {};

        this.text     = config.text || this.L('text');

        this.callParent(arguments);

        this.renderer = config.renderer || this.rendererFunc;
        this.scope    = config.scope || this;

        this.hasCustomRenderer = true;
    },

    afterRender : function() {
        var panel = this.up('ganttpanel');

        // Make top Gantt panel aware of the need for refreshing locked grid after changes in the dependency store
        panel.registerLockedDependencyListeners();

        this.callParent(arguments);
    },

    rendererFunc : function (value, meta, task) {
        var me     = this,
            result = '';

        meta.tdCls = (meta.tdCls || '') + ' sch-column-readonly';

        var store                  = task.getTaskStore(true),
            isUndoingOrRedoing     = store && store.isUndoingOrRedoing();

        // if Undo/Redo operations are in progress it makes no sense to render since anyway ..early/late dates will be reset on completion
        if (!isUndoingOrRedoing) {
            var date = task.getEarlyStartDate(me.earlyStartDateFnOptions);

            if (store && store.disableDateAdjustments) {
                result = Ext.util.Format.date(date, me.format);
            } else {
                result = task.getDisplayStartDate(me.format, me.adjustMilestones, date);
            }
        }

        return result;
    }
});
