<template>
  <div class="pagination">
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="Math.ceil(this.contacts.length / perPage)"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        color="#AEDDFF"
        :total-visible="8"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["newC", "sortParam"],
  data: () => ({
    page: 1,
    perPage: 10,
    contacts: [],
  }),
  methods: {
    ...mapGetters(["getContacts"]),
  },
  computed: {
    filtered() {
      return this.contacts.slice(
        (this.page - 1) * this.perPage,
        this.page * this.perPage
      );
    },
  },
  watch: {
    filtered(e) {
      this.$emit("cont", e);
    },
    newC() {
      this.page = 1;
      this.contacts = this.newC;
    },
    sortParam() {
      if (this.sortParam == "a-z") {
        this.contacts.sort((a, b) => {
          return a.name.first > b.name.first ? 1 : -1;
        });
      } else if (this.sortParam == "z-a") {
        this.contacts.sort((a, b) => {
          return a.name.first < b.name.first ? 1 : -1;
        });
      } else if (this.sortParam == "random") {
        this.contacts.sort((a, b) => {
          return Math.random() - 0.5;
        });
      }
    },
  },
  mounted() {
    this.contacts = this.getContacts();
  },
};
</script>

<style lang='scss' scoped>
.pagination {
  padding: 0.5% 0;
}
</style>
