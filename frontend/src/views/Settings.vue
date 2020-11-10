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
          <div class="w-100">
            <h2 class="mr-auto"><u>My account :</u></h2>
            <hr/>
          </div>

          <!-- Tout ce qui est relatif à la modification de données personnelles -->
          <div class="right-side">
            <form class="form-user">
              <p>Your first name:</p>
              <p><span>{{ userFirstName }}</span></p>
              <FormInputSettings idLinked="FirstName" 
                                v-model="firstName"
                                placeholder="Your new first name">

              </FormInputSettings>

              <p>Your last name:</p>
              <p><span>{{ userLastName }}</span></p>
              <FormInputSettings idLinked="LastName" 
                                v-model="lastName"
                                placeholder="Your new last name">
              </FormInputSettings>

              <p>Your email:</p>
              <p><span>{{ userEmail }}</span></p>
              <FormInputSettings idLinked="Email" 
                                v-model="email"
                                placeholder="Your new email"
                                patternLinked="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}">
              </FormInputSettings>

              <p>Your password:</p>   
              <FormInputSettings idLinked="Password" 
                                v-model="password"
                                placeholder="Your new password"
                                required
                                patternLinked="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}">
              </FormInputSettings>
 
              <FormInputSettings idLinked="Password2" 
                                v-model="password2"
                                placeholder="Confirm your new password"
                                required>
              </FormInputSettings>
            </form>

            <div class="m-auto">
              <div class="d-flex flex-column align-items-center">
                <label for="confirmUpdate">Your actual password to confirm</label>
                <input class="mb-2" 
                       placeholder="Your password" 
                       required 
                       v-model="actualPassword"
                       type="password"/>
                <button class="btn btn-red mb-3 mx-auto"
                        @click="uploadUser">
                  Save
                </button>
              </div>

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
      actualPassword: "",
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
  created() {
    if (sessionStorage.getItem('token')===null) {
      this.$router.push({ name: 'Login' })
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
      if (this.actualPassword === "") {
        this.message= "Enter your actual/old password to save changes"
      }
      if (this.firstName==="" && this.lastName==="" && this.email==="" && this.password==="" && this.password2==="") {
        this.message= "No change detected!"
      }
      if (this.password !== this.password2) {
          this.message = "Please match your new password"
        }
      else {
        if (this.firstName==="") this.firstName= this.userFirstName
        if (this.lastName==="") this.lastName= this.userLastName
        if (this.email==="") this.email= this.userEmail
        if (this.password==="") this.password = this.actualPassword
        this.$axios
        .post('/auth/login', {
          email: this.email,
          password: this.actualPassword
        })
        .then(() => {
          this.$axios  
            .put(`/auth/profile/${this.userId}`, {
              firstName: this.firstName,
              lastName: this.lastName,
              email: this.email,
              password: this.password,
            })
            .then(() => {
              this.$axios
                .get(`/auth/profile/${sessionStorage.getItem('token')}`)
                .then(response => {
                  this.userId= response.data.user[0].id,
                  this.userFirstName= response.data.user[0].firstName,
                  this.userLastName= response.data.user[0].lastName,
                  this.userEmail= response.data.user[0].email,
                  this.messageOk= "Change done successfully!",
                  this.password="",
                  localStorage.setItem('name', this.firstName + '_' + this.lastName)
                })
            })
            .catch(error => {
              this.message= error.response.data.message
            })
        })
        .catch(() => {
          this.message= "Actual password wrong"
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

input {
  font-size: 16px;
}
.sixty-width {
  width:60%
}

.right-side {
  display: flex;
  flex-direction: row;
  text-align: left
}

.form-user {
  width: 60%;
  display: flex;
  flex-direction: column;
}

@media all and (max-width: 750px) {
  form>p {
    font-size: 14px;
    font-weight: 600
  }

  .right-side {
    display: flex;
    flex-direction: column
  }

  .form-user {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>