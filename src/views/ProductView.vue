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
        <v-card outlined class="pa-2">
          <v-card-title>
            Customsers reviews
          </v-card-title>
          <v-card v-for="review in reviews" :key="review.id" outlined>
            <v-list-item three-line>
              <v-list-item-avatar tile size="50" color="grey">
                <v-img
                  src="https://cdn.mos.cms.futurecdn.net/6y6p32tRRRtjoiVbKf2HNJ-650-80.jpg"
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title
                  class="headline mb-1"
                  v-text="review.user_info.username"
                ></v-list-item-title>
                <v-list-item-subtitle
                  v-text="review.comment"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-card-actions>
              <v-btn text color="grey">
                <v-icon>thumb_up_alt</v-icon> {{ review.up_votes }}
              </v-btn>
              <v-btn text color="grey">
                <v-icon>thumb_down_alt</v-icon> {{ review.down_votes }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ProductView',

  props: {
    id: { required: true, type: String },
  },

  data() {
    return {
      comments: [],
    };
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
