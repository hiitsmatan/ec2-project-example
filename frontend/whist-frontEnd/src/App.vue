<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div>
    <header>
      <nav>
        <span class="link-wrap">
          <RouterLink to="/">Home</RouterLink>
        </span>
        <span class="link-wrap">
          <RouterLink to="/admin">Admin</RouterLink>
        </span>
        <span class="link-wrap no-border">
          <RouterLink to="/stats">Stats</RouterLink>
        </span>
      </nav>
    </header>
    <div class="container">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
header {
  display: flex;
  gap: 5px;
  width: 60%;
  height: 60px;
  border-bottom: 1px solid black;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  align-items: center;
}

.link-wrap {
  border-right: 1px solid black;
  padding-left: 30px;
  padding-right: 30px;
}
.no-border {
  border: none;
}
.container {
  margin-left: auto;
  margin-right: auto;
  padding: 20px
}
</style>
