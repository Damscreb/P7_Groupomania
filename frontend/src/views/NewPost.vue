<template>
  <div class="bg-darker pb-5 big-height">
    <Header/>

    <div class="container">
      <div class="row">
        <div :class="borderClass">
          <form @submit.prevent="createPost">
            <h2 :class="titleClass"><u>New Post</u></h2>

            <div class="mb-4 d-flex flex-column px-3">
              <div class="text-left">
                <label id="titleText" for="Title">Post title:</label>
                <FormInput idLinked="Title" v-model="title"></FormInput>
              </div>

              <div class="text-left">
                <label for="Image">Post image:</label>
                <FormInput idLinked="Image" v-model="imageUrl"></FormInput>
              </div>
            </div>

            <h3 v-if="message"
                class="font-weight-bold h2 mb-4 text-success">
              {{ message }}
            </h3>

            <router-link v-if="message"
                    name="back-to-posts"
                    :class="btnClass"
                    to="Posts"
                    type="button">
              Back to posts
            </router-link>

            <div v-if="message" class="mt-4">
              <h4>{{ title }}</h4>
              <img :src="imageSrc" class="img-fluid">
            </div>

            <button v-if=" message === '' "
                    :class="btnClass" 
                    type="submit">
              Upload
            </button>

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
      title: "",
      imageUrl: "",
      userId: "",
      message: "",
      btnClass: "btn btn-red",
      titleClass: "font-weight-bold h1 mb-4",
      borderClass: "container fifty-width border border-light p-3 text-light pb-4 col-10 col-sm-8 col-lg-6",
      imageSrc: "",
      imageTitle: ""
    }
  },
  methods: {
    createPost(e) {
      e.preventDefault()
      this.$axios
      .get(`auth/profile/${sessionStorage.getItem('token')}`)
      .then(response => {
        this.userId= response.data.user[0].id
        this.$axios
          .post('posts/', {
            title: this.title,
            imageUrl: this.imageUrl,
            userId: this.userId
          })
          .then(response => this.message = response.data.message,
                            this.btnClass= "btn btn-success",
                            this.titleClass= "font-weight-bold h1 mb-4 text-success",
                            this.borderClass= "container fifty-width border border-success p-3 text-light pb-4",
                            this.imageSrc= this.imageUrl,
                            this.imageTitle= this.title)
          .catch(error => this.message= error.data.message)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.ninety-width {
  width:90%
}

.fifty-width {
  width: 50%
}

@media all and (max-width: 750px) {
  h2 {
    font-size: 30px;
  }
}
</style>