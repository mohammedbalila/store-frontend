<template>
  <v-container>
    <v-row>
      <v-col elevation="8" cols="12">
        <h3 v-if="products[0]">
          Limited Time Offer
          <span style="color: red"
            >{{
              new Date(products[0].discount_info.expiresAt).toLocaleString()
            }}!</span
          >
        </h3>
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
  name: 'DiscountsProductsView',
  props: {
    id: { required: true, type: String },
  },
  components: {
    ProductPreview,
  },
  computed: {
    ...mapState('discounts', {
      products: (state) => state.products,
    }),
  },

  mounted() {
    this.getDiscountProducts(this.id);
  },
  methods: {
    ...mapActions('discounts', ['getDiscountProducts']),
  },
};
</script>
