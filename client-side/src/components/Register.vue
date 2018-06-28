<template>
  <div class="home"  style="height:100%;">
    <span style="margin: 8% 0 0 5%; position:fixed; font-size:25px;"><b>Facelook helps You connect and share with</b></span>
    <span style="margin: 10% 0 0 5%; position:fixed; font-size:25px;"><b>the people in Your life.</b></span>
    <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yc/r/GwFs3_KxNjS.png" alt="" style="width:550px; position:fixed; margin: 15% 0 0 5%;">
    <div class="row">
      <div class="col s4" style="margin:0% 0 0 60%;">
        <form class="col s12">
          <h4 style="text-align:left"><b>Create New Account</b></h4>
          <div class="row">
            <div class="input-field col s6">
              <input id="first_name" type="text" class="validate"v-model='userData.first_name'>
              <label for="first_name">First Name</label>
            </div>
            <div class="input-field col s6">
              <input id="last_name" type="text" class="validate" v-model='userData.last_name'>
              <label for="last_name">Last Name</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input id="email" type="text" class="validate" v-model='userData.email'>
              <label for="email">Email</label>
            </div>
            <div class="input-field col s12">
              <input id="password" type="password" class="validate" v-model='userData.password'>
              <label for="password">Password</label>
            </div>
            <div class="input-field col s12">
              <input id="confirm" type="password" class="validate" v-model='confirm' v-on:keyup='confirmCheck'>
              <label for="confirm">Confirm Password</label>
            </div>
            <label v-if="check == false" style="color:red; padding-left:10px;">Please Input correct password !</label>
          </div>
          <a class="btn btn-block green" style="width:100%; color:white" @click='register'>Sign Up</a>
          <br>
          <div class="container" style="color:black">
            Already have an account?<a href="#" class="socmed" style="color:blue" @click='goToLogin'><b> Sign In here.</b> </a>
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
        first_name: '',
        last_name: '',
        email: '',
        password: '',
      },
      confirm: '',
      check: false
    }
  },
  created () {
    this.confirmCheck()
  },
  methods : {
    confirmCheck () {
      if (this.userData.password == this.confirm || this.confirm == '') {
        this.check = true
      } else {
        this.check = false
      }
    },
    goToLogin () {
      this.$router.push('login')
    },
    register () {
      const self = this
      axios({
        method: 'post',
        url: 'http://localhost:3000/users/signup',
        data: self.userData
      }).then(response => {
          this.userData.first_name = '',
          this.userData.last_name = '',
          this.userData.email = '',
          this.userData.password = ''
          this.confirm = ''
          this.$router.push('login')
      }).catch(err => {
        console.log(err)
      })
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
