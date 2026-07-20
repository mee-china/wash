// pages/master-detail/master-detail.js
Page({
  data: {
    master: null,
    isLoading: true,
    isFavorited: false,
    selectedDate: '今天',
    selectedSlot: '',
    allSlots: [],
    reviewsToShow: 3,
  },

  onLoad(options) {
    const { id } = options;
    this.loadMasterDetail(parseInt(id));
  },

  loadMasterDetail(id) {
    const app = getApp();
    const mock = app.getMockData();
    const master = mock.masters.find(m => m.id === id);

    if (master) {
      const services = mock.services;
      this.setData({
        master,
        services,
        isLoading: false,
        allSlots: master.schedule[0]?.slots || [],
        selectedSlot: master.schedule[0]?.slots[0] || '',
      });
    }
  },

  onSelectDate(e) {
    const { date } = e.currentTarget.dataset;
    const schedule = this.data.master.schedule.find(s => s.date === date);
    this.setData({
      selectedDate: date,
      allSlots: schedule ? schedule.slots : [],
      selectedSlot: '',
    });
  },

  onSelectSlot(e) {
    const { slot } = e.currentTarget.dataset;
    this.setData({ selectedSlot: slot });
  },

  onToggleFavorite() {
    this.setData({ isFavorited: !this.data.isFavorited });
    wx.showToast({
      title: this.data.isFavorited ? '已收藏' : '已取消收藏',
      icon: 'none'
    });
  },

  onTapBook() {
    if (!this.data.selectedSlot && !this.data.master.todayFull) {
      wx.showToast({ title: '请选择预约时间', icon: 'none' });
      return;
    }
    const { master, selectedDate, selectedSlot } = this.data;
    wx.navigateTo({
      url: `/pages/booking/booking?masterId=${master.id}&date=${selectedDate}&slot=${selectedSlot}`
    });
  },

  onViewAllReviews() {
    this.setData({
      reviewsToShow: this.data.master.reviews.length
    });
  },

  onTapReviewImage() {
    // 点击评价图片放大
  },

  onTapContact() {
    wx.showToast({ title: '已联系客服', icon: 'none' });
  }
});
