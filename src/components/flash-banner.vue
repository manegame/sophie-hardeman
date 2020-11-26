<template>
  <div class="flash-banner">
    <p class="welcome" v-if="main.firstVisit">
      Welcome!
    </p>
    <p class="welcome" v-else>
      Welcome back!
    </p>
    <!-- <p class="welcome">Please consider subscribing</p> -->
    <form @submit="alsoSetThis" action="https://hardemanonline.us15.list-manage.com/subscribe/post?u=cb8eb732cb92c6160af716458&amp;id=ec3eab11ff" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="mailForm validate" target="_blank" novalidate>
      <div id="mc_embed_signup_scroll">
      <div class="mc-field-group">
        <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL">
      </div>
      <div id="mce-responses" class="clear">
        <div class="response" id="mce-error-response" style="display:none"></div>
        <div class="response" id="mce-success-response" style="display:none"></div>
      </div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
        <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_cb8eb732cb92c6160af716458_ec3eab11ff" tabindex="-1" value=""></div>
        <div class="clear"><input type="submit" value="Subscribe to the mailing list" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
        </div>
    </form>

    <div class="close" @click="close">✕</div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'FlashBanner',
  computed: mapState(['main']),
  methods: {
    ...mapActions({
      firstVisit: 'FIRST_VISIT',
      subscribed: 'SUBSCRIBED'
    }),
    close () {
      this.firstVisit()
      this.$emit('close')
    },
    alsoSetThis () {
      this.subscribed()
      console.log('not only are you subscribing')
    }
  },
  mounted () {
    if (this.main.subscribed) {
      console.log(this.main.subscribed)
      this.close()
    } else {
      setTimeout(this.close, 30000)
    }
  },
  beforeDestroy () {
    this.firstVisit()
  }
}
</script>

<style lang="scss" scoped>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.flash-banner {
  background: $yellow;
  border: $border;
  padding: 10px;
  position: fixed;
  bottom: 65px;
  width: calc(9/14 * #{$landing-width} - 40px);
  left: 50%;
  transform: translate(-50%, 0) translate(43px, 0);
  z-index: 10999999;
  display: flex;
  justify-content: space-between;

  .welcome {
    margin-bottom: 0;
    margin-right: 10px;
    display: inline-block;
    width: auto;
    white-space: nowrap;
  }

  .mailForm {
    width: 100%;
    margin-right: 10px;

    #mc_embed_signup_scroll {
      display: flex;
      justify-content: space-between;

      .mc-field-group {
        width: 100%;
        flex-grow: 1;
        margin-right: 10px;

        input {
          width: 100%;
        }
      }
    }

    * {
      display: inline-block;
    }
  }

  .close {
    display: inline-block;
    cursor: pointer;
  }
}
</style>