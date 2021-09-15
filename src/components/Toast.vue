<template>
  <div
    v-if="showToast"
    class="toast-wrapper"
    :style="[
      data.success ? { background: '#D5EEBB' } : { background: '#FDD2BF' },
    ]"
  >
    {{ data.msg }}
  </div>
</template>

<script>
import { watch, ref } from "vue";
import { useStore } from "vuex";
export default {
  name: "Toast",
  props: {
    data: {
      type: Object,
      default: {},
    },
  },
  setup(props) {
    const showToast = ref(false);
    const store = useStore();
    watch(
      () => props.data.msg,
      (currentValue) => {
        if (currentValue) {
          showToast.value = true;
          setTimeout(() => {
            showToast.value = false;
            store.commit("UPDATE_TOAST", {});
          }, 2000);
        }
      }
    );

    return { showToast };
  },
};
</script>

<style lang="scss" scoped>
.toast-wrapper {
  position: fixed;
  top: 10px;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  transform: translate(-50%, 0%);
  width: 500px;
  color: $dark-teal;
  z-index: 999;
}
</style>