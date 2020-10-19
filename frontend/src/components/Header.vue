<template>
  <header class="border border-light d-flex flex-row justify-content-between pr-3 mb-4">

    <!-- Le logo qui permettra de retourner à /posts -->
    <div>
      <router-link to="/posts">
        <img src="@/assets/icon.png" width="90px" class="logo" />
      </router-link>
    </div>

    <div class="my-auto pl-5">
      <p class="text-light">{{ fullName }}</p>
    </div>

    <!-- L'avatar + upload à droite pour aller sur son compte ou createpost -->
    <div id="rightSide" class="d-flex flex-row my-auto align-items-center">
      <router-link to="/settings" class="mr-4">
        <img src="@/assets/icon-account.png" />
      </router-link>
      
      <router-link to="/upload" >
        <button class="my-auto btn-red p-2">         
          + Upload
        </button>
      </router-link>
    </div>

  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      fullName: "",
    }
  },
  mounted() {
    this.fullName = localStorage.getItem("name").split('_')[0] + (' ') + localStorage.getItem("name").split('_')[1]
  },
  destroyed() {
    this.fullName= null;
  }
};
</script>

<style lang="scss" scoped>

.logo {
  background-color: transparent;
}

#rightSide {
  align-content: center;
  &>a>img {
    width: 50px;
    height: 50px;
  }
}

p {
  font-size: 28px;
  font-weight: 500;
  margin: 0;
}
</style>