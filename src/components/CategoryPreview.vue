<template>
  <v-container>
    <v-card>
      <v-img
        :src="category.image"
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="200px"
      >
        <v-card-title v-text="category.name"> </v-card-title>
      </v-img>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "CategoryView",
  props: ["category"]
};
</script>
