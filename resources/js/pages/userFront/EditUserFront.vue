<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem, FolderLink } from '@/types';
import { Head, useForm } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import InputError from '@/components/InputError.vue';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const data = defineProps<{
    link: FolderLink;
    name: string;
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
});

const submit = () => {
  editLinkForm.put(route('userfront.update', {user: data.name, userFront: data.link.id}), {
    preserveScroll: true,
  });
};
</script>

<template>
  <Head title="Edit User Link" />

  <AppLayout :breadcrumbs="breadcrumbs">
    <form @submit.prevent="submit" class="space-y-6">
      <div class="grid gap-2">
        <Label for="url">Link</Label>
        <Input id="url" class="mt-1 block w-full" v-model="editLinkForm.url" required/>
        <InputError class="mt-2" :message="editLinkForm.errors.url" />

        <Input id="title" v-model="editLinkForm.title" required placeholder="Title" />
        <InputError :message="editLinkForm.errors.title" />
      </div>

      <div class="flex items-center gap-4">
        <Button :disabled="editLinkForm.processing">Save</Button>

      </div>
    </form>
  </AppLayout>
</template>
