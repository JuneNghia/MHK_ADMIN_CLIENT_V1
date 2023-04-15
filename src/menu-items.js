const menuItems = {
  items: [
    {
      id: 'dashboard',
      title: 'Tổng quan',
      type: 'group',
      children: [
        {
          id: 'dashboard-sell',
          title: 'Bán hàng',
          type: 'item',
          icon: 'feather icon-database',
          url: '/app/dashboard/default'
        },
        {
          id: 'dashboard-crm',
          title: 'CRM',
          type: 'item',
          icon: 'feather icon-life-buoy',
          url: '/app/dashboard/crm'
        },
      ]
    },
    {
      id: 'sell-management',
      title: 'Quản lý bán hàng',
      type: 'group',
      children: [
        {
          id: 'orders',
          title: 'Đơn hàng',
          type: 'collapse',
          icon: 'feather icon-clipboard',
          children: [
            {
              id: 'order-create',
              title: 'Tạo đơn và giao hàng',
              type: 'item',
              url: '/app/sell-management/orders/create'
            },
            {
              id: 'order-list',
              title: 'Danh sách đơn hàng',
              type: 'item',
              url: '/app/sell-management/orders/'
            },
            {
              id: 'order-return',
              title: 'Khách trả hàng',
              type: 'item',
              url: '/basic/alert'
            }
          ]
        },
        {
          id: 'delievery',
          title: 'Vận chuyển',
          type: 'collapse',
          icon: 'feather icon-truck',
          children: [
            {
              id: 'alert',
              title: 'Tổng quan',
              type: 'item',
              url: '/basic/alert'
            },
            {
              id: 'alert',
              title: 'Quản lý vận đơn',
              type: 'item',
              url: '/basic/alert'
            },
            {
              id: 'alert',
              title: 'Đối soát COD và phí',
              type: 'item',
              url: '/basic/alert'
            },
            {
              id: 'alert',
              title: 'Kết nối đối tác',
              type: 'item',
              url: '/basic/alert'
            },
            {
              id: 'alert',
              title: 'Cấu hình giao hàng',
              type: 'item',
              url: '/basic/alert'
            }
          ]
        },
        {
          id: 'products',
          title: 'Sản phẩm',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'product-list',
              title: 'Danh sách sản phẩm',
              type: 'item',
              url: '/app/sell-management/products'
            },
            {
              id: 'alert',
              title: 'Quản lý kho',
              type: 'item',
              url: '/app/sell-management'
            },
            {
              id: 'alert',
              title: 'Đặt hàng nhập',
              type: 'item',
              url: '/basic/alert'
            },
            {
              id: 'alert',
              title: 'Nhập hàng',
              type: 'item',
              url: '/basic/alert'
            },
            {
              id: 'alert',
              title: 'Kiểm hàng',
              type: 'item',
              url: '/basic/alert'
            },
            {
              id: 'alert',
              title: 'Chuyển hàng',
              type: 'item',
              url: '/basic/alert'
            },
            {
              id: 'alert',
              title: 'Nhà cung cấp',
              type: 'item',
              url: '/basic/alert'
            },
            {
              id: 'alert',
              title: 'Điều chỉnh giá vốn',
              type: 'item',
              url: '/basic/alert'
            }
          ]
        },
        {
          id: 'cash-book',
          title: 'Sổ quỹ',
          type: 'collapse',
          icon: 'feather icon-dollar-sign',
          children: [
            {
              id: 'alert',
              title: 'Phiếu thu',
              type: 'item',
              url: '/basic/alert'
            },
            {
              id: 'alert',
              title: 'Phiếu chi',
              type: 'item',
              url: '/basic/alert'
            },
            {
              id: 'alert',
              title: 'Sổ quỹ',
              type: 'item',
              url: '/basic/alert'
            }
          ]
        },
        {
          id: 'customers',
          title: 'Khách hàng',
          type: 'item',
          icon: 'feather icon-user',
          url: '/app/sell-management/customers'
        },
      ]
    },
    {
      id: 'advance',
      title: 'Nâng cao',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'applications',
          title: 'Ứng dụng',
          type: 'item',
          icon: 'feather icon-grid',
          url:'/app/application'
        },
        {
          id: 'configurations',
          title: 'Cấu hình',
          type: 'item',
          icon: 'feather icon-settings',
          url:'/app/configurations'
        },
      ],
    }
  ]
};

export default menuItems;
