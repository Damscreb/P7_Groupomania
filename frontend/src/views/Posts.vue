<template>
  <div class="bg-darker pb-5">
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
            :userId="userId">
            <!-- @delete="restartPosts"> -->
      </PostWall>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      posts: [],
      users: [],
      role: localStorage.getItem('role'),
      userId: parseInt(localStorage.getItem('userId'))
    }
  },
  mounted() {
    this.$axios
      .get('/posts')
      .then(response => (this.posts = response.data.post))
  },
  destroyed() {
    this.users= []
  }
  // methods: {
  //   restartPosts() {
  //     // J'aimerai recharger le fil d'actu : le composant Posts.vue
  //     this.$router.push({ name: 'Posts' })
  //   }
  // }
}
</script>

<style scoped lang="scss">
.fifty-width {
  width: 50%
}
</style>