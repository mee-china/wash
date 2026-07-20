// pages/master-list/master-list.js
Page({
  data: {
    filterOptions: [
      { key: 'comprehensive', label: '综合排序' },
      { key: 'distance', label: '距离最近' },
      { key: 'rating', label: '评分最高' },
      { key: 'price', label: '价格最低' },
    ],
    activeFilter: 'comprehensive',
    masters: [],
    filteredMasters: [],
    isLoading: true,
    serviceName: '',
    newUser: false,
    pageNum: 1,
    hasMore: true,
  },

  onLoad(options) {
    const { serviceId, serviceName, newUser } = options;
    this.setData({
      serviceName: serviceName || '',
      newUser: newUser === '1',
    });
    this.loadMasters();
  },

  loadMasters(reset = true) {
    if (reset) {
      this.setData({ pageNum: 1, hasMore: true });
    }

    const app = getApp();
    const mock = app.getMockData('mockData');
    let masters = [...mock.masters];

    // 如果有服务筛选
    if (this.data.serviceName) {
      // 简单模拟筛选
    }

    setTimeout(() => {
      this.setData({
        masters,
        isLoading: false,
      });
      this.filterMasters();
    }, 600);
  },

  filterMasters() {
    const { masters, activeFilter } = this.data;
    let filtered = [...masters];

    switch (activeFilter) {
      case 'distance':
        filtered.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'price':
        filtered.sort((a, b) => a.price - b.price);
        break;
      default:
        // 综合排序：可预约优先、评分高优先
        filtered.sort((a, b) => {
          if (a.todayFull !== b.todayFull) return a.todayFull ? 1 : -1;
          return b.rating - a.rating;
        });
    }

    this.setData({ filteredMasters: filtered });
  },

  onFilterChange(e) {
    const { key } = e.currentTarget.dataset;
    this.setData({ activeFilter: key }, () => {
      this.filterMasters();
    });
  },

  onTapMaster(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/master-detail/master-detail?id=${id}` });
  },

  onTapRetry() {
    this.setData({ isLoading: true });
    this.loadMasters();
  }
});
