<template>
  <div class="plate-el p rounded bg-white shadow-2 w-100">
    <slot/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: true,
    };
  },
};
</script>

<style lang="scss">
.plate-el {
  display: inline-block;
}
</style>
