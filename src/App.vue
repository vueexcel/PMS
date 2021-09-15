<template>
  <Toast :data="toastData" />
  <Header />
  <div class="content">
    <div class="row">
      <div
        class="sidebar"
        v-if="$route.name !== 'Login' && $route.name !== 'Signup'"
      >
        <div
          v-for="(item, index) in filteredSidebarItems"
          :key="index"
          @click="$router.push(item.route)"
          :class="{ active: $route.fullPath === item.route }"
        >
          <span> {{ item.title }} </span>
        </div>
      </div>
      <div class="page">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Toast from "@/components/Toast.vue";
import { reactive, watch, computed } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    Header,
    Toast,
  },
  setup() {
    const store = useStore();
    const toastData = reactive({
      success: false,
      msg: "",
    });

    const sidebarItems = [
      { title: "Create Polls", route: "/create-poll", type: "admin" },
      { title: "All Polls", route: "/polls", type: "user" },
    ];

    const filteredSidebarItems = computed(() => {
      if (store.state.auth.user.role === "user") {
        return sidebarItems.filter((el) => el.type === store.state.auth.user.role);
      } else return sidebarItems;
    });
    watch(
      () => store.state.toast,
      (currentValue) => {
        toastData.success = currentValue.success;
        toastData.msg = currentValue.msg;
      }
    );

    return { toastData, sidebarItems, filteredSidebarItems };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
</style>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
  background-color: whitesmoke;
}
</style>

<style lang="scss" scoped>
.content {
  margin-top: 70px;
  min-height: calc(100vh - 70px);
  background: $dark-teal;
  color: $grey;
  .row {
    display: flex;
    flex-wrap: nowrap;
    min-height: calc(100vh - 70px);
    width: 100%;
    .sidebar {
      width: 200px;
      background-color: $teal;
      div {
        padding: 16px 0;
        background-color: $light-teal;
        margin: 12px 10px;
        border-radius: $rounded;
      }
      .active {
        background-color: $grey;
        color: $dark-teal;
      }
    }
    .page {
      width: 100%;
    }
  }
}
</style>


