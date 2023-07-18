<template>
  <SidebarLayout class="home">

    <template v-slot:sidebar>Items Filter</template>

    <template v-slot:header>
      <MainNav/>
    </template>

    <section class="p bg-light-3">
      <h1>Items List</h1>

      <PlateEl v-for="i in 200" :key="i" class="mb">
        Items List {{ i }}
      </PlateEl>
    </section>

  </SidebarLayout>
</template>

<script>
export default {
  name: 'HomeView',
  components: {},
};
</script>
