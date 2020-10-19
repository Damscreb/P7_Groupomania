<template>
  <div class="bg-darker pb-5 min-height">
    <Header/>

    <div class="container sixty-five-width">
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
          .get(`/posts/${this.$route.path.split('/')[2]}`)
          .then(responses => {
            this.posts = responses.data.post
            this.commentaries= response.data.commentaires
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

<style>
.min-height {
  min-height:100%
}
.sixty-five-width {
  width:65%
}

</style>