<template>
  <div class="">
    <Header/>
    <Profile />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header-after-login.vue'
import Profile from '@/components/Profile.vue'

export default {
  name: 'home',
  components: {
    Profile,
    Header
  }
}
</script>
