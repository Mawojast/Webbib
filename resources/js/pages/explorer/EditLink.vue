<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem, SharedData, FolderLink } from '@/types';
import { Head, Link, usePage, useForm } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import InputError from '@/components/InputError.vue';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-vue-next';
import { index, update } from '@/routes/explorer/link'


const data = defineProps<{
    link: FolderLink
}>();

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard Edit',
    href: '/dashboard',
  },
];

const editLinkForm = useForm({
  url: data.link.url,
  title: data.link.title,
  folder_id: data.link.folder_id,
});

const submit = () => {
  editLinkForm.put(update({link: data.link.id}).url, {
    preserveScroll: true,
  });
};
</script>

<template>
<Head title="Edit Topic Link" />

<AppLayout :breadcrumbs="breadcrumbs">
    <div class="p-3">
        <div class="flex justify-end">
            <Link :href="index({link.folder_id}).url">
                <X />
            </Link>
        </div>
        <form @submit.prevent="submit" class="space-y-6">
            <div class="grid gap-5 py-4">
                <div>
                    <Label for="url">URL:</Label>
                    <Input id="url" class="mt-1 block w-full" v-model="editLinkForm.url" required/>
                    <InputError class="mt-2" :message="editLinkForm.errors.url" />
                </div>
                <div>
                    <Label for="title">Title:</Label>
                    <Input id="title" v-model="editLinkForm.title" required placeholder="Title" />
                    <InputError :message="editLinkForm.errors.title" />
                </div>
            </div>
            <div class="flex justify-end items-center gap-4">
                <Button :disabled="editLinkForm.processing" class="bg-neutral-800 dark:bg-neutral-100 rounded-sm">Save</Button>
            </div>
        </form>
    </div>
</AppLayout>
</template>
