<template>
  <div class="nav">
    <h1>Contacts</h1>
    <div>
      <v-btn @click.prevent="refresh">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
      <v-btn @click="viewTable(false)" :disabled="!table">
        <v-icon>mdi-table-account</v-icon>
      </v-btn>
      <v-btn class="viewTable" @click="viewTable(true)" :disabled="table">
        <v-icon>mdi-format-list-bulleted-triangle</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: ["table"],
  methods: {
    viewTable(data) {
      localStorage.table = data;
      this.$emit("changeData", data);
    },
    refresh() {
      this.$emit("refresh");
    },
  },
};
</script>

<style lang='scss' scoped >
.nav {
  display: flex;
  justify-content: space-between;
}
@media screen and (max-width: 1275px) {
  .viewTable {
    display: none !important;
  }
}
.theme--light.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: #aeddff !important;
}
</style>
