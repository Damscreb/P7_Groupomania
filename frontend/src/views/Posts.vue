<template>
  <div class="bg-darker pb-5 min-height">
    <Header/>

    <div class="container fifty-width">
      <PostWall v-for="post in posts"
            :key="post.id"
            :postId="post.id"
            :image="post.imageUrl"
            :title="post.title"
            :date="post.date"
            :postUserId="post.userId"
            :role="role"
            :userId="userId"
            :post-deleted="updatePosts"
            >
      </PostWall>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      posts: [],
      likes: Number,
      dislikes: Number,
      userId: Number,
      role: ""
    }
  },
  mounted() {
    this.$axios
      .get(`auth/profile/${sessionStorage.getItem('token')}`)
      .then(response => {
        this.role= response.data.user[0].role
        this.userId= response.data.user[0].id
        this.$axios
          .get('/posts')
          .then(responses => {
            this.posts = responses.data.post
          })
      })    
  },
  methods: {
    updatePosts() {
      this.$axios
        .get('/posts')
        .then(response => {this.posts = response.data.post })
    }
  }
}
</script>

<style scoped lang="scss">
.fifty-width {
  width: 50%
}

.min-height {
  min-height: 100%;
}
</style>