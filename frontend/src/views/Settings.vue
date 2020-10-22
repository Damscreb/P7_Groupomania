<template>
  <div class="bg-darker big-height pb-5">
    <Header/>

    <div class="border border-light text-light container">
      <div class="row">

<!-- Partie gauche de la vue account settings -->
        <Navigator isActive="1"></Navigator>


        <!-- Partie droite de la vue account settings -->
        <div class="col-9 p-3 d-flex flex-column">
          <!-- Le titre -->
          <div class="max-width">
            <h2 class="mr-auto"><u>My account :</u></h2>
            <hr/>
          </div>

          <!-- Tout ce qui est relatif à la modification de données personnelles -->
          <div class="d-flex flex-row">
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
 
              <FormInputSettings idLinked="Password2" 
                                v-model="password2"
                                placeholder="Confirm your new password">

              </FormInputSettings>
            </form>

            <div class="m-auto">
              <button class="btn btn-red mb-3"
                      @click="uploadUser">
                Save
              </button>

              <p v-if="message!==''"
                class="text-danger">
                {{ message }}
              </p>

              <p v-if="messageOk!==''"
                class="text-success">
                {{ messageOk }}
              </p>
            </div>
          </div>

          <!-- Ici c'est la suppression du compte -->
          <hr/>
          <div class="mx-auto my-2">
            <button v-if="messageDelete===''"
                    class="btn btn-red"
                    @click="deleteUser">
              Delete my account
            </button>

            <p v-if="messageDelete!==''"
                class="text-success">
                {{ messageDelete }}
              </p>
          </div>
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
      password2: "",
      userId: Number,
      userFirstName: "",
      userLastName: "",
      userEmail: "",
      message:"",
      messageOk: "",
      messageDelete: ""
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
  methods: {
    uploadUser() {
      this.message= ""
      this.messageOk= ""
      if (this.firstName==="" && this.lastName==="" && this.email==="" && (this.password==="" || this.password2==="")) {
        this.message= "No change detected!"
      }
      else {
        if (this.firstName==="") this.firstName= this.userFirstName
        if (this.lastName==="") this.lastName= this.userLastName
        if (this.email==="") this.email= this.userEmail
        this.$axios  
          .put(`/auth/profile/${this.userId}`, {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password
          })
          .then(response => {
            this.$axios
              .get(`/auth/profile/${sessionStorage.getItem('token')}`)
              .then(response => {
                this.userId= response.data.user[0].id
                this.userFirstName= response.data.user[0].firstName,
                this.userLastName= response.data.user[0].lastName,
                this.userEmail= response.data.user[0].email
                this.messageOk= "Change done successfully!"
              })
          })
      }
    },
    deleteUser() {
      this.$axios
        .delete(`/auth/profile/${this.userId}`)
        .then(response => {
          this.messageDelete= response.data.message
          setTimeout(function () { this.$router.push({ name: 'Signup' }) }.bind(this), 2500)
        })
    }
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