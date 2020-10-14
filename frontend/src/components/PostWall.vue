<!-- Seulement pour les posts sans commentaires (genre dans le fil d'actu) -->
<template> 
    <div class="border border-light rounded-lg text-light d-flex flex-column mx-auto mb-3 py-3 px-5">
      <div class="py-3 d-flex justify-content-between">
        <h3>{{ title }}</h3>
        <!-- On vérifie les conditions d'affichage du bouton delete -->
        <button v-if="role === 'admin' || postUserId===userId"
                class="btn btn-light"
                @click="deletePost">Delete</button> 
      </div>
      
      <router-link :to="route">
          <img :src=image  alt="Image du post" class="not-too-big m-auto"/>
      </router-link>

      <div class="d-flex flex-row justify-content-between py-2"> <!-- Une div pour heure date à froite, un pour les pouces à gauche -->
        <div class="ml-auto d-flex flex-column align-items-end">
          <p>Date : {{date.split('T')[0]}}</p>
          <p>Heure : {{date.split('T')[1].split('.')[0]}}</p>
        </div>
      </div>

    </div>
</template>

<script>
export default {
  name: "Post",
  props: {
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    postUserId: {
      type: Number,
      required: true
    },
    userId: {
      type: Number,
      required: true
    },
    postId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      message: "",
      route: ""
    }
  },
  methods: {
    deletePost() {
      this.$axios
        .delete(`/posts/${this.postId}`)
        .catch(error => this.message=error)
    }
  },
  mounted() {
    this.route= "/post/" + this.postId
  }
};
</script>

<style scoped lang="scss">
p {
  margin:0;
}

.not-too-big {
  max-width: 100%;
  background-position : center center;
}
</style>
