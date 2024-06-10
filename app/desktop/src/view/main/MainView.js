
Ext.define('MyExtGenApp.view.main.MainView', {
    extend: 'Ext.Panel',
    xtype: 'mainview',
    controller: 'mainviewcontroller',


    requires: [
        'Ext.form.Panel',
        'MyExtGenApp.view.main.MainView',
        'Ext.TitleBar',
        'Ext.Button',
    ],

    layout: 'vbox',
    items: [
        {
            xtype: 'titlebar',
            title: 'Главное окно',
            docked: 'top'
        },
        {
            xtype: 'container',
            layout: 'hbox',
            items: [
                {
                    xtype: 'button',
                    text: 'Товары',
                    handler: function () {
                        var tabPanel = this.up('mainview').down('#mainTabPanel');

                        let panel = new Ext.panel.Panel({
                            title: 'Товары',
                            xtype: 'container',
                            layout: 'fit',
                            items: [
                                {
                                    xtype: 'titlebar',
                                    title: 'Список товаров',
                                    docked: 'top'
                                },
                                {
                                    xtype: 'container',
                                    docked: 'top',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            label: 'ID:',
                                            layout: 'fit',
                                            width: 300,
                                            listeners: {
                                                change: function (field, newValue) {
                                                    var grid = field.up('container').up('container').down('grid'),
                                                        store = grid.getStore();
                                                    store.clearFilter();
                                                    if (newValue) {
                                                        store.addFilter({
                                                            property: 'id',
                                                            value: newValue,
                                                            exactMatch: true
                                                        });
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            label: 'Описание:',
                                            width: 300,
                                            listeners: {
                                                change: function (field, newValue, oldValue) {
                                                    var grid = field.up('container').up('container').down('grid'),
                                                        store = grid.getStore();
                                                    store.clearFilter();
                                                    if (newValue) {
                                                        store.addFilter({
                                                            property: 'description',
                                                            value: newValue,
                                                            anyMatch: true,
                                                            caseSensitive: false
                                                        });
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'grid',
                                    itemId: 'currentGrid',
                                    columns: [
                                        {
                                            text: 'ID',
                                            type: 'int',
                                            dataIndex: 'id'
                                        },
                                        {
                                            text: 'Имя',
                                            dataIndex: 'name',
                                            type: 'str',
                                            flex: 1
                                        },
                                        {
                                            text: 'Описание',
                                            dataIndex: 'description',
                                            type: 'str',
                                            flex: 2
                                        },
                                        {
                                            text: 'Цена',
                                            type: 'float',
                                            dataIndex: 'price'
                                        },
                                        {
                                            text: 'Кол-во',
                                            type: 'int',
                                            dataIndex: 'quantity',
                                            tdCls: 'test',
                                            renderer : function(value, meta, e, e1) {
                                                if(value === 0) {
                                                    e1.setStyle('background-color:red')
                                                } else {
                                                    e1.setStyle('background-color:white')
                                                }
                                                return value;
                                            },
                                        }
                                    ],
                                    store: {
                                        fields: ['id', 'name', 'description', 'price', 'quantity'],
                                        data: [
                                            {
                                                id: 1,
                                                name: 'Продукт 1',
                                                description: 'Синий',
                                                price: 10,
                                                quantity: 100
                                            },
                                            {
                                                id: 2,
                                                name: 'Продукт 2',
                                                description: 'Желтый',
                                                price: 20,
                                                quantity: 200
                                            },
                                            {
                                                id: 3,
                                                name: 'Продукт 3',
                                                description: 'Красный',
                                                price: 30,
                                                quantity: 0
                                            }
                                        ]
                                    }
                                }
                            ]
                        });

                        debugger

                        panel.addListener({
                            click: {
                                element: 'element',
                                fn: function (e, t) {
                                    let rowIndex = t.closest('.x-gridrow')?.getAttribute('data-recordindex');

                                    if (!rowIndex) {
                                        return;
                                    }

                                    let record = panel.items.getByKey('currentGrid').getStore().getAt(rowIndex);

                                    if (record.data.name === t.textContent) {
                                        //if true -> we hit the correct target


                                        var formPanel = Ext.create('Ext.form.Panel', {
                                            itemId: 'currentForm',
                                            title: 'Карточка товара: ',
                                            extend: 'Ext.form.Panel',
                                            xtype: 'form-panel',
                                            items: [
                                                {
                                                    label:'ID',
                                                    xtype: 'textfield',
                                                    name: 'id',
                                                    readOnly: true,
                                                    value: record.get('id')
                                                },

                                                {label: 'Имя',
                                                xtype: 'textfield',
                                                name: 'name',
                                                readOnly: true,
                                                value: record.get('name')
                                                }, {label: 'Описание',
                                                xtype: 'textfield',
                                                name: 'description',
                                                readOnly: true,
                                                value: record.get('description')
                                                }, {label: 'Цена',
                                                xtype: 'numberfield',
                                                name: 'price',
                                                value: record.get('price')
                                                }, {label: 'Кол-во',
                                                xtype: 'numberfield',
                                                name: 'quantity',
                                                value: record.get('quantity')
                                            }],
                                            buttons: [
                                                {
                                                    text: 'Сохранить',
                                                    handler: function (context) {
                                                        var form = context.up('#currentForm');
                                                        if (form.isValid()) {
                                                            var values = form.getValues();

                                                            if(values.price >= 0 &&
                                                                values.quantity >= 0 &&
                                                                Number.isInteger(values.quantity)) {
                                                                record.set(values);
                                                            }
                                                            popup.close();
                                                        }

                                                    }
                                                },
                                                {
                                                    text: 'Отмена',
                                                    handler: function () {
                                                        popup.close();

                                                    }
                                                },

                                            ]
                                        });


                                        var popup = Ext.create('Ext.window.Window', {
                                            width: 700,
                                            height: 500,
                                            modal: true,
                                            items: [formPanel]
                                        });
                                        popup.show();

                                    }


                                }
                            },
                        });


                        tabPanel.add(panel);
                    },
                }, {
                    xtype: 'button',
                    text: 'Выход',

                    handler: function () {
                        localStorage.removeItem('authenticated');
                        Ext.Viewport.setActiveItem({xtype: 'homeview'});
                    },
                },

            ]
        },
        {
            xtype: 'tabpanel',
            itemId: "mainTabPanel",
            flex: 1,
            items: []
        },
    ],
});
