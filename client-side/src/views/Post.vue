<template>
  <div class="">
    <Header/>
    <Status/>
  </div>
</template>

<script>
import Header from '@/components/Header-after-login.vue'
import Status from '@/components/Status.vue'

export default {
  name: 'home',
  components: {
    Status,
    Header
  }
}
</script>

<style lang="css">
</style>
