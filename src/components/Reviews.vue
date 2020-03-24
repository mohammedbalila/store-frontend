<template>
  <v-card outlined class="pa-2">
    <v-card-title>
      Customsers reviews
    </v-card-title>
    <v-card-text v-if="user">
      <v-form>
        <v-rating
          v-model="review.rating"
          background-color="orange lighten-3"
          color="orange"
        ></v-rating>
        <v-text-field
          v-model="review.comment"
          :rules="reviewRules"
          label="Tell us what you think of this product?"
          rounded
          filled
          required
        ></v-text-field>
        <v-btn @click="addReview" color="deep-purple lighten-2" text
          >Review</v-btn
        >
      </v-form>
    </v-card-text>
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
          <v-list-item-subtitle v-text="review.comment"></v-list-item-subtitle>
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
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "ProductReviews",
  props: {
    productId: { type: String, required: true }
  },

  data() {
    return {
      review: {
        rating: 0,
        comment: "",
        product: this.productId
      },
      reviewRules: [v => !!v || "Write your review first"]
    };
  },

  computed: {
    ...mapState("reviews", {
      reviews: state => state.reviews
    }),
    ...mapState("auth", {
      user: state => state.currentUser
    })
  },

  created() {
    this.getReviews(this.productId);
  },

  methods: {
    ...mapActions("reviews", ["getReviews", "createReview"]),
    addReview() {
      const review = { ...this.review, user: this.user.user.id };
      this.createReview(review);
      this.review = {
        rating: 0,
        comment: " ",
        product: this.productId
      };
    }
  }
};
</script>
