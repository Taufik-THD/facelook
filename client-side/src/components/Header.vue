<template>
  <div class="nav-wrapper">
    <nav>
      <a href="#" class="brand-logo" style="padding: 0 0 0 20px;"><b>facelook</b></a>
    </nav>
  </div>
</template>

<script>
export default {
  created () {
    if (localStorage.getItem('authorization')) {
      this.$router.push('/timeline')
    }
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      const userData = {
        email : this.email,
        password: this.password
      }

      axios({
        method: 'post',
        url: 'http://localhost:3000/login',
        data: userData
      }).then(response => {
        localStorage.setItem('authorization', response.data.data)
        this.$router.push('/timeline')
      }).catch(err => {
        console.log(err);
      })
    }
  }
}
</script>

<style scoped>
nav {
    color: #fff;
    background-color: #0d47a1;
    width: 100%;
    height: 56px;
    line-height: 56px;
    position: inherit;
}
</style>
