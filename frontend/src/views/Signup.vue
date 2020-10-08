<template>
  <div class="bg-darker py-5 big-height">
    <div class="container d-flex align-items-center flex-column my-5">

      <div class="row thirdty-width mb-4 text-light">
        <div class="col border border-light bg-black">
          <img src="@/assets/icon-left-font-monochrome-white.png" width="150px" />
          <h1 class="mb-5">Rejoignez le réseau social interne, moderne et ludique !</h1>
          <form @submit.prevent="onSubmit">

            <p>
              <input id="email" v-model="email" placeholder="Email" class="full-width">
            </p>

            <p>
              <input id="firstName" v-model="firstName" placeholder="First Name" class="full-width">
            </p>

            <p>
              <input id="lastName" v-model="lastName" placeholder="Last Name" class="full-width">
            </p>

            <p class="mb-5">
              <input id="password" v-model="password" placeholder="Password" class="full-width">
            </p>

            <p>
              <input type="submit" value="Submit" class="btn btn-light border mb-3">  
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
  width:30%
}

.full-width {
  width: 80%
}

.big-height {
  height: 100%
}

input {
  font-size: 13px
}

h1 {
  font-size: 18px
}

</style>