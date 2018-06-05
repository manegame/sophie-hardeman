<template>
  <img  :src='imageSource'
        @load='handleLoaded($event)' />
</template>

<script>
export default {
  name: 'loadImg',
  props: {
    item: {
      type: [ Object, String ],
      required: true
    }
  },
  methods: {
    handleLoaded(event) {
      event.currentTarget.src = this.item.acf.image.sizes['s-h-medium']
    }
  },
  computed: {
    imageSource() {
      if (this.item.acf) {
        return this.item.acf.image.sizes['s-h-pixel']
      } else {
        return this.item
      }
    }
  }
}
</script>
