/**
 * Base class for a filter type used by the {@link Ext.grid.plugin.filterbar.FilterBar plugin}
 */
Ext.define('MyApp.override.plugin.filterbar.filters.Base', {
   override: 'Ext.grid.plugin.filterbar.filters.Base',

    factoryConfig: {
        type: 'grid.filterbar'
    },

    onOperatorChange: function(field, operator) {
        var value = field.getValue(),
            emptyOp = (operator === 'empty' || operator === 'nempty');

        this.setOperator(operator);

        if (!Ext.isEmpty(value) && !emptyOp) {
            field.setValue(value);
        } else {
            field.setValue();
            field.getTrigger('clear').setHidden(true);
        }
    }

});
