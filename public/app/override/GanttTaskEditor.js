/**
 * Created by kko on 2019-08-23.
 */
Ext.define('MyApp.override.GanttTaskEditor', {
    override: 'Gnt.plugin.taskeditor.TaskEditor',

    assignmentGridConfig: {
        addResources: false
    },

    width: 700
});