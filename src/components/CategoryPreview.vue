<template>
  <v-container>
    <v-card>
      <v-img
        :src="category.image"
        lazy-src="../assets/category.jpg"
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="200px"
        min-width="100px"
      >
        <v-card-title> {{ category.name }} </v-card-title>
      </v-img>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'CategoryPreview',
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
};
</script>
