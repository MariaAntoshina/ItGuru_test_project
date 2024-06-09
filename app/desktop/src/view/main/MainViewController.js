Ext.define('MyExtGenApp.view.main.MainViewController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.mainviewcontroller',

	onGoodsButtonTap: function() {
		this.redirectTo('goodspage');
	},

	onExitButtonTap: function() {
		localStorage.removeItem('authenticated');

		this.redirectTo('homeview');
	},
	showItemDetails: function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		debugger

	}
});