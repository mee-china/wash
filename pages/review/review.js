// pages/review/review.js
Page({
  data: {
    orderId: '',
    order: null,
    rating: 0,
    selectedTags: [],
    reviewText: '',
    textCount: 0,
    images: [],
    isSubmitting: false,
    submitted: false,

    tagOptions: ['手法专业', '态度好', '准时', '环境整洁', '细心', '水温合适', '有耐心', '沟通顺畅'],
  },

  onLoad(options) {
    const { orderId } = options;
    this.setData({ orderId: orderId || '' });

    if (orderId) {
      const app = getApp();
      const mock = app.getMockData();
      const order = mock.orders.find(o => o.id === parseInt(orderId));
      if (order) {
        this.setData({ order });
      }
    }
  },

  onRatingChange(e) {
    this.setData({ rating: e.detail.value });
  },

  onTagToggle(e) {
    const { tag } = e.currentTarget.dataset;
    let tags = [...this.data.selectedTags];
    if (tags.includes(tag)) {
      tags = tags.filter(t => t !== tag);
    } else {
      tags.push(tag);
    }
    this.setData({ selectedTags: tags });
  },

  onTextInput(e) {
    const text = e.detail.value;
    this.setData({
      reviewText: text,
      textCount: text.length,
    });
  },

  onUploadImage() {
    wx.chooseImage({
      count: 3 - this.data.images.length,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const images = [...this.data.images, ...res.tempFilePaths];
        this.setData({ images: images.slice(0, 3) });
      }
    });
  },

  onRemoveImage(e) {
    const { index } = e.currentTarget.dataset;
    const images = [...this.data.images];
    images.splice(index, 1);
    this.setData({ images });
  },

  onSubmit() {
    if (this.data.rating === 0) {
      wx.showToast({ title: '请先评分', icon: 'none' });
      return;
    }

    this.setData({ isSubmitting: true });

    // 模拟提交
    setTimeout(() => {
      this.setData({
        isSubmitting: false,
        submitted: true,
      });

      wx.showToast({
        title: '评价成功',
        icon: 'success',
        duration: 1500,
        success: () => {
          setTimeout(() => {
            wx.navigateBack();
          }, 1500);
        }
      });
    }, 1000);
  },

  onSkip() {
    wx.showModal({
      title: '跳过评价',
      content: '确定暂时不评价吗？您也可以在订单中随时评价。',
      success: (res) => {
        if (res.confirm) {
          wx.navigateBack();
        }
      }
    });
  }
});
