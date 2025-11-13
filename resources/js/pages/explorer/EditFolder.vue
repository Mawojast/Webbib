<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem, Folder } from '@/types';
import { Head, Link, usePage, useForm } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import InputError from '@/components/InputError.vue';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-vue-next';


const data = defineProps<{
    folder: Folder
}>();

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Topic',
        href: '/dashboard',
    },
];

const editForm = useForm({
  name: data.folder.name,
  parent_id: data.folder.parent_id,
});

const submit = () => {
  editForm.put(route('explorer.folder.update', {id: data.folder.id}), {
    preserveScroll: true,
  });
};
</script>

<template>
  <Head title="Edit Folder" />

  <AppLayout :breadcrumbs="breadcrumbs">
    <div class="p-3">
        <div class="flex justify-end">
            <Link :href="route('explorer.folder.index', data.folder.id)">
                <X />
            </Link>
        </div>
    <form @submit.prevent="submit" class="space-y-6">
      <div class="grid gap-2">
        <Label for="name">Folder</Label>
        <Input id="name" class="mt-1 block w-full" v-model="editForm.name" required/>
        <InputError class="mt-2" :message="editForm.errors.name" />
      </div>

      <div class="flex items-center gap-4">
        <Button :disabled="editForm.processing">Save</Button>
        <Transition
          enter-active-class="transition ease-in-out"
          enter-from-class="opacity-0"
          leave-active-class="transition ease-in-out"
          leave-to-class="opacity-0"
        >
          <p v-show="editForm.recentlySuccessful" class="text-sm text-neutral-600">Saved.</p>
        </Transition>
      </div>
    </form>
    </div>
  </AppLayout>
</template>
