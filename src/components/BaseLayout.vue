<template>
  <div class="base-layout shadow">

    <MainNav/>

    <main class="base-layout__main">

      <header>
        <slot name="header"/>
      </header>

      <slot/>

    </main>

  </div>
</template>

<style lang="scss" scoped>
.base-layout {
  max-width: 100%;
  width: 960px;
  background-color: #fff;
  margin: auto;
  min-height: 100%;
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;

  .base-layout__main {}
}
</style>
