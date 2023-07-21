<!-- eslint-disable -->
<template>
  <label
  class="item-el"
  :style="`background-color: ${ color }`"
  >
    <input
    type="checkbox"
    v-model="model"
    :value="value"
    :checked="value"
    :title="color"
    />

    <span v-if="model">✔</span>
  </label>
</template>

<script>
export default {
  props: {
    modelValue: { type: [Array, Boolean] },
    value: { type: [Boolean, Object] },
    color: {
      type: String,
      default: 'violet',
    },
  },
  data() {
    return {};
  },
  computed: {
    model: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
$size: 1rem;

.item-el {
  display: inline-block;
  width: $size;
  height: $size;
  border-radius: 0.25rem;
  overflow: hidden;
  position: relative;
  color: white;
  font-size: $size * 0.75;
  line-height: $size;
  text-align: center;
  user-select: none;
  cursor: pointer;

  input {
    display: none;
  }

  label {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
