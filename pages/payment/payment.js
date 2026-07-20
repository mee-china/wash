// pages/payment/payment.js
Page({
  data: {
    masterName: '',
    serviceName: '',
    amount: 0,
    date: '',
    slot: '',
    orderId: '',
    isPaying: false,
    paySuccess: false,
  },

  onLoad(options) {
    const { masterName, serviceName, amount, date, slot } = options;
    this.setData({
      masterName: masterName || '',
      serviceName: serviceName || '',
      amount: parseFloat(amount) || 0,
      date: date || '',
      slot: slot || '',
      orderId: 'ORD' + Date.now().toString().slice(-8),
    });
  },

  onConfirmPay() {
    this.setData({ isPaying: true });

    // 模拟调起微信支付
    wx.showLoading({ title: '正在调起支付...' });

    setTimeout(() => {
      wx.hideLoading();

      // 模拟支付成功
      this.setData({
        isPaying: false,
        paySuccess: true,
      });

      wx.showToast({
        title: '支付成功',
        icon: 'success',
        duration: 1500,
        success: () => {
          setTimeout(() => {
            wx.redirectTo({
              url: `/pages/order-detail/order-detail?orderId=${this.data.orderId}&fromPayment=1`
            });
          }, 1500);
        }
      });
    }, 2000);
  },

  onPayFailed() {
    wx.hideLoading();
    this.setData({ isPaying: false });
    wx.showToast({ title: '支付取消', icon: 'none' });
  },

  onContactService() {
    wx.showToast({ title: '客服电话：400-000-0000', icon: 'none' });
  }
});
