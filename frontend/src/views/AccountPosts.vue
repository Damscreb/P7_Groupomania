<template>
  <div class="bg-darker big-height pb-5">
    <Header/>

    <div class="border border-light text-light container">
      <div class="row">

        <Navigator isActive="2"></Navigator>

        <div class="col-9 p-3 d-flex flex-column justify-content-start">
          <h2><u>My posts :</u></h2>
          <hr/>
          <p v-if="message!==''"
             class="font-weight-bold my-2 text-red">
            {{ message }}
          </p>
          <PostWall v-for="post in posts"            
            :key="post.id"
            :postId="post.id"
            :image="post.imageUrl"
            :title="post.title"
            :date="post.date"
            :postUserId="post.userId"
            :role="role"
            :userId="userId"
            @post-deleted="updatePosts">
          </PostWall>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      posts: [],
      userId: Number,
      role: "",
      message: ""
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
        this.role= response.data.user[0].role
        this.userId= response.data.user[0].id
        this.$axios
          .get(`/posts/${this.userId}/posts`)
          .then(responses => {
            this.message=""
            this.posts = responses.data.post
            this.commentaries= responses.data.commentaires
            this.postId= responses.data.post[0].id
          })
          .catch(error => 
            this.message= "No post found")
      })    
  },
  methods: {
    updatePosts() {
      setTimeout(function () { 
        this.$axios
        .get(`/posts/${this.userId}/posts`)
        .then(response => this.posts = response.data.post)
       }.bind(this), 150)    
    }
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
.text-red {
  color: $base-color;
}
</style>