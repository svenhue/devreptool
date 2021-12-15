/**
 * Created by kko on 16.06.17.
 */

Ext.define('MyApp.lib.ux.PDFViewer', {
	extend: 'Ext.Component',

	xtype: 'PDFViewer',

	requires: [
		'Ext.layout.container.Fit'
	],

	layout: 'fit',
	frame: false,
	border: false,
	html: '',
	src: null,
	params: null,

	style: 'background-color: #404040;',

	initComponent: function () {
		var me = this;
		me.callParent(arguments);

		if (this.src) {
			this.setSrc(this.src, this.params);
		}
	},

	setSrc: function (fileName, params) {
		this.src = fileName;
		var url = fileName;
		if (params) {
			var counter = 1;
			for (var prop in params) {
				if (counter == 1) {
					url = url + '?' + prop + '=' + params[prop];
					counter = counter + 1;
				} else {
					url = url + '&' + prop + '=' + params[prop];
				}
			}
		}

		if (url.length > 0) {
			if (url.substring(1, 4).toLowerCase() !== 'http') {
				url = url;
			}
		}

		url = encodeURIComponent(url);

		this.update('<iframe style="width: 100%; height: 100%; border: none" src="' + 'lib/pdf.js/web/viewer.html?_dc=' + new Date().getTime() + '&file=' + url + '"></iframe>');
	},

	getSrc: function () {
		return this.src;
	}
});