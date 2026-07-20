// pages/booking/booking.js
Page({
  data: {
    masterId: 0,
    masterName: '',
    date: '',
    slot: '',
    services: [],
    selectedService: null,

    // 表单数据
    addressType: 'hospital', // hospital | home
    hospitalKeyword: '',
    hospitalName: '',
    wardNumber: '',
    homeAddress: '',
    patientType: '',
    patientNote: '',
    contactPhone: '',
    couponAmount: 0,

    // 价格
    originalPrice: 0,
    discountPrice: 0,
    finalPrice: 0,

    // 校验状态
    errors: {},
    isSubmitting: false,
  },

  onLoad(options) {
    const { masterId, date, slot } = options;
    const app = getApp();
    const mock = app.getMockData('mockData');
    const master = mock.masters.find(m => m.id === parseInt(masterId));

    // 默认使用用户手机号
    this.setData({
      masterId: parseInt(masterId),
      masterName: master ? master.name : '',
      date: date || '今天',
      slot: slot || '',
      services: mock.services,
      selectedService: mock.services[0],
      contactPhone: '138****5678',
      originalPrice: mock.services[0] ? mock.services[0].price : 0,
      finalPrice: mock.services[0] ? (mock.services[0].price - 30) : 0,
      discountPrice: 30,
    });
  },

  onSelectService(e) {
    const { id } = e.currentTarget.dataset;
    const service = this.data.services.find(s => s.id === id);
    if (service) {
      this.setData({
        selectedService: service,
        originalPrice: service.price,
        finalPrice: Math.max(0, service.price - this.data.discountPrice),
      });
    }
  },

  onSwitchAddressType(e) {
    const { type } = e.currentTarget.dataset;
    this.setData({
      addressType: type,
      errors: { ...this.data.errors, address: undefined }
    });
  },

  onInputHospital(e) {
    this.setData({ hospitalKeyword: e.detail.value });
  },

  onSelectHospital(e) {
    const { name } = e.currentTarget.dataset;
    this.setData({
      hospitalName: name,
      hospitalKeyword: name,
    });
  },

  onInputWard(e) {
    this.setData({ wardNumber: e.detail.value });
  },

  onInputHomeAddress(e) {
    this.setData({ homeAddress: e.detail.value });
  },

  onSelectPatientType(e) {
    const { type } = e.currentTarget.dataset;
    this.setData({
      patientType: type,
      errors: { ...this.data.errors, patientType: undefined }
    });
  },

  onInputPatientNote(e) {
    this.setData({ patientNote: e.detail.value });
  },

  validate() {
    const errors = {};
    const { addressType, hospitalName, wardNumber, homeAddress, patientType } = this.data;

    if (addressType === 'hospital') {
      if (!hospitalName) errors.address = '请选择医院';
      if (!wardNumber) errors.ward = '请输入病房号';
    } else {
      if (!homeAddress) errors.address = '请输入服务地址';
    }
    if (!patientType) errors.patientType = '请选择患者情况';

    this.setData({ errors });
    return Object.keys(errors).length === 0;
  },

  onSubmit() {
    if (!this.validate()) {
      wx.showToast({ title: '请完善预约信息', icon: 'none' });
      return;
    }

    this.setData({ isSubmitting: true });

    // 模拟提交订单
    setTimeout(() => {
      wx.navigateTo({
        url: `/pages/payment/payment?masterName=${this.data.masterName}&serviceName=${this.data.selectedService.name}&amount=${this.data.finalPrice}&date=${this.data.date}&slot=${this.data.slot}`
      });
      this.setData({ isSubmitting: false });
    }, 800);
  },

  // 模拟数据 - 医院搜索
  onSearchHospital() {
    const hospitals = [
      { name: '同济医院（主院区）', address: '武汉市硚口区解放大道1095号' },
      { name: '武汉协和医院', address: '武汉市江汉区解放大道1277号' },
      { name: '武汉大学人民医院', address: '武汉市武昌区解放路238号' },
      { name: '武汉市中心医院', address: '武汉市江岸区胜利街26号' },
      { name: '武汉市第一医院', address: '武汉市硚口区中山大道215号' },
    ];
    this.setData({ hospitalSearchResults: hospitals });
  },

  onSelectAddressOnMap() {
    wx.showToast({ title: '地图选点功能开发中', icon: 'none' });
  }
});
