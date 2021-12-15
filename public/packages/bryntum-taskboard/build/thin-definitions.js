//@define Kanban.data.ResourceStore
//@require Sch.data.ResourceStore

//@define Kanban.data.TaskStore
//@require Sch.data.EventStore

//@define Kanban.data.ViewStore
//@require Ext.data.Store

//@define Kanban.data.mixin.StoreView

//@define Kanban.dd.DragZone
//@require Ext.dd.DragZone
//@require Ext.util.Point

//@define Kanban.dd.DropZone
//@require Ext.dd.DropZone

//@define Kanban.editor.Base

//@define Kanban.editor.SimpleEditor
//@require Ext.Editor

//@define Kanban.field.AddNew
//@require Ext.form.TextField

//@define Kanban.field.ColumnFilter
//@require Ext.form.ComboBox
//@require Ext.data.JsonStore

//@define Kanban.field.TaskFilter
//@require Ext.form.TextField
//@require Ext.util.Filter

//@define Kanban.field.TaskHighlight
//@require Ext.form.TextField

//@define Kanban.locale.En
//@require Sch.locale.Locale

//@define Kanban.menu.TaskMenu
//@require Ext.menu.Menu
//@require Kanban.menu.TaskMenuItems

//@define Kanban.menu.TaskMenuItems
//@require Kanban.editor.SimpleEditor
//@require Kanban.menu.UserMenu

//@define Kanban.menu.UserMenu
//@require Ext.menu.Menu

//@define Kanban.menu.UserPicker
//@require Ext.view.View

//@define Kanban.menu.UserPictureMenu
//@require Ext.menu.Menu
//@require Kanban.menu.UserPicker

//@define Kanban.model.Resource
//@require Sch.model.Resource

//@define Kanban.model.Task
//@require Sch.model.Event

//@define Kanban.patch.EXTJS_23846
//@require Sch.util.Patch
//@require Ext.dom.Element
//@require Ext.event.publisher.Gesture

//@define EXTJS_23846.Element

//@define EXTJS_23846.Gesture

//@define Kanban.selection.TaskModel
//@require Ext.mixin.Observable

//@define Kanban.template.Task
//@require Ext.XTemplate

//@define Kanban.view.TaskBoard
//@require Ext.Panel
//@require Sch.patches.View
//@require Kanban.patch.EXTJS_23846
//@require Kanban.locale.En
//@require Kanban.data.TaskStore
//@require Kanban.data.ResourceStore
//@require Kanban.view.TaskColumn
//@require Kanban.dd.DropZone
//@require Kanban.dd.DragZone
//@require Kanban.editor.SimpleEditor
//@require Kanban.field.AddNew
//@require Kanban.menu.UserMenu
//@require Kanban.menu.TaskMenu
//@require Kanban.selection.TaskModel

//@define Kanban.view.TaskColumn
//@require Ext.Panel
//@require Ext.layout.container.Fit
//@require Kanban.view.TaskView

//@define Kanban.view.TaskView
//@require Ext.view.View
//@require Kanban.template.Task
//@require Kanban.data.ViewStore
