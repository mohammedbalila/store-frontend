<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-img height="250" :src="product.image"></v-img>

          <v-card-title v-text="product.name"></v-card-title>
          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating
                :value="4.5"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="grey--text ml-4">4.5 (413)</div>
            </v-row>

            <div class="my-4 subtitle-1">$ {{ product.price }}</div>

            <div>
              {{ product.desc }}
            </div>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="deep-purple lighten-2" text>
              <v-icon>add_shopping_cart</v-icon>
            </v-btn>

            <v-btn color="deep-purple lighten-2" text>
              <v-icon>attach_money</v-icon>
            </v-btn>

            <v-btn color="deep-purple lighten-2" text>
              <v-icon>share</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12">
        <reviews :productId="id" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Reviews from '@/components/Reviews.vue';

export default {
  name: 'ProductView',

  props: {
    id: { required: true, type: String },
  },

  components: {
    Reviews,
  },

  computed: {
    ...mapState('products', {
      product: (state) => state.product,
    }),
    ...mapState('reviews', {
      reviews: (state) => state.reviews,
    }),
  },

  created() {
    this.getProductById(this.id);
    this.getReviews(this.id);
  },
  methods: {
    ...mapActions('products', ['getProductById']),
    ...mapActions('reviews', ['getReviews']),
  },
};
</script>
