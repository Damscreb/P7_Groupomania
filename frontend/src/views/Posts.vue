<template>
  <div class="bg-darker pb-5">
    <Header/>

    <div class="container fifty-width">
      <PostWall v-for="post in posts"
            :key="post.postId"
            :image="post.imageUrl"
            :title="post.title"
            :date="post.date">
      </PostWall>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      posts: []
    }
  },
  mounted () {
    this.$axios
      .get('/posts', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(response => (this.posts = response.data.result))
  }
}
</script>

<style>
.fifty-width {
  width: 50%
}
</style>