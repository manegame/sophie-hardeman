<template>
  <img  class='zoom_img'
        @mousemove='panImg($event)'
        @mouseleave='resetPan()'
        :class='{ "zoom_img--zoomed": zoomed }'
        :style='{ objectPosition: panX + panY }'
        :src='imageSource'
        @click='zoomed = !zoomed' />
</template>

<script>
export default {
  name: 'zoomImg',
  data() {
    return {
      zoomed: false,
      panX: '50%',
      panY: '50%'
    }
  },
  props: {
    imageSource: {
      type: String,
      required: true
    }
  },
  methods: {
    panImg(event) {
      if (event.currentTarget.offsetWidth > event.currentTarget.offsetHeight) {
        this.panY = '' + event.offsetY / event.currentTarget.offsetHeight * 100 + '%'
      } else {
        this.panX = '' + event.offsetX / event.currentTarget.offsetWidth * 100 + '%'
      }
    },
    resetPan() {
      this.zoomed = false
      this.panX = this.panY = '50%'
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../../style/_variables.scss';

.zoom_img {
  width: 100%;
  height: 50vh;
  object-fit: contain;
  background: $grey;
  margin-bottom: 10px;
  cursor: zoom-in;

  &--zoomed {
    object-fit: cover;
    object-position: 50% 50%;
    cursor: zoom-out;
  }
}
</style>
