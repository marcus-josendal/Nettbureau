<template>
  <v-app>
    <v-main class="container--application">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class App extends Vue {}
</script>

<style lang="sass">
  .container--application
     background: #F3F3F2
</style>
