<template>
  <v-app>

    <div class="app-container">
      <app-header></app-header>
      <transition mode="out-in" name="component-fade">
        <router-view></router-view>
      </transition>
      <vue-progress-bar></vue-progress-bar>
    </div>

  </v-app>
</template>

<script>
  export default {
    name: 'app',
    mounted () {
      //  [App.vue specific] When App.vue is finish loading finish the progress bar
      this.$Progress.finish()
    },
    created () {
      //  [App.vue specific] When App.vue is first loaded start the progress bar
      this.$Progress.start()
      //  hook the progress bar to start before we move router-view
      this.$router.beforeEach((to, from, next) => {
        //  does the page we want to go to have a meta.progress object
        if (to.meta.progress !== undefined) {
          let meta = to.meta.progress
          // parse meta tags
          this.$Progress.parseMeta(meta)
        }
        //  start the progress bar
        this.$Progress.start()
        //  continue to next page
        next()
      })
      //  hook the progress bar to finish after we've finished moving router-view
      this.$router.afterEach((to, from) => {
        //  finish the progress bar
        this.$Progress.finish()
      })
    }
  }
</script>

<style lang="scss">

  @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700|Material+Icons');

  $container-width: 640px;

  .app-container {
    min-height:100%;
    width: 100%;
    max-width: $container-width;
    margin: 0 auto;
  }

  .title {
    font-weight: 300;
  }

  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease;
  }

  .component-fade-enter,
  .component-fade-leave-to {
    opacity: 0;
  }

</style>
