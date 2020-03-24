<template>
  <v-toolbar max-height="65" color="indigo" dark>
    <v-toolbar-title>
      <router-link class="nav-link" :to="{ name: 'Home' }">Store</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <div v-if="user">
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn dark icon v-on="on">
            <v-icon>account_circle</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title @click="openCart">
              My cart
              <v-icon color="indigo">shopping_cart</v-icon>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title @click="logOut">
              Logout
              <v-icon color="indigo">keyboard_arrow_left</v-icon>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <div v-else>
      <router-link class="nav-link" :to="{ name: 'LogIn' }">Login</router-link>
      <router-link class="nav-link" :to="{ name: 'SignUp' }"
        >Signup</router-link
      >
    </div>
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
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "TheNavBar",

  data: () => ({
    showInput: false,
    autocomplete: null,
    search: null,
    searchValue: null,
    isLoading: false
  }),

  computed: {
    ...mapState("products", {
      products: state => state.products
    }),
    ...mapState("auth", {
      user: state => state.currentUser
    })
  },

  watch: {
    search(val) {
      if (!!val || val.length < 1) {
        return;
      }
      this.isLoading = true;
      this.$store.dispatch("products/search", val).then(results => {
        this.isLoading = false;
        if (results.length !== this.searchResults) {
          this.searchResults = results;
        }
      });
    }
  },

  methods: {
    openCart() {},
    logOut() {
      this.$store.dispatch("auth/logOut").then(() => {
        window.location.reload();
      });
    }
  }
};
</script>

<style scoped>
.nav-link {
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  transition: all 0.6s ease;
  font-size: 18px;
}
</style>
