<template>
  <div class="login-card shadow mt-8">
    <div class="row mt-8">
      <div class="w-100">
        <TextField
          :data="formData.email"
          placeholder="Email"
          @inputValue="updateEmail"
        />
      </div>
      <div class="w-100">
        <TextField
          :data="formData.password"
          placeholder="password"
          class="mt-8"
          @inputValue="updatePassword"
        />
      </div>
      <div class="w-100 button-wrapper">
        <Button :label="'Submit'" class="mt-8" @click="handleLogin" />
      </div>
      <div class="w-100 signup-wrapper mt-4 mb-4">
        <router-link to="/signup">
          <span> Don't have Account ? </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import TextField from "@/components/TextField";
import Button from "@/components/Button";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "LoginCard",
  components: {
    TextField,
    Button,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const formData = reactive({
      email: "",
      password: "",
    });

    const handleLogin = async () => {
      const validation = valid();
      if (!validation) return;
      const response = await store.dispatch("auth/login", formData);
      if (response.success) {
        router.push("/polls");
        clearForm();
      }
      await store.commit("UPDATE_TOAST", response);
    };

    const updateEmail = (val) => {
      formData.email = val;
    };

    const updatePassword = (val) => {
      formData.password = val;
    };

    const valid = () => {
      if (!formData.email || !formData.password) {
        store.commit("UPDATE_TOAST", {
          success: false,
          msg: "Please filled all fields",
        });
      } else {
        return true;
      }
    };

    const clearForm = () => {
      formData.email = "";
      formData.password = "";
    };

    return {
      formData,
      handleLogin,
      updateEmail,
      updatePassword,
      clearForm,
      valid,
    };
  },
};
</script>

<style lang="scss" scoped>
.login-card {
  width: 500px;
  padding: 16px;
  background-color: $light-teal;
  .button-wrapper {
    display: flex;
    justify-content: center;
  }
  .signup-wrapper {
    a {
      color: $teal;
    }
  }
}
</style>