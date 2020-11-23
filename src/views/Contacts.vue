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
        <v-simple-table v-if="table" class="table">
          <thead>
            <tr>
              <th v-for="title in tableTitle" :key="title.title">
                <h3 class="tableTitle">{{ title.title }}</h3>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="contact in getContacts()" :key="contact.login.uuid">
              <td>
                <v-avatar
                  ><v-img :src="contact.picture.thumbnail"></v-img
                ></v-avatar>
              </td>
              <td>
                {{
                  `${contact.name.title}. ${contact.name.first} ${contact.name.last}`
                }}
              </td>
              <td>
                <div>{{ contact.dob.date | birthday }}</div>
                <div>{{ contact.dob.age }}</div>
              </td>

              <td><TooltipCopy :val="contact.email" /></td>

              <td>
                <TooltipCopy :val="contact.phone" />
              </td>

              <td>
                <div>
                  {{ ` / ${contact.location.country} / ` }}
                </div>
                <div>
                  {{
                    `${contact.location.street.number} ${contact.location.street.name}`
                  }}
                </div>
                <div>
                  {{
                    `${contact.location.state} ${contact.location.city} ${contact.location.postcode}`
                  }}
                </div>
              </td>
              <td>
                <span>{{ contact.nat | nationalities }}</span>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
        <div class="tile" v-else>
          <v-card
            class="mx-auto"
            min-width="300"
            v-for="contact in getContacts()"
            :key="contact.login.uuid"
          >
            <v-img :src="contact.picture.large" height="300px"></v-img>
            <v-card-title>
              {{
                `${contact.name.title}. ${contact.name.first} ${contact.name.last}`
              }}
            </v-card-title>

            <v-card-subtitle class="info">
              <div>
                <h3>{{ contact.location.country }}</h3>
              </div>
              <div>
                {{
                  `${contact.location.street.number} ${contact.location.street.name}`
                }}
              </div>
              <div>
                {{
                  `${contact.location.state} ${contact.location.city} ${contact.location.postcode}`
                }}
              </div>
              {{ contact.email }}<br />
              {{ contact.phone }}
            </v-card-subtitle>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TooltipCopy from "@/components/TooltipCopy";
import Loader from "@/components/Loader/Loader";
export default {
  name: "Contacts",
  data: () => ({
    loading: true,
    table: true,
    tableTitle: [
      { title: "Avatar" },
      { title: "Fullname" },
      { title: "Birthday" },
      { title: "Email" },
      { title: "Phone" },
      { title: "Location" },
      { title: "Nationality" },
    ],
    genders: ["Male", "Female"],
    gender: "",
    nationalitiesInput: "",
  }),
  components: {
    TooltipCopy,
    Loader,
  },
  methods: {
    ...mapActions(["onGetContacts", "onSortByGender", "onSortByNationalities"]),
    ...mapGetters(["getContacts"]),
    viewTable(data) {
      localStorage.table = data;
      this.table = !this.table;
    },
    async refresh() {
      this.loading = true;
      this.nationalitiesInput = "";
      this.gender = "";
      await this.onGetContacts();
      this.loading = false;
    },
    async sortByGender() {
      this.loading = true;
      this.nationalitiesInput = "";
      await this.onSortByGender(this.gender);
      this.loading = false;
    },
    async sortByNationalities() {
      this.loading = true;
      this.gender = "";
      await this.onSortByNationalities(this.nationalitiesInput);
      this.loading = false;
    },
    async resetFields() {
      if (this.gender.length > 0) {
        this.loading = true;
        this.gender = "";
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
.tile {
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-gap: 25px;
  justify-content: center;
  justify-items: center;
  padding: 0% 6% 0;
}
.table {
  margin: 0 auto;
  padding: 0% 6% 0;
}

.theme--light.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: #aeddff !important;
}

tr > td {
  padding: 7px !important;
}
.clearBtn {
  display: flex;
  justify-content: flex-end;
  .clearButton {
    text-transform: to-upper-case($string: none);
  }
}

.tableTitle {
  color: gray;
  display: flex;
  justify-content: flex-start;
  margin-left: -10px;
}
@media screen and (max-width: 1400px) {
  .table,
  .tile {
    padding: 0% 1% 0;
  }
}
@media screen and (max-width: 1275px) {
  .table,
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
