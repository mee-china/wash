// pages/orders/orders.js
Page({
  data: {
    tabs: [
      { key: 'all', label: '全部', count: 0 },
      { key: 'waiting', label: '待服务', count: 0 },
      { key: 'ongoing', label: '进行中', count: 0 },
      { key: 'done', label: '已完成', count: 0 },
    ],
    activeTab: 'all',
    orders: [],
    filteredOrders: [],
    isLoading: true,
  },

  onLoad() {
    this.loadOrders();
  },

  onShow() {
    // 页面显示时刷新订单状态
    if (this.data.orders.length > 0) {
      this.loadOrders();
    }
  },

  onPullDownRefresh() {
    this.loadOrders(() => {
      wx.stopPullDownRefresh();
    });
  },

  loadOrders(callback) {
    const app = getApp();
    const mock = app.getMockData('mockData');

    setTimeout(() => {
      const orders = mock.orders;
      const tabs = this.data.tabs.map(tab => {
        let count = 0;
        if (tab.key === 'waiting') count = orders.filter(o => o.status === 0 || o.status === 1).length;
        else if (tab.key === 'ongoing') count = orders.filter(o => o.status === 2 || o.status === 3).length;
        else if (tab.key === 'done') count = orders.filter(o => o.status === 4 || o.status === 5).length;
        return { ...tab, count };
      });

      this.setData({
        orders,
        tabs,
        isLoading: false,
      });
      this.filterOrders();
      if (callback) callback();
    }, 500);
  },

  filterOrders() {
    const { orders, activeTab } = this.data;
    let filtered = [];
    switch (activeTab) {
      case 'waiting':
        filtered = orders.filter(o => o.status === 0 || o.status === 1);
        break;
      case 'ongoing':
        filtered = orders.filter(o => o.status === 2 || o.status === 3);
        break;
      case 'done':
        filtered = orders.filter(o => o.status === 4 || o.status === 5);
        break;
      default:
        filtered = orders;
    }
    this.setData({ filteredOrders: filtered });
  },

  onTabSwitch(e) {
    const { key } = e.currentTarget.dataset;
    this.setData({ activeTab: key }, () => {
      this.filterOrders();
    });
  },

  onTapOrder(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/order-detail/order-detail?id=${id}` });
  },

  onTapContact(e) {
    const { id } = e.currentTarget.dataset;
    wx.showToast({ title: '已发起联系', icon: 'none' });
  },

  onTapCancel(e) {
    const { id } = e.currentTarget.dataset;
    wx.showModal({
      title: '取消订单',
      content: '确定要取消该订单吗？服务开始前30分钟可免费取消。',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({ title: '订单已取消', icon: 'success' });
        }
      }
    });
  },

  onTapReview(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/review/review?orderId=${id}` });
  },

  onTapReorder(e) {
    const { id } = e.currentTarget.dataset;
    const order = this.data.orders.find(o => o.id === id);
    if (order) {
      wx.navigateTo({ url: `/pages/master-detail/master-detail?id=${order.masterId}` });
    }
  },

  onTapViewLocation(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/order-detail/order-detail?id=${id}` });
  }
});
