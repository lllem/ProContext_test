<template>
  <nav class="main-nav shadow w-100 p bg-white sticky-top">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/tokens.scss';
.main-nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: $blue;
      text-decoration: none;
    }
  }
}
</style>
