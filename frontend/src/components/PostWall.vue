<!-- Seulement pour les posts sans commentaires (genre dans le fil d'actu) -->
<template> 
    <div class="border border-light rounded-lg text-light d-flex flex-column mx-auto mb-3 py-3 px-4 w-75">
      <div class="py-3 d-flex justify-content-between align-items-center">
        <h3>{{ title }}</h3>

        <div class="d-flex flex-column">
          <!-- On vérifie les conditions d'affichage du bouton modify -->
          <router-link :to="routeUpdate">
            <button v-if="postUserId === userId"
                    class="btn btn-red mb-2"
                    :id="postId">
              Update
            </button>
          </router-link>
          <!-- On vérifie les conditions d'affichage du bouton delete -->
          <button v-if="role === 'admin' || postUserId === userId"
                  class="btn btn-red"
                  @click="deletePost">
            Delete
          </button> 
        </div>

      </div>
      
      <router-link :to="route">
          <img :src=image  alt="Image du post" class="not-too-big m-auto"/>
      </router-link>

      <!-- Une div pour heure date à droite, un pour les pouces à gauche -->
      <div class="d-flex flex-row justify-content-between py-2 align-items-center"> 

        <div class="mr-auto d-flex flex-column">
          <div class="d-flex flex-row align-items-center">
            <img src="@/assets/icon-like.png" alt="Pouce levé" class="pouceImg" @click="addLike"/> 
            <p class="ml-1">{{ likes }}</p>            
          </div>

          <div class="d-flex flex-row align-items-center">
            <img src="@/assets/icon-dislike.png" alt="Pouce baissé" class="pouceImg" @click="addDislike"/>
            <p class="ml-1">{{ dislikes }}</p>  
          </div>
        </div>

        <p v-if="message">
          {{ message }}
        </p>

        <div class="ml-auto d-flex flex-column text-right low-font-size">
          <p>Date : {{date.split('T')[0]}}</p>
          <p>Time : {{date.split('T')[1].split('.')[0]}}</p>
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
      route: "",
      routeUpdate:"",
      likes: Number,
      dislikes: Number
    }
  },
  mounted() {
    this.$axios
      .get(`/posts/likedislike/${this.postId}`)
      .then(response => {
        this.likes= response.data.likes,
        this.dislikes= response.data.dislikes
      })
    this.route= "/post/" + `${this.postId}`
    this.routeUpdate = "/postupdate/" + `${this.postId}`
  },
  methods: {
    createMessage() {
      this.message = response.data.message
    },
    deletePost() {
      this.$axios
        .delete(`/posts/${this.postId}`)
        .then(this.$emit('post-deleted'))
        .catch(error => this.message=error)
    },
    addLike() {
      this.$axios
        .post(`/posts/${this.postId}/like`, {
            type: 1,
            userId: this.userId
          })
        .then((response) => {
          this.message = response.data.message
          this.likes = response.data.likes
          this.dislikes = response.data.dislikes
        })
        .catch(error => this.message=error)
    },
    addDislike() {
      this.$axios
        .post(`/posts/${this.postId}/like`, {
            type: -1,
            userId: this.userId
          })
        .then((response) => {
          this.message = response.data.message
          this.likes = response.data.likes
          this.dislikes = response.data.dislikes
        })
        .catch(error => this.message=error)
    },
  }
};
</script>

<style lang="scss">
$base-color : rgb(253,45,1);

p {
  margin:0;
}

.not-too-big {
  max-width: 100%;
  max-height: 800px;
  background-position : center center;
}

.btn-red {
  border: 2px solid darken($base-color, 5%);
  border-radius: 5px;
  background-color: $base-color;
  &:hover {
    background-color: darken($base-color,10%);
    border: 2px solid darken($base-color,25%);
  }
  &:active {
    background-color: lighten($base-color,10%);
  }
}

.pouceImg {
  &:hover {
    cursor: pointer;
  }
}

h3 {
  margin-bottom: 0px;
}

@media all and (max-width: 750px) {
  li>div>a {
    font-size: 15px;
  }

  .low-font-size {
    font-size: 14px
  }

  .pouceImg {
    width:40px;
    &:hover {
      cursor: pointer;
    }
  }

  h3 {
    font-size: 18px;
  }
}
</style>
