<template>
  <div class="bg-darker big-height pb-5">
    <Header/>

    <div class="border border-light text-light container">
      <div class="row">

        <Navigator isActive="1"></Navigator>

        <div class="col-9 p-3 d-flex flex-column">
          <div class="max-width">
            <h2 class="mr-auto"><u>My account :</u></h2>
            <hr/>
          </div>

          <form class="d-flex flex-column sixty-width">
            <p class="mr-auto">Your first name : <span>{{ userFirstName }}</span></p>
            <FormInputSettings idLinked="FirstName" 
                              v-model="firstName"
                              placeholder="Your new first name">

            </FormInputSettings>

            <p class="mr-auto">Your last name : <span>{{ userLastName }}</span></p>
            <FormInputSettings idLinked="LastName" 
                              v-model="lastName"
                              placeholder="Your new last name">

            </FormInputSettings>

            <p class="mr-auto">Your email : <span>{{ userEmail }}</span></p>
            <FormInputSettings idLinked="Email" 
                              v-model="email"
                              placeholder="Your new email">

            </FormInputSettings>

            <p class="mr-auto">Your password :</p>   
            <FormInputSettings idLinked="Password" 
                              v-model="password"
                              placeholder="Your new password">

            </FormInputSettings>
          </form>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      userId: Number,
      userFirstName: "",
      userLastName: "",
      userEmail: ""
    }
  },
  mounted() {
    this.$axios
      .get(`auth/profile/${sessionStorage.getItem('token')}`)
      .then(response => {
        this.userId= response.data.user[0].id
        this.userFirstName= response.data.user[0].firstName,
        this.userLastName= response.data.user[0].lastName,
        this.userEmail= response.data.user[0].email
      })
  },
  destroyed() {
    this.userFirstName= "",
    this.userLastName= "",
    this.userEmail= "",
    this.password= ""
  }
}
</script>

<style scoped lang="scss">
$base-color : rgb(253,45,1);

h2 {
  font-size: 20px;
  font-weight: 700;
}

hr {
  width: 100%;
  border-top: 1px solid rgb(97%, 98%, 98%);
}

ul {
  list-style-type: none;
  font-size: 20px;
  margin: 0px;
  padding: 0px;
}

p {
  margin-bottom: 5px;
}

span {
  color: $base-color;
  font-weight: 600;
}

.sixty-width {
  width:60%
}

.max-width {
  width: 100%
}
</style>