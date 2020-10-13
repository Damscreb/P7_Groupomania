<!-- Seulement pour les posts sans commentaires (genre dans le fil d'actu) -->
<template> 
  <div class="border border-light rounded-lg text-light d-flex flex-column mx-auto mb-3 p-3">
    <div class="px-3 d-flex justify-content-between">
      <h3>{{ title }}</h3>
      <button>Delete</button> 
    </div>
    
    <img :src=image  alt="Image du post" class="p-3 not-too-big m-auto"/>

    <div class="d-flex flex-row justify-content-between"> <!-- Une div pour heure date à froite, un pour les pouces à gauche -->
      <div class="pr-3 ml-auto d-flex flex-column align-items-end">
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

.not-too-big {
  max-height: 900px;
  max-width: 890px;
  background-position : center center;
}
</style>
