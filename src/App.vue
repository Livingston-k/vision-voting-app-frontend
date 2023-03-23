<script>
import appConfig from "@/app.config";

import { notificationMethods } from "@/state/helpers";
import axios from "axios";
export default {
  name: "app",
  page: {
    // All subcontinent titles will be injected into this template.
    titleTemplate(title) {
      title = typeof title === "function" ? title(this.$store) : title;
      return title ? `${title} | ${appConfig.title}` : appConfig.title;
    },
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      // clear alert on location change
      this.clearNotification();
    },
  },
  methods: {
    clearNotification: notificationMethods.clear,
  },

  beforeCreate() {
      axios.defaults.headers.common["Authorization"] = "";
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      axios.defaults.headers.common["Accept"] = "application/json";
      axios.defaults.headers.common["Content-Type"] = "application/json";

    this.$store.commit("auth/initializeStore");
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      this.$store.dispatch("auth/Authenticated_user");
    } 
  
  },
};
</script>

<template>
  <div id="app">
    <RouterView />
  </div>
</template>
