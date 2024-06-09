Ext.define('MyExtGenApp.view.main.MainView', {
    extend: 'Ext.Panel',
    xtype: 'mainview',
    controller: 'mainviewcontroller',
    // viewModel: { type: 'homeviewmodel' },

    // scrollable: true,


    requires: [
        'Ext.form.Panel',
        'MyExtGenApp.view.main.MainView',
        'Ext.TitleBar',
        'Ext.Button',

        // 'Ext.layout.container.HBox'
    ],

    layout: 'vbox', // Vertical Box layout for main container
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
                        var tabPanel = this.up('mainview').down('#mainTabPanel'); // Reference to the tab panel

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
                                            label: 'Filter by Id:',
                                            layout: 'fit',
                                            width: 300,
                                            listeners: {
                                                change: function (field, newValue, oldValue) {
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
                                            label: 'Filter by Description:',
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
                                            text: 'Name',
                                            dataIndex: 'name',
                                            type: 'str',
                                            flex: 1
                                        },
                                        {
                                            text: 'Description',
                                            dataIndex: 'description',
                                            type: 'str',
                                            flex: 2
                                        },
                                        {
                                            text: 'Price',
                                            type: 'float',
                                            dataIndex: 'price'
                                        },
                                        {
                                            text: 'Quantity',
                                            type: 'int',
                                            dataIndex: 'quantity'
                                        }
                                    ],
                                    store: {
                                        fields: ['id', 'name', 'description', 'price', 'quantity'],
                                        data: [
                                            {
                                                id: 1,
                                                name: 'Product 1',
                                                description: 'Description 1',
                                                price: 10.2,
                                                quantity: 100
                                            },
                                            {
                                                id: 2,
                                                name: 'Product 2',
                                                description: 'Description 2',
                                                price: 20,
                                                quantity: 200
                                            },
                                            {
                                                id: 3,
                                                name: 'Product 3',
                                                description: 'Description 3',
                                                price: 30,
                                                quantity: 300
                                            }
                                        ]
                                    }
                                }
                            ]
                        });

                        panel.addListener({
                            click: {
                                element: 'element', //bind to the underlying el property on the panel
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
                                            title: 'Карточка товара: ', // Set the title of the form panel
                                            items: [{
                                                xtype: 'textfield',
                                                fieldLabel: 'Name',
                                                name: 'name',
                                                value: record.get('name') // Set the initial value of the textfield to the name
                                            }, {
                                                xtype: 'textfield',
                                                fieldLabel: 'Description',
                                                name: 'description',
                                                value: record.get('description') // Set the initial value of the textfield to the description
                                            }, {
                                                xtype: 'numberfield',
                                                fieldLabel: 'Price',
                                                name: 'price',
                                                value: record.get('price') // Set the initial value of the numberfield to the price
                                            }, {
                                                xtype: 'numberfield',
                                                fieldLabel: 'Quantity',
                                                name: 'quantity',
                                                value: record.get('quantity') // Set the initial value of the numberfield to the quantity
                                            }],
                                            buttons: [
                                                {
                                                    text: 'Update',
                                                    handler: function (context) {

                                                        var form = context.up('#currentForm');
                                                        if (form.isValid()) {

                                                            var values = form.getValues();

                                                            record.set(values);


                                                            popup.close();
                                                        }
                                                    }
                                                },
                                                {
                                                    text: 'Cancel',
                                                    handler: function () {
                                                        popup.close();

                                                    }
                                                },

                                            ]
                                        });


                                        var popup = Ext.create('Ext.window.Window', {
                                            width: 600,
                                            height: 300,
                                            modal: true, // Make the popup modal
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
                    text: 'Exit',
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
