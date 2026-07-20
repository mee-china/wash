// pages/order-detail/order-detail.js
Page({
  data: {
    order: null,
    isLoading: true,
    fromPayment: false,
    showCancelModal: false,
    cancelReason: '',
    cancelReasons: ['计划变更', '师傅接单慢', '找到其他服务', '价格原因', '操作失误', '其他'],
  },

  onLoad(options) {
    const { orderId, fromPayment, id } = options;
    this.setData({ fromPayment: fromPayment === '1' });

    if (id) {
      this.loadOrder(parseInt(id));
    } else if (orderId) {
      // 使用模拟第一个订单
      this.loadOrder(1001);
    }
  },

  loadOrder(id) {
    const app = getApp();
    const mock = app.getMockData('mockData');
    const order = mock.orders.find(o => o.id === id);
    if (order) {
      this.setData({ order, isLoading: false });
    }
  },

  // 订单状态 0:待接单 1:已接单 2:师傅出发 3:已到达/服务中 4:已完成 5:已取消
  getStatusSteps(status) {
    const steps = ['待接单', '已接单', '师傅出发', '已到达', '服务中', '已完成'];
    return steps.map((s, i) => ({
      label: s,
      done: i <= status,
      active: i === status,
    }));
  },

  onTapContact() {
    wx.makePhoneCall({
      phoneNumber: '400-000-0000',
      fail: () => {
        wx.showToast({ title: '联系客服', icon: 'none' });
      }
    });
  },

  onTapCancel() {
    this.setData({ showCancelModal: true });
  },

  onCloseCancelModal() {
    this.setData({ showCancelModal: false, cancelReason: '' });
  },

  onSelectCancelReason(e) {
    const { reason } = e.currentTarget.dataset;
    this.setData({ cancelReason: reason });
  },

  onConfirmCancel() {
    if (!this.data.cancelReason) {
      wx.showToast({ title: '请选择取消原因', icon: 'none' });
      return;
    }
    wx.showModal({
      title: '确认取消',
      content: '确定要取消该订单吗？服务开始前30分钟可全额退款。',
      success: (res) => {
        if (res.confirm) {
          this.setData({ showCancelModal: false });
          wx.showToast({ title: '订单已取消，退款处理中', icon: 'success' });
          // 刷新订单状态
        }
      }
    });
  },

  onTapReorder() {
    const order = this.data.order;
    if (order) {
      wx.navigateTo({ url: `/pages/master-detail/master-detail?id=${order.masterId}` });
    }
  },

  onTapReview() {
    const order = this.data.order;
    if (order) {
      wx.navigateTo({ url: `/pages/review/review?orderId=${order.id}` });
    }
  },

  onTapViewLocation() {
    wx.showToast({ title: '师傅位置追踪功能', icon: 'none' });
  }
});
