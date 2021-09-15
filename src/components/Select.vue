<template>
  <select v-model="selected">
    <option value="">Select</option>
    <option v-for="(option, index) in options" :key="index" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script>
import { watch } from "vue";
export default {
  name: "Select",
  props: {
    options: {
      type: Array,
      default: [],
    },
    selected: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    watch(
      () => props.selected,
      (currentValue) => {
        console.log(currentValue, "currentValuecurrentValue");
        emit("inputValue", currentValue);
      }
    );
    return {};
  },
};
</script>

<style lang="scss" scoped>
select {
  height: 56px;
  width: 100%;
  background-color: $dark-teal;
  color: $grey;
  border-radius: $rounded-sm;
  padding: 0 16px;
  option {
    background: $teal;
    height: 100%;
    text-transform: capitalize;
  }
  option:active {
    background: $yellow;
    height: 100%;
  }
}
</style>