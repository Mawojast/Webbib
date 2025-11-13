<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import FolderTileLayout from '@/layouts/explorer/folder/FolderTileLayout.vue';
import { type BreadcrumbItem, SharedData, FolderLink, Folder, ChildFolder, AncestorFolder } from '@/types';
import { Head, Link, usePage, useForm, router } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import InputError from '@/components/InputError.vue';
import { Input } from '@/components/ui/input';
import { Plus, EllipsisVertical, ChevronLeft } from 'lucide-vue-next';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';

import { watch, ref, computed } from 'vue';
import explorer from '@/routes/explorer';



const data = defineProps<{
    folder: Folder;
    childFolders: ChildFolder[];
    links: FolderLink[];
    ancestorFolders: AncestorFolder[];
    previousFolderId?: number;
}>();
const page = usePage<SharedData>();

const title = data.folder.name+' - Webbib';

const sidebarFolders = computed(() => page.props.auth.sidebarFolders);

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Explorer", href: "/explorer" },
  ...data.ancestorFolders.map((ancestor) => ({
    title: ancestor.name,
    href: "/explorer/folder/"+ancestor.id,
  })),
  { title: data.folder.name, href: "/explorer/folder/"+data.folder.id }
]

// Create Topic
const createForm = useForm({ name: '',});
const isCreateFormDialogOpen = ref(false);
const createTopicSubmit = () => {
    createForm.post(explorer.folder.store({ folder: data.folder.id }).url, {
        preserveScroll: true,
        onSuccess: () => {
            isCreateFormDialogOpen.value = false;
            createForm.reset();
        }
    });
};
watch(isCreateFormDialogOpen, (newValue) => {
  if (!newValue) {
    createForm.reset();
    createForm.clearErrors();
  }
});



// Create new Link
const createLinkForm = useForm({
  url: '',
  title: '',
  folder_id: data.folder.id,
});

const isCreateLinkDialogOpen = ref(false);

const submitLink = () => {
  createLinkForm.post(explorer.links.store().url, {
    preserveScroll: true,
    onSuccess: () => {
      isCreateLinkDialogOpen.value = false;
      createLinkForm.reset();
    },
  });
};

watch(isCreateLinkDialogOpen, (newValue) => {
  if (!newValue) {
    createLinkForm.reset();
    createLinkForm.clearErrors();
  }
});

// Edit Link
const editLinkForm = useForm({
  url: '',
  title: '',
  folder_id: data.folder.id,
});

const isEditLinkDialogOpen = ref(false);
const editingLinkId = ref(0);
function openEditLinkDialog(url: string, title: string, id: number){
    editLinkForm.url = url;
    editLinkForm.title = title;
    editingLinkId.value = id;
    isEditLinkDialogOpen.value = true;
}
const submitEditLink = () => {
    editLinkForm.put(explorer.links.update({link: editingLinkId.value}).url, {
    preserveScroll: true,
    onSuccess: () => {
      isEditLinkDialogOpen.value = false;
      editingLinkId.value = 0;
      editLinkForm.reset();
    },
  });
};

watch(isEditLinkDialogOpen, (newValue) => {
    if (!newValue) {
        editLinkForm.reset();
        editLinkForm.clearErrors();
        editingLinkId.value = 0;
    }
});

// delete link
const deleteLinkForm = useForm({});
const deleteLink = (id: number) => {
    deleteLinkForm.delete(explorer.links.destroy({ link: id }).url, {
        preserveScroll: true,
    });
};
</script>

<template>
<Head :title="title" />
<AppLayout :breadcrumbs="breadcrumbs">
    <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div class="flex justify-between items-center w-full">
            <div>
                <Link :href="explorer.index(folder.id)" v-if="!previousFolderId">
                    <Button class="rounded-sm bg-neutral-100 dark:bg-neutral-800 dark:text-gray-200 text-gray-700 transition-colors">
                        <ChevronLeft />
                    </Button>
                </Link>
                <Link :href="explorer.folder.index(previousFolderId)" v-if="previousFolderId">
                    <Button class="rounded-sm bg-neutral-100 dark:bg-neutral-800 dark:text-gray-200 text-gray-700 transition-colors">
                        <ChevronLeft />
                    </Button>
                </Link>
            </div>

            <div class="flex">
                <div class="pl-3">
                    <Button @click="isCreateFormDialogOpen = true" class="rounded-sm bg-neutral-100 dark:bg-neutral-800 dark:text-gray-200 text-gray-700 transition-colors">
                        <Plus />Topic
                    </Button>
                </div>
                <div class="pl-3">
                    <Button @click="isCreateLinkDialogOpen = true" class="rounded-sm bg-neutral-100 dark:bg-neutral-800 dark:text-gray-200 text-gray-700 transition-colors">
                        <Plus />Link
                    </Button>
                </div>
            </div>
        </div>
        <h1 class="text-2xl font-bold">{{ data.folder.name }}</h1>
        <!-- Create Topic Dialog -->
        <Dialog v-model:open="isCreateFormDialogOpen">
            <DialogContent  class="sm:max-w-md animate-in fade-in-90 zoom-in-80 duration-200">
                <form @submit.prevent="createTopicSubmit" class="space-y-6">
                <DialogHeader>
                    <DialogTitle>Add Topic</DialogTitle>
                    <DialogDescription>
                        <div class="grid gap-2">
                            <Input id="name" class="mt-1 block w-full" v-model="createForm.name" required placeholder="Name" />
                            <InputError class="mt-2" :message="createForm.errors.name" />
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                <div class="flex items-center gap-4">
                    <Button :disabled="createForm.processing">Save</Button>
                    <Transition
                        enter-active-class="transition ease-in-out"
                        enter-from-class="opacity-0"
                        leave-active-class="transition ease-in-out"
                        leave-to-class="opacity-0"
                    >
                    <p v-show="createForm.recentlySuccessful" class="text-sm text-neutral-600">Saved.</p>
                    </Transition>
                </div>
                </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>

        <!-- Create Link Dialog -->
        <Dialog v-model:open="isCreateLinkDialogOpen">
            <DialogContent class="sm:max-w-md animate-in fade-in-90 zoom-in-80 duration-200">
            <form @submit.prevent="submitLink" class="space-y-6">
                <DialogHeader>
                    <DialogTitle>Add Link</DialogTitle>
                    <DialogDescription>
                    <div class="grid gap-2">
                        <Input id="url" v-model="createLinkForm.url" required placeholder="URL" />
                        <InputError :message="createLinkForm.errors.url" />
                        <Input id="title" v-model="createLinkForm.title" placeholder="Title" />
                        <InputError :message="createLinkForm.errors.title" />
                    </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <div class="flex items-center gap-4">
                        <Button :disabled="createLinkForm.processing">Save</Button>
                    </div>
                </DialogFooter>
            </form>
            </DialogContent>
        </Dialog>

        <!-- Edit Link Dialog -->
        <Dialog v-model:open="isEditLinkDialogOpen">
            <DialogContent class="sm:max-w-md animate-in fade-in-90 zoom-in-80 duration-200">
                <form @submit.prevent="submitEditLink" class="space-y-6">
                    <DialogHeader>
                        <DialogTitle>Edit Link</DialogTitle>
                        <DialogDescription>
                            <div class="grid gap-2">
                                <Input id="url" v-model="editLinkForm.url" required placeholder="URL" />
                                <InputError :message="editLinkForm.errors.url" />
                                <Input id="title" v-model="editLinkForm.title" placeholder="Title" />
                                <InputError :message="editLinkForm.errors.title" />
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <div class="flex items-center gap-4">
                            <Button :disabled="editLinkForm.processing">Save</Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
        <FolderTileLayout :folders="childFolders" :sidebarFolders="sidebarFolders" />

        <div class="mt-8">
            <h2 class="text-lg font-semibold mb-4"></h2>
            <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5" v-if="data.links.length">
                <li v-for="link in data.links" :key="link.id">
                    <article class="max-w-sm rounded overflow-hidden shadow-lg relative p-4"><!--border dark:border-neutral-700-->
                        <a :href="link.url" target="_blank" class="font-medium">
                        <div class="flex items-center justify-center h-24">
                            <img
                                class="max-h-24 object-contain"
                                :src="link.image"
                                :alt="folder.name"
                            >
                        </div>
                        <div class="absolute top-3 right-0 z-10">
                            <DropdownMenu>
                                <DropdownMenuTrigger as-child>
                                    <button class="rounded-full hover:bg-muted hover:cursor-pointer">
                                        <EllipsisVertical class="w-4 h-4" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent class="w-40" align="end">
                                    <DropdownMenuItem as-child @click="openEditLinkDialog(link.url, link.title, link.id)">
                                        <span>Edit</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem @click="deleteLink(link.id)" class="text-red-500">
                                        <span>Delete</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                            <div class="items-start gap-4">
                                <div class="overflow-hidden">
                                    <div class="w-full">
                                        <h3 class="py-2 text-center">{{ link.title }}</h3>
                                    </div>
                                    <p class="text-sm text-muted-foreground truncate">{{ link.url }}</p>
                                </div>
                            </div>
                        </a>
                    </article>
                </li>
            </ul>
        </div>
    </div>
</AppLayout>
</template>
