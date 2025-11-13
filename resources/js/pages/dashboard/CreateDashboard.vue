<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, Link, router } from '@inertiajs/vue3';
import { computed, ref, watch } from 'vue';
import { Button } from '@/components/ui/button';
import InputError from '@/components/InputError.vue';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-vue-next';
import { store, create } from "@/routes/dashboard"
import dashboard from "@/routes/dashboard"


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const createForm = useForm({ url: '' , title: ''});
const submit = () => {
  createForm.post(store.url(), {
    preserveScroll: true,
  });
};

</script>

<template>
    <Head title="Add Dashboard Link" />

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
                        <Label for="url">Url</Label>
                        <Input id="url" v-model="createForm.url" required placeholder="https://example.com" />
                        <InputError :message="createForm.errors.url" />
                    </div>
                    <div>
                        <Label for="title">Title</Label>
                        <Input id="title" v-model="createForm.title" placeholder="Title" />
                        <InputError :message="createForm.errors.title" />
                    </div>
                </div>
                <div class="flex justify-end items-center gap-4">
                    <Button :disabled="createForm.processing" class="bg-neutral-800 dark:bg-neutral-100 rounded-sm">Save</Button>
                </div>
            </form>
        </div>

    </AppLayout>
</template>
