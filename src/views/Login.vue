<template>
  <v-row class="ma-10">
    <v-col>
      <h3>
        Welcome to Mustazone
        <v-card>
          <v-img
            src="../assets/discount.png"
            class="mx-width"
            max-height="400"
          />
        </v-card>
      </h3>
    </v-col>
    <v-col>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="username"
          :rules="emailRules"
          label="E-mail"
          rounded
          filled
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          type="password"
          label="Password"
          rounded
          filled
          required
        ></v-text-field>

        <div v-if="errors">
          <p v-for="error of errors" :key="error" class="text-center red--text">
            {{ error }}
          </p>
        </div>
        <v-btn
          :disabled="!valid"
          color="green lighten-2"
          class="m-4 text--black"
          @click="validate"
        >
          Login
        </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    valid: true,
    username: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      v => (v && v.length > 8) || "Password must be at least 8 characters"
    ]
  }),

  computed: {
    ...mapState("auth", {
      errors: state => state.errors,
      currentUser: state => state.currentUser
    })
  },

  created() {
    if (this.currentUser) {
      this.$router.push("/");
    }
  },

  methods: {
    validate() {
      if (this.$refs.form.validate());
      {
        const user = {
          username: this.username,
          password: this.password
        };
        this.$store
          .dispatch("auth/logIn", user)
          .then(() => this.successRedirect());
      }
    },
    successRedirect() {
      const redirectTo = this.$route.query.redirectTo || { name: "Home" };
      this.$router.push(redirectTo);
    }
  }
};
</script>
