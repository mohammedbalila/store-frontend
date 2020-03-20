<template>
  <v-app>
    <v-toolbar max-height="65" color="indigo" dark>
      <v-toolbar-title>
        <v-btn text dark to="/">Store</v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
