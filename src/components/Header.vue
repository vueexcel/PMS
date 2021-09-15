<template>
  <header class="header-wrapper">
    <div class="img-wrapper">
      <img
        alt="logo"
        src="../assets/logo_transparent.png"
        @click="$router.push('/')"
      />
    </div>
    <div class="menu">
      <span v-if="$store.state.auth.user.userName" class="user-name">
        Hi {{ $store.state.auth.user.userName }}
      </span>
      <span v-if="$store.state.auth.user.role"  class="ml-4 role-badge">
        {{ $store.state.auth.user.role }}
      </span>
      <router-link
        v-if="
          $route.name !== 'Login' && !Object.keys($store.state.auth.user).length
        "
        to="/login"
      >
        <span> Login </span>
      </router-link>
      <router-link
        v-if="
          $route.name !== 'Signup' &&
          !Object.keys($store.state.auth.user).length
        "
        to="/signup"
      >
        <span> Signup </span>
      </router-link>
      <router-link
        to="/login"
        v-if="Object.keys($store.state.auth.user).length"
        @click="handleLogout"
      >
        <span> Logout </span>
      </router-link>
    </div>
  </header>
</template>

<script>
import { useStore } from "vuex";
export default {
  name: "Header",
  setup() {
    const store = useStore();
    const handleLogout = () => {
      store.dispatch("auth/logout");
    };

    return { handleLogout };
  },
};
</script>   

<style lang="scss" scoped>
.header-wrapper {
  position: fixed;
  top: 0;
  width:100%;
  background-color: $light-teal;
  color: $grey;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .img-wrapper {
    img {
      width: 80px;
      height: 50px;
      padding: 0 12px;
    }
  }
  .menu {
    .user-name {
      color: $yellow;
      font-weight: 700;
    }
    .role-badge {
      background-color: $dark-teal;
      padding: 4px 8px;
      border-radius: $rounded-sm;
    }
    a {
      text-decoration: none;
      span {
        padding: 8px 16px;
        color: $dark-teal;
        background: $yellow;
        border-radius: $rounded-sm;
        margin: 0 16px;
      }
    }
  }
}
</style>