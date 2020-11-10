<template>
  <div class="bg-darker pb-5 min-height">
    <Header/>

    <div class="container d-flex flex-column align-items-center" v-if="deleted === false">
      <PostWall v-for="post in posts"            
            :key="post.id"
            :postId="post.id"
            :image="post.imageUrl"
            :title="post.title"
            :date="post.date"
            :postUserId="post.userId"
            :role="role"
            :userId="userId"
            @post-deleted="updatePost">
      </PostWall>

<!-- Si il n'y a pas de commentaire -->
      <p v-if="commentaries.length === 0"
         class="text-light h3 pt-3 w-75">
        Rédigez le 1er commentaire!
      </p>

<!-- Formulaire pour l'ajout de commentaire -->
      <div class="d-flex flex-row justify-content-between align-items-end text-light border border-light rounded-lg p-3 mb-3 w-75">

        <div class="d-flex flex-column container">
          <form class="row">
            <label for="newComment"
                  class="mr-auto h4">
              Votre commentaire:
            </label>
            <div class="w-100"></div>
            <textarea class="rounded-lg text-area-height inside-padding col-11"
                      placeholder="Réagissez!"
                      maxlength="250"
                      minlength="1"
                      v-model="newComment"
                      id="inputNewComment"/>
          </form>
        </div>

        <div>
          <button @click="sendComment"
                  class="btn btn-red mr-3">
            Envoyer
          </button>
        </div>
      </div>

<!-- Affichage des commentaires -->
      <Commentaries v-for="commentary in commentaries" 
                    :key="commentary.id"
                    :idPost="commentary.postId" 
                    :comment="commentary.comment"
                    :user="commentary.userId"
                    :time="commentary.date"
                    :commentId="commentary.id">
      </Commentaries>

    </div>

<!-- Si un commentaire est supprimé -->
    <div v-else class="text-success border border-success rounded-lg thirty-width container py-3 mt-4">

      <p class="mb-3">
        {{ message }}
      </p>

      <MessageRouter msg="Retour aux posts" 
                     route="/posts"
                     class="text-success"></MessageRouter>

    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      posts: [],
      commentaries: [],
      likes: Number,
      dislikes: Number,
      userId: Number,
      role: "",
      message: "",
      deleted: false,
      postId: Number,
      newComment: ""
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
          .get(`/posts/${this.$route.path.split('/')[2]}`)
          .then(responses => {
            this.posts = responses.data.post
            this.commentaries= responses.data.commentaires
            this.postId= responses.data.post[0].id
          })
      })    
  },
  methods: {
    updatePost() {
      this.deleted= true;
      this.message= "Post bien supprimé!"
    },
    sendComment() {
      this.$axios
        .post(`/posts/${this.postId}/comments`, {
          userId: `${this.userId}`, 
          comment: `${this.newComment}`
        })
        .then(response => {
          this.$axios
          .get(`/posts/${this.$route.path.split('/')[2]}`)
          .then(responses => {
            this.posts = responses.data.post
            this.commentaries= responses.data.commentaires
            this.postId= responses.data.post[0].id
            this.newComment = ""
          })
        })
    }
  }
}
</script>

<style scoped lang="scss">
.min-height {
  min-height:100%
}

.sixty-five-width {
  width:65%
}

.thirty-width {
  width: 30%
}

.text-area-height {
  min-height: 119px;
  max-height: 120px;
}

.inside-padding {
  padding: 5px;
}

@media all and (max-width: 750px) {
  label {
    font-size:21px;
  }
}
</style>