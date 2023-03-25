<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import { required } from "vuelidate/lib/validators";
import {
    mapGetters,
    mapActions
} from "vuex";

/**
 * Contacts-grid component
 */
export default {
  page: {
    title: "Vote Polling",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: { Layout, PageHeader },
  data() {
    return {
      id: this.$route.params.id,
      userGridData:[
    {
        id: 2,
        image: require('@/assets/images/users/avatar-2.jpg'),
        name: 'Kaddu Livingstone',
        designation: 'Best Software Developer',
        projects: ['Html', 'Css', '2 + more'],
        email: 'frank@skote.com'
    }],
      title: "Vote Polling",
      items: [
        {
          text: "Position Vote",
        },
        {
          text: "Vote Now",
          active: true,
        },
      ],
      showModal: false,
      submitted: false,
      users: {
        name: "",
        designation: "",
        email: "",
      },
   
    };
  },
  validations: {
    users: {
      name: { required },
      designation: { required },
      email: { required },
    },
  },
      computed: {
        ...mapGetters("polling", ["Votecandidates", "Spinner"])
      },
  methods: {
         ...mapActions({
            FetchsVotePolling: "polling/fetchsVotePolling",
        }),
    /**
     * Modal form submit
     */
    // eslint-disable-next-line no-unused-vars
    handleSubmit(e) {
      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        this.userGridData.push({
          id: this.userGridData.length + 1,
          name: this.users.name,
          designation: this.users.designation,
          projects: this.value1,
          email: this.users.email,
        });
        this.showModal = false;
        this.users = {};
        this.value1 = [];
      }
      this.submitted = false;
    },
  },
   created() {
        this.FetchsVotePolling(this.id);
    },
};
</script>

<template>
  <Layout>
    <PageHeader :title="`Vote ${Votecandidates.name}`" :items="items" />
      <div class="form-group">
      <button @click="$router.go(-1)" class="btn btn-primary mb-2">
        <i class="fas fa-arrow-circle-left"></i> Go Back
      </button>
    </div>
    <div class="row">
      <div
        v-for="candidate in Votecandidates.candidates"
        :key="candidate.id"
        class="col-xl-3 col-sm-6"
      >
        <div class="card text-center">
          <div class="card-body">
            <div v-if="candidate.photo" class="mb-4">
              <img
                class="img-thumbnail"
                :src="require('@/assets/images/users/avatar-2.jpg')"
                alt
              />
            </div>
            <h5 class="font-size-15 mb-1">
              <a href="javascript: void(0);" class="text-dark">{{
                candidate.firstName+' '+candidate.lastName
              }}</a>
            </h5>
            <p class="text-muted">{{ Votecandidates.name }}</p>

            <div>
              <a
                href="javascript: void(0);"
                class="btn btn-sm btn-success font-size-11 m-1"
                >Give Vote <i class="fa fa-check"></i></a
              >
             
            </div>
          </div>
     
        </div>
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
    <div class="row" v-show="false">
      <div class="col-12">
        <div class="text-center my-3">
          <a href="javascript:void(0);" class="text-success">
            <i class="bx bx-hourglass bx-spin me-2"></i> Load more
          </a>
        </div>
      </div>
      <!-- end col-->
    </div>
    <!-- end row -->
  </Layout>
</template>