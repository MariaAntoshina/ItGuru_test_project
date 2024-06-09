Ext.define('MyExtGenApp.Application', {
	extend: 'Ext.app.Application',
	name: 'MyExtGenApp',
	requires: ['MyExtGenApp.*'],
	defaultToken: 'homeview',

	launch: function () {
		this.removeSplash();

		if (this.isAuthenticated()) {
			this.redirectTo('mainview');
		} else {
			Ext.Viewport.add({xtype: 'homeview'});
		}
	},

	isAuthenticated: function() {
		return localStorage.getItem('authenticated') === 'true';
	},

	removeSplash: function () {
		Ext.getBody().removeCls('launching');
		var elem = document.getElementById('splash');
		if (elem) {
			elem.parentNode.removeChild(elem);
		}
	},

	onAppUpdate: function () {
		Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
			function (choice) {
				if (choice === 'yes') {
					window.location.reload();
				}
			}
		);
	},

	routes: {
		'homeview': 'showHomeView',
		'mainview': 'showMainView'
	},

	showHomeView: function() {
		Ext.Viewport.add({xtype: 'homeview'});
	},

	showMainView: function() {
		Ext.Viewport.add({xtype: 'mainview'});
	}
});
