<template>
  <div class="contacts" data-app>
    <div class="wrap">
      <NavPanel @changeData="changeData" @refresh="refresh" :table="table" />
      <SearchPanel
        :contacts="contacts"
        @newContacts="newCont"
        :resetSearchFields="resetSearchFields"
      />
    </div>
    <div>
      <loader v-if="loading" />
      <div v-else>
        <div v-if="table">
          <Table :contacts="dataCont" @sortBy="sortBy" :sortParam="sortParam" />
        </div>

        <div v-else>
          <Tile :contacts="dataCont" />
        </div>

        <Statistic :newC="newC" />
        <Pagination @cont="cont" :newC="newC" :sortParam="sortParam" />
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
import Statistic from "@/components/Statistic";
export default {
  name: "Contacts",
  data: () => ({
    contacts: [],
    loading: true,
    table: true,
    dataCont: null,
    newC: null,
    resetSearchFields: null,
    sortParam: "",
  }),
  components: {
    Loader,
    Table,
    Tile,
    NavPanel,
    Pagination,
    SearchPanel,
    Statistic,
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
    sortBy(data) {
      this.sortParam = data;
    },
    async refresh(data) {
      this.loading = true;
      this.resetSearchFields = data;
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
