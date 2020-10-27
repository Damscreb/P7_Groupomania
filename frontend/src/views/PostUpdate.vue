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

      <div class="w-50">
        <p>After</p>
        <hr/>
        <div class="my-4 pt-2">
        <FormInputSettings idLinked="Title"
                           v-model="newTitle"
                           :placeholder="title">
        </FormInputSettings>
        </div>

        <button class="btn btn-red"
                @click="updatePost">
          Save changes
        </button>
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
      message: "",
      postId: Number,
      title: "",
      newTitle: "",
      newImage: ""
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
      this.$axios
      .put(`posts/${this.postId}`, {
        title : this.newTitle,
        imageUrl: this.newImage
      })
      .then(response => {
        console.log(response)
      })
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