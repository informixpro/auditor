<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <app-alert @dismissed="onDismissed" :text="error.message" v-if="error"></app-alert>
        <v-card>
          <v-card-text>

            <p class="title text-xs-center my-4">Sign Up</p>
            <p class="mb-3 text-xs-center">
              Already have an account?
              <router-link to="/signin">Log In</router-link>
            </p>

            <form @submit.prevent="onSignUp">
              <v-text-field
                label="Email"
                v-model="email"
                type="email"
                required
                :rules="[() => email.length > 0 || 'This field is required']"
              ></v-text-field>

              <v-text-field
                label="Password"
                hint="Password must be greater than 6 characters"
                v-model="password"
                type="password"
                required
                :rules="[checkPasswordIsNotEmpty(password)]"
              ></v-text-field>

             <v-text-field
                label="ConfirmPassword"
                hint="Password must be greater than 6 characters"
                v-model="confirmPassword"
                type="password"
                required
                :rules="[checkPasswordIsNotEmpty(confirmPassword), comparePasswords]"
              ></v-text-field>

              <v-btn type="submit" :disabled="loading" :loading="loading" dark large color="primary my-4" block>
                SignUp
                <span slot="loader" class="custom-loader">
                   <v-icon light>cached</v-icon>
                  </span>
              </v-btn>
            </form>

          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        email: '',
        password: '',
        confirmPassword: ''
      }
    },
    computed: {
      comparePasswords () {
        return this.password === this.confirmPassword || 'Password does not match'
      },
      user () {
        return this.$store.getters.user
      },
      error () {
        return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      onSignUp () {
        this.$store.commit('clearError')
        if (this.password !== this.confirmPassword) {
          this.$store.commit('setError', {message: 'Password does not match'})
          return
        }
        this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
      },
      checkPasswordIsNotEmpty (password) {
        return password.length > 0 || 'This field is required'
      }
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/')
        }
      }
    }
  }
</script>
