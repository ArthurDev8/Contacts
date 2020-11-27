<template>
  <v-simple-table class="table">
    <thead>
      <tr>
        <th v-for="title in tableTitle" :key="title.title">
          <h3 class="tableTitle">
            <span>{{ title.title }}</span>
            <v-icon
              @click="sortBy"
              class="iconSort"
              :class="title.icon"
              medium
            ></v-icon>
          </h3>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="contact in contacts" :key="contact.login.uuid">
        <td>
          <v-avatar><v-img :src="contact.picture.thumbnail"></v-img></v-avatar>
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
</template>

<script>
import TooltipCopy from "@/components/TooltipCopy";
export default {
  components: {
    TooltipCopy,
  },
  props: ["contacts", "sortParam"],
  data: () => ({
    tableTitle: [
      { title: "Avatar" },
      { title: "Fullname", icon: "fas fa-sort" },
      { title: "Birthday" },
      { title: "Email" },
      { title: "Phone" },
      { title: "Location" },
      { title: "Nationality" },
    ],
    count: 0,
  }),
  methods: {
    sortBy() {
      this.count += 1;
      if (this.count == 1) {
        this.$emit("sortBy", "a-z");
      } else if (this.count == 2) {
        // this.count = 0
        this.$emit("sortBy", "z-a");
      } else if (this.count == 3) {
        this.count = 0;
        this.$emit("sortBy", "random");
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.table {
  margin: 0 auto;
  padding: 0% 6% 0;
}
.tableTitle {
  color: gray;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  margin-left: -10px;
  & span {
    padding-right: 15px;
  }
}
.iconSort {
  transition: 0.4s;
  &:hover {
    cursor: pointer;
    color: #aeddff;
  }
}
tr > td {
  padding: 7px !important;
}

@media screen and (max-width: 1400px) {
  .table {
    padding: 0% 1% 0;
  }
}
@media screen and (max-width: 1275px) {
  .table {
    display: none !important;
  }
}
</style>
