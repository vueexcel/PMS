import { createStore } from "vuex";
import auth from './modules/auth'
import poll from './modules/poll'

export default createStore({
  state: {
    toast: {
      success: false,
      msg: ''
    }
  },
  mutations: {
    UPDATE_TOAST(state, payload) {
      console.log(payload,'payloadpayload');
      state.toast = payload
    }
  },
  actions: {
  },
  modules: {
    auth,
    poll
  },
});
