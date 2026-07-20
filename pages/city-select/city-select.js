// pages/city-select/city-select.js
Page({
  data: {
    cities: [],
    currentCity: '武汉市',
    hotCities: ['武汉市', '西安市', '成都市', '长沙市', '郑州市', '南京市'],
    searchKeyword: '',
    searchResults: [],
    letters: ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'S', 'T', 'W', 'X', 'Y', 'Z'],
    groupedCities: {}
  },

  onLoad() {
    const app = getApp();
    const mock = app.getMockData('mockData');
    const cities = mock.cities;

    // 按字母分组
    const grouped = {};
    cities.forEach(c => {
      const firstLetter = c.name.charAt(0).toUpperCase();
      if (!grouped[firstLetter]) grouped[firstLetter] = [];
      grouped[firstLetter].push(c);
    });

    this.setData({
      cities,
      currentCity: app.globalData.locationCity || '武汉市',
      groupedCities: grouped,
    });
  },

  onSelectCity(e) {
    const { name } = e.currentTarget.dataset;
    const app = getApp();
    app.globalData.locationCity = name;
    wx.navigateBack();
  },

  onSearchInput(e) {
    const keyword = e.detail.value.trim();
    this.setData({ searchKeyword: keyword });

    if (!keyword) {
      this.setData({ searchResults: [] });
      return;
    }

    const results = this.data.cities.filter(c =>
      c.name.includes(keyword) || c.code.includes(keyword)
    );
    this.setData({ searchResults: results });
  },

  onClearSearch() {
    this.setData({ searchKeyword: '', searchResults: [] });
  }
});
