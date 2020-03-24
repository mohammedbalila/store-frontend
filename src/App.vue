<template>
  <v-app>
    <TheNavBar />
    <router-view></router-view>
  </v-app>
</template>

<script>
import TheNavBar from "@/components/TheNavBar";

export default {
  name: "App",
  components: {
    TheNavBar
  }
};
</script>
