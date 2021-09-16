import firebase from "firebase"
const state = {
  polls: []
}

const getters = {}

const mutations = {
  async FETCH_POLLS(state) {
    try {
      await firebase.firestore()
        .collection("polls")
        .get()
        .then(async (polls) => {
          for (const poll of polls.docs) {
            const pollData = poll.data()
            await firebase.firestore()
              .collection("polls")
              .doc(pollData.pid)
              .collection("options")
              .get()
              .then((options) => {
                const optionsArray = []
                for (const option of options.docs) {
                  optionsArray.push(option.data())
                }
                pollData.options = optionsArray
              })
            state.polls.push(pollData)
          }
        })
    } catch (e) {
      return {
        success: false,
        msg: e
      }
    }
  },
  
  CLEAR_POLLS(state) {
    state.polls = []
  }
}

const actions = {
  async createPoll({ }, payload) {
    try {
      const addedPoll = await firebase.firestore().collection("polls").add({ poll: payload.poll, voters: [] })
      await firebase.firestore().collection("polls").doc(addedPoll.id).set({
        pid: addedPoll.id,
        uid: firebase.auth().currentUser.uid,
      }, { merge: true })

      for (const element of payload.options) {
        const addedOption = await firebase.firestore().collection("polls").doc(addedPoll.id).collection('options').add({
          option: element.title,
          vote: 0
        })
        await firebase.firestore().collection("polls").doc(addedPoll.id).collection('options').doc(addedOption.id).set({
          oid: addedOption.id
        }, { merge: true })
      }
      return {
        success: true,
        msg: 'Poll created'
      }
    } catch (e) {
      return {
        success: false,
        msg: e
      }
    }
  },

  async deletePoll({ }, pid) {
    try {

      await firebase.firestore().collection("polls").doc(pid)
        .collection('options')
        .get()
        .then(async (options) => {
          for (const option of options.docs) {
            await firebase.firestore().collection("polls").doc(pid)
              .collection('options')
              .doc(option.data().oid)
              .delete()
          }
        })

      await firebase.firestore().collection("polls").doc(pid).delete()

      return {
        success: true,
        msg: 'poll deleted'
      }
    } catch (e) {
      return {
        success: false,
        msg: e
      }
    }
  },

  async deletePollOption({ }, payload) {
    try {
      console.log(payload, '44444');
      await firebase.firestore().collection("polls").doc(payload.pid).collection("options").doc(payload.oid).delete()
      return {
        success: true,
        msg: 'Option deleted'
      }
    } catch (e) {
      return {
        success: false,
        msg: e
      }
    }
  },

  async editPoll({ }, payload) {
    try {
      await firebase.firestore().collection("polls").doc(payload.pid).set({ poll: payload.title }, { merge: true })
      return {
        success: true,
        msg: 'Poll updated successfully'
      }
    } catch (e) {
      return {
        success: false,
        msg: e
      }
    }
  },

  async editOption({ }, payload) {
    try {
      await firebase.firestore().collection("polls").doc(payload.pid).collection("options").doc(payload.oid).set({ option: payload.title }, { merge: true })
      return {
        success: true,
        msg: 'Option updated successfully'
      }
    } catch (e) {
      return {
        success: false,
        msg: e
      }
    }

  },

  async addOption({dispatch}, payload) {
    try {
      const addedoption = await firebase.firestore().collection("polls")
      .doc(payload.pid)
      .collection("options")
      .add({
        option: payload.title,
        vote: 0
      })

      if(payload.user) {
        dispatch('submitPoll',{
          pid: payload.pid,
          oid: addedoption.id,
        });
      }

      await firebase.firestore().collection("polls")
      .doc(payload.pid)
      .collection("options")
      .doc(addedoption.id)
      .set({ oid: addedoption.id }, { merge: true })

      return {
        success: true,
        msg: 'Option added successfully'
      }
    } catch (e) {
      return {
        success: false,
        msg: e
      }
    }

  },

  async submitPoll({ }, payload) {

    try {
      let voters

      // Get voters
      await firebase.firestore().collection("polls")
        .doc(payload.pid)
        .get()
        .then((poll) => {
          console.log(poll.data().voters)
          voters = poll.data().voters
        })
      voters.push(firebase.auth().currentUser.uid)

      // Update voters
      await firebase.firestore().collection("polls")
        .doc(payload.pid)
        .set({
          voters
        }, { merge: true })

      // Get option vote
      let vote
      await firebase.firestore()
        .collection("polls")
        .doc(payload.pid)
        .collection("options")
        .doc(payload.oid)
        .get()
        .then((option) => {
          vote = option.data().vote
        })

      vote += 1

      // update option vote
      await firebase.firestore()
        .collection("polls")
        .doc(payload.pid)
        .collection("options")
        .doc(payload.oid)
        .set({ vote }, { merge: true })

      return {
        success: true,
        msg: 'Vote submitted'
      }


    } catch (e) {
      return {
        success: false,
        msg: e
      }
    }
  },


  async fetchPolls({ commit }) {
    try {
      await commit('CLEAR_POLLS')
      await commit('FETCH_POLLS')
    } catch (e) {
      console.log(e);
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}