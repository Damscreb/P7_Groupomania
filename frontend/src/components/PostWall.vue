<!-- Seulement pour les posts sans commentaires (genre dans le fil d'actu) -->
<template> 
  <div class="border border-light rounded-lg text-light d-flex flex-column mx-auto mb-3 p-3">
    <div class="px-3 d-flex justify-content-between">
      <h3>{{ title }}</h3>
      <button>Delete</button> 
    </div>
    
    <img :src=image  alt="Image du post" class="p-3"/>

    <div class="d-flex flex-row justify-content-between"> <!-- Une div pour heure date à gauche, un pour les pouces à droites, ou inversement à voir -->
      <div class="pr-3 ml-auto d-flex flex-column align-items-start">
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
    }
  }
};
</script>

<style scoped lang="scss">
p {
  margin:0;
}
</style>
