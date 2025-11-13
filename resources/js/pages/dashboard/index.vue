<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem, Dashboard, User } from '@/types';
import { Head, useForm, Link, router } from '@inertiajs/vue3';
import { provide, ref, watch } from 'vue';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-vue-next';
import { store, create } from "@/routes/dashboard"
import dashboard from "@/routes/dashboard"
import DashboardTileLayout from '@/layouts/dashboard/DashboardTileLayout.vue';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];
const data = defineProps<{
    dashboards: Dashboard[];
    user: User;
    mustVerifyEmail: boolean;
    status?: string;
}>();

const order = ref([...data.dashboards])

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

    <AppLayout :breadcrumbs="breadcrumbs">
        <!-- <div v-if="mustVerifyEmail && !user.email_verified_at">
            <div class="space-y-4 rounded-lg border border-green-100 bg-green-50 p-4 dark:border-green-200/10 dark:bg-green-700/10">
                <p class="text-sm text-muted-foreground">
                    Your email address is unverified.
                    <Link
                        :href="route('verification.send')"
                        method="post"
                        as="button"
                        class="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:!decoration-current dark:decoration-neutral-500"
                    >
                        Click here to resend the verification email.
                    </Link>
                </p>
            </div>
            <div v-if="status === 'verification-link-sent'" class="mt-2 text-sm font-medium text-green-600">
                A new verification link has been sent to your email address.
            </div>
        </div> -->
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div class="flex w-full rounded-sm">
                <div
                v-if="data.dashboards.length > 1"
                class="relative rounded-sm p-[1px]"
                :class="positionMode ? 'animate-dashboard-border bg-gradient-to-r from-stone-900 via-stone-500 to-stone-200 bg-[length:200%_200%]' : ''"
                >
                    <!-- Position Button -->
                    <Button
                        @click="switchPositionMode"
                        class="w-full rounded-sm px-4 py-2 font-medium transition-colors
               bg-neutral-100 text-gray-700 dark:bg-neutral-800 dark:text-gray-200"
                    >
                        Position
                    </Button>
                </div>

                <!-- Create Button -->
                <Button
                    @click="goToRouteCreateDashboard"
                    class="ml-auto px-4 py-2 rounded-sm bg-neutral-100 dark:bg-neutral-800 dark:text-gray-200 text-gray-700 transition-colors"
                >
                    <Plus />
                </Button>
            </div>

            <!-- Dashboard placeholder -->
             <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" v-if="!data.dashboards.length">
                <li class="relative p-4 rounded-md bg-gradient-to-b from-[#e9e9e9] to-[#eeebeb] shadow-sm dark:from-[#272525] dark:to-[#272727] select-none" >
                    <a :href="create.url()" target="_blank" class="font-medium">
                    <div class="flex items-start gap-4">
                        <div class="w-full overflow-hidden place-items-center">
                            <div class="space-y-1 min-h-16  break-all gird">
                                <div class="place-items-center">
                                    <div class="w-10 h-10  border place-content-center place-items-center rounded border-neutral-400">
                                        <Plus class="text-neutral-400" />
                                    </div>

                                </div>
                                <div class="py-1 min-h-8">
                                    <span class="text-neutral-400">Website</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    </a>
                </li>
            </ul>

            <!-- Dashbard tile layout -->
            <DashboardTileLayout :dashboards="order" :positionMode="positionMode" v-if="data.dashboards.length"/>
        </div>
    </AppLayout>
</template>
