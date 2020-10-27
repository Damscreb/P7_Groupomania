<template>
  <div class="border border-light rounded-lg text-light mb-3 py-2 px-3 d-flex flex-end flex-column w-75">

    <div v-if="this.message===''"
         class="d-flex flex-row justify-content-between align-items-start">

      <div class="d-flex flex-column justify-content-start mr-1">
        <u class="text-left h5">
          {{ fullName }}
        </u>

        <p class="text-left small-area">
          {{ comment }}
        </p>
      </div>

      <div class="d-flex flex-column" id="deleteAndTime">
        <img src="@/assets/icon-delete.png"
             v-if="role === 'admin' || user === userId" 
             alt="Icône suppression"
             class="icon ml-auto"
             @click="deleteComment"/>
        <p class="text-right">Date :  {{ time.split('T')[0] }}</p>
        <p class="text-right">Heure : {{ time.split('T')[1].split('.')[0] }}</p>
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
  &:hover {
    cursor: pointer;
  }
}

#deleteAndTime {
  font-size: 14px;
}

@media all and (max-width: 750px) {
  .small-area {
    width: 100%
  }
}
</style>