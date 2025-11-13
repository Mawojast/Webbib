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
import userfront from '@/routes/userfront';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];
const data = defineProps<{
    name: string;
}>();

const createForm = useForm({ url: '' , title: ''});
const submit = () => {
    createForm.post(userfront.store({user: data.name}).url, {
        preserveScroll: true,
    });
};

</script>

<template>
    <Head title="Add User Link" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="p-3">
            <div class="flex justify-end">
                <Link :href="userfront.index({user: data.name})">
                    <X />
                </Link>
            </div>
                <form @submit.prevent="submit" class="space-y-6">
                    <div class="grid gap-2">
                        <Label>Url</Label>
                        <Input id="url" v-model="createForm.url" required placeholder="Url" />
                        <InputError :message="createForm.errors.url" />
                        <Label>Title</Label>
                        <Input id="title" v-model="createForm.title" required placeholder="Title" />
                        <InputError :message="createForm.errors.title" />
                    </div>
                    <div class="flex items-center gap-4">
                        <Button :disabled="createForm.processing">Save</Button>
                    </div>
                </form>
        </div>
    </AppLayout>
</template>
