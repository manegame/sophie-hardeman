<template>
  <section>
    <div class="about_sophie">
      <img class="about_sophie__pic"
           src='../../static/profile.jpg' />
      <div class="about_sophie__text">
        <p class="about_sophie__text--main">
          Sophie Hardeman<br /><br />
          In fashion since Jul 26, 2003<br /><br />
          I am a fashion designer and
          an active member in
          world wide fashion industry
          organizations.
        </p>
        <a class="about_sophie__text--button"
           :href='mailSophie'>
          contact seller
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'about-sophie',
  computed: {
    ...mapState(['main']),
    mailSophie() {
      return 'mailto:sophie@hardemanonline.com?subject=It\'s been a while since we last talked...'
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.about_sophie {
  width: $left-col-width;
  margin-bottom: 40px;
  display: flex;
  justify-content: flex-start;
  flex-flow: row wrap;

  @include screen-size('small') {
    padding-top: 20px;
    width: 100%;
  }

  &__pic {
    width: 100px;
    height: 100px;
    margin-left: 20px;
    border-radius: 50%;
    object-fit: cover;

    @include screen-size('small') {
      margin: 0;
    };
  }

  &__text {
    flex-grow: 1;
    width: 100px;
    margin: 0 40px 0 20px;
    font-size: $font-size-s;
    line-height: $line-height-s;

    &--main {
      border: $border;
      margin-bottom: $line-height-s;
      padding: 4px 6px;
    }

    &--button {
      color: $black;
      text-decoration: none;
      background: $yellow;
      padding: 4px 8px;
      cursor: pointer;
      border: $border;

      &:hover {
        font-weight: bold;
      }
    }

  }

  &__links {
    @include small-list;
  }
}
</style>
