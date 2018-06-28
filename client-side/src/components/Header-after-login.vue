<template>
  <div class="element">
    <div class="nav-wrapper">
      <nav>
        <div class="row">
          <div class="col s3" @click='timeline' style="cursor:pointer;">
            <label href="#" class="brand-logo" style="padding: 2% 0 0 20px; cursor:pointer;"><i class="fab fa-facebook"></i></label>
            <!-- <div class="input-field col s12" style="margin-left:12%;">
              <input id="search" type="text" class="validate">
              <label for="search" style="color:white"> Find your friend  . . .</label>
            </div> -->
            <h6 style="margin: 11% 0 0 17%; font-size:20px;"><b>facelook</b></h6>
          </div>
          <div class="" >
            <div class="col s6" style="padding: 1% 0 0 0; margin: 0% 0 0 23%;">
              <ul id="nav-mobile" class="right hide-on-med-and-down" style="cursor:pointer;">
                <li class="waves-effect" ><a title="Profile" @click='goToProfile'><i class="fas fa-user-circle"></i> <label style="font-size:20px; cursor:pointer;"> Profile</label> </a></li>
                <li @click='timeline'><a title="Timeline"> <i class="fas fa-list-alt"></i> <label style="font-size:20px; cursor:pointer;"> Timeline</label> </a></li>
                <!-- <li><a title="Inbox"> <i class="far fa-comments"></i> </a></li>
                <li><a title="Notification"> <i class="fas fa-globe"></i> </a></li> -->
                <li><a title="Logout" @click='logout'> <i class="fas fa-lock"></i><label style="font-size:20px; cursor:pointer;"> Logout</label> </a></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    if (!localStorage.getItem('authorization')) {
      this.$router.push('/')
    }
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    profile () {
      return this.$store.state.profile
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
    },
    logout () {
      localStorage.clear();
      this.$router.push('/')
    },
    timeline () {
      this.$router.push('/')
    },
    goToProfile () {
      this.$router.push(`profile`)
    }
  }
}
</script>

<style scoped>
nav {
    color: #fff;
    background-color: #0d47a1;
    width: 100%;
    height: 80px;
    line-height: 56px;
    position: top fixed;
}
.tooltip {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.3s;
    font-size: 12px;
}

.tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
}
.element {
  position: fixed;
  z-index: 999;
  width: 100%;
}
</style>
