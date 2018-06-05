<template>
  <div class='cart'>
    cart
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'cart',
  ...mapState(['shop'])
}
</script>