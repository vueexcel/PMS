import firebase from 'firebase'

const state = {
  user: {}
}
const mutations = {
  async CREATE_USER({ }, user) {
    await firebase.firestore().collection("users").doc(user.id).set(user)
  },
  async FETCH_USER(state, id) {
    await firebase.firestore().collection("users").doc(id).get().then((user) => {
      state.user = user.data()
    })
  },
  async CLEAR_USER(state) {
    state.user = {}
  }
}
const actions = {
  async createAccount({ commit }, payload) {
    try {
      let response
      let userData
      await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(async (userCredential) => {
          let user = userCredential.user;
          userData = {
            userName: payload.userName,
            email: user.email,
            role: payload.role,
            id: user.uid
          }

          response = {
            success: true,
            msg: 'Account Created'
          }
        })
        .catch((error) => {
          response = {
            success: false,
            msg: error.message
          }
        });
      await commit('CREATE_USER', userData)

      return response

    } catch (e) {
      return {
        success: false,
        msg: e
      }
    }
  },

  async login({ }, payload) {
    await console.log(payload, 'payloadpayloadpayload');
    try {
      let response = {}
      await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          // ...
          response = {
            success: true,
            msg: 'Logged In'
          }
        }).catch((error) => {
          response = {
            success: false,
            msg: error.message
          }
          console.log(error, 'errorerror');
        })

      console.log(response, 'responseresponse')

      return response
    } catch (e) {
      return {
        success: false,
        msg: e
      }
    }
  },

  async logout() {
    try {
      let response
      await firebase.auth().signOut().then(() => {
        response = {
          success: true,
          msg: 'Logged Out'
        }
      }).catch((error) => {
        response = {
          success: false,
          msg: error
        }
      });
      return response
    } catch (e) {
      return {
        success: false,
        msg: ''
      }
    }
  },

  fetchUser({ commit }) {
    if (firebase.auth().currentUser) {
      commit('FETCH_USER', firebase.auth().currentUser.uid)
    }
  }

}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}