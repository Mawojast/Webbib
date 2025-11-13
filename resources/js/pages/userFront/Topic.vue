<script setup lang="ts">
import { Link, usePage, useForm, Head } from '@inertiajs/vue3';
import { EllipsisVertical, ChevronLeft } from 'lucide-vue-next';
import { ref, watch } from 'vue';
import { type BreadcrumbItem, SharedData, ChildFolder, FolderLink, Folder, AncestorFolder } from '@/types';
import { Button } from '@/components/ui/button';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import LightDarkSwitch from '@/components/LightDarkSwitch.vue';
import InputError from '@/components/InputError.vue';
import { Input } from '@/components/ui/input';
import TextLink from '@/components/TextLink.vue';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { login, register } from '@/routes'
import explorer from '@/routes/explorer';
import dashboard from '@/routes/dashboard';
import userfront from '@/routes/userfront';
import pol from '@/routes/pol';

const data = defineProps<{
    username: string;
    displayname: string;
    links: FolderLink[];
    childFolders: ChildFolder[];
    profileImage: string;
    folder: Folder;
    ancestors: AncestorFolder[];
    previousFolderId?: number;
}>();

// Breadcrumbs assemble
const breadcrumbs: BreadcrumbItem[] = [
  { title: data.username, href: "/"+data.username },
  ...data.ancestors.map((ancestor) => ({
    title: ancestor.name,
    href: "/"+data.username+"/topic/"+ancestor.id,
  })),
  { title: data.folder.name, href: "/"+data.username+"/topic/"+data.folder.id }
]

const page = usePage<SharedData>();

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

// Delete Link
const deleteLinkForm = useForm({});
const deleteLink = (id: number) => {
    deleteLinkForm.delete(explorer.links.destroy({ link: id }).url, {
    preserveScroll: true,
  });
};

const title = data.folder.name+' - '+data.displayname;
</script>

<template>
    <Head :title="title"/>

    <header>
        <div class="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
            <a class="block" href="#">
                <span class="sr-only">Home</span>
                <img src="/logo/logo_webb.png" class="h-8 rounded">
            </a>
            <div class="flex flex-1 items-center justify-end md:justify-between">
                <nav aria-label="Global" class="hidden md:block"></nav>
                <div class="flex items-center gap-4">
                    <LightDarkSwitch :onlyIcons="true" v-if="!$page.props.auth.user" />
                    <nav class="flex  justify-end gap-6">
                        <Link
                            v-if="$page.props.auth.user"
                            :href="dashboard.index()"
                            class="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                        >
                            Dashboard
                        </Link>
                        <template v-else>
                            <Link
                                :href="login()"
                                class="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Log in
                            </Link>
                            <Link
                                :href="register()"
                                class="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Register
                            </Link>
                        </template>
                    </nav>
                </div>
            </div>
        </div>
    </header>

    <main class="flex items-center flex-col p-6 min-h-screen">
        <div class="w-84 sm:w-128 md:w-160 lg:w-240 xl:w-240">
            <div class="flex">
                <Link :href="userfront.folder.index({folder: data.previousFolderId, user: data.username})" v-if="previousFolderId">
                    <Button class="border rounded-sm bg-transparent hover:bg-transparent  dark:bg-trans dark:text-gray-200 text-gray-700 transition-colors">
                        <ChevronLeft />
                    </Button>
                    </Link>
                    <Link :href="userfront.index({user: data.username})" v-if="!previousFolderId">
                        <Button class="border rounded-sm bg-transparent hover:bg-transparent dark:text-gray-200 text-gray-700 transition-colors p-3">
                            <ChevronLeft />
                        </Button>
                </Link>
                <div class="pl-3 place-content-center">
                    <template v-if="breadcrumbs.length > 0">
                        <Breadcrumbs :breadcrumbs="breadcrumbs" :exceptFirst="true"/>
                    </template>
                </div>
            </div>

            <div class="px-4 py-2 m-2 flex justify-center">
                <Link :href="userfront.index({user: data.username})"><h1 class="text-2xl font-bold select-none">{{ data.displayname }}</h1></Link>
            </div>

            <div class="px-4 py-2 pb-5 m-2 flex justify-center">
                <h2 class="text-xl font-bold select-none">{{ data.folder.name }}</h2>
            </div>



            <div class="col-span-12 flex justify-center h-full max-h-28 overflow-auto p-2">
                <section class="" v-if="data.childFolders.length">
                    <ul class="flex flex-wrap gap-x-8 gap-y-4">
                        <li v-for="folder in childFolders" :key="folder.id">
                            <Link :href="userfront.folder.index({user: data.username, folder: folder.id})">
                            <div class="px-5 inline-block rounded-sm border border-[#19140035] py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]">
                                            {{ folder.name }}
                                        </div>
                                    </Link>
                        </li>
                    </ul>
                </section>
            </div>

            <!-- Edit Link Dialog -->
            <Dialog v-model:open="isEditLinkDialogOpen" v-if="page.props.auth.userpage.can.action">
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
            <div class="col-span-12">
                <section class="mt-8 grid justify-center" v-if="data.links.length">
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
                                    <div class="absolute top-3 right-0 z-10" v-if="page.props.auth.userpage.can.action">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger as-child>
                                                <button class="rounded-full hover:bg-muted">
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
                </section>
            </div>
        </div>

        <div v-if="data.childFolders.length && !data.links.length" class="place-items-center pt-7">
            <p>No links available</p>
        </div>

        <div v-if="!data.childFolders.length && !data.links.length" class="place-items-center">
            <p>An empty place here</p>
        </div>
    </main>
    <footer class="text-xs w-full flex justify-end pr-2">
        <TextLink :href="pol.privacypolicy()" class="no-underline">Privacy Policy</TextLink>
        <TextLink :href="pol.imprint()" class="no-underline pl-2">Imprint</TextLink>
    </footer>

</template>
