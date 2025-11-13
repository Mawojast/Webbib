<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem, Folder } from '@/types';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import InputError from '@/components/InputError.vue';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-vue-next';
import explorer from '@/routes/explorer';

const data = defineProps<{
    folder: Folder;
}>();

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Edit Topic',
    href: '/dashboard',
  },
];

const editForm = useForm({
  name: data.folder.name,
});

const submit = () => {
  editForm.put(explorer.update({folder: data.folder.id}).url, {
    preserveScroll: true,
  });
};
</script>

<template>
  <Head title="Edit Topic" />

  <AppLayout :breadcrumbs="breadcrumbs">
    <div class="p-3">
        <div class="flex justify-end">
            <Link :href="explorer.index()">
                <X />
            </Link>
        </div>
        <form @submit.prevent="submit" class="space-y-6">
            <div>
                <Label for="name">Topic:</Label>
                <Input id="name" class="mt-1 block w-full" v-model="editForm.name" required/>
                <InputError class="mt-2" :message="editForm.errors.name" />
            </div>

            <div class="flex justify-end items-center gap-4">
                <Button :disabled="editForm.processing" class="bg-neutral-800 dark:bg-neutral-100 rounded-sm">Save</Button>
            </div>
        </form>
    </div>
  </AppLayout>
</template>
