<template>
  <div class="bg-darker py-5 big-height">
    <div class="container d-flex align-items-center flex-column my-5">

      <div class="row col-12 col-sm-8 col-lg-5 mb-4">
        <div class="col border border-light bg-black text-light ">

          <img src="@/assets/icon-left-font.png" width="180px" class="my-5"/>
          <h2 class="mb-5 font-weight-bold"
              v-if="messageConnection === null">
              Connectez-vous !
          </h2>
          
          <h2 class="mb-5 font-weight-bold" v-else>{{ messageConnection }}</h2>

          <form @submit="connection">



            <FormInput idLinked="Email" v-model="email"/>

            <FormInput idLinked="Password" v-model="password" class="mb-5"/>
            
            <p>
              <input type="submit" 
                     value="Se connecter" 
                     class="btn btn-light border mb-3">  
            </p>
            
          </form>
        </div>
      </div>

      <div class="row col-12 col-sm-8 col-lg-5">
        <div class="col border border-light d-flex align-items-center text-light justify-content-center p-2 bg-black">
          <p class="my-auto mr-2">Pas encore de compte?  </p> 
          <MessageRouter msg="Inscrivez vous!" route="signup"></MessageRouter>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      email: "",
      password: "",
      messageConnection: null,
      userId: ""
    }
  },
  methods: {
    connection(e) {
      e.preventDefault()
      this.$axios
        .post('/auth/login', {
          email: this.email,
          password: this.password
        })
        .then(response => {
          sessionStorage.setItem("token", response.data.token),
          localStorage.setItem("name", response.data.user.firstName + "_" +response.data.user.lastName),
          this.messageConnection = response.data.message,
          this.$axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token,
          setTimeout(function () { this.$router.push({ name: 'Posts' }) }.bind(this), 2000)
                             
        })
        .catch(error => {
          if (error.response.status===429) {
            this.messageConnection=error.response.data
          }
          else {
            this.messageConnection = "Invalid username!"
          }
        })
    }
  },
  mounted() {
    sessionStorage.removeItem('token')
    localStorage.removeItem('name')
  }
}
</script>

<style lang="scss">

h2 {
  font-size: 18px
}

.bg-darker {
  background-color: rgb(5%, 6%, 6%);
}

.bg-black {
  background-color: rgb(0%, 0%, 0%),
}

.thirdty-width {
  width:30%;
  box-shadow: 1px 1px 12px #555;
}

.eighty-width {
  width: 80%
}

.big-height {
  min-height:100%;
}

</style>