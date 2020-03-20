<template>
  <v-container>
    <v-row>
      <v-col elevation="8" cols="12">
        <h3 v-text="category.name"></h3>
      </v-col>
      <v-col v-for="product of products" :key="product.id" md="3" sm="6" xl="8">
        <productPreview :product="product" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ProductPreview from '@/components/ProductPreview.vue';

export default {
  name: 'Home',
  props: {
    id: { required: true, type: String },
  },
  components: {
    ProductPreview,
  },
  computed: {
    ...mapState('products', {
      products: (state) => state.products,
      category: (state) => state.category,
    }),
  },

  mounted() {
    this.getProductsByCategory(this.id);
    this.getCategory(this.id);
  },
  methods: {
    ...mapActions('products', ['getProductsByCategory', 'getCategory']),
  },
};
</script>
