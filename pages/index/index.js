// pages/index/index.js
Page({
  data: {
    // 定位
    currentCity: '武汉市',
    hasLocationAuth: true,
    onlineMasters: 8,

    // Banner
    banners: [
      { id: 1, tag: '🎉 新客专享', title: '首单体验价', price: '¥68', subtitle: '专业上门洗头 · 医院/居家均可 · 限前50位' },
      { id: 2, tag: '❤️ 关怀行动', title: '住院无忧', price: '暖心价', subtitle: '术后/卧床/产妇专属护理 · 平台保险守护' },
      { id: 3, tag: '🤝 推荐有礼', title: '邀请好友', price: '得¥20', subtitle: '每邀请一位新用户下单，双方各得¥20优惠券' },
    ],
    currentBanner: 0,

    // 服务项目
    services: [],

    // 推荐师傅
    masters: [],
    isLoading: true,
    cityUnavailable: false,
    isRefreshing: false,
  },

  onLoad() {
    this.loadData();
  },

  onShow() {
    // 每次显示时刷新城市状态
    const app = getApp();
    const city = app.globalData.locationCity || '武汉市';
    this.setData({ currentCity: city });
  },

  onPullDownRefresh() {
    this.setData({ isRefreshing: true });
    this.loadData(() => {
      wx.stopPullDownRefresh();
      this.setData({ isRefreshing: false });
    });
  },

  loadData(callback) {
    const app = getApp();
    const mock = app.getMockData('mockData');

    // 模拟网络延迟
    setTimeout(() => {
      this.setData({
        services: mock.services,
        masters: mock.masters,
        onlineMasters: mock.masters.filter(m => m.available).length,
        isLoading: false,
      });
      if (callback) callback();
    }, 800);
  },

  // --- 事件处理 ---
  onTapCity() {
    wx.navigateTo({ url: '/pages/city-select/city-select' });
  },

  onBannerChange(e) {
    this.setData({ currentBanner: e.detail.current });
  },

  onTapBanner(e) {
    const { id } = e.currentTarget.dataset;
    // Banner 点击跳转
    if (id === 1) {
      wx.navigateTo({ url: '/pages/master-list/master-list?newUser=1' });
    }
  },

  onTapService(e) {
    const { id } = e.currentTarget.dataset;
    const service = this.data.services.find(s => s.id === id);
    wx.navigateTo({
      url: `/pages/master-list/master-list?serviceId=${id}&serviceName=${service.name}`
    });
  },

  onTapMaster(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/master-detail/master-detail?id=${id}` });
  },

  onTapViewAllMasters() {
    wx.navigateTo({ url: '/pages/master-list/master-list' });
  },

  onTapQuickBook() {
    wx.navigateTo({ url: '/pages/master-list/master-list?newUser=1' });
  },

  onTapSearch() {
    wx.navigateTo({ url: '/pages/master-list/master-list' });
  },

  onTapSubscribe() {
    wx.showToast({ title: '已订阅开城通知', icon: 'success' });
  },

  onTapRetry() {
    this.setData({ isLoading: true });
    this.loadData();
  }
});
