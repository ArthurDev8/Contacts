import axios from "axios";

export default {
  state: {
    contacts: [],
  },
  mutations: {
    setContacts(state, data) {
      state.contacts = data;
    },
    updateContacts(state, data) {
      console.log(data);

      state.contacts = data;
    },
    setUpdateByFilter(state, data) {
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
      await axios.get("https://randomuser.me/api/?results=200").then((res) => {
        // console.log(res.data.results);
        commit("setContacts", res.data.results);
      });
    },
    updateSetContacts({ commit }, data) {
      commit("updateContacts", data);
    },
    updateContactsByFilter({ commit }, data) {
      commit("setUpdateByFilter", data);
    },
  },
};
