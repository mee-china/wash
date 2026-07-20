// pages/profile/profile.js
Page({
  data: {
    userInfo: {
      avatar: '👤',
      nickName: '微信用户',
      phone: '138****5678',
      joinDate: '2026年7月',
    },
    savings: 46,
    quickEntries: [
      { icon: '📋', label: '我的订单', color: 'primary', url: '/pages/orders/orders' },
      { icon: '🧴', label: '次卡套餐', color: 'accent', url: '' },
      { icon: '❤️', label: '收藏师傅', color: 'success', url: '/pages/profile/profile' },
      { icon: '🎫', label: '优惠券', color: 'warning', url: '' },
      { icon: '🎁', label: '推荐有礼', color: 'primary', url: '' },
      { icon: '📍', label: '常用地址', color: 'accent', url: '' },
      { icon: '📊', label: '省钱明细', color: 'success', url: '' },
      { icon: '📌', label: '帮助中心', color: 'warning', url: '' },
    ],
    favoriteCount: 3,
  },

  onTapEntry(e) {
    const { url } = e.currentTarget.dataset;
    if (url) {
      wx.switchTab({ url });
    } else {
      wx.showToast({ title: '功能开发中', icon: 'none' });
    }
  },

  onTapContact() {
    wx.showToast({ title: '客服电话：400-000-0000', icon: 'none' });
  },

  onTapFeedback() {
    wx.showToast({ title: '感谢您的反馈', icon: 'none' });
  },

  onTapAbout() {
    wx.showModal({
      title: '关于我们',
      content: '「我想洗头」致力于为住院患者及行动不便人群提供专业、温情的上门洗头服务。',
      showCancel: false,
    });
  }
});
