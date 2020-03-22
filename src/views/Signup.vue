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
          v-model="firstName"
          :rules="nameRules"
          label="First Name"
          rounded
          filled
          required
        ></v-text-field>

        <v-text-field
          v-model="lastName"
          :rules="nameRules"
          label="Last Name"
          rounded
          filled
          required
        ></v-text-field>

        <v-text-field
          v-model="phone"
          :rules="phoneRules"
          label="Phone number"
          rounded
          filled
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
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

        <v-text-field
          v-model="passwordConfirmation"
          :rules="passwordRules"
          type="password"
          label="Confirm password"
          rounded
          filled
          required
        ></v-text-field>

        <v-checkbox
          v-model="agreeOnTerms"
          :rules="[(v) => !!v || 'You must agree to continue!']"
          label="Do you agree on our terms and conditions?"
          required
        ></v-checkbox>
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
          Create account
        </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
    valid: true,
    firstName: '',
    lastName: '',
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => (v && v.length <= 15) || 'Name must be less than 15 characters',
    ],
    phone: '',
    phoneRules: [
      (v) => !!v || 'Phone is required',
      (v) => (v && v.length > 9) || 'Phone must be at least 10 characters',
      (v) => (v && v.length < 14) || 'Phone must be less than 14 characters',
      (v) => /^[0-9 +]+$/.test(v) || 'Enter a valid phone number',
    ],
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    password: '',
    passwordConfirmation: '',
    passwordRules: [
      (v) => !!v || 'Password is required',
      (v) => (v && v.length > 8) || 'Password must be at least 8 characters',
    ],
    agreeOnTerms: false,
  }),

  computed: {
    ...mapState('auth', {
      errors: (state) => state.errors,
      currentUser: (state) => state.currentUser,
    }),
  },

  created() {
    if (this.currentUser) {
      this.$router.push('/');
    }
  },

  methods: {
    validate() {
      if (this.$refs.form.validate());
      {
        const {
          firstName: first_name,
          lastName: last_name,
          email,
          phone,
          password: password1,
          passwordConfirmation: password2,
        } = this;

        const user = {
          first_name,
          last_name,
          username: email,
          phone,
          email,
          password1,
          password2,
        };
        this.$store.dispatch('auth/signup', user);
      }
    },
  },
};
</script>
