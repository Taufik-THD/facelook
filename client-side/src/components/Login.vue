<template>
  <div class="home"  style="height:100%;">
    <span style="margin: 8% 0 0 5%; position:fixed; font-size:25px;"><b>Facelook helps You connect and share with</b></span>
    <span style="margin: 10% 0 0 5%; position:fixed; font-size:25px;"><b>the people in Your life.</b></span>
    <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yc/r/GwFs3_KxNjS.png" alt="" style="width:550px; position:fixed; margin: 15% 0 0 5%;">
    <div class="row">
      <div class="col s4" style="margin:7% 0 0 60%;">
        <form class="col s12">
          <h4 style="text-align:left"><b>Sign In</b></h4>
          <div class="row">
            <div class="input-field col s12">
              <input id="email" type="text" class="validate" v-model='userData.email'>
              <label for="email">Email</label>
            </div>
            <div class="input-field col s12">
              <input id="password" type="password" class="validate" v-model='userData.password'>
              <label for="password">Password</label>
            </div>
          </div>
          <a class="btn btn-block green" style="width:100%; color:white" @click='login'>Sign In</a>
          <br>
          <div class="" style="color:black">
            New User?<a href="#" class="socmed" style="color:blue" @click='goToRegister'><b> Sign Up here.</b> </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      userData: {
        email: '',
        password: ''
      }
    }
  },
  created () {
    // this.confirmCheck()
  },
  methods : {
    login () {
      const userData = {
        email: this.userData.email,
        password: this.userData.password
      }
      axios({
        method: 'post',
        url: 'http://localhost:3000/users/signIn',
        data: userData
      }).then(response => {
        localStorage.setItem('authorization', response.data.jwtToken)
        this.$router.push('/timeline')
      }).catch(err => {
        console.log(err);
      })
    },
    goToRegister () {
      this.$router.push('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home{
  background-color: #dfe4ea;
  background-size: cover;
  position: fixed;
  width: 100%;
}
ul {
  list-style-type: none;
  padding: 0;
}
a {
  color: #dfe6e9;
}

nav {
  -webkit-transform: none;
  transform: none;
  text-align: left;
  background-color: #2d3436;
  font-family: sans-serif;
  text-align: center;
}
</style>
