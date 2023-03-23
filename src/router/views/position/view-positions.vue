<script>
// import axios from "axios";

import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import {
    mapGetters,
    mapActions,
    mapState
} from "vuex";

/**
 * Advanced table component
 */
export default {
    page: {
        title: "Positions",
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
            model_id: "",
            title: "Positions",
            items: [{
                    text: "Home",
                    href: "/",
                },
                {
                    text: "Positions",
                    active: true,
                },
            ],
            data: {
                name: "",
                description: "",
                maxVotes: "",
                priority: 1
            },
            totalRows: 1,
            positionTotalRows: 1,
            currentPage: 1,
            todocurrentPage: 1,
            perPage: 10,
            todoperPage: 10,
            pageOptions: [10, 25, 50, 100],
            todoOptions: [10, 50, 100, 150, 200],
            filter: null,
            todoFilter: null,
            filterOn: [],
            todofilterOn: [],
            sortBy: "age",
            sortDesc: false,
            fields: [{
                    key: "index",
                    sortable: true,
                    label: "S/N",
                },
                {
                    key: "name",
                    sortable: true,
                    label: "NAME",
                },
                {
                    key: "description",
                    sortable: true,
                    label: "DESCRIPTION",
                },
                {
                    key: "maxVotes",
                    sortable: true,
                    label: "MAX VOTES",
                },
                {
                    key: "actions",
                    sortable: true,
                    label: "ACTION",
                }
            ],
        };
    },
    computed: {
        ...mapState("notification", [
            "notificationtype",
            "notification_message",
            "notification_show",
        ]),
        ...mapGetters("position", ["Positions", "Spinner"]),
        /**
         * Total no. of records
         */
        rows() {
            return this.Positions.length;
        },

        /**
         * Todo list of records
         */
        positionsList() {
            return this.Positions.length;
        },
    },
    watch: {
        notification_show(newValue) {
            // Do whatever makes sense now
            if (newValue == true) {
                this.closeMode(this.model_id);
                if (this.notificationtype == "success") {
                    this.$toast.success(this.notification_message.msg)
                    this.data = {
                        name: "",
                        description: "",
                        maxVotes: "",
                        priority: 1
                    }
                } else {
                    this.submitted = false;
                    this.$toast.error(this.notification_message.msg);
                }
            }
        },
    },
    mounted() {
        this.totalRows = this.Positions;
        this.positionTotalRows = this.Positions.length;

    },
    methods: {
        ...mapActions({
            FetchPositions: "position/fetchPositions",
            CreatPositions: "position/creatPositions"
        }),
        savePosition(modalId) {
            this.model_id = modalId;
            this.CreatPositions(this.data)
        },
        editUser(data){
data
        },
        /**
         * Search the table data with search input
         */
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },

        todoFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.positionTotalRows = filteredItems.length;
            this.todocurrentPage = 1;
        },
        closeMode(model_id) {
            this.$nextTick(() => {
                this.$bvModal.hide(model_id);
            });
        },
    },
    created() {
        this.FetchPositions();
    },
};
</script>

<template>
<Layout>
    <Toasts :show-progress="true" :rtl="true" :max-messages="20" :time-out="3000" :closeable="false" :solid="true"></Toasts>
    <PageHeader :title="title" :items="items" />
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <b-button v-b-modal.modal-addposition variant="primary">Create Position</b-button>
                    <b-modal id="modal-addposition" title="Create New Position" title-class="font-18" hide-footer>
                        <b-form>
                            <b-form-group class="mb-3" label="Name" label-for="formrow-firstname-input">
                                <b-form-input id="formrow-firstname-input" type="text" placeholder="Enter Name" v-model="data.name"></b-form-input>
                            </b-form-group>
                            <b-form-group class="mb-3" label="Description" label-for="formrow-firstname-input">
                                <b-form-input id="formrow-firstname-input" type="text" placeholder="Enter Description" v-model="data.description"></b-form-input>
                            </b-form-group>
                            <b-form-group class="mb-3" label="Max Votes" label-for="formrow-firstname-input">
                                <b-form-input id="formrow-firstname-input" placeholder="Enter max votes" type="text" v-model="data.maxVotes"></b-form-input>
                            </b-form-group>

                            <div class="modal-footer">
                                <button type="button" @click="$bvModal.hide('modal-addposition')" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button @click="savePosition('modal-addposition')" type="button" class="btn btn-primary">SAVE <b-spinner v-if="Spinner" small variant="light" type="grow" label="Spinning"></b-spinner> <i v-else class="fa fa-check"></i></button>
                            </div>
                        </b-form>

                    </b-modal>
                    <div class="row mt-4">
                        <div class="col-sm-12 col-md-6">
                            <div id="tickets-table_length" class="dataTables_length">
                                <label class="d-inline-flex align-items-center">
                                    Show&nbsp;
                                    <b-form-select class="form-select form-select-sm" v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp;entries
                                </label>
                            </div>
                        </div>
                        <!-- Search -->
                        <div class="col-sm-12 col-md-6">
                            <div id="tickets-table_filter" class="dataTables_filter text-md-end">
                                <label class="d-inline-flex align-items-center">
                                    Search:
                                    <b-form-input v-model="filter" type="search" placeholder="Search..." class="form-control form-control-sm ms-2"></b-form-input>
                                </label>
                            </div>
                        </div>
                        <!-- End search -->
                    </div>
                    <!-- Table -->
                    <div class="table-responsive mb-0">
                        <b-table class="datatables" :items="Positions" :fields="fields" responsive="sm" :per-page="perPage" :current-page="currentPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered">
                            <template #cell(index)="data">
                                {{ data.index + 1 }}
                            </template>
                            <template #cell(actions)="data">
                                <b-button @click="editUser(data.item)" size="sm" variant="primary" v-b-modal.edit-cashout-modal class="m-2"><i class="fa fa-edit"></i> Edit</b-button>
                                <b-button size="sm" variant="danger" v-b-modal.delete-cashout-modal><i class="fa fa-trash"></i> Delete</b-button>
                            </template>
                        </b-table>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="dataTables_paginate paging_simple_numbers float-end">
                                <ul class="pagination pagination-rounded mb-0">
                                    <!-- pagination -->
                                    <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage"></b-pagination>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</Layout>
</template>
