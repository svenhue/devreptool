// https://app.assembla.com/spaces/bryntum/tickets/4216
// #4216 - Gantt doesn't work under FF52 on windows
Ext.define('Kanban.patch.EXTJS_23846', {
    extend: 'Sch.util.Patch',
    requires: [
        'Ext.dom.Element',
        'Ext.event.publisher.Gesture'
    ],
    target: [
        'Ext.dom.Element',
        'Ext.event.publisher.Gesture'
    ],
    maxVersion: '6.2.2',
    applyFn: function() {
        if (Ext.firefoxVersion < 51)  {
            return;
        }
        
        if (!Ext.ClassManager.isCreated('EXTJS_23846.Element')) {
            Ext.define('EXTJS_23846.Element', {
                override: 'Ext.dom.Element'
            }, function(Element) {
                var supports = Ext.supports,
                    proto = Element.prototype,
                    eventMap = proto.eventMap,
                    additiveEvents = proto.additiveEvents;
                if (Ext.os.is.Desktop && supports.TouchEvents && !supports.PointerEvents) {
                    eventMap.touchstart = 'mousedown';
                    eventMap.touchmove = 'mousemove';
                    eventMap.touchend = 'mouseup';
                    eventMap.touchcancel = 'mouseup';
                    additiveEvents.mousedown = 'mousedown';
                    additiveEvents.mousemove = 'mousemove';
                    additiveEvents.mouseup = 'mouseup';
                    additiveEvents.touchstart = 'touchstart';
                    additiveEvents.touchmove = 'touchmove';
                    additiveEvents.touchend = 'touchend';
                    additiveEvents.touchcancel = 'touchcancel';
                    additiveEvents.pointerdown = 'mousedown';
                    additiveEvents.pointermove = 'mousemove';
                    additiveEvents.pointerup = 'mouseup';
                    additiveEvents.pointercancel = 'mouseup';
                }
            });
        }
        if (!Ext.ClassManager.isCreated('EXTJS_23846.Gesture')) {
            Ext.define('EXTJS_23846.Gesture', {
                override: 'Ext.event.publisher.Gesture'
            }, function(Gesture) {
                var me = Gesture.instance;
                if (Ext.supports.TouchEvents && !Ext.isWebKit && Ext.os.is.Desktop) {
                    me.handledDomEvents.push('mousedown', 'mousemove', 'mouseup');
                    me.registerEvents();
                }
            });
        }
    }
});

/**
 * @class Kanban.model.Resource
 *
 * A data model class describing a resource in your Kanban board that can be assigned to any {@link Kanban.model.Task}.
 */
Ext.define('Kanban.model.Resource', {
    extend: 'Sch.model.Resource',
    alias: 'model.kanban_resourcemodel',
    customizableFields: [
        /**
         * @field ImageUrl
         * @type {String}
         * The url of an image representing the resource
         */
        {
            name: 'ImageUrl'
        }
    ],
    /**
     * @cfg {String} imageUrlField The name of the field that defines the user image url. Defaults to "ImageUrl".
     */
    imageUrlField: 'ImageUrl'
});

/**

@class Kanban.data.ResourceStore
@extends Sch.data.ResourceStore

A data store class containing {@link Kanban.model.Resource user records}. Sample usage below:

    var resourceStore = new Kanban.data.ResourceStore({
        sorters : 'Name',

        data    : [
            { Id : 1, Name : 'Dave' }
        ]
    });


You can of course also subclass this class like you would with any other Ext JS class and provide your own custom behavior.
*/
Ext.define('Kanban.data.ResourceStore', {
    extend: 'Sch.data.ResourceStore',
    model: 'Kanban.model.Resource',
    sorters: 'Name',
    proxy: undefined,
    alias: 'store.kanban_resourcestore'
});

/**
 * @class Kanban.model.Task
 *
 * A data model class describing a task in your Kanban board. You can assign it to a resource using the {@link #assign} method or by
 * setting the 'ResourceId' property directly in the data (using {@link #setResourceId} or {@link setResource}).
 *
 * You can of course also subclass this class like you would with any other Ext JS class and add your own custom fields.
 *
 * ```javascript
 *     Ext.define('MyTask', {
 *         extend : 'Kanban.model.Task',
 *
 *         fields : [
 *             { name : 'NbrComments', type : 'int' },
 *             { name : 'Attachments', type : 'int' }
 *         ],
 *
 *         // Define the states your tasks can be in
 *         states            : [
 *             'NotStarted',
 *             'InProgress',
 *             'Test',
 *             'Acceptance',
 *             'Done'
 *         ],
 *
 *         // Here you can control which state transitions are allowed
 *         isValidTransition : function (state) {
 *             return true;
 *         }
 *     })
 * ```
 */
Ext.define('Kanban.model.Task', {
    extend: 'Sch.model.Event',
    alias: 'model.kanban_taskmodel',
    resourceStore: null,
    /**
     * @cfg {String[]} states The names of the possible states that a task can be in. Default states are ["NotStarted", "InProgress", "Test", "Done"].
     */
    states: [
        'NotStarted',
        'InProgress',
        'Test',
        'Done'
    ],
    customizableFields: [
        /**
         * @field State
         * @type {String}
         * The state of the the task, should be one of the values listed in the {@link #states} array.
         */
        {
            name: 'State',
            defaultValue: 'NotStarted'
        },
        /**
         * @field Position
         * @type {Number}
         * The order/position of the tasks in each state column.
         */
        {
            name: 'Position',
            type: 'int'
        },
        /**
         * @field CreatedDate
         * @type {Date}
         * The date when the task was created.
         */
        {
            name: 'CreatedDate',
            type: 'date'
        },
        /**
         * @field ImageUrl
         * @type {String}
         * The url of an image to be shown in the task element
         */
        {
            name: 'ImageUrl'
        }
    ],
    constructor: function() {
        this.callParent(arguments);
        if (this.phantom && !this.getCreatedDate()) {
            this.setCreatedDate(new Date());
        }
    },
    /**
     * @cfg {String} stateField The name of the field that defines the task state. Defaults to "State".
     */
    stateField: 'State',
    /**
     * @cfg {String} imageUrlField The name of the field that defines the task image url. Defaults to "ImageUrl".
     */
    imageUrlField: 'ImageUrl',
    /**
     * @cfg {String} createdDateField The name of the field that defines the task state. Defaults to "CreatedDate".
     */
    createdDateField: 'CreatedDate',
    /**
     * @cfg {String} positionField The name of the field that defines the task order. Defaults to "Position".
     */
    positionField: 'Position',
    /**
     * @method getResource
     *
     * Returns the resource that is assigned to this task.
     * @return {Kanban.model.Resource} The resource
     */
    /**
     * @method setResource
     *
     * Assigns a new resource to this task.
     * @param {Kanban.model.Resource} resource The resource
     */
    /**
     * @method getPosition
     *
     * Returns the position of this task within it's current {@link Kanban.view.TaskView view}.
     * @return {Number} The position
     */
    /**
     * @method setPosition
     *
     * Sets the position of this task within it's current {@link Kanban.view.TaskView view}.
     * @param {Number} The position
     */
    /**
     * @method setResource
     *
     * Sets the new position of this task within it's current {@link Kanban.view.TaskView view}.
     * @param {Number} The new position
     */
    /**
     * @method getState
     *
     * Returns the state identifier of this task
     * @return {String} The state
     */
    /**
     * @method setState
     *
     * Sets the state identifier of this task
     * @param {String} The state
     */
    /**
     * @method getCreatedDate
     *
     * Returns the created date for this task
     * @return {Date} The created date
     */
    /**
     * @method setCreatedDate
     *
     * Sets the created date for this task
     * @param {Date} The created date
     */
    /**
     * @method getImageUrl
     *
     * Returns the image URL for this task
     * @return {String} The created date
     */
    /**
     * @method setImageUrl
     *
     * Sets the image URL for this task
     * @param {String} The created date
     */
    /**
     * Returns the associated user store of this task.
     *
     * @return {Kanban.data.ResourceStore} The user store
     */
    getResourceStore: function() {
        if (!this.resourceStore) {
            Ext.Array.each(this.joined, function(store) {
                if (store.resourceStore) {
                    this.resourceStore = store.resourceStore;
                    return false;
                }
            }, this);
        }
        return this.resourceStore;
    },
    /**
     * @method isValidTransition
     *
     * Override this method to define which states are valid based on the current task state. If you want to allow all,
     * simply create a method which always returns true.
     *
     * @param {String} toState The new state of this task
     * @return {Boolean} true if valid
     */
    isValidTransition: function(toState) {
        var currentState = this.getState();
        // Always allow reordering in same column
        if (currentState === toState)  {
            return true;
        }
        
        switch (this.getState()) {
            case "NotStarted":
                return toState == "InProgress";
            case "InProgress":
                return toState != "Done";
            case "Test":
                return toState != "NotStarted";
            case "Done":
                return toState == "Test" || toState == "InProgress";
            default:
                return true;
        }
    }
});

/**

@class Kanban.data.TaskStore
@extends Sch.data.EventStore

A data store class containing {@link Kanban.model.Task task records}. Sample usage below:

    var taskStore = new Kanban.data.TaskStore({
        sorters : 'Name',
        data    : [
            { Id : 1, Name : 'Dig hole', State : 'NotStarted'}
        ]
    });


You can of course also subclass this class like you would with any other Ext JS class and provide your own custom behavior.
*/
Ext.define('Kanban.data.TaskStore', {
    extend: 'Sch.data.EventStore',
    model: 'Kanban.model.Task',
    proxy: undefined,
    alias: 'store.kanban_taskstore',
    resourceStore: null,
    setResourceStore: function(store) {
        this.resourceStore = Ext.data.StoreManager.lookup(store);
    },
    getResourceStore: function() {
        return this.resourceStore;
    },
    constructor: function() {
        this.callParent(arguments);
        var model = this.getModel();
        this.setSorters([
            {
                property: model.prototype.positionField,
                direction: 'ASC'
            },
            {
                property: model.prototype.nameField,
                direction: 'ASC'
            }
        ]);
    }
});

Ext.define('Kanban.data.mixin.StoreView', {
    state: null,
    masterStore: null,
    getStoreListeners: function() {
        return {
            add: this.onMasterAdd,
            clear: this.onMasterClear,
            remove: this.onMasterRemove,
            update: this.onMasterUpdate,
            refresh: this.onMasterDataChanged,
            scope: this
        };
    },
    unbindFromStore: function() {
        this.masterStore.un(this.getStoreListeners());
    },
    bindToStore: function(store) {
        var listeners = this.getStoreListeners();
        if (this.masterStore) {
            this.masterStore.un(listeners);
        }
        this.masterStore = store;
        if (store) {
            store.on(listeners);
            this.copyStoreContent();
        }
    },
    onMasterAdd: function(store, records) {
        for (var i = 0; i < records.length; i++) {
            if (records[i].getState() === this.state) {
                this.add(records[i]);
            }
        }
    },
    onMasterClear: function() {
        this.removeAll();
    },
    onMasterUpdate: function(store, record, operation, modifiedFieldNames) {
        if (modifiedFieldNames && Ext.Array.indexOf(modifiedFieldNames, store.model.prototype.stateField) >= 0) {
            // Insert into the new store
            if (this.state === record.getState()) {
                this.add(record);
            }
            // Remove from old state store
            if (this.state === record.previous[record.stateField]) {
                this.remove(record);
            }
        }
    },
    onMasterRemove: function(store, records) {
        Ext.Array.each(records, function(rec) {
            if (rec.getState() === this.state) {
                this.remove(rec);
            }
        }, this);
    },
    onMasterDataChanged: function(store) {
        this.copyStoreContent();
    },
    copyStoreContent: function() {
        var state = this.state;
        var data = [];
        this.masterStore.each(function(rec) {
            if (rec.getState() === state)  {
                data[data.length] = rec;
            }
            
        });
        this.suspendEvents();
        this.loadData(data);
        this.resumeEvents();
        this.sort(this.masterStore.getSorters().items);
        this.sorters.removeAll();
    }
});

// Private class
Ext.define('Kanban.data.ViewStore', {
    extend: 'Ext.data.Store',
    mixins: [
        'Kanban.data.mixin.StoreView'
    ],
    proxy: 'memory',
    masterStore: null,
    state: null,
    constructor: function(config) {
        Ext.apply(this, config);
        if (this.state === null || this.state === undefined) {
            throw 'Must supply state';
        }
        if (this.masterStore) {
            var master = this.masterStore = Ext.StoreMgr.lookup(this.masterStore);
            this.model = master.model;
        } else {
            throw 'Must supply a master store';
        }
        this.callParent(arguments);
        if (this.masterStore) {
            this.bindToStore(this.masterStore);
        }
    },
    getResourceStore: function() {
        return this.masterStore.getResourceStore();
    }
});

Ext.define('Kanban.dd.DragZone', {
    extend: 'Ext.dd.DragZone',
    mixins: {
        observable: 'Ext.util.Observable'
    },
    requires: [
        // a missing require of Ext.dd.DragDrop:
        // http://www.sencha.com/forum/showthread.php?276603-4.2.1-Ext.dd.DragDrop-missing-Ext.util.Point-in-dependency-quot-requires-quot
        'Ext.util.Point'
    ],
    panel: null,
    repairHighlight: false,
    repairHighlightColor: 'transparent',
    containerScroll: false,
    // @OVERRIDE
    autoOffset: function(x, y) {
        this.setDelta(this.dragData.offsets[0], this.dragData.offsets[1]);
    },
    setVisibilityForSourceEvents: function(show) {
        Ext.each(this.dragData.taskEls, function(el) {
            el[show ? 'removeCls' : 'addCls']('sch-hidden');
        });
    },
    constructor: function(config) {
        this.mixins.observable.constructor.call(this, config);
        this.callParent(arguments);
        this.proxy.el.child('.x-dd-drag-ghost').removeCls('x-dd-drag-ghost');
        this.proxy.addCls('sch-task-dd');
    },
    getPlaceholderElements: function(sourceEl, dragData) {
        var taskEls = dragData.taskEls;
        var copy;
        var offsetX = dragData.offsets[0];
        var offsetY = dragData.offsets[1];
        var sourceHeight = sourceEl.getHeight();
        var ctEl = Ext.core.DomHelper.createDom({
                tag: 'div',
                cls: 'sch-dd-wrap-holder'
            });
        Ext.Array.each(taskEls, function(el, i) {
            copy = el.dom.cloneNode(true);
            copy.innerHTML = '';
            copy.id = Ext.id();
            copy.boundView = el.dom.boundView;
            var fly = Ext.fly(copy);
            fly.removeCls('sch-task-selected');
            fly.addCls('sch-task-placeholder');
            ctEl.appendChild(copy);
            // Adjust each element offset to the source event element
            Ext.fly(copy).setStyle({
                width: el.getWidth() + 'px',
                height: el.getHeight() + 'px'
            });
        });
        return ctEl;
    },
    getDragData: function(e) {
        var panel = this.panel,
            t = e.getTarget(panel.taskSelector);
        if (!t || panel.isReadOnly())  {
            return;
        }
        
        var task = panel.resolveRecordByNode(t);
        if (!task || task.isDraggable() === false || this.fireEvent('beforetaskdrag', this, task, e) === false) {
            return null;
        }
        e.preventDefault();
        var xy = e.getXY(),
            taskEl = Ext.get(t),
            taskXY = taskEl.getXY(),
            offsets = [
                xy[0] - taskXY[0],
                xy[1] - taskXY[1]
            ],
            view = Ext.getCmp(taskEl.up('.sch-taskview').id),
            eventRegion = taskEl.getRegion();
        if (!view.isSelected(t) && !e.ctrlKey) {
            // Fire this so the task board can clear the selection models of other views if needed
            this.fireEvent('taskdragstarting', this, task, e);
        }
        // relatedRecords now hold all dragging tasks
        var relatedRecords = this.getDraggingRecords(task),
            taskEls = [];
        // Collect additional elements to drag
        Ext.Array.forEach(relatedRecords, function(r) {
            var el = panel.getElementForTask(r);
            if (el)  {
                taskEls.push(el);
            }
            
        });
        var dragData = {
                view: view,
                sourceZoomLevel: view.up('panel').zoomLevel,
                offsets: offsets,
                repairXY: [
                    e.getX() - offsets[0],
                    e.getY() - offsets[1]
                ],
                taskEls: taskEls,
                bodyScroll: Ext.getBody().getScroll(),
                taskRecords: relatedRecords
            };
        // index of current task in view store
        var store = view.getStore();
        var dropBeforeTask = store.getAt(store.indexOf(task) + 1);
        if (dropBeforeTask) {
            dragData.dropOptions = {
                task: dropBeforeTask,
                type: 'before'
            };
        }
        dragData.ddel = this.getDragElement(taskEl, dragData);
        dragData.placeholder = this.getPlaceholderElements(taskEl, dragData);
        // To keep the look and size of the elements in the drag proxy
        this.proxy.el.set({
            size: this.panel.getZoomLevel()
        });
        return dragData;
    },
    onStartDrag: function(x, y) {
        var dd = this.dragData;
        // insert placeholder immediately
        Ext.fly(dd.placeholder).insertBefore(dd.taskEls[0]);
        Ext.Array.forEach(dd.taskEls, function(taskEl) {
            // we have to set this value because by default it will make component invisible,
            // but other components will not take it's place
            taskEl.addCls('sch-hidden');
        });
        this.fireEvent('taskdragstart', this, dd.taskRecords);
    },
    getDraggingRecords: function(sourceEventRecord) {
        // we want to sort records by their position in view
        // in order to forbid selection order to affect position
        var records = this.getRelatedRecords(sourceEventRecord);
        // we can select few records from one column and then start drag task from another column
        // if records are from same column, then we can just sort then by position
        var store = sourceEventRecord.store;
        if (records[0] && records[0].getState() == sourceEventRecord.getState()) {
            records = Ext.Array.sort([
                sourceEventRecord
            ].concat(records), this.positionSorter);
        } else {
            records = [
                sourceEventRecord
            ].concat(Ext.Array.sort(records, this.positionSorter));
        }
        return records;
    },
    positionSorter: function(a, b) {
        var store = a.store;
        return store.indexOf(a) > store.indexOf(b) ? 1 : -1;
    },
    /**
     * Returns all selected draggable records except the original one to drag them together with the original event.
     * Provide your custom implementation of this to allow additional event records to be dragged together with the original one.
     * @protected
     * @template
     * @param {Kanban.model.Event} eventRecord The eventRecord about to be dragged
     * @return {Kanban.model.Event[]} An array of event records to drag together with the original event
     */
    getRelatedRecords: function(eventRecord) {
        var panel = this.panel;
        var selected = panel.getSelectedRecords();
        var result = [];
        Ext.each(selected, function(rec) {
            if (rec.getId() !== eventRecord.getId() && rec.isDraggable() !== false) {
                result.push(rec);
            }
        });
        return result;
    },
    /**
     * This function should return a DOM node representing the markup to be dragged. By default it just returns the selected element(s) that are to be dragged.
     * @param {Ext.Element} sourceEl The event element that is the source drag element
     * @param {Object} dragData The drag drop context object
     * @return {HTMLElement} The DOM node to drag
     */
    getDragElement: function(sourceEl, dragData) {
        var taskEls = dragData.taskEls;
        var copy;
        var offsetX = dragData.offsets[0];
        var offsetY = dragData.offsets[1];
        var sourceHeight = this.panel.getElementForTask(dragData.taskRecords[0]).getHeight();
        if (taskEls.length > 1) {
            var ctEl = Ext.core.DomHelper.createDom({
                    tag: 'div',
                    cls: 'sch-dd-wrap',
                    style: {
                        overflow: 'visible'
                    }
                });
            Ext.Array.forEach(taskEls, function(el, i) {
                copy = el.dom.cloneNode(true);
                copy.id = '';
                copy.className += i === 0 ? ' sch-dd-source' : ' sch-dd-extra';
                var parent = el.up('[size]');
                var wrapper = Ext.core.DomHelper.createDom({
                        tag: 'div',
                        size: parent.getAttribute('size')
                    }).cloneNode(true);
                // without the extra cloneNode, IE fails (most likely due to a Sencha bug in DomHelper
                wrapper.appendChild(copy);
                ctEl.appendChild(wrapper);
                // Adjust each element offset to the source event element
                Ext.fly(copy).setStyle({
                    left: (i > 0 ? 10 : 0) + 'px',
                    top: (i === 0 ? 0 : (sourceHeight - 30 + i * 20)) + 'px',
                    width: el.getWidth() + 'px',
                    height: el.getHeight() + 'px',
                    position: "absolute"
                });
            });
            return ctEl;
        } else {
            copy = sourceEl.dom.cloneNode(true);
            copy.id = '';
            copy.style.width = sourceEl.getWidth() + 'px';
            copy.style.height = sourceEl.getHeight() + 'px';
            var parent = sourceEl.up('[size]');
            var wrapper = Ext.core.DomHelper.createDom({
                    tag: 'div',
                    size: parent.getAttribute('size')
                }).cloneNode(true);
            // without the extra cloneNode, IE fails (most likely due to a Sencha bug in DomHelper
            wrapper.appendChild(copy);
            return wrapper;
        }
    },
    getRepairXY: function(e, data) {
        return data.repairXY;
    },
    afterRepair: function() {
        this.dragging = false;
    },
    // HACK: Override for IE, if you drag the task bar outside the window or iframe it crashes (missing e.target)
    onInvalidDrop: function(target, e, id) {
        if (!e) {
            e = target;
            target = e.getTarget() || document.body;
        }
        var retVal = this.callParent([
                target,
                e,
                id
            ]);
        this.fireEvent('aftertaskdrop', this, this.dragData.taskRecords);
        if (this.dragData.placeholder) {
            Ext.fly(this.dragData.placeholder).remove();
        }
        this.setVisibilityForSourceEvents(true);
        return retVal;
    }
});

Ext.define('Kanban.dd.DropZone', {
    extend: 'Ext.dd.DropZone',
    mixins: {
        observable: 'Ext.util.Observable'
    },
    constructor: function(config) {
        this.callParent(arguments);
        this.mixins.observable.constructor.call(this, config);
    },
    panel: null,
    dragData: null,
    getTargetFromEvent: function(e) {
        return e.getTarget();
    },
    validatorFn: Ext.emptyFn,
    validatorFnScope: null,
    // list of available zoom levels
    zoomLevels: [
        'large',
        'medium',
        'small',
        'mini'
    ],
    // returns true if we should insert placeholder before node
    shouldDropBeforeNode: function(xy, taskUnderCursor, dd) {
        var taskBox = Ext.fly(taskUnderCursor).getBox();
        var proxyXY = dd.proxy.getXY();
        var middle;
        if (this.dropMode === 'vertical') {
            middle = (taskBox.bottom - taskBox.top) / 2;
            if (this.direction.up) {
                return proxyXY[1] - taskBox.top < middle;
            } else {
                var taskHeight = Ext.fly(dd.dragData.placeholder.children[0]).getHeight();
                return proxyXY[1] + taskHeight - taskBox.top < middle;
            }
        } else {
            middle = (taskBox.right - taskBox.left) / 2;
            // in case we drag task over column with smaller tasks
            // we cannot rely on drag proxy size and should use cursor coordinates
            // more robust check, taking only zoom level into attention
            if (Ext.Array.indexOf(this.zoomLevels, dd.dragData.currentZoomLevel) > Ext.Array.indexOf(this.zoomLevels, dd.dragData.sourceZoomLevel)) {
                if (xy[1] < taskBox.top) {
                    return true;
                } else if (xy[1] > taskBox.bottom) {
                    return false;
                }
                return xy[0] - taskBox.left < (taskBox.right - taskBox.left) / 2;
            } else {
                // if we moved mouse out of the row limited by taskbox.top and taskbox.bottom
                // it's enough to look at vertical position to find out drop position
                if (xy[1] < taskBox.top) {
                    return true;
                } else if (xy[1] > taskBox.bottom) {
                    return false;
                }
                if (this.direction.left) {
                    return (proxyXY[0] - taskBox.left < middle);
                } else {
                    var taskWidth = Ext.fly(dd.dragData.placeholder.children[0]).getWidth();
                    return (proxyXY[0] + taskWidth - taskBox.left < middle);
                }
            }
        }
    },
    getDropMode: function(view) {
        // we need to define drop behaviour (where placeholder should appear)
        var tempNode = Ext.DomQuery.select(view.getItemSelector() + ':not(.sch-hidden)', view.el.dom)[0];
        // if panel doesn't have any elements rendered mode doesn't matter
        if (!tempNode)  {
            return 'vertical';
        }
        
        // if rendered node takes less than half available width we can assume they form rows
        if (Ext.fly(tempNode).getWidth() * 2 < view.getWidth())  {
            return 'horizontal';
        }
        
        return 'vertical';
    },
    updatePlaceholderElements: function(taskEl, dragData) {
        var copy;
        // create wrap element
        var ctEl = Ext.core.DomHelper.createDom({
                tag: 'div',
                cls: 'sch-dd-wrap-holder'
            });
        // for each task record being dragged create proper placeholder
        for (var i = 0,
            l = dragData.taskRecords.length; i < l; i++) {
            copy = taskEl.cloneNode(true);
            copy.innerHTML = '';
            // boundView is required for some extjs stuff 4
            copy.boundView = taskEl.boundView;
            copy.id = Ext.id();
            var fly = Ext.fly(copy);
            fly.removeCls('sch-task-selected');
            fly.addCls('sch-task-placeholder');
            ctEl.appendChild(copy);
            // Adjust each element offset to the source event element
            Ext.fly(copy).setStyle({
                width: taskEl.offsetWidth + 'px',
                height: taskEl.offsetHeight + 'px'
            });
        }
        return ctEl;
    },
    getSmallestTask: function(view) {
        var nodes = Ext.DomQuery.select(view.getItemSelector() + ':not(.sch-hidden)', view.el.dom);
        var smallestTask = nodes[0];
        for (var i = 0; i < nodes.length; i++) {
            smallestTask = smallestTask.offsetHeight > nodes[i].offsetHeight ? nodes[i] : smallestTask;
        }
        return smallestTask;
    },
    getNodeByCoordinate: function(xy, bodyScroll) {
        return document.elementFromPoint(xy[0] - bodyScroll.left, xy[1] - bodyScroll.top);
    },
    getTargetView: function(xy, e, data) {
        var node = this.getNodeByCoordinate(xy, data.bodyScroll);
        if (node) {
            if (!node.className.match('sch-taskview')) {
                var parent = Ext.fly(node).up('.sch-taskview');
                if (parent) {
                    node = parent.dom;
                } else {
                    node = null;
                }
            }
            if (node) {
                return Ext.getCmp(node.id);
            }
        }
        return null;
    },
    // While over a target node, return the default drop allowed class which
    // places a "tick" icon into the drag proxy.
    onNodeOver: function(target, dd, e, data) {
        var xy = e.getXY();
        this.direction = {
            left: false,
            up: false
        };
        var prevXY = this.prevXY;
        if (prevXY) {
            if (prevXY[0] > xy[0]) {
                this.direction.left = true;
            } else {}
            if (prevXY[1] > xy[1]) {
                this.direction.up = true;
            }
        }
        this.prevXY = xy;
        var proxyDom = dd.proxy.el.dom;
        var allowed = false;
        proxyDom.style.display = 'none';
        // resolve target view from mouse coordinate
        var view = this.getTargetView(xy, e, data);
        proxyDom.style.display = 'block';
        if (!view) {
            return this.dropNotAllowed;
        }
        if (view) {
            allowed = data.taskRecords[0].isValidTransition(view.state);
            if (allowed) {
                // update placeholder to match other tasks in view
                // Template for placeholder. If there is no visible task, then no need to update placeholder
                if (view != data.view) {
                    var tplEl = this.getSmallestTask(view);
                    if (tplEl) {
                        Ext.fly(data.placeholder).remove();
                        data.placeholder = this.updatePlaceholderElements(tplEl, data);
                    }
                }
                if (view != data.view || !this.dropMode) {
                    this.dropMode = this.getDropMode(view);
                    data.currentZoomLevel = view.up('panel').zoomLevel;
                }
                data.view = view;
                var placeholder = Ext.get(data.placeholder);
                // http://www.sencha.com/forum/showthread.php?294565
                // return this line when bug is fixed
                //                var nodes = view.getNodes(),
                var nodes = view.all.elements.slice(),
                    start = 0,
                    end = nodes.length - 1,
                    lastNode, index, dropBefore;
                // if we drop into column without any tasks we should skip this mess
                if (nodes.length) {
                    // using bisection we locate 2 tasks next to each other
                    while (end - start > 1) {
                        index = Math.floor((start + end) / 2);
                        lastNode = nodes[index];
                        if (Ext.fly(lastNode).isVisible()) {
                            dropBefore = this.shouldDropBeforeNode(xy, lastNode, dd);
                            if (dropBefore) {
                                end = index;
                            } else {
                                start = index;
                            }
                        } else {
                            nodes.splice(index, 1);
                            end = end - 1;
                        }
                    }
                    // if task is going to be dropped before first node - search is done
                    var firstNode = nodes[start],
                        dropBeforeFirst = this.shouldDropBeforeNode(xy, firstNode, dd);
                    if (dropBeforeFirst) {
                        lastNode = firstNode;
                        dropBefore = true;
                    } else if (Ext.fly(nodes[end]).isVisible()) {
                        // if we should drop after first node let's check if element is visible (can be hidden)
                        // and that can lead to wierd results
                        lastNode = nodes[end];
                        dropBefore = this.shouldDropBeforeNode(xy, lastNode, dd);
                    } else {
                        // both checks failed - we should drop element between nodes
                        lastNode = firstNode;
                        dropBefore = false;
                    }
                }
                if (lastNode) {
                    if (dropBefore) {
                        placeholder.insertBefore(lastNode);
                        data.dropOptions = {
                            task: view.getRecord(lastNode),
                            type: 'before'
                        };
                    } else {
                        placeholder.insertAfter(lastNode);
                        data.dropOptions = {
                            task: view.getRecord(lastNode),
                            type: 'after'
                        };
                    }
                } else {
                    view.el.appendChild(placeholder);
                    data.dropOptions = null;
                }
            }
        }
        return allowed ? this.dropAllowed : this.dropNotAllowed;
    },
    notifyDrop: function(dd, e, dragData) {
        var xy = e.getXY();
        dd.proxy.el.dom.style.display = 'none';
        // resolve target view from mouse coordinate
        var view = this.getTargetView(xy, e, dragData);
        dd.proxy.el.dom.style.display = 'block';
        var me = this,
            newState = view && view.state,
            doFinalize = true,
            valid = newState !== false && newState !== null;
        // update dragData with new state, view etc.
        dragData.newState = newState;
        dragData.view = view;
        dragData.proxy = dd.proxy;
        dragData.finalize = function() {
            me.finalize.apply(me, arguments);
        };
        valid = valid && me.validatorFn.call(me.validatorFnScope || this, dragData.taskRecords, newState) !== false;
        this.dragData = dragData;
        // Allow implementor to take control of the flow, by returning false from this listener,
        // to show a confirmation popup etc.
        doFinalize = me.fireEvent('beforetaskdropfinalize', me, dragData, e) !== false;
        if (doFinalize) {
            return me.finalize(valid);
        }
        return true;
    },
    finalize: function(updateRecords) {
        var dragData = this.dragData,
            proxy = dragData.proxy,
            recordsToMove = [];
        Ext.fly(this.getEl()).select('.sch-dd-wrap-holder').remove();
        Ext.Array.forEach(dragData.taskEls, function(taskEl) {
            taskEl.removeCls('sch-hidden');
        });
        if (updateRecords) {
            var records = dragData.taskRecords,
                positionField = records[0].positionField,
                newState = dragData.newState,
                opt = dragData.dropOptions,
                targetStore = dragData.view.getStore(),
                masterStore = targetStore.masterStore;
            masterStore.suspendAutoSync();
            // this will remove records from source store and append to target store
            Ext.Array.each(records, function(record) {
                if (record.isValidTransition(newState)) {
                    record.setState(newState);
                    recordsToMove.push(record);
                }
            });
            // perform this if drop is valid
            if (recordsToMove.length > 0) {
                // remove records from view store and add them again to required position
                targetStore.remove(recordsToMove);
                var dropIndex = opt ? (targetStore.indexOf(opt.task) + (opt.type == 'before' ? 0 : 1)) : targetStore.getCount();
                targetStore.insert(dropIndex, recordsToMove);
                // We now set the Position field for all tasks in this store to assure order is kept intact
                // after save
                for (var j = 0; j < targetStore.getCount(); j++) {
                    targetStore.getAt(j).set(positionField, j, {
                        silent: true
                    });
                }
                targetStore.sort();
            }
            masterStore.resumeAutoSync(masterStore.autoSync);
        }
        // Drag was invalid
        if (recordsToMove.length === 0) {
            proxy.el.dom.style.display = 'block';
            proxy.el.animate({
                duration: 500,
                easing: 'ease-out',
                to: {
                    x: dragData.repairXY[0],
                    y: dragData.repairXY[1]
                },
                stopAnimation: true
            });
        } else {
            // Signal that the drop was (at least partially) successful
            this.fireEvent('taskdrop', this, dragData.taskRecords);
        }
        delete this.dropMode;
        this.fireEvent('aftertaskdrop', this, dragData.taskRecords);
        if (dragData.placeholder) {
            Ext.fly(dragData.placeholder).remove();
        }
        return recordsToMove.length > 0;
    }
});

/**
 @class Kanban.editor.Base

 Internal base API for task editors
 */
Ext.define('Kanban.editor.Base', {
    /**
     * @cfg {String} triggerEvent The event that should trigger the editing to start. Set to null to disable the editor from being activated.
     */
    triggerEvent: 'taskdblclick',
    panel: null,
    selector: '.sch-task',
    editRecord: function(record, e) {
        if (this.panel.isReadOnly())  {
            return;
        }
        
        var el = this.panel.getElementForTask(record);
        if (el) {
            this.triggerEdit(record, e);
        }
    },
    triggerEdit: function(record, e) {
        throw 'Abstract method call';
    },
    init: function(panel) {
        this.panel = panel;
        if (this.triggerEvent) {
            panel.on(this.triggerEvent, function(pnl, record, node, e) {
                this.editRecord(record, e);
            }, this);
            panel.on('taskkeydown', function(taskboard, record, item, e) {
                if (e.getKey() === e.ENTER && e.getTarget().nodeName.toLowerCase() !== 'input') {
                    this.editRecord(record, e);
                }
            }, this);
        }
    }
});

/**

 @class Kanban.editor.SimpleEditor
 @extends Ext.Editor

 A textfield editor for the TaskBoard allowing you to edit the name of a task easily. By default, it reacts to the 'taskdblclick' event but you
 can configure this by using the {@link #triggerEvent} config.

 Sample usage below:

 var taskBoard = new Kanban.view.TaskBoard({
        resourceStore : resourceStore,
        taskStore     : taskStore,

        editor        : new Kanban.editor.SimpleEditor({
            dataIndex       : 'Name'
        })
    });

 */
Ext.define('Kanban.editor.SimpleEditor', {
    extend: 'Ext.Editor',
    mixins: [
        'Kanban.editor.Base'
    ],
    alias: 'widget.kanban_simpleeditor',
    alignment: 'tl',
    autoSize: {
        width: 'boundEl'
    },
    // The width will be determined by the width of the boundEl, the height from the editor (21)
    selector: '.sch-task-name',
    /**
     * @cfg {String} dataIndex The data field in your {@link Kanban.model.Task} that this being editor should be editing.
     */
    dataIndex: 'Name',
    /**
     * @cfg {Object/Ext.form.Field} field The Ext JS form field (or config) to use for editing.
     */
    field: {
        xtype: 'textfield',
        minWidth: 100,
        allowEmpty: false
    },
    minWidth: 100,
    initComponent: function() {
        var me = this;
        me.on('complete', me.onEditDone, me);
        me.callParent();
    },
    triggerEdit: function(record, e) {
        // ignore editing in mini mode
        var taskEl = this.panel.getElementForTask(record);
        if (taskEl) {
            var view = this.panel.resolveViewByNode(taskEl);
            var zoomLevel = view.up('panel').zoomLevel;
            if (zoomLevel !== 'mini') {
                this.record = record;
                this.startEdit(taskEl.down(this.selector));
            }
        }
    },
    onEditDone: function() {
        this.record.set(this.dataIndex, this.getValue());
    }
});

/**

@class Kanban.field.AddNew
@extends Ext.form.field.Text

A basic text field that allows you to easily add new tasks by typing a name and hitting the Enter key.

Sample usage:

    var taskBoard = new Kanban.view.TaskBoard({
        resourceStore : userStore,
        taskStore     : taskStore,

        // Configure each state column individually
        columnConfigs : {
            all : {
                iconCls : 'sch-header-icon'
            },

            "NotStarted" : {
                dockedItems : {
                    xtype   : 'container',
                    dock    : 'bottom',
                    layout  : 'fit',

                    items   : {
                        xtype    : 'addnewfield',
                        store    : taskStore,

                        // Configurations applied to the newly created taska
                        defaults : {
                            State : 'NewTask'
                        }
                    }
                }
            }
        }
    });

 */
Ext.define('Kanban.field.AddNew', {
    extend: 'Ext.form.TextField',
    alias: 'widget.addnewfield',
    enableKeyEvents: true,
    emptyText: 'Add new task...',
    /**
     * @cfg {Kanban.data.TaskStore} store (required) The task store
     */
    store: null,
    /**
     * @cfg {Object} defaults Any default properties to be applied to the newly created tasks
     */
    defaults: null,
    initComponent: function() {
        this.on('keyup', this.onMyKeyUp, this);
        if (Ext.isString(this.store)) {
            this.store = Ext.getStore(this.store);
        }
        this.callParent(arguments);
    },
    onMyKeyUp: function(field, e) {
        if (e.getKey() === e.ENTER) {
            this.addTask();
        }
    },
    addTask: function() {
        var vals = {};
        var column = this.up('taskcolumn');
        vals[this.store.model.prototype.nameField] = this.getValue();
        var newTask = this.store.add(Ext.apply(vals, this.defaults))[0];
        this.reset();
        if (column) {
            var view = column.down('taskview'),
                node = view.getNode(newTask);
            if (node) {
                Ext.fly(node).scrollIntoView(view.el, false, true);
            }
        }
    }
});

/**
 * A text field that allows you to filter out undesired columns from the TaskBoard view.
 *
 * @class Kanban.field.ColumnFilter
 * @extends Ext.form.field.ComboBox
 */
Ext.define('Kanban.field.ColumnFilter', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.columnfilter',
    requires: [
        'Ext.data.JsonStore'
    ],
    multiSelect: true,
    valueField: 'id',
    displayField: 'name',
    panel: null,
    queryMode: 'local',
    listConfig: {
        htmlEncode: true,
        cls: 'sch-columnfilter-list'
    },
    initComponent: function() {
        var me = this;
        me.store = new Ext.data.JsonStore({
            proxy: 'memory',
            fields: [
                'id',
                'name'
            ]
        });
        me.loadStore();
        me.callParent(arguments);
        me.getPicker().on({
            beforeshow: me.onBeforeColumnListShow,
            scope: me
        });
        me.getPicker().on({
            show: function(picker) {
                picker.on('selectionchange', me.applyFilterToColumns, me);
            },
            hide: function(picker) {
                picker.un('selectionchange', me.applyFilterToColumns, me);
            },
            delay: 50,
            // The picker fires 'selectionchange' as it shows itself
            scope: me
        });
        me.value = me.value || me.panel.query('taskcolumn').map(function(column) {
            return column.state;
        });
        // Need to apply initial filtering if values are provided
        me.applyFilterToColumns();
    },
    loadStore: function() {
        var me = this,
            locale = Sch.locale.Active['Kanban.locale'] || {},
            data = me.panel.query('taskcolumn').map(function(column) {
                return {
                    id: column.state,
                    name: column.origTitle || locale[column.state] || column.state
                };
            });
        me.store.loadData(data);
    },
    applyFilterToColumns: function() {
        var me = this,
            values = me.value;
        me.store.each(function(rec) {
            var column = me.panel.down('[state=' + rec.get('id') + ']'),
                visible = Ext.Array.indexOf(values, rec.get('id')) >= 0;
            column[visible ? 'show' : 'hide']();
        });
    },
    onBeforeColumnListShow: function() {
        var me = this,
            visible = [];
        Ext.each(me.panel.query('taskcolumn'), function(column) {
            if (column.isVisible()) {
                visible.push(me.store.getById(column.state));
            }
        });
        me.select(visible);
    }
});

/**

 @class Kanban.field.TaskFilter
 @extends Ext.form.field.Text

 A text field that allows you to filter for tasks by Name in the TaskBoard view. You can filter for another field by setting the {@link #field} config.

 To filter tasks by task name:

    {
        xtype : 'filterfield',
        store : 'myTaskStore',
        field : 'Name'
    },

 To filter tasks by resource name:

    {
        xtype : 'filterfield',
        store : 'myTaskStore',
        filter : new Ext.util.Filter({
            filterFn : function (r) {
                var resource = r.getResource();

                return resource && resource.getName().toLowerCase().indexOf(this.getValue()) >= 0;
            }
        })
    },

 */
Ext.define('Kanban.field.TaskFilter', {
    extend: 'Ext.form.TextField',
    alias: 'widget.filterfield',
    requires: [
        'Ext.util.Filter'
    ],
    enableKeyEvents: true,
    minLength: 2,
    /**
     * @cfg {Kanban.data.TaskStore/String} store (required) The store containing the tasks or a store identifier (storeId) identifying a store
     */
    store: null,
    /**
     * @cfg {String} field The {@link Kanban.model.Task} field that should be used for filtering.
     */
    /**
     * @cfg {Boolean} caseSensitive True to use case sensitive filtering
     */
    caseSensitive: false,
    /**
     * @cfg {Ext.util.Filter} filter A custom Ext JS filter that should be used for filtering.
     */
    initComponent: function() {
        this.on('change', this.onMyChange, this);
        this.store = Ext.data.StoreManager.lookup(this.store);
        this.field = this.field || this.store.getModel().prototype.nameField;
        this.filter = this.filter || new Ext.util.Filter({
            id: this.getId() + '-filter',
            property: this.field,
            value: '',
            caseSensitive: this.caseSensitive,
            anyMatch: true
        });
        this.callParent(arguments);
    },
    onMyChange: function() {
        var val = this.getValue();
        if (val && val.length >= this.minLength) {
            this.filter.setValue(val);
            this.store.addFilter(this.filter);
        } else {
            this.store.removeFilter(this.filter);
        }
    }
});

/**

 @class Kanban.field.TaskHighlight
 @extends Ext.form.field.Text

 A text field that allows you to highlight certain tasks in the TaskBoard view.
 */
Ext.define('Kanban.field.TaskHighlight', {
    extend: 'Ext.form.TextField',
    alias: 'widget.highlightfield',
    mixins: [
        'Ext.AbstractPlugin'
    ],
    enableKeyEvents: true,
    minLength: 2,
    preventMark: true,
    /**
     * @cfg {Kanban.view.TaskBoard} panel (required) The kanban panel
     */
    panel: null,
    /**
     * @cfg {String} field The {@link Kanban.model.Task} field that should be used for filtering.
     */
    field: 'Name',
    /**
     * @cfg {Boolean} caseSensitive True to use case sensitive filtering
     */
    caseSensitive: false,
    initComponent: function() {
        this.on('keyup', this.onMyKeyUp, this);
        this.callParent(arguments);
    },
    onMyKeyUp: function(field, e) {
        var val = this.getValue();
        if (val && val.length >= this.minLength) {
            var matches = [];
            val = this.caseSensitive ? val : val.toLowerCase();
            this.panel.highlightTasksBy(function(rec) {
                var name = this.caseSensitive ? rec.data[this.field] : rec.data[this.field].toLowerCase();
                return name && name.indexOf(val) >= 0;
            }, this);
        } else {
            this.panel.clearHighlight();
        }
    }
});

Ext.define('Kanban.locale.En', {
    extend: 'Sch.locale.Locale',
    singleton: true,
    constructor: function(config) {
        Ext.apply(this, {
            l10n: {
                'Kanban.menu.TaskMenuItems': {
                    copy: 'Duplicate',
                    remove: 'Delete',
                    edit: 'Edit',
                    states: 'Status',
                    users: 'Assign to'
                }
            },
            NotStarted: 'Not Started',
            InProgress: 'In Progress',
            Test: 'Test',
            Done: 'Done'
        });
        this.callParent(arguments);
    }
});

/**

@class Kanban.menu.UserMenu
@extends Ext.menu.Menu

A simple menu showing a list of users that can be assigned to a task. Intended to be used together with the TaskBoard.
Sample usage:

    var taskBoard = new Kanban.view.TaskBoard({
        resourceStore : resourceStore,
        taskStore : taskStore,

        userMenu : new Kanban.menu.UserMenu({
            resourceStore : resourceStore
        }),

        ...
    });
*/
Ext.define('Kanban.menu.UserMenu', {
    extend: 'Ext.menu.Menu',
    alias: 'widget.kanban_usermenu',
    cls: 'sch-usermenu',
    plain: true,
    /**
     * @cfg {Kanban.data.ResourceStore} store (required) The task store
     */
    resourceStore: null,
    initComponent: function() {
        var me = this;
        Ext.apply(this, {
            renderTo: document.body,
            listeners: {
                beforeshow: function() {
                    var user = this.task.getResource();
                    if (user) {
                        this.items.each(function(item) {
                            if (user == item.user) {
                                item.addCls('sch-user-selected');
                            } else {
                                item.removeCls('sch-user-selected');
                            }
                        });
                    }
                }
            }
        });
        this.resourceStore = Ext.data.StoreManager.lookup(this.resourceStore);
        this.mon(this.resourceStore, {
            load: this.populate,
            add: this.populate,
            remove: this.populate,
            update: this.populate,
            scope: this
        });
        this.callParent(arguments);
        this.populate();
    },
    showForTask: function(task, xy) {
        this.task = task;
        if (this.resourceStore.getCount() > 0) {
            this.showAt(xy);
        }
    },
    onUserSelected: function(item) {
        this.task.assign(item.user);
    },
    populate: function() {
        var me = this;
        var items = [];
        this.resourceStore.each(function(user) {
            items.push({
                text: user.getName(),
                user: user,
                handler: me.onUserSelected,
                scope: me
            });
        });
        this.removeAll(true);
        this.add(items);
    }
});

/**
 @class Kanban.menu.TaskMenuItems
 @private
 
 This class is a factory of items for the Kanban.menu.TaskMenu. This class should not be used directly.
 With the  {@link Kanban.menu.TaskMenu#defaultActions} this class can be configured.
 */
Ext.define('Kanban.menu.TaskMenuItems', {
    requires: [
        'Kanban.editor.SimpleEditor',
        'Kanban.menu.UserMenu'
    ],
    mixins: [
        'Sch.mixin.Localizable'
    ],
    taskBoard: null,
    mainMenu: null,
    defaultActions: null,
    editorClass: null,
    editor: null,
    userMenuClass: null,
    userMenu: null,
    constructor: function(config) {
        Ext.apply(this, config);
        this.mainMenu.on('beforeshow', this.onBeforeShow, this);
        this.items = this.items || [];
        if (this.defaultActions) {
            this.initEditor();
            this.initUserMenu();
            this.initStateMenu();
            this.items = this.items.concat([
                {
                    action: 'edit',
                    text: this.L('edit'),
                    handler: this.onEditClick,
                    scope: this
                },
                {
                    action: 'assign',
                    text: this.L('users'),
                    menu: this.userMenu
                },
                {
                    action: 'setState',
                    text: this.L('states'),
                    menu: this.stateMenu
                },
                {
                    action: 'copy',
                    text: this.L('copy'),
                    handler: this.onCopyClick,
                    scope: this
                },
                {
                    action: 'remove',
                    text: this.L('remove'),
                    handler: this.onRemoveClick,
                    scope: this
                }
            ]);
        }
        this.callParent(arguments);
    },
    onBeforeShow: function(menu) {
        var task = menu.getTask();
        if (this.userMenu) {
            this.userMenu.task = task;
        }
        if (this.editor) {
            this.editor.task = task;
        }
    },
    getItems: function() {
        return this.items;
    },
    initEditor: function() {
        if (!this.editor) {
            if (this.taskBoard.getTaskEditor()) {
                this.editor = this.taskBoard.getTaskEditor();
            } else {
                this.editor = Ext.create(this.editorClass, {
                    dataIndex: this.taskBoard.taskStore.model.prototype.nameField,
                    panel: this.taskBoard
                });
            }
        }
    },
    onEditClick: function(btn, e) {
        this.editor.editRecord(this.mainMenu.getTask(), e);
    },
    initUserMenu: function() {
        if (!this.userMenu) {
            this.userMenu = Ext.create(this.userMenuClass, {
                resourceStore: this.taskBoard.resourceStore,
                onBodyClick: Ext.emptyFn
            });
        }
    },
    initStateMenu: function() {
        var me = this,
            model = this.taskBoard.taskStore.model,
            stateField = model.prototype.stateField,
            states = model.prototype.states;
        var locale = Sch.locale.Active['Kanban.locale'] || {};
        var items = Ext.Array.map(states, function(state) {
                return {
                    text: locale[state] || state,
                    state: state,
                    handler: me.onStateClick,
                    scope: me
                };
            });
        var mainMenu = me.mainMenu;
        this.stateMenu = new Ext.menu.Menu({
            items: items,
            plain: true,
            listeners: {
                show: function() {
                    var task = mainMenu.getTask();
                    var state = task.get(stateField);
                    this.items.each(function(item) {
                        item.setDisabled(item.state === state || !task.isValidTransition(item.state));
                    });
                }
            }
        });
    },
    onStateClick: function(btn) {
        this.mainMenu.task.setState(btn.state);
    },
    onCopyClick: function(btn) {
        var store = this.taskBoard.taskStore,
            task = this.mainMenu.getTask(),
            newTask = task.copy(null);
        newTask.setName(newTask.getName());
        store.add(newTask);
    },
    onRemoveClick: function(btn) {
        var store = this.taskBoard.taskStore,
            task = this.mainMenu.getTask();
        store.remove(task);
    }
});

/**

 @class Kanban.menu.TaskMenu
 @extends Ext.menu.Menu

 A simple menu that can be attached to a task on the kanban board. When configured a menu-handle-icon will be rendered on the task.
 The handle template can be configured in {@link Kanban.template.Task#menuIconTpl}

 */
Ext.define('Kanban.menu.TaskMenu', {
    extend: 'Ext.menu.Menu',
    requires: [
        'Kanban.menu.TaskMenuItems'
    ],
    isTaskMenu: true,
    /**
     * @property alias
     */
    alias: 'widget.kanban_taskmenu',
    cls: 'sch-task-menu',
    handleCls: 'sch-task-menu-handle',
    /**
     * @property {Kanban.view.TaskBoard} taskBoard A reference to the Kanban taskboard.
     */
    taskBoard: null,
    /**
     * @property {Kanban.model.Task} task A reference to the current task.
     */
    config: {
        task: null
    },
    hideHandleTimer: null,
    /**
     * @cfg {Number} handleHideDelay The handle will be hidden after this number of ms, when the mouse leaves the task element.
     */
    handleHideDelay: 500,
    currentHandle: null,
    editorClass: 'Kanban.editor.SimpleEditor',
    userMenuClass: 'Kanban.menu.UserMenu',
    /**
     * @cfg {Boolean} defaultActions Set to true to include the default toolitems (Copy, delete, edit etc).
     */
    defaultActions: true,
    /**
     * @cfg {String} itemFactoryClass A classname of the class that can generate items for the menu. The factory will be used when
     * no items are set in the config.
     *
     * A factory class needs to have a public function {@link Kanban.menu.TaskMenuItems#getItems} which is called to set the items for this menu.
     */
    itemFactoryClass: 'Kanban.menu.TaskMenuItems',
    initComponent: function() {
        this.on('beforeshow', this.onBeforeShow, this);
        if (this.defaultActions) {
            this.items = Ext.create(this.itemFactoryClass, {
                editorClass: this.editorClass,
                userMenuClass: this.userMenuClass,
                defaultActions: this.defaultActions,
                items: this.items || [],
                taskBoard: this.taskBoard,
                mainMenu: this
            }).getItems();
        }
        this.callParent(arguments);
    },
    registerListeners: function() {
        this.mon(this.taskBoard.el, {
            click: this.onMenuHandleClick,
            delegate: '.' + this.handleCls,
            scope: this
        });
        this.mon(this.taskBoard, {
            taskmouseenter: this.onHandleMouseOver,
            taskmouseleave: this.onHandleMouseLeave,
            scope: this
        });
    },
    /**
     * Shows this menu.
     * @param task
     */
    showForTask: function(task, e, node) {
        var el = e.getTarget('.sch-task');
        this.setTask(task);
        this.show();
        this.alignTo(el, 'tl-tr?');
    },
    onMenuHandleClick: function(e, node) {
        var task = this.taskBoard.resolveRecordByNode(node);
        e.stopEvent();
        this.showForTask(task, e, node);
    },
    onHandleMouseOver: function(view, task, taskNode, event, eOpts) {
        window.clearTimeout(this.hideHandleTimer);
        this.hide();
        this.currentHandle && this.currentHandle.setVisible(false);
        this.currentHandle = Ext.select('.' + this.handleCls, false, taskNode).setVisible(true);
    },
    onHandleMouseLeave: function(view, task, taskNode, event, eOpts) {
        this.hideHandleTimer = Ext.defer(function() {
            this.currentHandle && this.currentHandle.setVisible(false);
        }, this.handleHideDelay, this);
    },
    /**
     * Called once for each menuitem before the menu is shown. Use this to hide/disable items on a per-task basis.
     *
     * @param {Ext.menu.Item} menuItem the menu item
     * @param {Kanban.model.Task} task The task
     * @returns {Boolean} false to hide the menu item
     */
    shouldShowItem: function(menuItem, task) {
        return true;
    },
    onBeforeShow: function(menu) {
        var task = this.getTask();
        this.items.each(function(menuItem) {
            menuItem.task = task;
            menuItem.setVisible(this.shouldShowItem(menuItem, task));
        }, this);
    },
    destroy: function() {
        clearTimeout(this.hideHandleTimer);
        this.callParent(arguments);
    }
});

Ext.define('Kanban.menu.UserPicker', {
    extend: 'Ext.view.View',
    alias: [
        'widget.userpicker',
        'widget.kanban_userpicker'
    ],
    cls: 'sch-userpicture-view',
    autoScroll: true,
    showName: true,
    padding: '10 5 5 5',
    itemSelector: '.sch-user',
    overItemCls: 'sch-user-hover',
    selectedItemCls: 'sch-user-selected',
    initComponent: function() {
        var modelProt = this.store && this.store.model && this.store.model.prototype;
        var nameField = modelProt && modelProt.nameField || 'Name';
        var imageUrlField = modelProt && modelProt.imageUrlField || 'ImageUrl';
        Ext.apply(this, {
            itemTpl: '<tpl for=".">' + '<div class="sch-user">' + '<img src="{' + imageUrlField + ':htmlEncode}" />' + (this.showName ? '<span>{' + nameField + ':htmlEncode}</span>' : '') + '</div>' + '</tpl>'
        });
        this.callParent(arguments);
    }
});

/**

@class Kanban.menu.UserPictureMenu
@extends Ext.menu.Menu

A simple menu showing a picture for each user that can be assigned to a task. Intended to be used together with the TaskBoard.
Sample usage:

    var taskBoard = new Kanban.view.TaskBoard({
        resourceStore : resourceStore,
        taskStore : taskStore,

        userMenu : new Kanban.menu.UserPictureMenu({
            resourceStore : resourceStore
        }),

        ...
    });

*/
Ext.define('Kanban.menu.UserPictureMenu', {
    extend: 'Ext.menu.Menu',
    alias: [
        'widget.userpicturemenu',
        'widget.kanban_userpicturemenu'
    ],
    requires: [
        'Kanban.menu.UserPicker'
    ],
    cls: 'sch-userpicturemenu',
    width: 290,
    height: 200,
    resourceStore: null,
    hideOnSelect: true,
    initComponent: function() {
        var me = this,
            cfg = Ext.apply({}, me.initialConfig);
        delete cfg.listeners;
        Ext.apply(me, {
            plain: true,
            showSeparator: false,
            bodyPadding: 0,
            items: Ext.applyIf({
                margin: 0,
                store: this.resourceStore,
                xtype: 'userpicker'
            }, cfg)
        });
        me.callParent(arguments);
        me.picker = me.down('userpicker');
        me.relayEvents(me.picker, [
            'select'
        ]);
        if (me.hideOnSelect) {
            me.on('select', me.onUserSelected, me);
        }
        this.mon(Ext.getBody(), 'click', this.onBodyClick, this);
    },
    showForTask: function(task, xy) {
        this.task = task;
        this.showAt(xy);
        var user = task.getResource();
        if (user) {
            this.picker.select(user, false, true);
        } else {
            this.picker.getSelectionModel().deselectAll();
        }
    },
    onUserSelected: function(picker, user) {
        this.hide();
        this.task.assign(user);
    },
    onBodyClick: function(e, t) {
        if (!e.within(this.el)) {
            this.hide();
        }
    }
});

/**
 @class Kanban.selection.TaskModel
 @extends Ext.mixin.Observable

 A composite selection model which relays methods to the various selection models used by the internal data
 views of the task board component.
 */
Ext.define('Kanban.selection.TaskModel', {
    extend: 'Ext.mixin.Observable',
    panel: null,
    selModels: null,
    constructor: function(config) {
        var me = this;
        Ext.apply(me, config);
        me.callParent(arguments);
        me.selModels = Ext.Array.map(me.panel.views, function(view) {
            return view.getSelectionModel();
        });
        me.forEachView(function(view) {
            me.mon(view, 'containerclick', me.onEmptyAreaClick, me);
            me.relayEvents(view, [
                'select',
                'deselect'
            ]);
            me.relayEvents(view.getSelectionModel(), [
                'selectionchange'
            ]);
        });
    },
    /**
     * Selects one or more tasks.
     * @param {Kanban.model.Task/Kanban.model.Task[]} tasks An array of tasks
     * @param {Boolean} [keepExisting=false] True to retain existing selections
     * @param {Boolean} [suppressEvent=false] True to not fire a select event
     */
    select: function(tasks, keepExisting, suppressEvent) {
        tasks = [].concat(tasks);
        var fired = false;
        var listener = function() {
                fired = true;
            };
        this.forEachSelModel(function(sm) {
            var recordsInView = Ext.Array.filter(tasks, function(rec) {
                    return sm.store.indexOf(rec) >= 0;
                });
            sm.on('selectionchange', listener, null, {
                single: true
            });
            if (recordsInView.length > 0) {
                sm.select(recordsInView, keepExisting, suppressEvent);
            } else {
                sm.deselectAll();
            }
            sm.un('selectionchange', listener, null, {
                single: true
            });
        });
        if (fired) {
            this.fireEvent('selectionchange', this.getSelection());
        }
    },
    /**
     * Deselects a task instance.
     * @param {Kanban.model.Task/Kanban.model.Task} tasks One or more tasks
     * @param {Boolean} [suppressEvent=false] True to not fire a deselect event
     */
    deselect: function(tasks, suppressEvent) {
        tasks = [].concat(tasks);
        this.forEachSelModel(function(sm) {
            var recordsInView = Ext.Array.filter(tasks, function(rec) {
                    return sm.store.indexOf(rec) >= 0;
                });
            sm.deselect(recordsInView, suppressEvent);
        });
        this.fireEvent('selectionchange', this.getSelection());
    },
    /**
     * Selects all tasks in the view.
     * @param {Boolean} suppressEvent True to suppress any select events
     */
    selectAll: function() {
        this.relayMethod('selectAll');
    },
    /**
     * Deselects all tasks in the view.
     * @param {Boolean} [suppressEvent] True to suppress any deselect events
     */
    deselectAll: function() {
        this.relayMethod('deselectAll');
    },
    /**
     * Returns an array of the currently selected tasks.
     * @return {Ext.data.Model[]} The selected tasks
     */
    getSelection: function() {
        return this.relayMethod('getSelection');
    },
    /**
     * Returns the count of selected tasks.
     * @return {Number} The number of selected tasks
     */
    getCount: function() {
        return Ext.Array.sum(this.relayMethod('getCount'));
    },
    // BEGIN PRIVATE METHODS
    deselectAllInOtherSelectionModels: function(selModel) {
        this.forEachSelModel(function(sm) {
            sm !== selModel && sm.deselectAll();
        });
    },
    // relays results, flattens results from all calls into one array
    relayMethod: function(method, args) {
        return [].concat.apply([], Ext.Array.map(this.selModels, function(sm) {
            return sm[method].apply(sm, args || []);
        }));
    },
    forEachSelModel: function(fn, scope) {
        Ext.Array.each(this.selModels, fn, scope || this);
    },
    onEmptyAreaClick: function() {
        this.deselectAll();
    },
    forEachView: function(fn, scope) {
        Ext.Array.each(this.panel.views, fn, scope || this);
    },
    destroy: function() {}
});
// EOF PRIVATE METHODS

/**

 @class Kanban.template.Task
 @extends Ext.XTemplate

 Template class used to render {@link Kanban.model.Task a task}.
 */
Ext.define('Kanban.template.Task', {
    extend: 'Ext.XTemplate',
    model: null,
    // the task model
    /**
     * @cfg {String} resourceImgTpl Resource image template.
     */
    /**
     * @cfg {String} taskBodyTpl Internal part of a task template.
     */
    /**
     * @cfg {String} taskToolTpl Extra template for optional task tools.
     */
    /**
     * @cfg {String} menuIconTpl Template for the taskmenu handler.
     */
    menuIconTpl: '<div class="sch-task-menu-handle x-fa fa-gear"></div>',
    constructor: function(config) {
        var me = this;
        config = config || {};
        // apply default value if undefined
        config.menuIconTpl = config.menuIconTpl !== undefined ? config.menuIconTpl : me.menuIconTpl;
        Ext.apply(me, config);
        var modelProt = me.model.prototype;
        var idProperty = modelProt.idProperty;
        var nameField = modelProt.nameField;
        if (typeof me.taskBodyTpl !== 'string') {
            me.taskBodyTpl = '<tpl if="' + modelProt.imageUrlField + '"><img class="sch-task-img" src="{taskImageUrl:htmlEncode}"/></tpl>' + '<span class="sch-task-id">{[ values.' + idProperty + ' ? "#" + values.' + idProperty + ' : "" ]}</span><span class="sch-task-name"> {' + nameField + ':htmlEncode}</span>';
        }
        if (typeof me.resourceImgTpl !== 'string') {
            me.resourceImgTpl = '<img src="{resourceImageUrl:htmlEncode}" class="sch-user-avatar {resourceImageCls:htmlEncode}" />';
        }
        me.callParent([
            '<tpl for=".">',
            '<div class="sch-task sch-task-state-{[Ext.String.htmlEncode(values.' + modelProt.stateField + '.replace(/\\s/g, \'-\'))]} {' + modelProt.clsField + ':htmlEncode} {cls:htmlEncode} x-unselectable" unselectable="on" style="{style}">' + '<div class="sch-task-inner">' + me.taskBodyTpl + me.resourceImgTpl + (me.taskToolTpl || '') + '</div>' + me.menuIconTpl + '</div>' + '</tpl>'
        ]);
    }
});

/**

 @class Kanban.view.TaskView
 @extends Ext.view.View

 A task view class used internally by the Kanban Panel, based on the {@link Ext.view.View} class, showing a
 plain list of {@link Kanban.model.Task tasks}.
 */
Ext.define('Kanban.view.TaskView', {
    extend: 'Ext.view.View',
    alias: 'widget.taskview',
    requires: [
        "Kanban.template.Task",
        "Kanban.data.ViewStore"
    ],
    // Inherited configs
    autoScroll: true,
    trackOver: true,
    overItemCls: 'sch-task-over',
    selectedItemCls: 'sch-task-selected',
    itemSelector: '.sch-task',
    // Class configs & properties
    state: null,
    /**
     * @cfg {String} taskBodyTpl The template to use for the task body rendering
     */
    /**
     * @cfg {String} resourceImgTpl The template to use for the user image
     */
    /**
     * @cfg {String} taskToolTpl The template to use for any tools that should be shown at the bottom of a task box.
     */
    /**
     * @cfg {String} menuIconTpl The template to use for the task menu icon
     */
    /**
     * A renderer template method intended to be overwritten to supply custom values for the template used to render a task.
     * This is called once every time a task is rendered and two arguments are passed, the task record and a 'renderData' object containing
     * the properties that will be applied to the template. In addition to the prepopulated renderData properties such as task 'Name', 'Id' etc you can also
     * supply a 'cls' (added as a CSS class) property and 'style' (added as inline styles) to programmatically change the appearance of tasks in the list.

     * @param {Kanban.model.Task} task The task record
     * @param {Object} renderData The object that will be applied to the template
     */
    taskRenderer: function(task, renderData) {},
    initComponent: function() {
        var me = this;
        if (me.store && me.store.model) {
            me.tpl = new Kanban.template.Task({
                model: me.store.model,
                resourceImgTpl: me.resourceImgTpl,
                taskToolTpl: me.taskToolTpl,
                taskBodyTpl: me.taskBodyTpl,
                menuIconTpl: me.menuIconTpl
            });
        } else {
            me.tpl = new Ext.XTemplate('');
        }
        me.addCls('sch-taskview sch-taskview-state-' + me.state.replace(/\s/g, '-'));
        me.callParent(arguments);
    },
    bindStore: function(store) {
        // can be ext-empty-store
        if (store && store.model) {
            this.tpl = new Kanban.template.Task({
                model: store.model,
                resourceImgTpl: this.resourceImgTpl,
                taskToolTpl: this.taskToolTpl,
                taskBodyTpl: this.taskBodyTpl,
                menuIconTpl: this.menuIconTpl
            });
        }
        this.callParent(arguments);
    },
    // ViewSelector UX breaks after a view refresh :/
    // http://www.sencha.com/forum/showthread.php?293015-DragSelector-UX-broken-after-view-refresh&p=1069838#post1069838
    refresh: function() {
        var el = this.getEl();
        var selectorProxy = el.down('.' + Ext.baseCSSPrefix + 'view-selector');
        if (selectorProxy) {
            el.removeChild(selectorProxy);
        }
        this.callParent(arguments);
        if (selectorProxy) {
            el.appendChild(selectorProxy);
        }
    },
    collectData: function(records) {
        var collected = this.callParent(arguments),
            result = [];
        for (var i = 0; i < collected.length; i++) {
            // collected[i] is reference to the record[i].data
            // we don't want to pollute it so lets make a new object instead
            var taskRenderData = Ext.apply({}, collected[i]);
            var task = records[i];
            var user = task.getResource();
            var userImgUrl = user && user.getImageUrl();
            taskRenderData.resourceImageCls = '';
            taskRenderData.resourceImageUrl = userImgUrl || Ext.BLANK_IMAGE_URL;
            taskRenderData.taskImageUrl = task.getImageUrl();
            taskRenderData.task = task;
            taskRenderData.name = task.getName();
            if (!userImgUrl) {
                taskRenderData.resourceImageCls = "sch-no-img";
            }
            this.taskRenderer(task, taskRenderData);
            if (task.phantom) {
                taskRenderData.cls = (taskRenderData.cls || '') + " sch-phantom-task";
            }
            result.push(taskRenderData);
        }
        return result;
    }
});

/**

@class Kanban.view.TaskColumn
@extends Ext.panel.Panel

A panel representing a 'swim lane' in the task board, based on the {@link Ext.panel.Panel} class. The TaskColumn holds a single {@link Kanban.view.TaskView}
instance and is consumed by the TaskBoard class. You normally don't interact directly with this class, but you can configure each column
using the {@link Kanban.view.TaskBoard#columnConfigs} config option.

    var taskBoard = new Kanban.view.TaskBoard({
        resourceStore : userStore,
        taskStore     : taskStore,
        ..,

        columnConfigs : {
            // Applied to all Task Columns
            all : {
                iconCls : 'sch-header-icon'
            },

            // Configure a Task Column individually
            "NotStarted" : {
                dockedItems : {
                    xtype   : 'container',
                    dock    : 'bottom',
                    layout  : 'fit',
                    border  : 0,
                    padding : '5 8',
                    items   : {
                        height : 30,

                        xtype : 'addnewfield',
                        store : taskStore
                    }
                }
            }
        }
    });

You can also subclass it and have the {@link Kanban.view.TaskBoard} consume your own custom class instead by providing the {@link Kanban.view.TaskBoard#columnClass}
config.
*/
Ext.define('Kanban.view.TaskColumn', {
    extend: 'Ext.Panel',
    alias: 'widget.taskcolumn',
    requires: [
        // Ext JS 5 bug
        'Ext.layout.container.Fit',
        'Kanban.view.TaskView'
    ],
    flex: 1,
    layout: 'fit',
    collapseDirection: 'right',
    /**
     * @cfg {String} state (required) The state name for this column. It should contain any special characters such as , . " '
     */
    state: null,
    store: null,
    taskBodyTpl: null,
    taskToolTpl: null,
    resourceImgTpl: null,
    origTitle: null,
    view: null,
    zoomLevel: 'large',
    /**
     * @cfg {Object} viewConfig (required) A custom object containing config properties for the {@link Ext.view.View} which is added to this column
     */
    viewConfig: null,
    initComponent: function() {
        var me = this;
        if (me.state === null) {
            throw 'Must supply state';
        }
        var viewConfig = Ext.apply({
                state: me.state
            }, me.viewConfig || {});
        if (me.taskBodyTpl)  {
            viewConfig.taskBodyTpl = me.taskBodyTpl;
        }
        
        if (me.taskToolTpl)  {
            viewConfig.taskToolTpl = me.taskToolTpl;
        }
        
        if (me.resourceImgTpl)  {
            viewConfig.resourceImgTpl = me.resourceImgTpl;
        }
        
        me.items = me.view = new Kanban.view.TaskView(viewConfig);
        var locale = Sch.locale.Active['Kanban.locale'] || {};
        me.origTitle = me.title = (me.title || locale[me.state] || me.state);
        me.callParent(arguments);
        me.addCls('sch-taskcolumn sch-taskcolumn-state-' + me.state.replace(/\s/g, '-'));
    },
    onRender: function() {
        this.setZoomLevel(this.zoomLevel);
        if (this.header) {
            this.header.addCls('sch-taskcolumnheader-state-' + this.state.replace(/\s/g, '-'));
        }
        this.callParent(arguments);
    },
    refreshTitle: function() {
        var state = this.state;
        var nbrTasks = this.store.query(this.store.getModel().prototype.stateField, state, false, false, true).length;
        this.setTitle(this.origTitle + (nbrTasks ? ' (' + nbrTasks + ')' : ''));
    },
    /**
     * Bind new view store to current column
     * @param {Kanban.data.ViewStore} store New view store bound to task store
     * @private
     */
    bindStore: function(store) {
        var listeners = {
                load: this.refreshTitle,
                datachanged: this.refreshTitle,
                update: this.refreshTitle,
                add: this.refreshTitle,
                remove: this.refreshTitle,
                buffer: 20,
                scope: this
            };
        if (this.store) {
            // TODO: Need to refactor this to accept taskStore and create new viewStore here. See usages
            // To unbind old viewstore correctly, we need to also remove its listeners from master store.
            // See ViewStore constructor.
            this.store.unbindFromStore();
            this.mun(this.store, listeners);
        }
        if (store) {
            this.mon(store, listeners);
            this.view.bindStore(store);
        }
        this.store = store;
        this.refreshTitle();
    },
    getZoomLevel: function() {
        return this.zoomLevel;
    },
    setZoomLevel: function(level) {
        this.zoomLevel = level || 'large';
        this.el.set({
            size: level
        });
    }
});

/**
 * @class Kanban.view.TaskBoard
 *
 * A panel based on the {@link Ext.panel.Panel} class which allows you to visualize and manage {@link Kanban.model.Task tasks} and you can
 * also assign {@link Kanban.model.Resource resources} to these tasks. The panel expects a {@link Kanban.data.TaskStore taskStore} to be provided and can also
 * be configured with a {@link Kanban.data.ResourceStore resourceStore}. Based on the array of {@link Kanban.model.Task#states states}, a list of
 * {@link Kanban.view.TaskColumn TaskColumns} will be generated. Tasks can be dragged between these state panels, and you can control which state transitions
 * are allowed by subclassing the {@link Kanban.model.Task Task} class and overriding the {@link Kanban.model.Task#isValidTransition} method.
 *
 * Sample usage below:
 *
 *     var resourceStore = new Kanban.data.ResourceStore({
 *         data    : [
 *             { Id : 1, Name : 'Dave' }
 *         ]
 *     });
 *
 *     var taskStore = new Kanban.data.TaskStore({
 *         data    : [
 *             { Id : 1, Name : 'Dig hole', State : 'NotStarted'}
 *         ]
 *     });
 *
 *     var taskBoard = new Kanban.view.TaskBoard({
 *         resourceStore : resourceStore,
 *         taskStore     : taskStore
 *     });
 *
 *     var vp = new Ext.Viewport({
 *         items       : taskBoard,
 *         layout      : 'fit'
 *     });
 *
 * Additionally, you can control the layout of the columns yourself by providing an array of Columns yourself.
 *
 *     var taskBoard = new Kanban.view.TaskBoard({
 *         ...
 *         columns : [
 *             {
 *                 state       : 'NotStarted',
 *                 title       : 'Not Started',
 *                 dockedItems : {
 *                     xtype   : 'container',
 *                     dock    : 'bottom',
 *                     layout  : 'fit',
 *                     ...
 *                 }
 *             },
 *             {
 *                 state : 'InProgress',
 *                 title : 'In Progress'
 *             },
 *             {
 *                 xtype    : 'container',
 *                 flex     : 1,
 *                 layout   : { type : 'vbox', align : 'stretch' },
 *                 defaults : { xtype : 'taskcolumn', flex : 1 },
 *                 items    : [
 *                     {
 *                         state : 'Test',
 *                         title : 'Test'
 *                     },
 *                     {
 *                         state     : 'Acceptance',
 *                         title     : 'Acceptance',
 *
 *                         // Column-level zoom setting
 *                         zoomLevel : 'mini'
 *                     }
 *                 ]
 *             },
 *             {
 *                 state : 'Done',
 *                 title : 'Done'
 *             }
 *         ]
 *     });
 *
 * {@img taskboard/images/board.png 2x}
 *
 * You can of course also subclass this class like you would with any other Ext JS class and provide your own custom behavior.
 * Make sure to also study the other classes used by this component, the various store, model and UI classes.
 */
Ext.define('Kanban.view.TaskBoard', {
    extend: 'Ext.Panel',
    alias: 'widget.taskboard',
    requires: [
        "Sch.patches.View",
        "Kanban.patch.EXTJS_23846",
        "Kanban.locale.En",
        "Kanban.data.TaskStore",
        "Kanban.data.ResourceStore",
        "Kanban.view.TaskColumn",
        "Kanban.dd.DropZone",
        "Kanban.dd.DragZone",
        "Kanban.editor.SimpleEditor",
        "Kanban.field.AddNew",
        "Kanban.menu.UserMenu",
        "Kanban.menu.TaskMenu",
        "Kanban.selection.TaskModel"
    ],
    border: false,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    defaultType: 'taskcolumn',
    // BEGIN PANEL SPECIFIC PROPERTIES
    config: {
        /**
         * @cfg {Kanban.data.TaskStore} taskStore (required) The store containing the tasks
         */
        taskStore: null,
        /**
         * @cfg {Kanban.data.ResourceStore} resourceStore The store containing the resources that can be assigned to tasks.
         */
        resourceStore: {
            type: 'kanban_resourcestore'
        }
    },
    /**
     * @cfg {Boolean} fitColumns Set to 'false' to make container scroll the content
     * */
    fitColumns: true,
    /**
     * @cfg {Object} dragZoneConfig A config object to apply to the DragZone used by the TaskBoard
     * */
    dragZoneConfig: null,
    /**
     * @cfg {Object} dropZoneConfig A config object to apply to the DropZone used by the TaskBoard
     * */
    dropZoneConfig: null,
    /**
     * @cfg {String} columnClass The class to use to instantiate the columns making up the task board. You can subclass
     * the default class and provide your own custom functionality by using this config property.
     * */
    columnClass: 'Kanban.view.TaskColumn',
    /**
     * @cfg {Kanban.view.TaskColumn[]} columns An array of {@link Kanban.view.TaskColumn} objects defining the various states of the tasks
     * in the board.
     * */
    columns: null,
    /**
     * @cfg {Object} columnConfigs An object containing configuration objects for individual TaskColumns. To set properties for the 'NotStarted' column,
     *               see the example below.
     *
     columnConfigs : {
        // Applied to all columns
        all : {
            iconCls : 'sch-header-icon'
        },

        "NotStarted" : {
            border : false
        }
    }
     * You can configure any columns matching the possible states defined in the TaskModel. Only relevant when not specifying the {@link columns} config option.
     * in the board.
     * */
    columnConfigs: null,
    /**
     * @cfg {Object} editor An array of objects containing configuration options for the columns which are automatically created based on
     * the possible states defined in the TaskModel. Only relevant when not specifying the {@link columns} config option.
     * in the board.
     * */
    editor: null,
    /**
     * @cfg {Object} viewConfig A custom config object that will be passed to each underlying {@link Ext.view.View} instance (one inside each state column)
     * */
    viewConfig: null,
    /**
     * @cfg {Boolean} enableUserMenu true to show a menu when clicking the user of a task.
     */
    enableUserMenu: true,
    /**
     * @cfg {Boolean} readOnly true to not allow editing or moving of tasks.
     * */
    readOnly: false,
    /**
     * @cfg {Ext.menu.Menu} userMenu A menu used to edit the assigned user for a task
     * */
    userMenu: null,
    /**
     * @cfg {Kanban.menu.TaskMenu/Object/Boolean} taskMenu Specify a menu for the task. A configuration will be passed to the {@link Kanban.view.TaskBoard#taskMenuClass}.
     *
     */
    taskMenu: true,
    /**
     * An empty function by default, but provided so that you can perform custom validation on
     * the tasks being dragged. This function is called after a drag and drop process to validate the operation.
     * To control what 'this' points to inside this function, use
     * {@link #validatorFnScope}.
     * @param {Kanban.model.Task[]} taskRecords an array containing the records being dragged
     * @param {String} newState The new state of the target task
     * @return {Boolean} true if the drop position is valid, else false to prevent a drop
     */
    dndValidatorFn: Ext.emptyFn,
    /**
     * @cfg {Object} validatorFnScope
     * The 'this' object to use for the {@link #dndValidatorFn} function
     */
    validatorFnScope: null,
    /**
     * @cfg {String} zoomLevel The size of the rendered tasks. Can also be controlled on a per-column level, see {@link Kanban.view.Column#zoomLevel}.
     * Options: ['large', 'medium', 'small', 'mini']
     * */
    zoomLevel: 'large',
    /**
     *  @cfg {Boolean} destroyStore True to destroy all stores used by this component when it's destroyed
     */
    destroyStores: false,
    /**
     *  @cfg {Boolean} enableClipboard True to allow user to copy/cut/paste selected tasks using standard keyboard shortcuts
     */
    enableClipboard: false,
    // EOF PANEL SPECIFIC PROPERTIES
    // Private properties
    taskCls: 'sch-task',
    taskSelector: '.sch-task',
    isHighlighting: false,
    views: null,
    kanbanColumns: null,
    selModel: null,
    clipboard: null,
    // EOF Private properties
    /**
     * @event taskclick
     * Fires when clicking a task
     * @param {Ext.view.View} view The DataView object
     * @param {Kanban.model.Task} task The task model
     * @param {HTMLElement} taskNode The clicked task root HTMLElement
     * @param {Ext.EventObject} event The event object
     */
    /**
     * @event taskdblclick
     * Fires when double clicking a task
     * @param {Ext.view.View} view The DataView object
     * @param {Kanban.model.Task} task The task model
     * @param {HTMLElement} taskNode The clicked task root HTMLElement
     * @param {Ext.EventObject} event The event object
     */
    /**
     * @event taskcontextmenu
     * Fires when right clicking a task
     * @param {Ext.view.View} view The DataView object
     * @param {Kanban.model.Task} task The task model
     * @param {HTMLElement} taskNode The clicked task root HTMLElement
     * @param {Ext.EventObject} event The event object
     */
    /**
     * @event taskmouseenter
     * Fires when the mouse moves over a task.
     * @param {Ext.view.View} view The DataView object
     * @param {Kanban.model.Task} task The task model
     * @param {HTMLElement} taskNode The hovered HTMLElement
     * @param {Ext.EventObject} event The event object
     */
    /**
     * @event taskmouseleave
     * Fires when the mouse leaves a task DOM node.
     * @param {Ext.view.View} view The DataView object
     * @param {Kanban.model.Task} task The task model
     * @param {HTMLElement} taskNode The HTMLElement
     * @param {Ext.EventObject} event The event object
     */
    /**
     * @event taskkeydown
     * Fires when a keydown event happens on a task DOM node.
     * @param {Ext.view.View} view The DataView object
     * @param {Kanban.model.Task} task The task model
     * @param {HTMLElement} taskNode The HTMLElement
     * @param {Ext.EventObject} event The event object
     */
    /**
     * @event taskkeyup
     * Fires when a keyup event happens on a task DOM node.
     * @param {Ext.view.View} view The DataView object
     * @param {Kanban.model.Task} task The task model
     * @param {HTMLElement} taskNode The HTMLElement
     * @param {Ext.EventObject} event The event object
     */
    initComponent: function() {
        var me = this;
        me.defaults = me.defaults || {};
        Ext.applyIf(me.defaults, {
            margin: 12
        });
        me.taskStore = Ext.data.StoreManager.lookup(me.taskStore);
        me.resourceStore = Ext.data.StoreManager.lookup(me.resourceStore);
        me.addCls('sch-taskboard');
        me.addBodyCls('sch-taskboard-body');
        if (!me.fitColumns) {
            me.addCls('sch-taskboard-scrollable');
            me.setScrollable('x');
            me.setLayout('auto');
        }
        var bindConfig = me.getConfig('bind');
        // If these configs are bound, we need to create empty stores, because those values will be applied
        // after render. So we need reliable setters for me stores.
        if (bindConfig) {
            if (bindConfig.taskStore) {
                me.taskStore = new Kanban.data.TaskStore();
            }
            if (bindConfig.resourceStore) {
                me.resourceStore = new Kanban.data.ResourceStore();
            }
        }
        me.taskStore = Ext.data.StoreManager.lookup(me.taskStore);
        me.resourceStore = Ext.data.StoreManager.lookup(me.resourceStore);
        me.on({
            add: me.onColumnsAdded,
            remove: me.onColumnsRemoved,
            scope: me
        });
        if (!me.columns) {
            me.columns = me.createColumns();
        } else {
            me.columns = Ext.clone(me.columns);
            me.initColumns(me.columns);
        }
        me.items = me.columns;
        if (!me.taskStore) {
            throw 'Must define a taskStore for the Panel';
        }
        if (!me.resourceStore) {
            throw 'Must define a resourceStore for the Panel';
        }
        me.callParent(arguments);
        me.bindResourceStore(me.resourceStore, true);
    },
    setTaskStore: function(store) {
        this.taskStore = Ext.StoreManager.lookup(store);
        this.taskStore.setResourceStore(this.getResourceStore());
        this.rendered && this.forEachColumn(function(column) {
            column.bindStore(new Kanban.data.ViewStore({
                masterStore: this.taskStore,
                state: column.state
            }));
        });
    },
    setResourceStore: function(store) {
        this.bindResourceStore(store);
    },
    createColumns: function() {
        var me = this;
        var states = me.taskStore.model.prototype.states;
        var colConfigs = me.columnConfigs || {};
        return Ext.Array.map(states, function(state, index) {
            return Ext.create(me.columnClass, Ext.apply({
                state: state,
                viewConfig: me.viewConfig,
                zoomLevel: me.zoomLevel,
                layout: me.fitColumns ? 'fit' : 'auto',
                manageHeight: !me.fitColumns
            }, Ext.apply(colConfigs[state] || {}, colConfigs.all)));
        });
    },
    initColumns: function(columns) {
        var me = this;
        Ext.Array.forEach(columns, function(column) {
            if (column.items) {
                me.initColumns(column.items);
            } else {
                Ext.applyIf(column, {
                    viewConfig: me.viewConfig
                });
            }
        }, this);
    },
    onColumnsAdded: function(me, component) {
        var columns = component instanceof Kanban.view.TaskColumn ? [
                component
            ] : component.query('taskcolumn');
        Ext.Array.forEach(columns, function(col) {
            col.bindStore(new Kanban.data.ViewStore({
                masterStore: this.taskStore,
                state: col.state
            }));
            this.bindViewListeners(col.view);
            // we only need to add columns and views to lists when they are being added after component is rendered
            // this listener will be invoked before we fill these properties, we can skip this part for now
            this.kanbanColumns && this.kanbanColumns.push(col);
            this.views && this.views.push(col.view);
        }, this);
    },
    onColumnsRemoved: function(me, component) {
        var column = component instanceof Kanban.view.TaskColumn && component;
        Ext.Array.remove(this.kanbanColumns, column);
        Ext.Array.remove(this.views, column.view);
    },
    afterRender: function() {
        this.callParent(arguments);
        if (!this.isReadOnly()) {
            this.setupDragDrop();
            this.initEditor();
            this.initTaskMenu();
            if (this.enableUserMenu && this.userMenu) {
                this.initUserMenu();
            }
        }
        this.views = this.query('taskview');
        this.kanbanColumns = this.query('taskcolumn');
        this.on('taskclick', this.onTaskClick, this);
        if (this.enableClipboard) {
            this.getEl().on({
                keydown: this.onKeyDown,
                scope: this
            });
        }
    },
    onKeyDown: function(event) {
        var me = this;
        if (!event.ctrlKey) {
            return;
        }
        switch (event.browserEvent.key.toLowerCase()) {
            case 'c':
                // COPY
                me.copyTasksToClipboard();
                break;
            case 'v':
                // PASTE
                me.pasteTasks();
                break;
            case 'x':
                // CUT
                me.cutTasksToClipboard();
                break;
        }
    },
    copyTasksToClipboard: function() {
        var me = this;
        me.clipboard = me.getSelectedRecords();
        me.clipboard.copy = true;
    },
    cutTasksToClipboard: function() {
        var me = this;
        me.clipboard = me.getSelectedRecords();
        me.clipboard.copy = false;
        me.clipboard.forEach(function(task) {
            var el = me.getElementForTask(task);
            el && el.addCls('sch-taskboard-cut-task');
        });
    },
    pasteTasks: function() {
        var me = this;
        var state = me.resolveState(document.activeElement);
        if (me.clipboard && state !== false) {
            me.clipboard.forEach(function(task) {
                task = me.clipboard.copy ? task.copy(null) : task;
                task.setState(state);
                if (me.clipboard.copy) {
                    me.taskStore.add(task);
                }
                var el = me.getElementForTask(task);
                el && el.removeCls('sch-taskboard-cut-task');
            });
        }
    },
    setReadOnly: function(readOnly) {
        this.readOnly = readOnly;
    },
    isReadOnly: function() {
        return this.readOnly;
    },
    bindViewListeners: function(view) {
        view.on({
            itemclick: this.getTaskListener('taskclick'),
            itemcontextmenu: this.getTaskListener('taskcontextmenu'),
            itemdblclick: this.getTaskListener('taskdblclick'),
            itemmouseenter: this.getTaskListener('taskmouseenter'),
            itemmouseleave: this.getTaskListener('taskmouseleave'),
            itemkeydown: this.getTaskListener('taskkeydown'),
            itemkeyup: this.getTaskListener('taskkeyup'),
            scope: this
        });
    },
    setupDragDrop: function() {
        var me = this;
        var ddGroup = 'kanban-dd-' + me.id,
            ddEl = me.el;
        me.dragZone = new Kanban.dd.DragZone(me.body.id, Ext.apply({
            panel: me,
            containerScroll: !me.fitColumns,
            ddGroup: ddGroup
        }, me.dragZoneConfig));
        me.dropZone = new Kanban.dd.DropZone(me.body.id, Ext.apply({
            panel: me,
            validatorFn: me.dndValidatorFn,
            validatorFnScope: me.validatorFnScope,
            ddGroup: ddGroup
        }, me.dropZoneConfig));
        me.relayEvents(me.dragZone, [
            /**
             * @event beforetaskdrag
             * Fires before a drag-drop operation is initiated, return false to cancel it
             * @param {Kanban.dd.DragZone} drag zone The drag zone
             * @param {Kanban.model.Task} task The task corresponding to the HTML node that's about to be dragged
             * @param {Ext.EventObject} e The event object
             */
            'beforetaskdrag',
            /**
             * @event taskdragstart
             * Fires when a drag-drop operation starts
             * @param {Kanban.dd.DragZone} drag zone The drag zone
             * @param {Kanban.model.Task[]} task The tasks being dragged
             */
            'taskdragstart',
            'aftertaskdrop'
        ]);
        this.relayEvents(this.dropZone, [
            /**
             * @event beforetaskdropfinalize
             * Fires before a succesful drop operation is finalized. Return false to finalize the drop at a later time.
             * To finalize the operation, call the 'finalize' method available on the context object. Pass `true` to it to accept drop or false if you want to cancel it
             * NOTE: you should **always** call `finalize` method whether or not drop operation has been canceled
             * @param {Ext.dd.DropZone} drop zone The drop zone
             * @param {Object} dragContext An object containing 'taskRecords', 'newState' and 'finalize' properties.
             * @param {Ext.EventObject} e The event object
             */
            'beforetaskdropfinalize',
            /**
             * @event taskdrop
             * Fires after a succesful drag and drop operation
             * @param {Ext.dd.DropZone} drop zone The drop zone
             * @param {Kanban.model.Task[]} task The tasks being dragged
             */
            'taskdrop',
            /**
             * @event aftertaskdrop
             * Fires after a drag n drop operation, even when drop was performed on an invalid location
             * @param {Ext.dd.DropZone} drop zone The drop zone
             */
            'aftertaskdrop'
        ]);
        this.dropZone.on('aftertaskdrop', this.onAfterTaskDrop, this);
        this.dragZone.on('taskdragstarting', this.onDragStarting, this);
    },
    resolveState: function(el) {
        // HACK: If you drag the task bar outside the IE window or iframe it crashes (missing e.target)
        if (Ext.isIE && !el) {
            el = document.body;
        }
        if (!el.dom) {
            var columnEl = Ext.fly(el);
            if (!columnEl.is('.sch-taskview')) {
                columnEl = columnEl.up('.sch-taskview');
            }
            if (columnEl && columnEl.component) {
                return columnEl.component.state;
            }
        }
        return false;
    },
    setZoomLevel: function(level) {
        this.translateToColumns('setZoomLevel', [
            level
        ]);
    },
    // Will simply return the zoom level of the first scrum column
    getZoomLevel: function() {
        return this.down('taskcolumn').getZoomLevel();
    },
    initEditor: function() {
        if (this.editor) {
            if (!this.editor.isComponent) {
                this.editor = Ext.widget(this.editor);
            }
            this.editor.init(this);
        }
    },
    initUserMenu: function() {
        if (!(this.userMenu instanceof Ext.Component)) {
            this.userMenu = Ext.ComponentManager.create(this.userMenu);
        }
        this.el.on({
            click: this.onUserImgClick,
            delegate: '.sch-user-avatar',
            scope: this
        });
    },
    initTaskMenu: function() {
        if (this.taskMenu) {
            var taskMenu = typeof this.taskMenu === 'boolean' ? {
                    xtype: 'kanban_taskmenu'
                } : this.taskMenu;
            if (Ext.isArray(taskMenu)) {
                taskMenu = {
                    items: taskMenu
                };
            }
            taskMenu.taskBoard = this;
            if (!taskMenu.isTaskMenu) {
                this.taskMenu = Ext.widget(Ext.applyIf(taskMenu, {
                    xtype: 'kanban_taskmenu'
                }));
            }
            this.taskMenu.registerListeners();
            this.addCls('sch-taskboard-with-menu');
        }
    },
    onUserImgClick: function(e, t) {
        e.stopEvent();
        if (!this.isReadOnly()) {
            this.userMenu.showForTask(this.resolveRecordByNode(t), e.getXY());
        }
    },
    resolveViewByNode: function(node) {
        var viewEl = Ext.fly(node).up('.sch-taskview');
        return (viewEl && Ext.getCmp(viewEl.id)) || null;
    },
    resolveRecordByNode: function(node) {
        var view = this.resolveViewByNode(node);
        return (view && view.getRecord(view.findItemByChild(node))) || null;
    },
    // Clear selections in other views if CTRL is not clicked
    onTaskClick: function(view, record, item, event) {
        if (!event.ctrlKey) {
            this.deselectAllInOtherViews(view);
        }
    },
    deselectAllInOtherViews: function(view) {
        this.getSelectionModel().deselectAllInOtherSelectionModels(view.getSelectionModel());
    },
    // record or id
    getElementForTask: function(task) {
        if (!(task instanceof Ext.data.Model))  {
            task = this.taskStore.getById(task);
        }
        
        var state = task.getState();
        if (state) {
            return Ext.get(this.getViewForState(state).getNode(task));
        }
    },
    getViewForState: function(state) {
        return this.down('taskview[state=' + [
            state
        ] + ']');
    },
    forEachColumn: function(fn, scope) {
        Ext.Array.each(this.query('taskcolumn'), fn, scope || this);
    },
    translateToViews: function(method, args) {
        Ext.Array.map(this.views, function(view) {
            return view[method].apply(view, args || []);
        });
    },
    translateToColumns: function(method, args) {
        Ext.Array.map(this.kanbanColumns, function(col) {
            return col[method].apply(col, args || []);
        });
    },
    translateToSelectionModels: function(method, args) {
        Ext.Array.map(this.views, function(view) {
            var sm = view.getSelectionModel();
            sm[method].apply(sm, args || []);
        });
    },
    getSelectedRecords: function() {
        return [].concat.apply([], Ext.Array.map(this.views, function(view) {
            return view.getSelectionModel().getSelection();
        }));
    },
    selectAll: function() {
        this.getSelectionModel().selectAll();
    },
    deselectAll: function() {
        this.getSelectionModel().deselectAll();
    },
    onDestroy: function() {
        Ext.destroy(this.dragZone, this.dropZone, this.userMenu, this.taskMenu, this.editor);
        this.clipboard = null;
        if (this.destroyStores) {
            this.taskStore.destroy();
            this.resourceStore.destroy();
        }
    },
    // private
    getTaskListener: function(eventName) {
        return function(view, record, item, index, event) {
            this.fireEvent(eventName, view, record, item, event);
        };
    },
    /**
     * Highlights tasks in the board based on a callback function.
     * @param {Function} callback A function returning true (to indicate a match) or false
     * @param {Object} scope Scope for callback
     * @return {Object} The 'this' object to use for the callback. Defaults to the panel instance.
     */
    highlightTasksBy: function(callback, scope) {
        if (!this.isHighlighting) {
            this.el.addCls('sch-taskboard-filtered');
            this.isHighlighting = true;
        }
        // Clear old matches first
        this.el.select('.sch-filter-match').removeCls('sch-filter-match');
        for (var i = 0,
            l = this.taskStore.getCount(); i < l; i++) {
            var rec = this.taskStore.getAt(i);
            if (callback.call(scope || this, rec)) {
                var el = this.getElementForTask(rec);
                if (el) {
                    el.addCls('sch-filter-match');
                }
            }
        }
    },
    /**
     * Clears any highlighted tasks.
     */
    clearHighlight: function() {
        this.isHighlighting = false;
        this.el.removeCls('sch-taskboard-filtered');
        this.el.select('.sch-filter-match').removeCls('sch-filter-match');
    },
    /**
     * Refreshes all the task columns manually, which can be useful after performing lots of data operations or changes.
     */
    refresh: function() {
        this.translateToViews('refresh');
        this.fireEvent('refresh', this);
    },
    /**
     * Refreshes the element of a single the task record.
     * @param {Kanban.model.Task} task the task record
     */
    refreshTaskNode: function(task) {
        var node = this.getElementForTask(task);
        if (node) {
            var view = this.resolveViewByNode(node);
            view.refreshNode(task);
        }
    },
    bindResourceStore: function(store, suppressRefresh) {
        var listeners = {
                update: this.onResourceStoreUpdate,
                refresh: this.onResourceStoreRefresh,
                remove: this.onResourceStoreRemove,
                scope: this
            };
        if (this.resourceStore) {
            this.mun(this.resourceStore, listeners);
        }
        if (store) {
            store = Ext.data.StoreManager.lookup(store);
            this.mon(store, listeners);
            this.taskStore && this.taskStore.setResourceStore(store);
            if (!suppressRefresh && this.rendered) {
                this.refresh();
            }
        }
        this.resourceStore = store;
    },
    onResourceStoreUpdate: function() {
        // can be done cheaper
        if (this.rendered) {
            this.refresh();
        }
    },
    onResourceStoreRefresh: function() {
        // can be done cheaper
        if (this.rendered) {
            this.refresh();
        }
    },
    onResourceStoreRemove: function() {
        // can be done cheaper
        if (this.rendered) {
            this.refresh();
        }
    },
    // clear selections if user is not multi selecting
    onDragStarting: function(dz, task, e) {
        var view = this.getViewForState(task.getState());
        if (!e.ctrlKey) {
            this.deselectAll();
        }
    },
    onAfterTaskDrop: function() {
        this.getSelectionModel().deselectAll();
    },
    /**
     * Returns the task menu instance (if the task board was configured to use one).
     * @return {Kanban.menu.TaskMenu}
     */
    getTaskMenu: function() {
        return this.taskMenu;
    },
    /**
     * Returns the task store instance associated with the task board.
     * @return {Kanban.data.TaskStore}
     */
    getTaskStore: function() {
        return this.taskStore;
    },
    /**
     * Returns the resource store instance associated with the task board.
     * @return {Kanban.data.ResourceStore}
     */
    getResourceStore: function() {
        return this.resourceStore;
    },
    /**
     * Returns the task editor associated with the task board.
     * @return {Ext.Component}
     */
    getTaskEditor: function() {
        return this.editor;
    },
    /**
     * Returns the selection model associated with the task board.
     * @return {Kanban.selection.TaskModel}
     */
    getSelectionModel: function() {
        if (!this.selModel) {
            this.selModel = this.createSelectionModel();
        }
        return this.selModel;
    },
    createSelectionModel: function() {
        var selModel = new Kanban.selection.TaskModel({
                panel: this
            });
        this.relayEvents(selModel, [
            /**
             * @event deselect
             * Fired after a task record is deselected
             * @param {Ext.selection.DataViewModel} this
             * @param  {Kanban.model.Task} record The deselected record
             */
            'deselect',
            /**
             * @event select
             * Fired after a task record is selected
             * @param {Ext.selection.DataViewModel} this
             * @param  {Kanban.model.Task} record The selected record
             */
            'select'
        ]);
        return selModel;
    }
}, function() {
    Ext.apply(Kanban, {
        VERSION: '2.0.30',
        LICENSE: '%LICENSE%'
    });
});

