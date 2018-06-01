<template>
  <div class="topbar">
    <router-link v-if='$route.name === "single sale"'
                 class="topbar__back"
                 :to="{ name: 'sale', params: {slug: $route.params.slug} }">
                 <- back to sale
    </router-link>
    <a v-else-if='$route.name === "checkout"'
                 class="topbar__back"
                 @click.prevent='goBack'>
                 <- back to item
    </a>
    <router-link v-else
                 class="topbar__back"
                 :to="{ name: 'landing'}">
                 <- back to overview
    </router-link>
                <span v-if='$route.name === "collection"' class="topbar__posted">updated {{main.single.modified | dotted}}</span>
                <a class="topbar__recommend"
                   :href='reccomendLink'>mail to a friend</a>
                <a class="topbar__reply"
                   :href='mailSophie'>reply</a>
                <a class="topbar__print"
                   @click.prevent='printPage'>print</a>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'topbar',
  computed: {
    ...mapState(['main']),
    reccomendLink() {
      return 'mailto:?subject=Hey! Check it out&body=Made by Hardeman... \nhardeman.com'
    },
    mailSophie() {
      return 'mailto:info@hardeman.co?subject=It\'s been a while since we last talked...'
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    printPage() {
      window.print()
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
  align-items: center;
  text-align: left;
  z-index: 9;
  border-bottom: $border;
  margin-bottom: $margin-top;
  background: $white;
  // grid-area: main;
  position: absolute;
  width: calc(11/14 * 100% - 20px);
  right: 20px;
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

  &__posted,
  &__recommend,
  &__reply {
    color: $black;
    text-decoration: none;
    background: $white;
    padding: 0 8px;
    cursor: pointer;
  }

  &__recommend,
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

  &__recommend,
  &__reply,
  &__print {
    @include screen-size('small') {
      display: none;
    }
  }
}

</style>
