<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem, SharedData, Dashboard } from '@/types';
import { Head, Link, usePage, useForm } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import InputError from '@/components/InputError.vue';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-vue-next';
import dashboard from "@/routes/dashboard"

import { ref } from 'vue';

const data = defineProps<{
    dashboard: Dashboard
}>();

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Edit Dashboard Link',
    href: '/dashboard',
  },
];

const editDashboardForm = useForm({
  url: data.dashboard.url,
  title: data.dashboard.title,
});

const submit = () => {
  editDashboardForm.put(dashboard.update({dashboard: data.dashboard.id}).url, {
    preserveScroll: true,
  });
};
</script>

<template>
<Head title="Edit Dashboard Link" />

<AppLayout :breadcrumbs="breadcrumbs">
    <div class="p-3">
        <div class="flex justify-end">
            <Link :href="dashboard.index()">
                <X />
            </Link>
        </div>
        <form @submit.prevent="submit" class="space-y-6">
            <div class="grid gap-5 py-4">
                <div>
                <Label for="url">URL:</Label>
                <Input id="url" class="mt-1 block w-full" v-model="editDashboardForm.url" required/>
                <InputError :message="editDashboardForm.errors.url" />
                </div>
                <div>
                <Label for="title">Title:</Label>
                <Input id="title" v-model="editDashboardForm.title" placeholder="Title" />
                <InputError :message="editDashboardForm.errors.title" />
                </div>
            </div>

            <div class="flex justify-end items-center gap-4">
                <Button :disabled="editDashboardForm.processing" class="bg-neutral-800 dark:bg-neutral-100 rounded-sm">Save</Button>
            </div>
        </form>
    </div>
</AppLayout>
</template>
