<template>
  <Suspense>
    <template #default>
      <div class="mt-8">
        <Modal v-if="dialog">
          <template #body>
            <div
              v-if="
                dialogType === 'delete poll' || dialogType === 'delete option'
              "
              class="confirmation-title"
            >
              Do you want to {{ dialogType }}?
            </div>
            <div
              v-if="
                dialogType === 'edit poll' ||
                dialogType === 'edit option' ||
                dialogType === 'add option' || dialogType === 'add suggestion'
              "
            >
              <TextField
                :data="textField"
                :placeholder="
                  dialogType === 'edit poll'
                    ? 'Edit poll' : dialogType === 'add suggestion' ? 'Add Suggestion'
                    : dialogType === 'add option'
                    ? 'Add Option'
                    : 'Edit option'
                "
                @inputValue="updateTextField"
              />
            </div>
          </template>

          <template #footer>
            <!-- <hr class="mb-4" /> -->
            <div class="action-bar mt-8">
              <Button
                :label="'Cancel'"
                class="small-button"
                @click="closeDialog"
              />
              <Button
                :label="
                  dialogType === 'edit option' || dialogType === 'edit poll'
                    ? 'Edit' : dialogType === 'add suggestion' ? 'Add'
                    : dialogType === 'add option'
                    ? 'Add'
                    : 'Delete'
                "
                class="small-button danger ml-3"
                @click="handleDialogOK"
              />
            </div>
          </template>
        </Modal>

        <div
          class="card-wrapper"
          v-for="(poll, index) in unSubmittedPolls"
          :key="index"
        >
          <div class="poll">
            <PollCard>
              <template v-slot:title="">
                <div class="poll-title">{{ poll.poll }}</div>
              </template>

              <template v-slot:options="">
                <div class="poll-options">
                  <div
                    class="option-wrapper"
                    v-for="(option, optionIndex) in poll.options"
                    :key="optionIndex"
                  >
                    <div class="option">
                      <div class="option-title">
                        <input
                          type="radio"
                          :disabled="disabledOption(poll.voters)"
                          name="option"
                          @change="handleSubmitPoll(poll.pid, option.oid)"
                        />
                        {{ option.option }}
                      </div>
                      <div></div>
                      <div>
                        <span class="vote">vote:</span> {{ option.vote }}
                      </div>
                    </div>
                    <div
                      v-if="$store.state.auth.user.role === 'admin'"
                      class="option-actions"
                    >
                      <Button
                        :label="'Edit'"
                        class="small-button"
                        @click="openDialogEditPollOption(poll.pid, option)"
                      />
                      <Button
                        v-if="poll.options.length > 2"
                        :label="'delete'"
                        class="small-button danger ml-4"
                        @click="
                          openDialogDeletePollOption(poll.pid, option.oid)
                        "
                      />
                    </div>
                  </div>
            
                  <div class="option-wrapper">
                    <div class="option">
                      <div class="option-title">
                    <input
                          type="radio"
                          :disabled="disabledOption(poll.voters)"
                          name="option"
                          @click="handleOthers(poll.pid)"
                        />
                        Others
                  </div>
                    </div>
                  </div>
                </div>
              </template>
              <template
                v-if="$store.state.auth.user.role === 'admin'"
                v-slot:footer=""
              >
                <hr />
                <div class="poll-actions mt-4">
                  <Button
                    :label="'Add option'"
                    class="small-button"
                    @click="openDialogAddPollOption(poll.pid)"
                  />

                  <Button
                    :label="'Edit'"
                    class="small-button ml-4"
                    @click="openDialogEditPoll(poll)"
                  />
                  <Button
                    :label="'delete'"
                    class="small-button danger ml-4"
                    @click="openDialogDeletePoll(poll.pid)"
                  />
                </div>
              </template>
            </PollCard>
          </div>
        </div>

        <div
          v-if="unSubmittedPolls && !unSubmittedPolls.length"
          class="page-heading mb-4 mt-4"
        >
          No Poll is left ....
        </div>

        <hr />

        <div
          v-if="submittedPolls && submittedPolls.length"
          class="page-heading mb-4 mt-4"
        >
          Submitted polls
        </div>

        <div
          class="card-wrapper"
          v-for="(poll, index) in submittedPolls"
          :key="index"
        >
          <div class="poll">
            <PollCard>
              <template v-slot:title="">
                <div class="poll-title">{{ poll.poll }}</div>
              </template>

              <template v-slot:options="">
                <div class="poll-options">
                  <div
                    class="option-wrapper"
                    v-for="(option, optionIndex) in poll.options"
                    :key="optionIndex"
                  >
                    <div class="option">
                      <div class="option-title">
                        <input
                          type="radio"
                          :disabled="disabledOption(poll.voters)"
                          name="option"
                          @change="handleSubmitPoll(poll.pid, option.oid)"
                        />
                        {{ option.option }}
                      </div>
                      <div></div>
                      <div>
                        <span class="vote">vote:</span> {{ option.vote }}
                      </div>
                    </div>
                    <div
                      v-if="$store.state.auth.user.role === 'admin'"
                      class="option-actions"
                    >
                      <Button
                        :label="'Edit'"
                        class="small-button"
                        @click="openDialogEditPollOption(poll.pid, option)"
                      />
                      <Button
                        v-if="poll.options.length > 2"
                        :label="'delete'"
                        class="small-button danger ml-4"
                        @click="
                          openDialogDeletePollOption(poll.pid, option.oid)
                        "
                      />
                    </div>
                  </div>
                </div>
              </template>
              <template
                v-if="$store.state.auth.user.role === 'admin'"
                v-slot:footer=""
              >
                <hr />
                <div class="poll-actions mt-4">
                  <Button
                    :label="'Add option'"
                    class="small-button"
                    @click="openDialogAddPollOption(poll.pid)"
                  />

                  <Button
                    :label="'Edit'"
                    class="small-button ml-4"
                    @click="openDialogEditPoll(poll)"
                  />
                  <Button
                    :label="'delete'"
                    class="small-button danger ml-4"
                    @click="openDialogDeletePoll(poll.pid)"
                  />
                </div>
              </template>
            </PollCard>
          </div>
        </div>
      </div>
    </template>
    <template #fallback> POlls Loading............ </template>
  </Suspense>
</template>

<script>
import PollCard from "@/components/PollCard";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import TextField from "@/components/TextField";
import { useStore } from "vuex";
import { computed, ref } from "vue";
export default {
  name: "polls",
  components: {
    PollCard,
    Button,
    Modal,
    TextField,
  },
  setup() {
    const store = useStore();
    store.dispatch("poll/fetchPolls");
    console.log(store.state.poll.polls, "3333333");

    const unSubmittedPolls = computed(() => {
      return store.state.poll.polls.filter(
        (el) => !el.voters.includes(store.state.auth.user.id)
      );
    });

    const submittedPolls = computed(() => {
      return store.state.poll.polls.filter((el) =>
        el.voters.includes(store.state.auth.user.id)
      );
    });

    let selectedPollId = "";
    let selectedOptionId = "";

    const textField = ref("");
    const updateTextField = (val) => {
      textField.value = val;
    };

    const dialog = ref(false);
    const dialogType = ref("");

    const openDialog = () => {
      dialog.value = true;
    };

    const closeDialog = () => {
      dialog.value = false;
      dialogType.value = "";
      selectedPollId = "";
      selectedOptionId = "";
      textField.value = "";
    };

    const openDialogDeletePollOption = (pid, oid) => {
      dialogType.value = "delete option";
      selectedPollId = pid;
      selectedOptionId = oid;
      openDialog();
    };

    const openDialogEditPollOption = (pid, option) => {
      dialogType.value = "edit option";
      selectedPollId = pid;
      selectedOptionId = option.oid;
      textField.value = option.option;
      openDialog();
      console.log(dialogType, "dialogTypedialogType");
    };

    const openDialogAddPollOption = (pid) => {
      dialogType.value = "add option";
      textField.value = "";
      selectedPollId = pid;
      openDialog();
    };

    const openDialogEditPoll = (poll) => {
      dialogType.value = "edit poll";
      textField.value = poll.poll;
      selectedPollId = poll.pid;
      openDialog();
    };

    const openDialogDeletePoll = (pollId) => {
      dialogType.value = "delete poll";
      selectedPollId = pollId;
      openDialog();
    };

    const disabledOption = (voters) => {
      if (store.state.auth.user.role === "admin") {
        return true;
      } else if (voters.includes(store.state.auth.user.id)) {
        return true;
      }
    };

    const handleSubmitPoll = async (pid, oid) => {
      const response = await store.dispatch("poll/submitPoll", {
        pid,
        oid,
      });
      await store.dispatch("poll/fetchPolls");
      store.commit("UPDATE_TOAST", response);
    };

    const handleOthers = async (pid) => {
      dialogType.value = "add suggestion";
      selectedPollId = pid;
      openDialog()
    };

    const handleDialogOK = async () => {
      let response;
      if (dialogType.value === "delete option") {
        console.log("delete option");
        response = await store.dispatch("poll/deletePollOption", {
          pid: selectedPollId,
          oid: selectedOptionId,
        });
      } else if (dialogType.value === "delete poll") {
        response = await store.dispatch("poll/deletePoll", selectedPollId);
      } else if (dialogType.value === "edit option") {
        if (!textField.value) {
          store.commit("UPDATE_TOAST", {
            success: false,
            msg: "Enter option",
          });
          return false;
        }
        response = await store.dispatch("poll/editOption", {
          pid: selectedPollId,
          oid: selectedOptionId,
          title: textField.value,
        });
      } else if (dialogType.value === "edit poll") {
        if (!textField.value) {
          store.commit("UPDATE_TOAST", {
            success: false,
            msg: "Enter Poll",
          });
          return false;
        }
        response = await store.dispatch("poll/editPoll", {
          pid: selectedPollId,
          title: textField.value,
        });
      } else if (dialogType.value === "add option") {
        if (!textField.value) {
          store.commit("UPDATE_TOAST", {
            success: false,
            msg: "Enter Option",
          });
          return false;
        }
        response = await store.dispatch("poll/addOption", {
          pid: selectedPollId,
          title: textField.value,
        });
      } else if (dialogType.value === "add suggestion") {
         if (!textField.value) {
          store.commit("UPDATE_TOAST", {
            success: false,
            msg: "Enter Suggestion",
          });
          return false;
        }
        response = await store.dispatch("poll/addOption", {
          pid: selectedPollId,
          title: textField.value,
          user: "Non-Admin"
        });
      }

      await store.dispatch("poll/fetchPolls");
      closeDialog();
      store.commit("UPDATE_TOAST", response);
    };

    return {
      dialog,
      textField,
      updateTextField,
      openDialog,
      closeDialog,
      openDialogDeletePoll,
      openDialogDeletePollOption,
      openDialogEditPoll,
      openDialogEditPollOption,
      openDialogAddPollOption,
      dialogType,
      handleDialogOK,
      disabledOption,
      handleSubmitPoll,
      submittedPolls,
      unSubmittedPolls,
      handleOthers
    };
  },
};
</script>

<style lang="scss" scoped>
.card-wrapper {
  display: flex;
  justify-content: center;
  .poll {
    background: $teal;
    width: 60vw;
    border-radius: $rounded;
    padding: 30px;
    margin-bottom: 40px;
    .poll-title {
      color: $yellow;
      font-size: 20px;
      font-weight: 700;
      text-align: left;
      word-break: break-all;
    }
    .poll-options {
      padding: 20px 0;
      text-align: left;
      .option-wrapper {
        margin-bottom: 16px;
        display: flex;
        justify-content: space-between;
        .option {
          display: flex;
          width: 100%;
          justify-content: space-between;
          .option-title {
            width: 80%;
            word-break: break-all;
          }
          .vote {
            color: $yellow;
          }
          input[type="radio"] {
            width: 30px;
          }
        }
        .option-actions {
          display: flex;
          padding: 0 16px;
          justify-content: flex-end;
          width: 150px;
          .small-button {
            width: 60px;
            height: 30px;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: normal;
          }
          .danger {
            background: $red;
            color: $grey;
          }
        }
      }
    }
    .poll-actions {
      display: flex;
      padding: 0 16px;
      justify-content: flex-end;
      .small-button {
        width: 120px;
        height: 30px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: normal;
      }
      .danger {
        background: crimson;
        color: $grey;
      }
    }
  }
}

.confirmation-title {
  font-size: 36px;
  color: $grey;
}

.modal-footer {
  .action-bar {
    display: flex;
    justify-content: flex-end;
    .small-button {
      width: 60px;
      height: 30px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: normal;
    }
    .danger {
      background: $red;
      color: $grey;
    }
  }
}
</style>