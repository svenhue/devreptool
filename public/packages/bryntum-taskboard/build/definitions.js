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

//@define Robo.data.Model
//@require Ext.Mixin

//@define Robo.data.Store
//@require Ext.Mixin
//@require Ext.util.Observable

//@define Sch.data.EventStore
//@require Ext.data.Store

//@define Sch.data.ResourceStore
//@require Ext.data.Store

//@define Sch.data.mixin.CacheHintHelper
//@require Ext.Mixin

//@define Sch.data.mixin.EventStore
//@require Ext.Mixin
//@require Sch.util.Date
//@require Sch.data.util.IdConsistencyManager
//@require Sch.data.util.ModelPersistencyManager
//@require Sch.data.util.ResourceEventsCache

//@define Sch.data.mixin.RecurringEvents
//@require Ext.Mixin
//@require Sch.model.Recurrence
//@require Sch.data.util.DelayedCalls
//@require Sch.data.util.recurrence.DailyIterator
//@require Sch.data.util.recurrence.WeeklyIterator
//@require Sch.data.util.recurrence.MonthlyIterator
//@require Sch.data.util.recurrence.YearlyIterator

//@define Sch.data.mixin.ResourceStore

//@define Sch.data.mixin.UniversalModelGetter

//@define Sch.data.util.DelayedCalls

//@define Sch.data.util.IdConsistencyManager

//@define Sch.data.util.ModelPersistencyManager

//@define Sch.data.util.ResourceEventsCache
//@require Sch.util.Cache
//@require Ext.data.Model

//@define Sch.data.util.recurrence.AbstractIterator

//@define Sch.data.util.recurrence.DailyIterator
//@require Sch.data.util.recurrence.AbstractIterator
//@require Sch.util.Date

//@define Sch.data.util.recurrence.DayRuleEncoder

//@define Sch.data.util.recurrence.MonthlyIterator
//@require Sch.data.util.recurrence.AbstractIterator
//@require Sch.util.Date
//@require Sch.data.util.recurrence.DayRuleEncoder

//@define Sch.data.util.recurrence.WeeklyIterator
//@require Sch.data.util.recurrence.AbstractIterator
//@require Sch.util.Date
//@require Sch.data.util.recurrence.DayRuleEncoder

//@define Sch.data.util.recurrence.YearlyIterator
//@require Sch.data.util.recurrence.AbstractIterator
//@require Sch.util.Date
//@require Sch.data.util.recurrence.DayRuleEncoder

//@define Sch.locale.En
//@require Sch.locale.Locale

//@define Sch.locale.Locale

//@define Sch.mixin.Localizable
//@require Ext.Mixin
//@require Sch.locale.En

//@define Sch.model.Assignment
//@require Sch.model.Customizable

//@define Sch.model.Customizable
//@require Ext.data.Model
//@require Sch.util.Date

//@define Sch.model.Event
//@require Sch.model.Range
//@uses Sch.util.Date

//@define Sch.model.Range
//@require Sch.model.Customizable
//@require Sch.util.Date
//@require Sch.patches.DateFieldConvertDate

//@define Sch.model.Recurrence
//@require Sch.model.Customizable

//@define Sch.model.Resource
//@require Sch.model.Customizable

//@define Sch.model.mixin.RecurrableEvent
//@require Ext.Mixin
//@require Sch.model.Recurrence

//@define Sch.patches.DateFieldConvertDate
//@require Sch.util.Patch

//@define Sch.patches.View
//@require Sch.util.Patch

//@define Sch.util.Cache

//@define Sch.util.Date
//@require Ext.Date

//@define Sch.util.Patch
//@uses Ext.util.Cookies
//@uses Ext.data.Connection
//@uses Ext.Component
