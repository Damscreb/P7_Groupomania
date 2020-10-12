<template>
  <div class="bg-darker py-5 big-height">
    <div class="container d-flex align-items-center flex-column my-5">

      <div class="row thirdty-width mb-4">
        <div class="col border border-light bg-black">
          <img src="@/assets/icon-left-font-monochrome-white.png" width="150px" />
          <h2 class="text-light mb-5">Connectez-vous !</h2>
          <form @submit.prevent="onSubmit">

            <FormInput idLinked="Email" v-model="email"/>

            <FormInput idLinked="Password" v-model="password" class="mb-5"/>
            
            <p>
              <input type="submit" value="Submit" class="btn btn-light border mb-3">  
            </p>
            
          </form>
        </div>
      </div>

      <div class="row thirdty-width">
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
    }
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

</style>