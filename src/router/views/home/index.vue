<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import Stat from "@/components/widgets/stat";
import appConfig from "@/app.config";
import Visitors from "./visitors";
import Activity from "./activity";
import {
    mapGetters,
    mapActions,
    mapState
} from "vuex";

export default {
    page: {
        title: "Admin Dashboard",
        meta: [{
            name: "description",
            content: appConfig.description
        }],
    },
    components: {
        Layout,
        PageHeader,
        Visitors,
        Activity,
        Stat
    },
    data() {
        return {
            title: "Admin Dashboard",
            items: [{
                    text: "Dashboard",
                    href: "/home",
                },

            ],
        };
    },
    computed: {
        ...mapState("notification", [
            "notificationtype",
            "notification_message",
            "notification_show",
        ]),
        ...mapGetters("dashboard", ["Cards", "Spinner"]),

    },
    methods: {
        ...mapActions({
            FetchDashboardCards: "dashboard/fetchDashboardCards",
        }),
    },
    created() {
        this.FetchDashboardCards();
    },
};
</script>

<template>
<Layout>
    <PageHeader :title="title" :items="items" />
    <div>
        <div class="row">
            <div class="col-xl-12">
                <div class="row">
                    <Stat icon="bxs-book-bookmark" title="Users" :value="Cards.user" />
                    <Stat icon="bxs-note" title="Positions" :value="Cards.positions" />
                    <Stat icon="bxs-message-square-dots" title="Candidates" :value="Cards.candidates" />
                    <Stat icon="bxs-message-square-dots" title="Votes" :value="Cards.votes" />
                </div>
                <!-- end row -->
            </div>
            <!-- end col -->
            <div class="row">
                <div class="col-md-7">
                    <div class="card">
                        <Visitors />
                    </div>
                </div>
                <div class="col-md-5">
                    <div class="card">
                        <Activity />
                    </div>
                </div>
            </div>
        </div>
        <!-- end col -->
    </div>
    <!-- end row -->
</Layout>
</template>
