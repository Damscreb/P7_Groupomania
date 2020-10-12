<template>
  <p>
    <input :id=idLinked 
          v-model="input" 
          :placeholder=idLinked 
          class="full-width" 
          @input="sendData"> 
  </p>
</template>

<script>
export default {
  name: 'FormInput',
  props: {
    idLinked: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      input: ""
    }
  },
  methods: {
    // Envoi des données au parent
    sendData() { 
      this.$emit('input', this.input);
    }    
  },
  // Ici, lorsque nos composants sont créés, on vérifie si ce sont des inputs pour des passwords
  // Si c'est le cas, on donne type="password" à l'input en question
  mounted() {
    if (this.$props.idLinked === "Password") {
      this.$el.firstChild.type = "password";
    }
  }
}
</script>

<style lang="scss" scoped>

input {
  font-size: 13px;
  width: 80%
}

</style>