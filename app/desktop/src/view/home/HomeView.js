Ext.define('MyExtGenApp.view.home.HomeView', {
	xtype: 'homeview',
	cls: 'homeview',
	controller: 'homeviewcontroller',
	viewModel: { type: 'homeviewmodel' },
	requires: [
		'Ext.form.Panel',
		'MyExtGenApp.view.home.HomeViewController'
	],
	extend: 'Ext.Container',
	scrollable: true,
	layout: 'center',

	items: [{
		xtype: 'formpanel',
		title: 'Авторизация',
		itemId: 'loginForm',
		width: 400,
		bodyPadding: 20,
		defaults: {
			xtype: 'textfield',
			anchor: '100%',
			allowBlank: false,
			labelAlign: 'top',
			margin: '10 0'
		},
		items: [{
			xtype: 'textfield',
			placeholder: 'Логин',
			name: 'username',
			fieldLabel: 'Username'
		}, {
			xtype: 'passwordfield',
			placeholder: 'Пароль',
			name: 'password',
			fieldLabel: 'Password',
			inputType: 'password'
		}],
		buttons: [{
			text: 'Войти',
			formBind: true,
			handler: 'onLoginClick'
		}]
	}]
});