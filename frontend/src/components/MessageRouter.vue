<template>
  <div>
      <router-link :to="route" class="text-primary">{{ msg }}</router-link>
  </div>
</template>

<script>
export default {
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
