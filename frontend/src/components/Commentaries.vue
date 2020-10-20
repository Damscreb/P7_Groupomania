<template>
  <div class="border border-light rounded-lg text-light mb-3 py-2 px-3 d-flex flex-end flex-column">

    <div v-if="this.message===''"
         class="d-flex flex-row justify-content-between align-items-center">

      <div class="d-flex flex-column">
        <u class="mr-auto h5">
          {{ fullName }}
        </u>

        <p class="mr-auto">
          {{ comment }}
        </p>
      </div>

      <div class="d-flex flex-column">
        <img src="@/assets/icon-delete.png"
             v-if="role === 'admin' || user === userId" 
             alt="Icône suppression"
             class="icon ml-auto"
             @click="deleteComment"/>
        <p class="ml-auto">Date :  {{ time.split('T')[0] }}</p>
        <p class="ml-auto">Heure : {{ time.split('T')[1].split('.')[0] }}</p>
      </div>

    </div>

    <div v-else
         class="text-success h3">
      {{ message }}
    </div>

  </div>
</template>

<script>
export default {
  name: "Commentaries",
  props: {
    idPost: {
      required: true,
      type: Number
    },
    comment: {
      required: true,
      type: ""
    },
    user: {
      required: true,
      type: Number
    },
    time: {
      required: true,
      type: ""
    },
    commentId: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
      fullName: "",
      role: "",
      userId: Number,
      message: ""
    }
  },
  mounted() {
    this.$axios
      .get(`/auth/profile/id/${this.user}`)
      .then(response => {
        this.fullName= response.data.user[0].firstName + ' ' + response.data.user[0].lastName
      })
    this.$axios
      .get(`auth/profile/${sessionStorage.getItem('token')}`)
      .then(response => {
        this.role= response.data.user[0].role
        this.userId= response.data.user[0].id
      })
  },
  methods: {
    deleteComment() {
      this.$axios
        .delete(`/posts/${this.idPost}/comments/${this.commentId}`, { data: this.userId})
        .then(response => {
          this.message= response.data.message
          this.$emit('comment-deleted')
        })
        .catch(error => this.message=error)
    }
  }
}
</script>

<style scoped lang="scss">
.icon {
  width: 20px;
  position: relative;
  bottom: 18px;
  left: 25px;
}

</style>