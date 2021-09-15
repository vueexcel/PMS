<template>
  <div class="input-wrapper">
    <input
      class="input-field"
      type="text"
      :placeholder="placeholder"
      v-model="data"
    />
  </div>
</template>

<script>
import { toRefs, watch, ref } from "vue";
export default {
  name: "TextField",
  props: {
    data: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const input = ref("");
    watch(
      () => props.data,
      (currentValue) => {
        emit("inputValue", currentValue);
      },
      { deep: true }
    );

    return { input };
  },
};
</script>

<style lang="scss" scoped>
.input-wrapper {
  display: flex;
  .input-field {
    height: 56px;
    width: 100%;
    background-color: $dark-teal;
    color: $grey;
    border-radius: $rounded-sm;
    padding: 0 16px;
    overflow: hidden;
  }
  .input-field:focus {
    border: 3px solid $yellow;
    outline: none;
  }
}
</style>