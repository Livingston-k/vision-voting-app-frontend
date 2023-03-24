<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import { required } from "vuelidate/lib/validators";
import { ModelListSelect } from "vue-search-select";
import {
    mapGetters,
    mapActions,
    mapState
} from "vuex";


/**
 * Contacts-grid component
 */
export default {
  page: {
    title: "Candidates",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: { Layout, PageHeader,ModelListSelect },
  data() {
    return {
      model_id:"",
      title: "  Candidates",
      items: [
        {
          text: "Candidates",
          href: "/",
        }
      ],
      showModal: false,
      submitted: false,
      candidate: {
        firstName: "",
        lastName: "",
        categoryId: "",
        photo: "",
      },
     
    };
  },
  validations: {
    candidate: {
      firstName: { required },
      lastName: { required },
      categoryId: { required },
      photo: { required },
    },
  },
    computed: {
        ...mapState("notification", [
            "notificationtype",
            "notification_message",
            "notification_show",
        ]),
        ...mapGetters("candidates", ["Candidates", "Spinner"]),
        ...mapGetters("categories", ["Category"]),
    },
    watch: {
        notification_show(newValue) {
            // Do whatever makes sense now
            if (newValue == true) {
                this.closeMode(this.model_id);
                this.showModal = false
                if (this.notificationtype == "success") {
                    this.$toast.success(this.notification_message.msg)
                    this.candidate= {
        firstName: "",
        lastName: "",
        categoryId: "",
        photo: ""
      }
         } else {
                    this.submitted = false;
                    this.$toast.error(this.notification_message.msg);
                }
            }
        }
    },
  methods: {
     ...mapActions({
            FetchCandidate: "candidates/fetchCandidate",
            CreatCandidate: "candidates/creatCandidate",
            FetchCategory: "categories/fetchCategory",
        }),
        previewImage(event) {
      const file = event.target.files[0];
      if (!file) {
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        this.candidate.photo = reader.result;
      };
      reader.readAsDataURL(file);
    },
    /**
     * Modal form submit
     */
    // eslint-disable-next-line no-unused-vars
    handleSubmit() {
      this.submitted = true;
     this.CreatCandidate(this.candidate)
      this.submitted = false;
  },
    closeMode(model_id) {
            this.$nextTick(() => {
                this.$bvModal.hide(model_id);
            });
        }
   
},
created() {
  this.FetchCandidate();
  this.FetchCategory()
    }
}
</script>

<template>
  <Layout>
    <Toasts :show-progress="true" :rtl="true" :max-messages="20" :time-out="3000" :closeable="false" :solid="true"></Toasts>
    <PageHeader :title="title" :items="items" />
    <div class="row">
     <div class="d-flex">
        <button class="btn btn-primary ms-auto mb-2" @click="showModal = true">
          Add Candidate
        </button>
      </div>
    </div>
    <b-modal v-model="showModal" title="Add Candidate" hide-footer>
      <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
        <div class="row">
          <div class="col-12">
            <div class="mb-3">
              <label for="name">First Name</label>
              <input
                id="name"
                v-model="candidate.firstName"
                type="text"
                class="form-control"
                placeholder="Insert name"
              
              />
              <!-- <div
                v-if="submitted && !$v.candidate.firstName.required"
                class="invalid-feedback"
              >
                This value is required.
              </div> -->
            </div>
          </div>
          <div class="col-12">
            <div class="mb-3">
              <label for="name">Last Name</label>
              <input
                id="name"
                v-model="candidate.lastName"
                type="text"
                class="form-control"
                placeholder="Insert designation"
               
              />
              <!-- <div
                v-if="submitted && !$v.candidate.lastName.required"
                class="invalid-feedback"
              >
                This value is required.
              </div> -->
            </div>
          </div>
          <div class="col-12">
            <div class="mb-3">
              <label for="email">Category</label>
              
                       <model-list-select
                         
                          :list="Category ? Category : []"
                          v-model="candidate.categoryId"
                          option-value="id"
                          option-text="name"
                          placeholder="select Category"
                        >
                        </model-list-select>
              <!-- <div
                v-if="submitted && !$v.candidate.categoryId.required"
                class="invalid-feedback"
              >
                This value is required.
              </div> -->
            </div>
          </div>
             <div class="col-12">
            <div class="mb-3">
              <label for="email">Photo</label>
                     <input  class="form-control" type="file" @change="previewImage">
                     <img v-if="candidate.photo" :src="candidate.photo" alt="Preview">
              <!-- <div
                v-if="submitted && !$v.candidate.photo.required"
                class="invalid-feedback"
              >
                This value is required.
              </div> -->
            </div>
          </div>
         
        </div>
        <div class="text-end mt-3">
          <b-button variant="light" @click="showModal = false">Close</b-button>
          <b-button type="submit" variant="success" class="ms-1"
            >Create candidate</b-button
          >
        </div>
      </form>
    </b-modal>
    <div class="row">
      <div
        v-for="candidate in Candidates"
        :key="candidate.id"
        class="col-xl-3 col-sm-6"
      >
        <div class="card text-center">
          <div class="card-body">
            <div v-if="candidate.photo=='default.png'" class="avatar-sm mx-auto mb-4">
              <span
                class="avatar-title rounded-circle bg-soft bg-primary text-primary font-size-16"
                >{{ candidate.firstName.charAt(0) }}</span
              >
            </div>
            <div v-if="candidate.photo!='default.png'" class="mb-4">
              <img
                class="rounded-circle avatar-sm"
                :src="`${candidate.photo}`"
                alt
              />
            </div>
            <h5 class="font-size-15 mb-1">
              <a href="javascript: void(0);" class="text-dark">{{
              candidate.firstName+' '+candidate.lastName
              }}</a>
            </h5>
            <p class="text-muted">{{candidate.Category.name}}</p>

            <div>
              <a
                href="javascript: void(0);"
                class="btn btn-primary font-size-11 m-1"
                >Profile</a
              >
             
            </div>
          </div>
          <div class="card-footer bg-transparent border-top">
           
          </div>
        </div>
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
    <div class="row" v-show="!Candidates">
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