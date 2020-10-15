<template>
  <div class="bg-darker pb-5 big-height">
    <Header/>

    <div :class="borderClass">
      <form @submit.prevent="createPost">
        <h2 :class="titleClass"><u>Nouveau Post</u></h2>

        <div class="mb-4 d-flex flex-column px-3">
          <div class="text-left">
            <label for="Title">Titre du post</label>
            <FormInput idLinked="Title" v-model="title"></FormInput>
          </div>

          <div class="text-left">
            <label for="Image">Image du post</label>
            <FormInput idLinked="Image" v-model="imageUrl"></FormInput>
          </div>
        </div>

        <h3 v-if="message"
            class="font-weight-bold h2 mb-4 text-success">
          {{ message }}
        </h3>

        <div v-if="message">
          <h4>{{ title }}</h4>
          <img :src="imageSrc" class="img-fluid mb-3">
        </div>

        <button :class="btnClass" type="submit">
          Uploader
        </button>

      </form>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      imageUrl: "",
      userId: parseInt(localStorage.getItem("userId")),
      message: "",
      btnClass: "btn btn-upload",
      titleClass: "font-weight-bold h1 mb-4",
      borderClass: "container fifty-width border border-light p-3 text-light pb-4",
      imageSrc: "",
      imageTitle: ""
    }
  },
  methods: {
    createPost(e) {
      e.preventDefault()
      this.$axios
        .post('posts/', {
          title: this.title,
          imageUrl: this.imageUrl,
          userId: this.userId
        })
        .then(response => this.message = response.data.message,
                          this.btnClass= "btn btn-success",
                          this.titleClass= "font-weight-bold h1 mb-4 text-success",
                          this.borderClass= "container fifty-width border border-success p-3 text-light pb-4",
                          this.imageSrc= this.imageUrl,
                          this.imageTitle= this.title)
        .catch(error => this.message= error.data.message)
    }
  }
}
</script>

<style scoped lang="scss">
.ninety-width {
  width:90%
}

.fifty-width {
  width: 50%
}

.btn-upload {
  border: 2px solid rgb(231, 186, 186);
  border-radius: 5px;
  background-color: rgb(100%, 84%, 84%);
  &:hover {
    background-color: darken(rgb(100%, 84%, 84%),5%);
    border: 2px solid darken(rgb(231, 186, 186),10%);
  }
}

</style>