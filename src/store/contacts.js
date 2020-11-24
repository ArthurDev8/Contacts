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
    setSortByFullName(state, data) {
      state.contacts = state.contacts.filter(function(c) {
        let fullName = c.name.first + c.name.last;
        return fullName.toLowerCase().includes(data.toLowerCase());
      });
    },
    setSortByGender(state, data) {
      state.contacts = state.contacts.filter((c) => {
        return c.gender.toLowerCase() === data.toLowerCase();
      });
    },
    setSortByNationalities(state, data) {
      state.contacts = state.contacts.filter(function(c) {
        let nat = nationalitiesFilter(c.nat);
        return nat.toLowerCase().includes(data.toLowerCase());
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
    async onSortByFullName({ commit, dispatch }, data) {
      await dispatch("onGetContacts");
      commit("setSortByFullName", data);
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
