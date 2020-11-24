<template>
  <div class="tile">
    <v-card
      class="mx-auto"
      min-width="300"
      v-for="contact in contacts"
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
</template>

<script>
export default {
  props: ["contacts"],
};
</script>
<style lang="scss" scoped>
.tile {
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-gap: 25px;
  justify-content: center;
  justify-items: center;
  padding: 0% 6% 0;
}
@media screen and (max-width: 1400px) {
  .tile {
    padding: 0% 1% 0;
  }
}
</style>
