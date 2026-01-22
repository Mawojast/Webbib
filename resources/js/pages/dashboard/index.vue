<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem, Dashboard, User, Tag } from '@/types';
import { Head, useForm, Link, router } from '@inertiajs/vue3';
import { provide, ref, watch } from 'vue';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-vue-next';
import { store, create } from "@/routes/dashboard"
import dashboard from "@/routes/dashboard"
import DashboardTileLayout from '@/layouts/dashboard/DashboardTileLayout.vue';

const showHeaderLinkForm = ref(true);
const data = defineProps<{
    dashboards: Dashboard[];
    user: User;
    mustVerifyEmail: boolean;
    status?: string;
    lastUsedTags: Tag[];
}>();

provide('appSidebarHeader', {
    'showHeaderLinkForm': showHeaderLinkForm,
    'lastUsedTags': data.lastUsedTags,
});

const order = ref([...data.dashboards])

// Create dashboard LInk
const createForm = useForm({ url: '' , title: ''});
const isCreateFormDialogOpen = ref(false);
const submit = () => {
    createForm.post(store.url(), {
        preserveScroll: true,
        onSuccess: (page) => {
            isCreateFormDialogOpen.value = false;
            createForm.reset();
        },
    });
};

watch(isCreateFormDialogOpen, (newValue) => {
    if (!newValue) {
        createForm.reset();
        createForm.clearErrors();
    }
});

// Change position of dashboard link
const positionMode = ref(false);
function switchPositionMode(){
    positionMode.value = !positionMode.value;
}

function goToRouteCreateDashboard() {
    router.visit(dashboard.create());
}

</script>

<template>
    <Head title="Dashboard" />

    <AppLayout>
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div class="flex w-full rounded-sm">
                <div
                v-if="data.dashboards.length > 1"
                class="relative rounded-sm"
                :class="positionMode ? 'animate-dashboard-border bg-gradient-to-r from-stone-900 via-stone-500 to-stone-200 bg-[length:200%_200%]' : ''"
                >
                    <!-- Position Button -->
                    <Button
                        @click="switchPositionMode"
                        class="w-full shadow-sm px-4 py-2 font-medium rounded-sm bg-neutral-200 dark:bg-neutral-800 dark:text-gray-200 text-gray-700 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-700"
                    >
                        Position
                    </Button>
                </div>

                <!-- Create Button -->
                <Button
                    @click="goToRouteCreateDashboard"
                    class="shadow-sm ml-auto px-4 py-2 rounded-sm bg-neutral-200 dark:bg-neutral-800 dark:text-gray-200 text-gray-700 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-700"
                >
                    <Plus />
                </Button>
            </div>
            <!-- Dashboard placeholder -->
            <ul class="flex flex-wrap gap-x-8 gap-y-4" v-if="!data.dashboards.length">
                <li>
                    <div class="w-44 rounded-md bg-gradient-to-b from-[#e9e9e9] to-[#eeebeb] shadow-sm dark:from-[#272525] dark:to-[#272727]">
                        <a :href="create.url()" class="cursor-pointer font-medium">
                        <div class="flex flex-col items-center justify-center min-h-20 px-2 text-center break-all select-none p-4">
                            <div class="border border-neutral-400 p-1 rounded">
                                <Plus class="text-neutral-400" />
                            </div>
                            <div class="p-2 min-h-8">
                                <span class="text-neutral-400">Website</span>
                            </div>
                        </div>
                        </a>
                    </div>
                </li>
            </ul>
            <!-- Dashbard tile layout -->
            <DashboardTileLayout :dashboards="order" :positionMode="positionMode" v-if="data.dashboards.length"/>
        </div>
    </AppLayout>
</template>
