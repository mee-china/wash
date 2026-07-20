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
    avatarColors: ['#6EC6B8', '#F0B098', '#7FB069', '#A8E0D6']
  },

  methods: {
    onTap() {
      this.triggerEvent('tap', { id: this.properties.master.id });
    }
  }
});
