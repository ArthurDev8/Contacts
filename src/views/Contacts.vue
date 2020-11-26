<template>
  <div class="contacts" data-app>
    <div class="wrap">
      <NavPanel @changeData="changeData" @refresh="refresh" :table="table" />
      <SearchPanel :contacts="contacts" @newContacts="newCont" />
    </div>
    <div>
      <loader v-if="loading" />
      <div v-else>
        <div v-if="table">
          <Table :contacts="dataCont" />
        </div>

        <div v-else>
          <Tile :contacts="dataCont" />
        </div>
        <Pagination @cont="cont" :newC="newC" />
      </div>
    </div>
  </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import Loader from "@/components/Loader/Loader";
import Tile from "@/components/tile/Tile";
import Table from "@/components/table/Table";
import NavPanel from "@/components/NavPanel";
import Pagination from "@/components/Pagination";
import SearchPanel from "@/components/SearchPanel";
export default {
  name: "Contacts",
  data: () => ({
    contacts: [],
    loading: true,
    table: true,
    dataCont: null,
    newC: null,
  }),
  components: {
    Loader,
    Table,
    Tile,
    NavPanel,
    Pagination,
    SearchPanel,
  },
  methods: {
    ...mapActions(["onGetContacts"]),
    ...mapGetters(["getContacts"]),
    changeData(data) {
      this.table = data;
    },
    cont(data) {
      this.dataCont = data;
    },
    newCont(data) {
      this.newC = data;
    },
    async refresh() {
      this.loading = true;
      this.nationalitiesInput = "";
      this.gender = "";
      this.fullName = "";
      await this.onGetContacts();
      this.contacts = this.getContacts();
      this.loading = false;
    },
  },
  async created() {
    this.loading = true;
    await this.onGetContacts();
    this.contacts = this.getContacts();
    this.loading = false;
  },
  mounted() {
    if (localStorage.getItem("table")) {
      this.table = JSON.parse(localStorage.getItem("table"));
    }
    let vm = this;
    window.addEventListener("resize", function () {
      if (window.innerWidth < 1275) {
        localStorage.table = false;
        vm.table = false;
      } else {
        this.table = JSON.parse(localStorage.getItem("table"));
      }
    });
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  padding: 1% 6% 0;
}

@media screen and (max-width: 1150px) {
  .v-text-field.v-text-field--enclosed .v-text-field__details {
    display: none !important;
  }
}
</style>
