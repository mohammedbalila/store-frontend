<template>
  <v-card>
    <v-container>
      <v-row dense elevation="8">
        <v-col cols="12">
          <v-card>
            <v-img
              src="http://localhost:8000/media/categories/IMG_0995.JPG"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title>Welcome to your favourit market </v-card-title>
            </v-img>
          </v-card>
        </v-col>
        <v-col
          v-for="category of categories"
          :key="category.id"
          md="3"
          sm="12"
          xs="12"
          @click="$router.push(`/categories/${category.id}`)"
        >
          <categoryPreview :category="category" />
        </v-col>
      </v-row>

      <v-row>
        <v-col elevation="8" cols="12">
          <h3>Trending</h3>
        </v-col>
        <v-col
          v-for="category of categories"
          :key="category.id"
          md="3"
          sm="12"
          xs="12"
        >
          <categoryPreview :category="category" />
        </v-col>
      </v-row>

      <v-row outlined tile>
        <v-col elevation="8" cols="12">
          <h3>Deals Of the Day</h3>
        </v-col>
        <v-col
          v-for="category of categories"
          :key="category.id"
          md="3"
          sm="12"
          xs="12"
        >
          <categoryPreview :category="category" />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import CategoryPreview from '@/components/CategoryPreview.vue';

export default {
  name: 'Home',
  components: {
    CategoryPreview,
  },
  computed: {
    ...mapState('products', {
      categories: (state) => state.categories,
    }),
  },

  mounted() {
    this.getCategories();
  },
  methods: {
    ...mapActions('products', ['getCategories']),
  },
};
</script>
