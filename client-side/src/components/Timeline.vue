<template>
  <div class="container" style="padding-top:9%; width:90%;">
    <div class="home">
      <div class="row" style="background-color:#009688;">
        <div class="col s12 m12">
          <h5>Post something New:</h5>
          <div class="card  blue lighten-5">
            <div class="card-content white-text">
              <!-- <img src="https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?resize=256%2C256&quality=100" alt="" style="width:50px; height:50px; border-radius:50%;" > -->
              <h6 style="color:black; font-size:25px;"> <b>{{ profile.firstname }} {{ profile.lastname }}</b> </h6>
              <hr>
              <br>
              <div class="input-field">
                <input id="status" type="text" class="validate" style="color:black;" v-model='status' v-on:keyup.enter='postStatus'>
                <label for="status" style="color:black;"><i class="fas fa-edit"></i> Enter something here . . .</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-for='status in allStatus'>
        <div class="col s12 m12">
          <div class="card grey lighten-5">
            <div class="card-content black-text">
              <!-- <span class="card-title" style="font-size:25px;"> -->
              <img src="https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?resize=256%2C256&quality=100" alt="" style="width:50px; height:50px; border-radius:50%;" >
              <!-- </span> -->
              <h6 style="color:red;">{{ status.email }}</h6>
              <label>{{ status.createdAt.slice(0, 10) }} || {{ status.createdAt.slice(11,19) }}</label>
              <br>
              <br>
              <p> <b>{{ status.status }}</b> </p>
            </div>
            <div class="card-action">
              <div class="">
                <div class="row">
                  <div class="col">
                    <label for="" style="font-size:15px; color:blue;">{{ status.like.length }} like</label>
                    <br><br>
                  </div>
                  <div class="col">
                    <label for="" style="font-size:15px; color:blue;">{{ status.comments.length }} comments</label>
                    <br><br><br>
                  </div>
                  <div class="container left" style="width:91%;" v-if='status.comments.length != 0'>
                    <h5 style="margin-left:2%;">Comments:</h5>
                    <br>
                    <div class="col s12 m12" style="margin-left:5%; background-color:#b2dfdb;">
                      <div class="card grey lighten-5">
                        <div class="card-content black-text">
                          <h6 style="color:red;">{{ status.comments[0].commentator.email }}</h6>
                          <label for="">{{ status.comments[0].createdAt.slice(0, 10) }} || {{ status.comments[0].createdAt.slice(11, 19) }}</label>
                          <br><br>
                          <br>
                          <p> <b>{{ status.comments[0].comment }}</b> </p>
                          <br>
                          <p> <b></b> </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="" style="text-align:right;">
                <a class="waves-effect waves-light btn-medium" title="like" @click='like(status._id)'><i class="material-icons">thumb_up</i> like</a>
                <a class="waves-effect waves-light btn-medium" title="view all comments" @click='getDetailPost(status)'><i class="material-icons">insert_comment</i> comments</a>
              </div>
            </div>
          </div>
        </div>
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
      status: '',
      allStatus: ''
    }
  },
  created () {
    this.confirmCheck()
    this.getAllStatus()
    this.getUserProfile()
    console.log(this.allStatus);
  },
  computed: {
    profile () {
      return this.$store.state.profile
    }
  },
  methods: {
    confirmCheck () {
      if (this.password == this.confirm || this.confirm == '') {
        this.check = true
      } else {
        this.check = false
      }
    },
    goToLogin () {
      this.$router.push('login')
    },
    postStatus () {
      const token = localStorage.getItem('authorization')
      const newStatus = {
        status: this.status,
        token: token
      }
      axios({
        method: 'post',
        url: 'http://localhost:3000/status',
        data: newStatus
      }).then(response => {
        this.status = ''
        this.$router.push('/')
        this.getAllStatus()
      }).catch(err => {
        console.log(err);
      })
    },
    getAllStatus () {
      axios({
        method: 'get',
        url: 'http://localhost:3000/allStatus'
      }).then(response => {
        this.allStatus = response.data.reverse()
      }).catch(err => {
        console.log(err);
      })
    },
    getUserProfile () {
      const token = localStorage.getItem('authorization')
      axios({
        method: 'get',
        url: `http://localhost:3000/users/${token}`,
      }).then(response => {
        const profile = response.data
        this.$store.dispatch('getUserDetail', profile)
      }).catch(err => {
        console.log(err);
      })
    },
    getDetailPost (post) {
      this.$store.dispatch('postData', post)
      this.$router.push('post')
    },
    like(stat) {
      const likers = {
        fullname: `${this.$store.state.profile.firstname} ${this.$store.state.profile.lastname}`,
        email: this.$store.state.profile.email,
        userId: this.$store.state.profile._id
      }
      const token = localStorage.getItem('authorization')

      axios({
        method: 'post',
        url: 'http://localhost:3000/upvote',
        data: {
          likers,
          statId: stat
        }
      }).then(response => {
        const post = response.data[0]
        this.getAllStatus()
      }).catch(err => {
        console.log(err);
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
  width: 100%;
}
</style>
