Ext.define('MyExtGenApp.view.home.HomeViewController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.homeviewcontroller',

	redirectToMainView: function() {

		Ext.Viewport.setActiveItem({xtype: 'mainview'});

	},

	onLoginClick: function(button) {


		const formPannel = button.up('homeview').down('formpanel');
		const values = formPannel.getValues();

			if (values.username === 'admin' && values.password === 'padmin') {

				Ext.Msg.alert('Success','Login successful', () => {
					this.redirectToMainView();
					localStorage.setItem('authenticated', 'true')

				});
			} else {
				Ext.Msg.alert('Failed', 'Invalid username or password.');
			}
		}
});

