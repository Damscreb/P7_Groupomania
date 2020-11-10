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

              <form class="text-left"  enctype="multipart/form-data">
                <label for="imgInput">Post image:</label><br/>
                <input required 
                       type="file" 
                       ref="file" 
                       id="newImage" 
                       name="imgInput" 
                       class="text-light"
                       @change="selectImg($event)" 
                       enctype="multipart/form-data"/>
              </form>
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
              <img :src="imageSrc" class="img-fluid" alt="Image new post"/>
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
      imageUrl: undefined,
      userId: "",
      message: "",
      btnClass: "btn btn-red",
      titleClass: "font-weight-bold h1 mb-4",
      borderClass: "container fifty-width border border-light p-3 text-light pb-4 col-10 col-sm-8 col-lg-6",
      imageTitle: "",
      imageSrc: null,
    }
  },
  created() {
    if (sessionStorage.getItem('token')===null) {
      this.$router.push({ name: 'Login' })
    }
  },
  methods: {
    createPost(e) {
      e.preventDefault()
      const myForm = new FormData();
      myForm.append("file", this.imageUrl);
      myForm.append("title", this.title);

      this.$axios
      .get(`auth/profile/${sessionStorage.getItem('token')}`)
      .then(response => {

        this.userId= response.data.user[0].id
        myForm.append("userId", this.userId);

        this.$axios
          .post('posts/', myForm)
          .then(responses => {
            this.message = responses.data.message,
            this.btnClass= "btn btn-success",
            this.titleClass= "font-weight-bold h1 mb-4 text-success",
            this.borderClass= "container fifty-width border border-success p-3 text-light pb-4",
            this.imageSrc= responses.data.imagePath,
            this.imageTitle= this.title
          })
          .catch(error => this.message= error.data.message)
      })
    },
    selectImg() {
      this.imageUrl = this.$refs.file.files[0]
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