// components/master-card/master-card.js
Component({
  properties: {
    master: {
      type: Object,
      value: {}
    },
    showDistance: {
      type: Boolean,
      value: true
    }
  },

  data: {
    avatarColors: ['#E8835A', '#8B6B5A', '#7FB069', '#C07A5A']
  },

  methods: {
    onTap() {
      this.triggerEvent('tap', { id: this.properties.master.id });
    }
  }
});
