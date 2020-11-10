<template>
  <div class="bg-darker big-height pb-5">
    <Header/>

    <div class="border border-light text-light container">
      <div class="row">

        <Navigator isActive="3"></Navigator>


        <div class="col-9 p-3 d-flex flex-column justify-content-center align-items-center">
          <h2><u>Disconnect:</u></h2>
          <hr/>
          
          <button class="btn btn-red w-25"
                  @click="backToLogin">
            Log out
          </button>
        </div>
      </div>


    </div>

  </div>
</template>

<script>
export default {
  methods: {
    backToLogin() {
      this.$router.push({ name: 'Login' })
    }
  },
  created() {
    if (sessionStorage.getItem('token')===null) {
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style scoped lang="scss">
$base-color : rgb(253,45,1);
</style>