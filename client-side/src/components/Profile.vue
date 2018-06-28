<template>
  <div class="container" style="padding-top:9%; width:90%;">
    <div class="home">
      <div class="row">
        <div class="col s3">
          <br>
          <img src="https://cdn0.iconfinder.com/data/icons/PRACTIKA/256/user.png" alt="" style="width:300px;">
        </div>
        <div class="col s6" style="padding: 8% 0 0 5%;">
          <h3> <b>{{ profile.firstname }} {{ profile.lastname }}</b> </h3>
          <h5> <b>{{ profile.email }}</b> </h5>
        </div>
        <div class="col s12">
          <h4> <b>Post :</b> </h4>
          <div class="row" v-for='status in myStatus'>
            <div class="col s12 m12">
              <div class="card grey lighten-5">
                <div class="card-content black-text">
                  <div class="row">
                    <div class="col s3">
                      <h6 style="color:#0d47a1;"> <b>{{ profile.firstname }} {{ profile.lastname }}</b> </h6>
                      <p style="color:#9e9e9e">{{ status.createdAt.slice(0, 10) }} || {{ status.createdAt.slice(11,19) }}</p>
                      <br>
                      <br>
                      <p>{{ status.status }}</p>
                    </div>
                    <div class="col" style="padding:0.5% 0 0 71%;">
                      <i class="material-icons" style="color:red; font-size:40px; cursor:pointer;" title="Delete this post" @click='deleteStatus(status._id)'>delete_forever</i>
                    </div>
                  </div>
                </div>
                <div class="card-action">
                  <div class="">
                    <div class="row">
                      <div class="col">
                        <label for="">{{ status.like.length }} like</label>
                        <br><br>
                      </div>
                      <div class="col">
                        <label for="">{{ status.comments.length }} comments</label>
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
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
      myStatus: ''
    }
  },
  created () {
    // this.confirmCheck()
    this.getMyStatus()
    this.getUserProfile()
    console.log(this.allStatus);
  },
  computed: {
    profile () {
      return this.$store.state.profile
    }
  },
  methods: {
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
    getMyStatus () {
      const token = {
        token: localStorage.getItem('authorization')
      }

      axios({
        method: 'post',
        url: 'http://localhost:3000/myStatus',
        data: token
      }).then(response => {
        this.myStatus = response.data
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
    deleteStatus (id) {
      const token = localStorage.getItem('authorization')
      axios({
        method: 'delete',
        url: `http://localhost:3000/${id}`,
        data: {
          token: token
        }
      }).then(response => {
        this.myStatus = response.data
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
