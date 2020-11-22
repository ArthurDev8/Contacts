import axios from "axios";

export default {
  state: {
    contacts: [],
  },
  mutations: {
    setContacts(state, data) {
      state.contacts = data;
    },
  },
  getters: {
    getContacts(state) {
      return state.contacts;
    },
  },
  actions: {
    async onGetContacts({ commit }) {
      await axios.get("https://randomuser.me/api/?results=10").then((res) => {
        console.log(res.data.results);
        commit("setContacts", res.data.results);
      });
    },
  },
};
