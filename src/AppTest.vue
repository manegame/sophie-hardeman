<template>
  <div class='app'>
    {{ shopify }}
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: 'app-test',
  computed: {
    ...mapState(['shopify'])
  },
  methods: {
    ...mapActions(['INITIALIZE_CHECKOUT'])
  },
  created () {
    this.INITIALIZE_CHECKOUT()
  }
}
</script>