// app.js
App({
  globalData: {
    userInfo: null,
    location: null,
    locationCity: '',
    hasLocationAuth: false,
    // 模拟数据 - 开发阶段使用，上线前替换为真实接口
    mockData: {
      cities: [
        { name: '武汉市', code: '420100', available: true, mastersCount: 8 },
        { name: '西安市', code: '610100', available: true, mastersCount: 5 },
        { name: '成都市', code: '510100', available: true, mastersCount: 3 },
        { name: '北京市', code: '110100', available: false, mastersCount: 0 },
        { name: '上海市', code: '310100', available: false, mastersCount: 0 },
        { name: '广州市', code: '440100', available: false, mastersCount: 0 },
      ],
      services: [
        { id: 1, name: '基础洗头', icon: '💆', desc: '温和清洁·吹干造型', price: 78, originalPrice: 128, color: 'primary' },
        { id: 2, name: '深度护理', icon: '🧴', desc: '头皮理疗·去屑止痒', price: 128, originalPrice: 188, color: 'accent' },
        { id: 3, name: '产妇专护', icon: '🤱', desc: '38°C恒温·温暖无忧', price: 148, originalPrice: 208, color: 'success' },
        { id: 4, name: '术后卧床', icon: '🛏️', desc: '床前服务·无痕清洁', price: 108, originalPrice: 168, color: 'warning' },
      ],
      masters: [
        {
          id: 101, name: '王师傅', avatar: '王', level: 'S',
          tags: ['资深护理师', '产妇专护'], rating: 4.9, orderCount: 286,
          skillTags: ['手法专业', '态度好', '准时'],
          price: 98, originalPrice: 158, firstOrderPrice: 68,
          distance: '1.2km', acceptRate: '99%', available: true,
          years: 8, specialties: ['产妇护理', '术后护理', '头皮理疗'],
          description: '8年美发护理经验，擅长产妇和术后患者的温和洗护',
          reviewCount: 128, todayFull: false,
          schedule: [
            { date: '今天', slots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
            { date: '明天', slots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'] },
            { date: '后天', slots: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
          ],
          reviews: [
            { user: '张***', rating: 5, tags: ['手法专业', '态度好'], text: '王师傅非常专业，给卧床的父亲洗头，动作很轻柔，水温也很合适，非常推荐！', time: '3天前' },
            { user: '李***', rating: 5, tags: ['准时', '细心'], text: '提前到了医院，还帮我调整了病床角度，非常贴心。', time: '1周前' },
            { user: '赵***', rating: 4, tags: ['手法专业'], text: '手法不错，洗得很干净。', time: '2周前' },
          ]
        },
        {
          id: 102, name: '李师傅', avatar: '李', level: 'A',
          tags: ['高级护理师'], rating: 4.8, orderCount: 158,
          skillTags: ['手法专业', '细心'],
          price: 78, originalPrice: 128, firstOrderPrice: 68,
          distance: '2.8km', acceptRate: '97%', available: true,
          years: 5, specialties: ['基础洗护', '头疗按摩'],
          description: '5年美发经验，手法细腻，注重客户体验',
          reviewCount: 86, todayFull: false,
          schedule: [
            { date: '今天', slots: ['10:00', '11:00', '14:00', '15:00'] },
            { date: '明天', slots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
            { date: '后天', slots: ['09:00', '10:00', '14:00', '15:00'] },
          ],
          reviews: [
            { user: '王***', rating: 5, tags: ['态度好', '细心'], text: '李师傅很耐心，洗头的时候一直在问水温和力度是否合适。', time: '5天前' },
            { user: '刘***', rating: 5, tags: ['手法专业'], text: '洗得很舒服，吹干造型也很满意。', time: '2周前' },
          ]
        },
        {
          id: 103, name: '张师傅', avatar: '张', level: 'A',
          tags: ['养护师', '术后护理'], rating: 4.7, orderCount: 92,
          skillTags: ['手法好', '有耐心'],
          price: 108, originalPrice: 0, firstOrderPrice: 68,
          distance: '3.5km', acceptRate: '95%', available: true,
          years: 6, specialties: ['术后护理', '头皮养护'],
          description: '6年头皮养护经验，特别擅长卧床患者的洗护服务',
          reviewCount: 67, todayFull: true,
          schedule: [
            { date: '今天', slots: [] },
            { date: '明天', slots: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
            { date: '后天', slots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
          ],
          reviews: [
            { user: '陈***', rating: 5, tags: ['有耐心'], text: '给家里老人洗头，张师傅非常耐心，老人很满意。', time: '1周前' },
          ]
        },
      ],
      orders: [
        {
          id: 1001, masterId: 101, masterName: '王师傅', masterAvatar: '王',
          masterColor: 'primary', serviceName: '术后卧床洗护', price: 68,
          time: '今天 14:00 - 14:40', address: '同济医院 · 骨科 3F-12',
          status: 0, statusText: '待接单', statusType: 'waiting',
          createdAt: '2026-07-20 12:30',
        },
        {
          id: 1002, masterId: 102, masterName: '李师傅', masterAvatar: '李',
          masterColor: 'accent', serviceName: '产妇专护', price: 98,
          time: '今天 15:30 - 16:10', address: '武汉协和医院 · 产科 5F-08',
          status: 2, statusText: '已出发', statusType: 'ontheway',
          createdAt: '2026-07-20 10:00',
          masterLocation: { lat: 30.52, lng: 114.27 },
          etaMinutes: 12,
        },
        {
          id: 1003, masterId: 103, masterName: '张师傅', masterAvatar: '张',
          masterColor: 'success', serviceName: '基础洗头', price: 68,
          time: '昨天 10:00 - 10:40', address: '武汉中心医院 · 外科 6F-03',
          status: 4, statusText: '已完成', statusType: 'done',
          createdAt: '2026-07-19 08:00',
          reviewed: false,
        },
      ]
    }
  },

  onLaunch() {
    // 获取系统信息（兼容新旧API）
    try {
      this.globalData.systemInfo = wx.getSystemSetting();
    } catch (e) {
      this.globalData.systemInfo = {};
    }

    // 静默登录
    this.login();
  },

  login() {
    wx.login({
      success: (res) => {
        if (res.code) {
          console.log('登录成功，code:', res.code);
          // 实际开发中：将 code 发送到后端换取 openId / session_key
        }
      }
    });
  },

  // 获取当前位置
  getLocation() {
    return new Promise((resolve, reject) => {
      wx.getLocation({
        type: 'wgs84',
        success: (res) => {
          this.globalData.location = res;
          this.globalData.hasLocationAuth = true;
          // 逆地理编码获取城市（实际开发中调用腾讯地图API）
          this.globalData.locationCity = '武汉市';
          resolve(res);
        },
        fail: (err) => {
          this.globalData.hasLocationAuth = false;
          this.globalData.locationCity = '武汉市';
          reject(err);
        }
      });
    });
  },

  // 获取mock数据
  getMockData() {
    return this.globalData.mockData;
  }
});
