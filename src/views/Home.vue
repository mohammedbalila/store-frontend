<template>
  <v-card class="mx-auto" max-width="500">
    <v-container fluid>
      <v-row dense>
        <v-col v-for="category of categories" :key="category.id" cols="6">
          <categoryView :category="category" />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CategoryView from "@/components/CategoryView.vue";

export default {
  name: "Home",
  components: {
    CategoryView
  },
  computed: {
    ...mapState("products", {
      categories: state => state.categories
    })
  },

  mounted() {
    this.getCategories();
  },
  methods: {
    ...mapActions("products", ["getCategories"])
  }
};
</script>
