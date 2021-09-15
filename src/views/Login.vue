<template>
  <div class="login-wrapper">
    <div class="login-text-wrapper">Login</div>
    <div>
    <LoginCard />
    </div>
  </div>
</template>

<script>
import LoginCard from "@/components/LoginCard";
export default {
  components: {
    LoginCard,
  },
};
</script>

<style lang="scss" scoped>
.login-wrapper {
  background-color: $teal;
  height: calc(100vh - 70px);
  display: flex;
  width: 100%;
  .login-text-wrapper {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $yellow;
    font-size: 150px;
    text-shadow: 4px 4px $light-teal;
  }
  div{
      display: flex;
      align-items: center;
  }
}
</style>