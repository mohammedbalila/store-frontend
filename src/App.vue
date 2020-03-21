<template>
  <v-app>
    <v-toolbar max-height="65" color="indigo" dark>
      <v-toolbar-title>
        <v-btn text dark to="/">Store</v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-expand-x-transition>
        <v-autocomplete
          v-if="showInput"
          v-model="autocomplete"
          :items="products"
          :loading="isLoading"
          :search-input="searchValue"
          color="white"
          solo-inverted
          hide-details
          hide-no-data
          hide-selected
          item-text="name"
          item-value="id"
          label="بحث"
          placeholder="Search"
          return-object
        >
          <template v-slot:item="{ item }">
            <v-btn
              text
              :to="`/products/${item.id}`"
              color="blue-grey"
              class="white--text"
            >
              <span v-text="item.name"></span>
            </v-btn>
          </template>
        </v-autocomplete>
      </v-expand-x-transition>
      <v-btn icon @click="showInput = !showInput">
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>
    <router-view></router-view>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'App',

  data: () => ({
    showInput: false,
    autocomplete: null,
    search: null,
    searchValue: null,
    isLoading: false,
  }),
  computed: {
    ...mapState('products', {
      products: (state) => state.products,
    }),
  },
  watch: {
    search(val) {
      if (!!val || val.length < 1) {
        return;
      }
      this.isLoading = true;
      this.$store.dispatch('products/search', val).then((results) => {
        this.isLoading = false;
        if (results.length !== this.searchResults) {
          this.searchResults = results;
        }
      });
    },
  },
};
</script>
