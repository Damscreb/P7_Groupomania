<template>
  <div>
      <router-link :to="route" class='text-light'>{{ msg }}</router-link>
  </div>
</template>

<script>
export default {
  name: "Router",
  props: {
    msg: {
      type: String,
      required: true
    },
    route: {
      type: String,
      required: true
    }
  },
  mounted() {
    if (this.$props.route === "login" || this.$props.route === "signup") {
      this.$el.firstChild.classList = "text-primary"
    }
  }
};
</script>
