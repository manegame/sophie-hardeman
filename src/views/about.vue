<template>
  <div class='about'>
    <navbar />
    <topbar />
    <div class="about__main">
      <div class="about__main__left">
        <img v-if='$route.params.slug === "bio" && main.single_about.acf'
             class="about__main__left__bio_profile_pic"
             :src='main.single_about.acf.profile_pic.sizes["s-h-small"]' />
      </div>
      <div class="about__main__right"
           v-if='main.single_about.acf'>
        <h5 class="about__main__right__title">
          {{main.single_about.title.rendered}}
        </h5>
        <p v-if='main.single_about.acf.text'
           v-html='main.single_about.acf.text'
           :class='$route.name === "bio" ? "hgfjhgf" : "wikipedia"' />
        <form v-if='$route.params.slug === "mailing-list"' action="https://hardemanonline.us15.list-manage.com/subscribe/post?u=cb8eb732cb92c6160af716458&amp;id=ec3eab11ff" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
            <div id="mc_embed_signup_scroll">
        <div class="mc-field-group">
          <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL">
        </div>
          <div id="mce-responses" class="clear">
            <div class="response" id="mce-error-response" style="display:none"></div>
            <div class="response" id="mce-success-response" style="display:none"></div>
          </div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
            <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_cb8eb732cb92c6160af716458_ec3eab11ff" tabindex="-1" value=""></div>
            <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
            </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import navbar from '@/components/navbar'
import topbar from '@/components/topbar'

export default {
  name: 'about',
  head: {
    title: () => {
      return {
        inner: 'About'
      }
    },
    meta: () => {
      return [
        { name: 'title', content: 'About' },
        { name: 'description', content: 'All about Hardeman' }
      ]
    }
  },
  components: {
    navbar,
    topbar
  },
  computed: {
    ...mapState(['main'])
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.about {
  @include single;

  &__main {
    height: $exact-height;
    position: relative;
    clear: none;

    &__left {
      width: $left-col-width;
      height: 100%;
      float: left;

      @include screen-size('small') {
        width: 100%;
        height: auto;
      }

      &__bio_profile_pic {
        width: 100%;
      }
    }

    &__right {
      position: relative;
      float: right;
      width: calc(100% - #{$left-col-width} - 20px);
      height: 100%;
      padding: 0 20px 0 25px;
      margin-right: 20px;

      @include screen-size('small') {
        padding-top: 20px;
        width: 100%;
      }

      &__title {
        color: $black;
        margin-bottom: 20px;
      }
    }
  }
}

input[type='email'] {
  font-size: $font-size-s;
  line-height: $line-height-s;
  padding: 4px 8px;
  margin-bottom: 10px;
}
</style>
