<template>
  <div class="statistic">
    <hr class="hr" />
    <div class="sizes">
      <div>
        <span>Collection size</span>
        <h2>{{ contacts.length }}</h2>
      </div>
      <div>
        <span>Males</span>
        <h2>{{ male() }}</h2>
      </div>
      <div>
        <span>Females</span>
        <h2>{{ female() }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["newC"],
  data: () => ({
    contacts: [],
  }),
  methods: {
    ...mapGetters(["getContacts"]),
    male() {
      let malesCount = this.contacts.filter((c) => {
        return c.gender.toLowerCase() == "male";
      });
      return malesCount.length;
    },
    female() {
      let femalesCount = this.contacts.filter((c) => {
        return c.gender.toLowerCase() == "female";
      });
      return femalesCount.length;
    },
  },
  watch: {
    newC() {
      this.contacts = this.newC;
    },
  },
  created() {
    this.contacts = this.getContacts();
  },
};
</script>

<style lang='scss' scoped>
.statistic {
  margin: 2% 6% 0;
  .hr {
    margin: 10px 0;
  }
  .sizes {
    display: flex;
    & > * {
      margin: 5px 50px 5px 0px;
    }
  }
}
</style>
