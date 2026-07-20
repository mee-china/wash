// components/rating-stars/rating-stars.js
Component({
  properties: {
    rating: {
      type: Number,
      value: 0
    },
    maxStars: {
      type: Number,
      value: 5
    },
    size: {
      type: Number,
      value: 24
    },
    interactive: {
      type: Boolean,
      value: false
    }
  },

  data: {
    stars: [],
    displayValue: 0
  },

  observers: {
    'rating': function(rating) {
      this.buildStars(rating);
    }
  },

  lifetimes: {
    attached() {
      this.buildStars(this.properties.rating);
    }
  },

  methods: {
    buildStars(rating) {
      const stars = [];
      const max = this.properties.maxStars;
      for (let i = 1; i <= max; i++) {
        if (i <= Math.floor(rating)) {
          stars.push('full');
        } else if (i - rating < 1 && i - rating > 0) {
          stars.push('half');
        } else {
          stars.push('empty');
        }
      }
      this.setData({
        stars,
        displayValue: rating
      });
    },

    onTapStar(e) {
      if (!this.properties.interactive) return;
      const { index } = e.currentTarget.dataset;
      const value = index + 1;
      this.setData({ displayValue: value });
      this.buildStars(value);
      this.triggerEvent('change', { value });
    }
  }
});
