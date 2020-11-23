import axios from "axios";
import nationalitiesFilter from "@/filters/nationalitiesFilter";

export default {
  state: {
    contacts: [],
  },
  mutations: {
    setContacts(state, data) {
      state.contacts = data;
    },
    setSortByGender(state, data) {
      state.contacts = state.contacts.filter((c) => {
        return c.gender.toLowerCase() === data.toLowerCase();
      });
    },
    setSortByNationalities(state, data) {
      state.contacts = state.contacts.filter(function(c) {
        let nat = nationalitiesFilter(c.nat);
        return nat.toLowerCase().indexOf(data.toLowerCase()) > -1;
      });
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
    async onSortByGender({ commit, dispatch }, data) {
      await dispatch("onGetContacts");
      commit("setSortByGender", data);
    },
    async onSortByNationalities({ commit, dispatch }, data) {
      await dispatch("onGetContacts");
      commit("setSortByNationalities", data);
    },
  },
};
