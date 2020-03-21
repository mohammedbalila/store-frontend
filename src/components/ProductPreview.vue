<template>
  <v-card class="mx-auto my-12" max-width="374">
    <v-img
      height="250"
      :src="product.image"
      lazy-src="../assets/category.jpg"
    ></v-img>

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

      <v-btn color="deep-purple lighten-2" text :to="`/products/${product.id}`">
        <v-icon>visibility</v-icon>
      </v-btn>

      <v-btn color="deep-purple lighten-2" text>
        <v-icon>share</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ProductPreview',
  props: ['product'],
};
</script>
