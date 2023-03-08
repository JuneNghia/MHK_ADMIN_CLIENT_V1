const menuItems = {
  items: [
    {
      id: 'navigation',
      title: 'Tổng quan',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Tổng quan',
          type: 'item',
          icon: 'feather icon-home',
          url: '/app/dashboard/default'
        },
        {
          id: 'message',
          title: 'Tin nhắn',
          type: 'item',
          classes: 'nav-item',
          url: '/message',
          icon: 'feather icon-message-circle'
        }
      ]
    },
    {
      id: 'sell-management',
      title: 'Quản lý bán hàng',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'orders',
          title: 'Đơn hàng',
          type: 'collapse',
          icon: 'feather icon-clipboard',
          children: [
            {
              id: 'alert',
              title: 'Tạo đơn và giao hàng',
              type: 'item',
              url: '/app/sell-management/orders/create'
            },
            {
              id: 'alert',
              title: 'Danh sách đơn hàng',
              type: 'item',
              url: '/basic/alert'
            },
            {
              id: 'alert',
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
          icon: 'feather icon-users',
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
              id: 'alert',
              title: 'Danh sách sản phẩm',
              type: 'item',
              url: '/basic/alert'
            },
            {
              id: 'alert',
              title: 'Quản lý kho',
              type: 'item',
              url: '/basic/alert'
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
          icon: 'feather icon-monitor',
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
          type: 'collapse',
          icon: 'feather icon-users',
          children: [
            {
              id: 'list-customer',
              title: 'Danh sách khách hàng',
              type: 'item',
              url: '/app/sell-management/customers'
            },
            {
              id: 'alert',
              title: 'Nhóm khách hàng',
              type: 'item',
              url: '/basic/alert'
            }
          ]
        },
        {
          id: 'users',
          title: 'Nhân viên',
          type: 'item',
          icon: 'feather icon-users',
          url:'/app/sell-management/users/list'
        }
      ]
    }
  ]
};

export default menuItems;
