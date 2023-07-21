<template>
  <div class="sidebar-layout shadow">

    <aside v-if="$slots.sidebar" class="sidebar-layout__sidebar border-end bg-light-2 p sticky-top">
      <slot name="sidebar"/>
    </aside>

    <main class="sidebar-layout__main">

      <header class="sticky-top">
        <slot name="header"/>
      </header>

      <slot/>

    </main>

  </div>
</template>

<style lang="scss" scoped>
.sidebar-layout {
  max-width: 100%;
  width: 960px;
  background-color: #fff;
  margin: auto;
  min-height: 100%;
  display: flex;
  flex-flow: row nowrap;
  flex-grow: 1;

  .sidebar-layout__sidebar {
    width: 320px;
    height: 100vh;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .sidebar-layout__main {
    width: 100%;
  }
}
</style>
