<script>
import Layout from "../../layouts/auth";
import appConfig from "@/app.config";
import { mapState } from "vuex";

import { required, email } from "vuelidate/lib/validators";

/**
 * Register component
 */
export default {
  page: {
    title: "Register",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  components: {
    Layout,
  },
  data() {
    return {
      user: {
        fullName: "",
        email: "",
        countryId: "235",
        password: "",
        confirm_password: "",
      },
      submitted: false,
      regError: null,
      tryingToRegister: false,
      isRegisterError: false,
      registerSuccess: false,
    };
  },
  validations: {
    user: {
      fullName: {
        required,
      },
      countryId: {
        required,
      },
      email: {
        required,
        email,
      },
      password: {
        required,
      },
       confirm_password: {
        required,
      },
    },
  },
  computed: {
    ...mapState("authfack", ["status"]),
    notification() {
      return this.$store ? this.$store.state.notification : null;
    },
  },
  methods: {
    tryToRegisterIn() {
      // alert("yooo")
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } 
          const { email, fullName, password } = this.user;
          if (email && fullName && password) {
            this.$store.dispatch("auth/register", this.user);
           this.submitted = true;
          }
      }
    },
  }

</script>

<template>
  <Layout>
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card overflow-hidden">
          <div class="bg-soft bg-primary">
            <div class="row">
              <div class="col-7">
                <div class="text-primary p-4">
                  <h5 class="text-primary">Free Register</h5>
                  <p>Get your free Vision Voting account now.</p>
                </div>
              </div>
              <div class="col-5 align-self-end">
                <img
                  src="@/assets/images/profile-img.png"
                  alt
                  class="img-fluid"
                />
              </div>
            </div>
          </div>
          <div class="card-body pt-0">
            <div>
              <router-link tag="a" to="/">
                <div class="avatar-md profile-user-wid mb-4">
                  <span class="avatar-title rounded-circle bg-light">
                    <img
                      src="@/assets/images/logo.svg"
                      alt
                      class="rounded-circle"
                      height="34"
                    />
                  </span>
                </div>
              </router-link>
            </div>

            <b-alert
              v-model="registerSuccess"
              class="mt-3"
              variant="success"
              dismissible
              >Registration successfull.</b-alert
            >

            <b-alert
              v-model="isRegisterError"
              class="mt-3"
              variant="danger"
              dismissible
              >{{ regError }}</b-alert
            >

            <div
              v-if="notification.message"
              :class="'alert ' + notification.type"
            >
              {{ notification.message }}
            </div>

            <b-form class="p-2" @submit.prevent="tryToRegisterIn">
              <b-form-group
              class="mb-3"
                id="email-group"
                label="Full Name"
                label-for="username"
              >
                <b-form-input
                  id="username"
                  v-model="user.fullName"
                  type="text"
                  placeholder="Enter Full Name"
                  :class="{
                    'is-invalid': submitted && $v.user.fullName.$error,
                  }"
                ></b-form-input>
                <div
                  v-if="submitted && !$v.user.fullName.required"
                  class="invalid-feedback"
                >
                  Fullname is required.
                </div>
              </b-form-group>

              <b-form-group class="mb-3" id="fullname-group" label="Email" label-for="email">
                <b-form-input
                  id="email"
                  v-model="user.email"
                  type="email"
                  placeholder="Enter email"
                  :class="{ 'is-invalid': submitted && $v.user.email.$error }"
                ></b-form-input>
                <div
                  v-if="submitted && $v.user.email.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.user.email.required">Email is required.</span>
                  <span v-if="!$v.user.email.email"
                    >Please enter valid email.</span
                  >
                </div>
              </b-form-group>

              <b-form-group
              class="mb-3"
                id="password-group"
                label="Password"
                label-for="password"
              >
                <b-form-input
                  id="password"
                  v-model="user.password"
                  type="password"
                  placeholder="Enter password"
                  :class="{
                    'is-invalid': submitted && $v.user.password.$error,
                  }"
                ></b-form-input>
                <div
                  v-if="submitted && !$v.user.password.required"
                  class="invalid-feedback"
                >
                  Password is required.
                </div>
              </b-form-group>
               <b-form-group
              class="mb-3"
                id="password-group"
                label="Password"
                label-for="password"
              >
                <b-form-input
                  id="password"
                  v-model="user.confirm_password"
                  type="password"
                  placeholder="Enter password"
                  :class="{
                    'is-invalid': submitted && $v.user.confirm_password.$error,
                  }"
                ></b-form-input>
                <div
                  v-if="submitted && !$v.user.confirm_password.required"
                  class="invalid-feedback"
                >
                  Confirm Password is required.
                </div>
              </b-form-group>

              <div class="mt-4 d-grid">
                <b-button type="submit" variant="primary" class="btn-block"
                  >Register</b-button
                >
              </div>

              <div class="mt-4 text-center">
                <h5 class="font-size-14 mb-3">Sign up using</h5>

                <ul class="list-inline">
                  <li class="list-inline-item">
                    <a
                      href="javascript: void(0);"
                      class="social-list-item bg-primary text-white border-primary"
                    >
                      <i class="mdi mdi-facebook"></i>
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a
                      href="javascript: void(0);"
                      class="social-list-item bg-info text-white border-info"
                    >
                      <i class="mdi mdi-twitter"></i>
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a
                      href="javascript: void(0);"
                      class="social-list-item bg-danger text-white border-danger"
                    >
                      <i class="mdi mdi-google"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </b-form>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->

        <div class="mt-5 text-center">
          <p>
            Already have an account ?
            <router-link
              tag="a"
              to="/login"
              class="fw-medium text-primary"
              >Login</router-link
            >
          </p>
          <p>
            © {{ new Date().getFullYear() }} Vision Voting
          </p>
        </div>
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Layout>
</template>

<style lang="scss" module></style>
