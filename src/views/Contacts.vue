<template>
  <div class="contacts" data-app>
    <div class="wrap">
      <h1>Contacts</h1>
      <div>
        <v-btn>
          <v-icon class="fas fa-redo"></v-icon>
        </v-btn>
        <v-btn @click="viewTable(false)" :disabled="!table">
          <v-icon class="fas fa-border-all"></v-icon>
        </v-btn>
        <v-btn @click="viewTable(true)" :disabled="table">
          <v-icon class="fas fa-list-ul"></v-icon>
        </v-btn>
      </div>
    </div>
    <div>
      <loader v-if="loading" />
      <div v-else>
        <v-simple-table v-if="table" class="table">
          <thead>
            <tr>
              <td
                v-for="title in tableTitle"
                :key="title.title"
                class="text-left"
              >
                {{ title.title }}
              </td>
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
                <div>{{ contact.dob.date | birthdayFilter }}</div>
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
                <span>{{ contact.nat | nationalityFilter }}</span>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
        <div class="tile" v-else>
          <v-card
            class="mx-auto"
            max-width="300"
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
import nationalities from "@/constants/nationalities";
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
  }),
  components: {
    TooltipCopy,
    Loader,
  },
  methods: {
    ...mapActions(["onGetContacts"]),
    ...mapGetters(["getContacts"]),
    viewTable(data) {
      localStorage.table = data;
      this.table = !this.table;
    },
  },
  filters: {
    birthdayFilter(e) {
      let date = new Date(e);
      let options = {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        weekday: "long",
        timezone: "UTC",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };
      return date.toLocaleString("en-US", options);
    },
    nationalityFilter(e) {
      let nat = nationalities.filter((n) => n.CountryCode === e);
      return nat[0].Nationality;
    },
  },
  async created() {
    this.loading = true;
    await this.onGetContacts();
    this.loading = false;
  },
  mounted() {
    if (localStorage.getItem("table"))
      this.table = JSON.parse(localStorage.getItem("table"));
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  display: flex;
  justify-content: space-between;
  padding: 1% 6% 0;
}
.tile {
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-gap: 25px;
  justify-content: center;
  padding: 2% 0;
}
.table {
  max-width: 90%;
  margin: 0 auto;
  padding: 2% 0;
}

.theme--light.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: #1d8ffe !important;
}
tr > td {
  padding: 7px !important;
}
</style>
