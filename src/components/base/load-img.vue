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
      event.currentTarget.src = this.item
    }
  },
  computed: {
    imageSource() {
      return this.item
    }
  }
}
</script>
