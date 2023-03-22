export const menuItems = [
    {
        id: 1,
        label: "menuitems.menu.text",
        isTitle: true
    },
    {
        id: 2,
        label: "menuitems.dashboards.text",
        icon: "bx-home-circle",
        subItems: [
            {
                id: 3,
                label: "menuitems.dashboards.list.home",
                link: "/home",
                parentId: 2
            },
        ]
    },
    {
        id: 7,
        isLayout: true
    },
    {
        id: 8,
        label: "menuitems.apps.text",
        isTitle: true
    },
    {
        id: 9,
        label: "menuitems.positions.text",
        icon: "bx-calendar",
        link: "/positions"
    },
    {
        id: 10,
        label: "menuitems.candidates.text",
        icon: "bx-calendar",
        link: "/candidates"
    },
    
    {
        id: 12,
        label: "menuitems.ecommerce.text",
        icon: "bx-store",
        subItems: [
            {
                id: 13,
                label: "menuitems.ecommerce.list.products",
                link: "/ecommerce/products",
                parentId: 12
            },
            {
                id: 14,
                label: "menuitems.ecommerce.list.productdetail",
                link: "/ecommerce/product-detail/1",
                parentId: 12
            },
            {
                id: 15,
                label: "menuitems.ecommerce.list.orders",
                link: "/ecommerce/orders",
                parentId: 12
            },
            {
                id: 16,
                label: "menuitems.ecommerce.list.customers",
                link: "/ecommerce/customers",
                parentId: 12
            },
            {
                id: 17,
                label: "menuitems.ecommerce.list.cart",
                link: "/ecommerce/cart",
                parentId: 12
            },
            {
                id: 18,
                label: "menuitems.ecommerce.list.checkout",
                link: "/ecommerce/checkout",
                parentId: 12
            },
            {
                id: 19,
                label: "menuitems.ecommerce.list.shops",
                link: "/ecommerce/shops",
                parentId: 12
            },
            {
                id: 20,
                label: "menuitems.ecommerce.list.addproduct",
                link: "/ecommerce/add-product",
                parentId: 12
            }
        ]
    },
];

