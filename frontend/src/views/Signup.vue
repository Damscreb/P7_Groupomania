<template>
  <div class="bg-darker py-5 big-height">
    <div class="container d-flex align-items-center flex-column my-5">

      <div class="row thirdty-width mb-4 text-light">
        <div class="col border border-light bg-black">
          <img src="@/assets/icon-left-font-monochrome-white.png" width="150px" />
          <h1 class="mb-5">Rejoignez le réseau social interne, moderne et ludique !</h1>
          <form @submit="createAccount">

            <FormInput idLinked="Email" v-model="email"/>

            <FormInput idLinked="Prénom" v-model="firstName"/>

            <FormInput idLinked="Nom" v-model="lastName"/>

            <FormInput idLinked="Password" v-model="password" class="mb-5"/>

            <p>
              <input type="submit" value="S'inscrire" class="btn btn-light border mb-3">  
            </p>
          </form>
        </div>
      </div>

      <div class="row thirdty-width">
        <div class="col border border-light d-flex align-items-center text-light justify-content-center p-2 bg-black">
          <p class="my-auto mr-2">Déjà un compte?  </p> 
          <MessageRouter msg="Connectez vous!" route="login"></MessageRouter>
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
      firstName: "",
      lastName: "",
      password: ""
    }
  },
  methods: {
    createAccount(e) {
      e.preventDefault()
      this.$axios.post('/auth/signup', {
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password
      })
      .then((response) => {
        sessionStorage.setItem("token", response.data.token),
        localStorage.setItem("userId", response.data.user.id),
        localStorage.setItem("role", response.data.user.role),
        localStorage.setItem("name", response.data.user.firstName + "_" + response.data.user.lastName),
        this.$axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token,
        this.$router.push({ name: 'Posts' }) ;  
      })
    }
  }    
}
</script>

<style lang="scss" scoped>

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

.full-width {
  width: 80%
}

.big-height {
  height: 100%
}

h1 {
  font-size: 18px
}

</style>