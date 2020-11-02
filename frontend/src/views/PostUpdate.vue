<template>
  <div class="bg-darker big-height pb-5">
    <Header/>

    <div class="container border border-light rounded-lg text-light d-flex flex-row p-3">
      <div class="w-50">
        <p>Before</p>
        <hr/>
        <p class="h1">{{ post.title }}</p>
        <img :src="post.imageUrl" class="not-too-big" alt="Post img"/>
      </div>

      <div class="w-50 ml-1">
        <p>After</p>
        <hr/>
        <div class="mb-4">
          <p :v-model="newTitle" class="h1"><u>{{newTitle}}</u></p>
          <FormInputSettings idLinked="Title"
                            v-model="newTitle"
                            :placeholder="title"
                            @input="alwaysTitle" >
          </FormInputSettings>
        </div>

        <form class="mb-4" enctype="multipart/form-data">
          <label class="h2" for="imgInput"><u>Post image</u></label><br/>
          <input required 
                  type="file" 
                  ref="file" 
                  id="newImage" 
                  name="imgInput" 
                  class="text-light"
                  enctype="multipart/form-data"
                  @change="selectImg($event)"/>
        </form>

        <div v-if="messageError"
             class='text-danger h3 my-4'>
          Choose an image please!
        </div>

        <button class="btn btn-red"
                @click="updatePost"
                v-if="!messageOk">
          Save changes
        </button>

        <div v-if="messageOk">
          <h3 class="font-weight-bold h2 mb-4 text-success">
            {{ messageOk }}
          </h3>

          <router-link
                  name="back-to-posts"
                  :class="btnClass"
                  to="/posts"
                  type="button">
            Back to posts
          </router-link>

          <div class="mt-4">
            <h4>{{ newTitle }}</h4>
            <img :src="newImageSrc" class="img-fluid" alt="Image new post"/>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      post: [],
      userId: Number,
      role: "",
      messageOk: "",
      messageError: "",
      postId: Number,
      title: "",
      btnClass: "btn btn-success text-light",
      newTitle: "New title",
      newImage: null,
      newImageSrc: ""
    }
  },
  mounted() {
    this.$axios
      .get(`auth/profile/${sessionStorage.getItem('token')}`)
      .then(response => {
        this.role= response.data.user[0].role
        this.userId= response.data.user[0].id
        this.$axios
          .get(`/posts/${this.$route.path.split('/')[2]}`)
          .then(responses => {
            this.post = responses.data.post[0]
            this.postId= responses.data.post[0].id
            this.title= responses.data.post[0].title
          })
      })    
  },
  methods: {
    updatePost() {
      if (this.newImage===null) this.messageError= "Choose an image"
      else {
        const myForm = new FormData();
        myForm.append("file", this.newImage);
        myForm.append("title", this.newTitle);
        myForm.append("oldImage", this.post.imageUrl)
        this.$axios
        .put(`posts/${this.postId}`, myForm)
        .then(response => {
          this.messageOk = response.data.message
          this.newImageSrc= response.data.path
        })
      }
    },
    alwaysTitle() {
      if (this.newTitle==="") this.newTitle = "New title"
    },
    selectImg() {
      this.newImage = this.$refs.file.files[0]
    }
  }
}
</script>

<style scoped lang="scss">

hr {
  width: 100%;
  border-top: 1px solid rgb(97%, 98%, 98%);
}

.not-too-big {
  max-width: 100%;
  max-height: 800px;
  background-position : center center;
}
</style>