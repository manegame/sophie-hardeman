<template>
  <div class="topbar">
    <router-link v-if='$route.name === "shopify single"'
                 class="topbar__back"
                 :to="{ name: 'shopify' }">
                 <span>← back to shop</span>
    </router-link>
    <a v-else-if='$route.name === "checkout"'
                 class="topbar__back"
                 @click.prevent='goBack'>
                <span>← back to item</span>
    </a>
    <router-link v-else
                 class="topbar__back"
                 :to="{ name: 'landing'}">
                 <span>← back to overview</span>
    </router-link>
    <!-- Cart links -->
    <router-link tag="span" to="#cart">
      <strong v-if="totalItems > 0">({{ totalItems }}) items in cart &nbsp;</strong>
    </router-link>
    <router-link tag="a" to="#cart" class="topbar__link topbar__link--cart" v-if="shopify.checkout" ><img style="width:12px; margin-bottom: -2px; margin-right: 2px;" src="/static/cart.png" alt=""> show cart</router-link>
    <span v-if='$route.name === "collection"' class="topbar__posted">updated {{main.single.modified | dotted}}</span>
    <a class="topbar__link"
        :href='reccomendLink'>mail to a friend</a>
    <a class="topbar__print"
        v-if="totalItems > 0"
        :href="shopify.checkout.webUrl">direct checkout</a>
  </div>
</template>

<script>
import utils from '@/components/shopify/mixins/utils'
import {mapState} from 'vuex'

export default {
  name: 'topbar',
  mixins: [utils],
  computed: {
    ...mapState(['main', 'shopify']),
    reccomendLink() {
      return 'mailto:info@hardeman.co?subject=Hey! Check it out&body=Made by Hardeman... \nhardeman.com'
    },
    mailSophie() {
      return 'mailto:info@hardeman.co?subject=It\'s been a while since we last talked...'
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.topbar {
  height: $topbar-height;
  font-size: $font-size-s;
  line-height: 20px;
  display: flex;
  align-items: flex-end;
  text-align: left;
  z-index: 9;
  border-bottom: $border;
  margin-bottom: $margin-top;
  background: $white;
  // grid-area: main;
  position: fixed;
  width: calc(11/14 * 100% - 20px);
  right: 20px;
  height: 50px;
  padding-bottom: 6px;
  top: 0;

  @include screen-size('medium') {
    width: calc(10/14 * 100%);
  }

  @include screen-size('small') {
    width: calc(100% - 40px);
  }

  &__back {
    flex-grow: 10;
    color: $black;
    font-weight: bold;
    text-decoration: none;
    cursor: pointer;
  }

  &__cart,
  &__posted,
  &__link,
  &__reply {
    color: $black;
    text-decoration: none;
    background: $white;
    padding: 0 8px;
    cursor: pointer;
  }

  &__link,
  &__reply {
    margin: 0 2px;
    border: $border;
    &:hover {
      background: $yellow;
    }
  }

  &__reply {
    background: $yellow;
    &:hover {
      font-weight: bold;
    }
  }

  &__print {
    padding-left: 8px;
    color: $blue;
    text-decoration: underline;
    cursor: pointer;
  }

  &__link,
  &__reply,
  &__print {
    @include screen-size('small') {
      display: none;

      &--cart {
        display: inline-block;
      }
    }
  }
}

</style>
