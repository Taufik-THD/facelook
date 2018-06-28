<template>
  <div class="container" style="padding-top:9%; width:90%;">
    <img src="" alt="">
    <div class="home">
      <div class="row">
        <div class="col s6" style="padding: 0% 0 0 2%;">
          <h3> <b>{{ getPost.email }}</b> </h3>
          <h5>{{ getPost.createdAt.slice(0, 10) }} || {{ getPost.createdAt.slice(11,19) }}</h5>
        </div>
        <div class="col s12">
          <div class="row">
            <div class="col s12 m12">
              <div class="card grey lighten-5">
                <div class="card-content black-text">
                  <p> <b>{{ getPost.status }}</b> </p>
                </div>
                <div class="card-action">
                  <div class="">
                    <div class="row">
                      <div class="col">
                        <label for="">{{ getPost.like.length }} like</label>
                        <br><br>
                      </div>
                      <div class="col">
                        <label for="">{{ getPost.comments.length }} comments</label>
                        <br><br>
                      </div>
                    </div>
                    <div class="">
                      <input type="text" name="" value="" placeholder="Enter your comment here . . ." v-model='newComment' v-on:keyup.enter='addComment(getPost)'>
                      <label for="">Add comment</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container left" style="width:91%;" v-if='getPost.comments.length != 0'>
          <h5 style="margin-left:2%;">Comments:</h5>
          <div class="col s12 m12" v-for='comment in getPost.comments' style="margin-left:5%;">
            <div class="card grey lighten-5">
              <div class="card-content black-text">
                <h6 style="color:red;">{{ comment.commentator.email }}</h6>
                <label for="">{{ comment.createdAt.slice(0, 10) }} || {{ getPost.createdAt.slice(11,19) }}</label>
                <br><br>
                <br>
                <p> <b>{{ comment.comment }}</b> </p>
                <br>
                <p> <b></b> </p>
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
      myStatus: '',
      newComment: ''
    }
  },
  created () {
    this.getUserProfile()
  },
  computed: {
    profile () {
      return this.$store.state.profile
    },
    getPost () {
      return this.$store.state.detailPost
    }
  },
  methods: {
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
    addComment (detail) {
      const self = this
      const token = localStorage.getItem('authorization')
      axios({
        method: 'post',
        url: `http://localhost:3000/addComment`,
        data: {
          comment: this.newComment,
          token,
          detail: detail
        }
      }).then(response => {
        self.newComment = ''
        const post = response.data[0]
        this.$store.dispatch('postData', post)
        console.log(post);
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
