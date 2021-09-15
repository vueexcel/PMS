<template>
  <div class="login-card shadow mt-8">
    <div class="row mt-8">
      <div class="w-100">
        <TextField
          :data="formData.userName"
          placeholder="User name"
          @inputValue="updateUserName"
        />
      </div>
      <div class="w-100 mt-4">
        <TextField
          :data="formData.email"
          placeholder="Email"
          @inputValue="updateEmail"
        />
      </div>
      <div class="w-100 mt-4">
        <Select
          :options="roleOptions"
          :selected="formData.role"
          @inputValue="updateRole"
        />
      </div>
      <div class="w-100 mt-4">
        <TextField
          :data="formData.password"
          placeholder="Password"
          @inputValue="updatePassword"
        />
      </div>
      <div class="w-100 button-wrapper">
        <Button
          :label="'Create Account'"
          class="mt-8"
          @click="handleCreateAcount"
        />
      </div>
      <div class="w-100 signup-wrapper mt-4 mb-4">
        <router-link to="/login">
          <span>Do you have account ? </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import TextField from "@/components/TextField";
import Button from "@/components/Button";
import Select from "@/components/Select";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "SignupCard",
  components: {
    TextField,
    Button,
    Select,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const formData = reactive({
      userName: "",
      email: "",
      role: "",
      password: "",
    });

    const handleCreateAcount = async () => {
      const validation = await valid();
      if (!validation) return;
      const response = await store.dispatch("auth/createAccount", formData);
      if (response.success) {
        router.push("/login");
        clearForm();
      }
      await store.commit("UPDATE_TOAST", response);
    };

    const updateUserName = (val) => {
      formData.userName = val;
    };

    const updateEmail = (val) => {
      formData.email = val;
    };

    const roleOptions = ref(["user"]);

    const updateRole = (val) => {
      formData.role = val;
    };

    const updatePassword = (val) => {
      formData.password = val;
    };

    const clearForm = () => {
      formData.email = "";
      formData.userName = "";
      formData.role = "";
      formData.password = "";
    };

    const valid = () => {
      if (
        !formData.email ||
        !formData.password ||
        !formData.role ||
        !formData.userName
      ) {
        store.commit("UPDATE_TOAST", {
          success: false,
          msg: "Please filled all fields",
        });
        return false;
      } else if (formData.password && formData.password.length < 6) {
        store.commit("UPDATE_TOAST", {
          success: false,
          msg: "Password should be greater than 5 letter",
        });
        return false;
      } else {
        return true;
      }
    };

    return {
      formData,
      handleCreateAcount,
      updateEmail,
      updatePassword,
      clearForm,
      updateUserName,
      updateRole,
      roleOptions,
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