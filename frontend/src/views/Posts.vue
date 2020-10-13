<template>
  <div class="bg-darker big-height pb-5">
    <Header/>

    <div class="container eighty-width">
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
      .get('/posts')
      .then(response => (this.posts = response.data.result))
  }
}
</script>

<style>
.eighty-width {
  width: 80%
}
</style>