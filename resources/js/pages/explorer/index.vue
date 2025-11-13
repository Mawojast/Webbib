<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import ExplorerLayout from '@/layouts/explorer/ExplorerLayout.vue';
import ExplorerTileLayout from '@/layouts/explorer/ExplorerTileLayout.vue';
import { type BreadcrumbItem, SharedData, Folder } from '@/types';
import { Head, usePage, useForm} from '@inertiajs/vue3';
import explorer from "@/routes/explorer"

import { Button } from '@/components/ui/button';
import InputError from '@/components/InputError.vue';
import { Input } from '@/components/ui/input';

import { EllipsisVertical, Plus } from 'lucide-vue-next';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'

import { ref, computed } from 'vue';

const data = defineProps<{
    folders: Folder[]
}>();

const page = usePage<SharedData>();

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Explorer',
        href: '/explorer',
    },
];

const sidebarFolders = computed(() => page.props.auth.sidebarFolders);

const createForm = useForm({ name: '' });
const isCreateFormDialogOpen = ref(false);
const submit = () => {
    createForm.post(explorer.store().url, {
        preserveScroll: true,
        onSuccess: () => {
            isCreateFormDialogOpen.value = false;
            createForm.reset();
        },
    });
};
</script>

<template>
<Head title="Explorer - Webbib" />
<AppLayout :breadcrumbs="breadcrumbs">
    <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
    <div class="flex w-full rounded-sm">
        <Button
            @click="isCreateFormDialogOpen = true"
            class="ml-auto px-4 py-2 rounded-sm bg-neutral-100 dark:bg-neutral-800 dark:text-gray-200 text-gray-700 transition-colors"
        >
            <Plus />
        </Button>
    </div>

    <ExplorerLayout>
        <!-- Topic Dialog -->
        <Dialog v-model:open="isCreateFormDialogOpen">
            <DialogContent class="sm:max-w-md animate-in fade-in-90 zoom-in-80 duration-200">
                <form @submit.prevent="submit" class="space-y-6">
                    <DialogHeader>
                        <DialogTitle>Add Topic Tree</DialogTitle>
                        <DialogDescription>
                            <div class="grid gap-2">
                                <Input id="name" v-model="createForm.name" required placeholder="Name" />
                                <InputError :message="createForm.errors.name" />
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <div class="flex items-center gap-4">
                            <Button :disabled="createForm.processing">Save</Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
        <!-- Dashboard placeholder -->
        <ul class="flex flex-wrap gap-x-8 gap-y-4" v-if="!data.folders.length">
            <li>
                <div class="w-40 rounded-sm bg-gradient-to-b from-[#e9e9e9] to-[#eeebeb] shadow-sm dark:from-[#272525] dark:to-[#272727]">
                    <div class="border-b-2 border-background flex items-center justify-end py-1">
                        <EllipsisVertical class="w-4 h-4 flex items-center justify-center text-neutral-400"/>
                    </div>
                    <a @click="isCreateFormDialogOpen = true" class="cursor-pointer">
                    <div class="flex items-center justify-center border min-h-20 px-2 text-center break-all select-none">
                        <Plus class="text-neutral-400" />
                    </div>
                    </a>
                </div>
            </li>
        </ul>

        <ExplorerTileLayout :sidebarFolders :folders="folders" v-if="data.folders.length"/>
    </ExplorerLayout>
</div>
</AppLayout>
</template>
