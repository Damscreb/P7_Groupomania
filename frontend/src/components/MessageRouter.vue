<template>
  <div>
      <router-link :to="route">{{ msg }}</router-link>
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
  }
};
</script>
