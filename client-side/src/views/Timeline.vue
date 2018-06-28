<template>
  <div class="">
    <Header/>
    <Timeline />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header-after-login.vue'
import Timeline from '@/components/Timeline.vue'

export default {
  name: 'home',
  components: {
    Timeline,
    Header
  }
}
</script>
