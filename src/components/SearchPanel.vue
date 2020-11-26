<template>
  <div class="search_fields">
    <v-row align="center">
      <v-col cols="12" sm="6">
        <v-text-field
          placeholder="Search by full name"
          solo
          clearable
          append-icon="mdi-feature-search-outline"
          v-model="fullName"
        ></v-text-field>
      </v-col>
      <v-col class="d-flex" cols="12" sm="3">
        <v-select
          :items="genders"
          placeholder="Gender"
          solo
          v-model="gender"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="3">
        <v-text-field
          placeholder="Nationality"
          solo
          v-model="nationalitiesInput"
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
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import nationalitiesFilter from "@/filters/nationalitiesFilter";
export default {
  props: ["contacts", "resetSearchFields"],
  data: () => ({
    genders: ["Male", "Female"],
    fullName: "",
    gender: "",
    nationalitiesInput: "",
  }),
  methods: {
    ...mapActions(["updateContactsByFilter"]),
    resetFields() {
      this.fullName = "";
      this.gender = "";
      this.nationalitiesInput = "";
    },
  },
  computed: {
    filteredList() {
      let gender = this.gender;
      let nationalitiesInput = this.nationalitiesInput;
      let fullName = this.fullName;
      return this.contacts
        .filter((c) => {
          if (gender === "") return true;
          return c.gender.toLowerCase() === gender.toLowerCase();
        })
        .filter((c) => {
          if (nationalitiesInput === "") {
            return true;
          } else {
            let nat = nationalitiesFilter(c.nat);
            return nat.toLowerCase().includes(nationalitiesInput.toLowerCase());
          }
        })
        .filter((c) => {
          if (fullName === "") {
            return true;
          } else {
            let firstAndLast = c.name.first + c.name.last;
            return firstAndLast.toLowerCase().includes(fullName.toLowerCase());
          }
        });
    },
  },
  watch: {
    filteredList(e) {
      this.$emit("newContacts", e);
    },
    resetSearchFields() {
      this.resetFields();
    },
  },
};
</script>

<style lang='scss' scoped>
.search_fields {
  padding-top: 1%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.clearBtn {
  display: flex;
  justify-content: flex-end;
  .clearButton {
    text-transform: to-upper-case($string: none);
  }
}
@media screen and (max-width: 1150px) {
  .search_fields {
    padding-top: 1%;
    display: flex;
    flex-direction: column;
  }
  .clearBtn {
    justify-content: center;
  }
}
</style>
