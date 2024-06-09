Ext.define('MyExtGenApp.view.goods.GoodsPage', {
    extend: 'Ext.Panel',
    xtype: 'goodspage',
    config: {
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                title: 'Goods List'
            },
            {
                xtype: 'list',
                store: {
                    data: [
                        { name: 'Item 1' },
                        { name: 'Item 2' },
                        { name: 'Item 3' }
                    ]
                },
                itemTpl: '{name}'
            }
        ]
    }
});