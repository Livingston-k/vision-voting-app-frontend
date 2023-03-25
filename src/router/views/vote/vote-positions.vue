<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import {
    mapGetters,
    mapActions
} from "vuex";

/**
 * Projects-position component
 */
export default {
    page: {
        title: "Vote Positions",
        meta: [{
            name: "description",
            content: appConfig.description,
        }, ],
    },
    components: {
        Layout,
        PageHeader,
    },
    data() {
        return {
            title: "Vote Positions",
            items: [{
                text: "Vote Positions",
                href: "/",
            }, ],
        };
    },
    computed: {
        ...mapGetters("votes", ["Votecandidates", "Spinner"]),
    },
    methods: {
        ...mapActions({
            FetchsVoteCandidates: "votes/fetchsVoteCandidates"
        }),
    },
    created() {
        this.FetchsVoteCandidates();
    },
};
</script>

<template>
<Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
        <div v-for="position in Votecandidates" :key="position.id" class="col-xl-4 col-sm-6">
            <div class="card">
                <div class="card-body">
                    <div class="media">
                        <div class="avatar-md me-4">
                            <span class="avatar-title rounded-circle bg-light text-danger font-size-16">
                                <img :src="`${require('@/assets/images/companies/img-5.png')}`" alt height="30" />
                            </span>
                        </div>

                        <div class="media-body overflow-hidden">
                            <h5 class="text-truncate font-size-15">
                                <a href="javascript: void(0);" class="text-dark">{{
                                position.name
                                 }}</a>
                            </h5>
                        <p class="text-muted mb-4 text-truncate">{{ position.description }}</p>
                            <div class="avatar-group">
                                <div class="avatar-group-item" v-for="(candidate,index) in position.candidates" :key="index">
                                    <a href="javascript: void(0);" class="d-inline-block">
                                        <img :src="`${require('@/assets/images/users/avatar-7.jpg')}`" class="rounded-circle avatar-xs" alt />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="px-4 py-3 border-top">
                    <ul class="list-inline mb-0">
                        <li class="list-inline-item me-3">
                            <router-link :to="{
                            name: 'Polling',
                            params: {
                              id: position.id
                            },
                          }">
                                <button class="btn btn-primary btn-sm">
                                    Vote Now <span class="mdi mdi-ballot"></span>
                                </button>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

</Layout>
</template>
