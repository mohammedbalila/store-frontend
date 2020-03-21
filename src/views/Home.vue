<template>
  <v-card>
    <v-container>
      <v-row>
        <v-col elevation="8" cols="12">
          <v-card>
            <v-img
              src="http://localhost:8000/media/categories/IMG_0995.JPG"
              lazy-src="../assets/category.jpg"
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
          v-for="product of products"
          :key="product.id"
          md="3"
          sm="12"
          xs="12"
        >
          <productPreview :product="product" />
        </v-col>
      </v-row>

      <v-row outlined tile>
        <v-col elevation="8" cols="12">
          <h3>Deals Of the Day</h3>
        </v-col>
        <v-col
          v-for="discount of discounts"
          :key="discount.id"
          md="3"
          sm="12"
          xs="12"
          @click="$router.push(`/discounts/${discount.id}`)"
        >
          <discountPreview :discount="discount" />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import CategoryPreview from '@/components/CategoryPreview.vue';
import ProductPreview from '@/components/ProductPreview.vue';
import DiscountPreview from '@/components/DiscountPreview.vue';

export default {
  name: 'Home',
  components: {
    CategoryPreview,
    ProductPreview,
    DiscountPreview,
  },
  computed: {
    ...mapState('products', {
      categories: (state) => state.categories,
      products: (state) => state.products,
    }),
    ...mapState('discounts', {
      discounts: (state) => state.discounts,
    }),
  },

  mounted() {
    this.getCategories();
    this.getTrendingProducts();
    this.getDiscounts();
  },
  methods: {
    ...mapActions('products', ['getCategories', 'getTrendingProducts']),
    ...mapActions('discounts', ['getDiscounts']),
  },
};
</script>
