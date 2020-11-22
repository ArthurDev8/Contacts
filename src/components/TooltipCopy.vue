<template>
  <v-tooltip left>
    <template v-slot:activator="{ on, attrs }">
      <div
        v-bind="attrs"
        v-on="on"
        v-clipboard:cope="val"
        v-clipboard:success="copy"
        @mouseleave="renameIconText"
      >
        <i class="far fa-clone"></i>
        <span>{{ val }}</span>
      </div>
    </template>
    <span><i :class="iconText"></i></span>
  </v-tooltip>
</template>

<script>
export default {
  props: ["val"],
  data: () => ({
    iconText: "fas fa-clipboard",
    timeout: null,
  }),
  methods: {
    copy(e) {
      this.iconText = "fas fa-check-circle";
    },
    renameIconText() {
      this.timeout = setTimeout(() => {
        this.iconText = "fas fa-clipboard";
      }, 300);
    },
  },
  destroyed() {
    clearTimeout(this.timeout);
  },
};
</script>
<style lang="scss" scoped>
button,
[type="button"],
[type="reset"],
[type="submit"],
[role="button"] {
  transition: 0.7s;
  i {
    padding-right: 5px;
  }
  &:hover {
    color: #1d8ffe;
  }
}
</style>
