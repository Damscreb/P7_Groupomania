<template>
  <div class="mb-2">
    <input :id=idLinked 
          v-model="input" 
          :placeholder="idLinked"
          class="full-width"
          required
          :pattern="patternLinked"
          @input="sendData"> 
  </div>
</template>

<script>
export default {
  name: 'FormInput',
  props: {
    idLinked: {
      type: String,
      required: true
    },
    patternLinked: {
      type: String
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
  // Si c'est le cas, on donne type="password" à l'input en question, de même pour email
  mounted() {
    if (this.$props.idLinked === "Password") {
      this.$el.firstChild.type = "password"
    }
    if (this.$props.idLinked === "Email") {
      this.$el.firstChild.type = "email"
    }
  }
}
</script>

<style lang="scss" scoped>

.full-width {
  width: 100% 
}

input {
  font-size: 13px;
}

</style>