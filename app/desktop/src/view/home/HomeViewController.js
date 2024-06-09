Ext.define('MyExtGenApp.view.home.HomeViewController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.homeviewcontroller',

	redirectToMainView: function() {
		debugger

		Ext.Viewport.setActiveItem({xtype: 'mainview'});
		// Redirect to the desired route using ExtJS routing mechanism
		// this.redirectTo('mainview');
	},


	onLoginClick: function(button) {

		// this.redirectToMainView()


		const formPannel = button.up('homeview').down('formpanel');
		const values = formPannel.getValues();

			if (values.username === 'admin' && values.password === 'padmin') {

				Ext.Msg.alert('Success','Login successful', () => {
					this.redirectToMainView();
					localStorage.setItem('authenticated', 'true')
// debugger
// 					window.location.href = 'http://localhost:1962/#mainview';

					// this.getApplication().getController('homeviewcontroller').redirectToMainView();
				});// 	// Simulate successful login
				// Ext.Msg.alert('Success', 'Login successful');
				// Store the authentication flag in localStorage
				// localStorage.setItem('authenticated', 'true');
				// // // // Redirect to main page
				// debugger
				// this.redirectTo('mainview');
			} else {
				Ext.Msg.alert('Failed', 'Invalid username or password.');
			}
		}
});

