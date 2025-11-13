<script setup lang="ts">
import { Head, useForm } from '@inertiajs/vue3';

import HeadingSmall from '@/components/HeadingSmall.vue';
import InputError from '@/components/InputError.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import SettingsLayout from '@/layouts/settings/Layout.vue';
import { ref, computed } from 'vue'
import { type BreadcrumbItem, type User } from '@/types';
import { edit, destroy, update } from "@/routes/profile/image";

interface Props {
    user: User
    profileImage: string
}

const props = defineProps<Props>();
const fileInput = ref(null)
const imagePreview = computed(() => props.profileImage)

const openFileDialog = () => {
    if (fileInput.value){
        fileInput.value.click();
    }
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile Image',
        href: '/settings/profile/image',
    },
];

const form = useForm({
    image: '',
});

function removeProfileImage(event) {
    form.delete(destroy.url(), {
        preserveScroll: true,
    });
}

function handleFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (!file ) return;
    if (file.size > 2097152) {
        form.errors.image = 'Maximum 2MB allowed';
        return;
    }

    form.image = file;

    form.post(update.url(), {
        preserveScroll: true,
        forceFormData: true,
    });
}
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbs">
        <Head title="Profile image - Webbib" />

        <SettingsLayout>
            <div class="flex flex-col space-y-6">
                <HeadingSmall title="Update your profile image" description="" />
                <form @submit.prevent="submit" class="space-y-6">
                    <div>

                            <img @click="openFileDialog" :src="imagePreview" class="w-20 h-20 rounded">

                        <input
                        type="file"
                        ref="fileInput"
                        @change="handleFileChange"
                        class="hidden"
                        accept="image/png, image/jpeg, image/gif, image/svg"

                        />
                        <button type="button" @click="openFileDialog" class="text-green-600">Update</button>
                        <button v-if="props.user.image !== 'default_profile_image.png' "  type="button" @click="removeProfileImage" class="p-4 text-red-600">Remove</button>
                    </div>
                    <InputError class="mt-2" :message="form.errors.image" />

                    <div class="flex items-center gap-4">
                        <Transition
                            enter-active-class="transition ease-in-out"
                            enter-from-class="opacity-0"
                            leave-active-class="transition ease-in-out"
                            leave-to-class="opacity-0"
                        >
                            <p v-show="form.recentlySuccessful" class="text-sm text-neutral-600">Saved.</p>
                        </Transition>
                    </div>
                </form>
            </div>
        </SettingsLayout>
    </AppLayout>
</template>
