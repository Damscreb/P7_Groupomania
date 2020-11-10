<template>
  <div class="col-3 border-right border-light">

    <ul class="my-2 nav d-flex flex-column">
      <li class="nav-item my-1 p-2" id="first">
        <MessageRouter msg="My Account" route="/settings"></MessageRouter>
      </li>
      <li class="nav-item my-1 p-2" id="second">
        <MessageRouter msg="My Posts" route="/settings/posts"></MessageRouter>
      </li>
      <li class="nav-item my-1 p-2" id="third">
        <MessageRouter msg="Disconnect" route="/settings/disconnect"></MessageRouter>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Navigator",
  props: {
    isActive: {
      required: true,
      type: String
    }
  },
  data() {
    return {
        role: "",
        userId: Number,
      }
  },
  mounted() {
    this.$axios
      .get(`auth/profile/${sessionStorage.getItem('token')}`)
      .then(response => {
        this.role= response.data.user[0].role
        this.userId= response.data.user[0].id
          if (this.isActive==1) {
            this.$el.querySelector("#first").classList="active nav-item my-1 p-2"
          }
          if (this.isActive==2) {
            this.$el.querySelector("#second").classList="active nav-item my-1 p-2"
          }
          if (this.isActive==3) {
            this.$el.querySelector("#third").classList="active nav-item my-1 p-2"
          }
      })
  }
}
</script>

<style lang="scss">
.active {
  background-color: lighten(rgb(5%, 6%, 6%),15%);
}

@media all and (max-width: 750px) {
  li>div>a {
    font-size: 15px;
  }
}
</style>