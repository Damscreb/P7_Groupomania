<template>
  <header class="border border-light d-flex flex-row justify-content-between pr-3 mb-4">

    <!-- Le logo qui permettra de retourner à /posts -->
    <div>
      <router-link to="/posts">
        <img src="@/assets/icon.png" width="90px" class="logo" />
      </router-link>
    </div>

    <!-- L'avatar + upload à droite pour aller sur son compte ou createpost -->
    <div id="rightSide" class="d-flex flex-row my-auto">
      <router-link to="/settings" class="mr-4">
        <img src="@/assets/icon-account.png" />
      </router-link>
      
      <button class="my-auto btn-upload">         
        <MessageRouter msg="+ Upload" route="/settings/posts" class="my-auto p-2">
        </MessageRouter>
      </button>
    </div>

  </header>
</template>

<script>
export default {
  name: "Header"
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

.btn-upload {
  border: 2px solid rgb(231, 186, 186);
  border-radius: 5px;
  background-color: rgb(100%, 84%, 84%);
}

</style>