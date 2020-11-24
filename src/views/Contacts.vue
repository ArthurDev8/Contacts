<template>
  <div class="contacts" data-app>
    <div class="wrap">
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
      <div class="search_fields">
        <v-row align="center">
          <v-col cols="12" sm="6">
            <v-text-field
              placeholder="Search by full name"
              solo
              clearable
              append-icon="mdi-feature-search-outline"
              v-model="fullName"
              @input="sortByFullName"
            ></v-text-field>
          </v-col>
          <v-col class="d-flex" cols="12" sm="3">
            <v-select
              :items="genders"
              placeholder="Gender"
              solo
              v-model="gender"
              @change="sortByGender"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
              placeholder="Nationality"
              solo
              v-model="nationalitiesInput"
              @input="sortByNationalities"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="clearBtn">
            <v-btn
              large
              text
              rounded
              outlined
              elevation="5"
              class="clearButton"
              @click="resetFields"
            >
              <v-icon center left small> mdi-close </v-icon>
              Clear
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </div>
    <div>
      <loader v-if="loading" />
      <div v-else>
        <div v-if="table">
          <Table :contacts="getContacts()" />
        </div>

        <div v-else>
          <Tile :contacts="getContacts()" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Loader from "@/components/Loader/Loader";
import Tile from "@/components/tile/Tile";
import Table from "@/components/table/Table";
export default {
  name: "Contacts",
  data: () => ({
    loading: true,
    table: true,
    genders: ["Male", "Female"],
    fullName: "",
    gender: "",
    nationalitiesInput: "",
  }),
  components: {
    Loader,
    Table,
    Tile,
  },
  methods: {
    ...mapActions([
      "onGetContacts",
      "onSortByGender",
      "onSortByNationalities",
      "onSortByFullName",
    ]),
    ...mapGetters(["getContacts"]),
    viewTable(data) {
      localStorage.table = data;
      this.table = !this.table;
    },
    async refresh() {
      this.loading = true;
      this.nationalitiesInput = "";
      this.gender = "";
      this.fullName = "";
      await this.onGetContacts();
      this.loading = false;
    },
    async sortByFullName() {
      this.loading = true;
      this.nationalitiesInput = "";
      this.gender = "";
      await this.onSortByFullName(this.fullName);
      this.loading = false;
    },
    async sortByGender() {
      this.loading = true;
      this.fullName = "";
      this.nationalitiesInput = "";
      await this.onSortByGender(this.gender);
      this.loading = false;
    },
    async sortByNationalities() {
      this.loading = true;
      this.gender = "";
      this.fullName = "";
      await this.onSortByNationalities(this.nationalitiesInput);
      this.loading = false;
    },
    async resetFields() {
      if (
        this.gender.length > 0 ||
        this.fullName.length > 0 ||
        this.nationalitiesInput.length > 0
      ) {
        this.loading = true;
        this.fullName = "";
        this.gender = "";
        this.nationalitiesInput = "";
        await this.onGetContacts();
        this.loading = false;
      } else return;
    },
  },
  async created() {
    this.loading = true;
    await this.onGetContacts();
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
  .nav {
    display: flex;
    justify-content: space-between;
  }
  .search_fields {
    padding-top: 1%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
.theme--light.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: #aeddff !important;
}
.clearBtn {
  display: flex;
  justify-content: flex-end;
  .clearButton {
    text-transform: to-upper-case($string: none);
  }
}

@media screen and (max-width: 1275px) {
  .viewTable {
    display: none !important;
  }
}

@media screen and (max-width: 1150px) {
  .wrap {
    .search_fields {
      padding-top: 1%;
      display: flex;
      flex-direction: column;
    }
  }
  .clearBtn {
    justify-content: center;
  }
  .v-text-field.v-text-field--enclosed .v-text-field__details {
    display: none !important;
  }
}
</style>
