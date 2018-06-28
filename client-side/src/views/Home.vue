<template>
  <div class="">
    <Header/>
    <Register />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Register from '@/components/Register.vue'

export default {
  name: 'home',
  components: {
    Register,
    Header
  }
}
</script>
