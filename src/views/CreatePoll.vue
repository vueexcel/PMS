<template>
  <div class="page-heading">Create Poll</div>
  <div class="card-wrapper">
    <div class="poll-card">
      <div class="row">
        <div class="w-100 mb-4 option-wrapper">
          <TextField
            :data="poll"
            placeholder="Enter Poll"
            @inputValue="updatePoll"
          />
          <Button :label="'Add Option'" @click="addOptions" />
        </div>
        <div
          class="w-100 option-wrapper mt-4"
          v-for="(option, index) in options"
          :key="index"
        >
          <TextField
            :data="option.title"
            placeholder="Enter Option"
            @inputValue="updateOption($event, index)"
          />
          <Button
            v-if="options.length > 2"
            :label="'Delete'"
            @click="deleteOption(index)"
          />
        </div>
        <div class="w-100">
          <Button
            :label="'Create Poll'"
            class="mt-8"
            @click="handleCreatePoll"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TextField from "@/components/TextField";
import Button from "@/components/Button";
import { ref, reactive } from "vue";
import { useStore } from "vuex";
export default {
  name: "Create Poll",
  components: {
    TextField,
    Button,
  },
  setup() {
    const poll = ref("");

    const updatePoll = (val) => {
      poll.value = val;
    };

    const store = useStore();

    const options = ref([{ title: "" }, { title: "" }]);

    const optionObj = reactive({ title: "" });

    const updateOption = (val, index) => {
      options.value[index] = {
        title: val,
      };
    };

    const addOptions = () => {
      options.value.push(optionObj);
    };

    const deleteOption = (index) => {
      options.value.splice(index, 1);
    };

    const clearForm = () => {
      (poll.value = ""), (options.value = [{ title: "" }, { title: "" }]);
    };

    const handleCreatePoll = async () => {
      const response = await pollValidation();
      console.log(response, "4444");
      if (response) {
        const pollPayload = {
          poll: poll.value,
          options: options.value,
        };
        const response = await store.dispatch("poll/createPoll", pollPayload);
        if (response.success) {
          clearForm();
        }
        await store.commit("UPDATE_TOAST", response);
      }
    };

    const pollValidation = () => {
      if (!poll.value) {
        store.commit("UPDATE_TOAST", {
          success: false,
          msg: "Please Enter Poll",
        });
        return false;
      } else if (options.value.some((el) => !el.title)) {
        store.commit("UPDATE_TOAST", {
          success: false,
          msg: "Please fill all options",
        });
        return false;
      } else {
        return true;
      }
    };

    return {
      poll,
      updatePoll,
      options,
      optionObj,
      updateOption,
      addOptions,
      deleteOption,
      handleCreatePoll,
      clearForm,
      pollValidation,
    };
  },
};
</script>

<style lang="scss" scoped>
.card-wrapper {
  display: flex;
  justify-content: center;
  .poll-card {
    width: 60vw;
    background-color: $light-teal;
    padding: 30px;
    .btn {
      width: 100px;
      padding: 8px;
      font-weight: normal;
      border: none;
    }
    .option-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .input-wrapper {
        width: 80%;
      }
    }
  }
}
</style>