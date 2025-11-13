<script setup lang="ts">
import { Link, usePage, useForm, Head } from '@inertiajs/vue3';
import { EllipsisVertical } from 'lucide-vue-next';
import { ref, watch, computed } from 'vue';
import draggable from 'vuedraggable'
import LightDarkSwitch from '@/components/LightDarkSwitch.vue';
import { Button } from '@/components/ui/button';
import InputError from '@/components/InputError.vue';
import { Input } from '@/components/ui/input';
import TextLink from '@/components/TextLink.vue';
import { Folder, UserfrontLink } from '@/types';
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
import explorer from '@/routes/explorer';
import userfront from '@/routes/userfront';
import dashboard from '@/routes/dashboard';
import pol from '@/routes/pol';
import { login, register } from '@/routes';


const data = defineProps<{
    username: string;
    displayname: string;
    links: UserfrontLink[];
    folders: Folder[];
    profileImage: string;
}>();

const order = ref([...data.links]);

// changes topic to private
const publicForm = useForm({});
const publicFolder = (id: number) => {
    publicForm.put(explorer.update.public({folder: id}).url, {
    preserveScroll: true,
  });
};

// changes order of links
const changeOrderForm = useForm({dashboardId: '', from: '', to: ''});
const submitChangeOrder = (changedOrder) => {
    const id = changedOrder.moved.element.id;
    changeOrderForm.from = data.links[changedOrder.moved.oldIndex].position;
    changeOrderForm.to = data.links[changedOrder.moved.newIndex].position;

    changeOrderForm.put(userfront.update.position({user: data.username, userFront: id}).url, {
        preserveScroll: true,
        onError: (error) => {

        }
    })
}

// deletes a link
const deleteLinkForm = useForm({});
const deleteLink = (id: number, name: string) => {
    deleteLinkForm.delete(userfront.destroy({user: name, userFront: id }).url, {
        preserveScroll: true,
        onSuccess: () => {
            order.value = order.value.filter(item => item.id !== id);
        },
    });
};

// change position button
const positionMode = ref(false);
function switchPositionMode(){
    positionMode.value = !positionMode.value;
}


// Edit Link
const editLinkForm = useForm({
  url: '',
  title: '',
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
    editLinkForm.put(userfront.update({user: data.username, userFront: editingLinkId.value}).url, {
        preserveScroll: true,
        onSuccess: () => {
            isEditLinkDialogOpen.value = false;
            order.value.map(link => {
                if (link.id === editingLinkId.value) {
                    link.title = editLinkForm.title;
                    link.url = editLinkForm.url;
                }
            })
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

const hasLinks = computed(() => {
    return data.links.length;
});

const hasLinksTopicLayout = "flex pl-3 rounded-sm border border-[#19140035] py-1.5 text-sm leading-normal text-[#1b1b18] dark:text-neutral-200 hover:border-[#1915014a] dark:border-[#3E3E3A] dark:hover:border-[#62605b]";
const hasNoLinksTopcLayout = "relative p-4 w-64 sm:w-96 rounded-xl border dark:border-neutral-700 flex justify-center"
const title = data.displayname+' - Webbib';
const description = data.displayname+' - link collection';
const url = 'https://www.webbib.net/'+data.username;
const selectedLink = '/'+data.username;
const imageType = 'image/'+data.profileImage.split('.').pop();
const image = data.profileImage;
const imageAlt = data.displayname + ' - Profile Image';
</script>

<template>
    <Head :title="title">
            <meta property="og:title" :content="data.displayname">
            <meta name="description" :content="description" />
            <meta property="og:url" :content="url">
            <meta property="og:image:type" :content="imageType">
            <meta property="og:image" :content="image">
            <meta property="og:image:alt" :content="description">
            <meta property="og:description" :content="description">
            <meta name="selected-link" :value="selectedLink" data-turbo-transient="">
    </Head>
    <header>
        <div class="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
            <a href="/">
                <span class="sr-only">Home</span>
                <img src="/logo/logo_webb.png" class="h-8 rounded" alt="webbib logo">
            </a>
            <div class="flex flex-1 items-center justify-end md:justify-between">
                <nav aria-label="Global" class="hidden md:block"></nav>
                <div class="flex items-center gap-4">
                    <LightDarkSwitch :onlyIcons="true" v-if="!$page.props.auth.user" />
                    <nav class="flex  justify-end gap-6">
                        <Link
                        v-if="$page.props.auth.user"
                        :href="dashboard.index()"
                        class="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] dark:text-[#EDEDEC] hover:border-[#1915014a] dark:border-[#3E3E3A]  dark:hover:border-[#62605b]"
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
    <main class="flex items-center min-h-screen flex-col p-6">
        <div class="w-84 sm:w-128 md:w-160 lg:w-240 xl:w-240">
            <div class="px-4 py-2 flex justify-center">
                <img :src="data.profileImage" class="select-none h-24 w-24 rounded-tl-lg rounded-tr-md rounded-br-lg rounded-bl-md" :alt="imageAlt">
            </div>
            <div class="px-4 py-4 pb-5 flex justify-center">
                <h1 class="text-2xl font-bold select-none">{{ data.displayname }}</h1>
            </div>
            <div class="flex justify-end gap-2 mb-4" v-if="$page.props.auth.userpage.can.action && !hasLinks">
                <Link :href="userfront.create({user: data.username})" class="px-5">
                    Add Link
                </Link>
            </div>
            <!-- Public Topics Section-->
            <div class="text-center px-2 py-0 m-2 flex justify-center  overflow-x-auto" :class="hasLinks ? 'max-h-28' : 'pt-8'">
                <section :class="hasLinks ? 'mt-8 grid gap-4 justify-center': ''" v-if="data.folders.length">
                    <ul class="flex flex-wrap gap-x-8 gap-y-4" :class="!hasLinks ? 'justify-center' : ''">
                        <li v-for="folder in folders" :key="folder.id">
                            <Link :href="userfront.folder.index({user: data.username, folder: folder.id})">
                                <div :class="[hasLinks ? hasLinksTopicLayout : hasNoLinksTopcLayout]">
                                    <div class="pr-3">
                                        <span class="select-none">{{ folder.name }}</span>
                                    </div>
                                    <div :class="hasLinks ? 'flex justify-center' : 'absolute top-2 right-2 z-10'">
                                        <DropdownMenu v-if="$page.props.auth.userpage.can.action">
                                            <DropdownMenuTrigger as-child>
                                                <button class="rounded-full ">
                                                    <EllipsisVertical class="w-4 h-4" />
                                                    <!-- <MoreVertical class="w-5 h-5 text-muted-foreground" /> -->
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent class="w-40" align="end">
                                                <DropdownMenuItem @click="publicFolder(folder.id)"  v-if="folder.public">
                                                    Make it Private
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </section>
            </div>
            <!-- Link Section -->
            <div class="text-center px-4 py-2 m-2">
                <div class="flex gap-2 mb-4 select-none" :class="data.links.length > 1 ? 'justify-between': 'justify-end'" v-if="$page.props.auth.userpage.can.action && hasLinks">
                    <div class="relative rounded-sm p-[1px]" :class="positionMode ? 'animate-userfront-border bg-gradient-to-r from-stone-500  to-stone-700 bg-[length:200%_200%]' : ''">
                        <p v-if="data.links.length > 1" @click="switchPositionMode" class="hover:cursor-pointer px-5" >Position</p>
                    </div>
                    <Link :href="userfront.create({user: data.username})" class="px-5">
                        Add Link
                    </Link>
                </div>
                <section class="mt-8 grid gap-4 justify-center" v-if="hasLinks">
                    <template v-if="positionMode && $page.props.auth.userpage.can.action">
                        <!-- vuedraggable: https://github.com/SortableJS/vue.draggable.next -->
                        <draggable
                            v-model="order"
                            item-key="id"
                            @change="submitChangeOrder"
                            handle=".drag-handle"
                            class="grid grid-cols-1 gap-4"
                        >
                            <template #item="{ element }">
                                <div class="drag-handle cursor-grab w-64 sm:w-96 relative gap-4 p-4 rounded-xl border dark:border-neutral-700 flex justify-center"  :class="positionMode ? 'animate-userfront-border bg-gradient-to-r from-stone-500  to-stone-700 bg-[length:200%_200%]' : ''">
                                    <div class="flex items-start gap-4">
                                        <div class="space-y-1 overflow-hidden">
                                            <div class="flex justify-center select-none">
                                                {{ element.title }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </draggable>
                    </template>
                    <template v-if="!positionMode && $page.props.auth.user">
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
                        <template v-for="element in data.links" :key="element.id">
                            <a :href="element.url" target="_blank" class="font-medium block">
                            <div class="relative p-4 w-64 sm:w-96 rounded-xl border dark:border-neutral-700 flex justify-center">
                                <div class="absolute top-2 right-2 z-10" v-if="$page.props.auth.userpage.can.action">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger as-child>
                                            <button class="rounded-full hover:bg-muted">
                                                <EllipsisVertical class="w-4 h-4" />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent class="w-40" align="end">
                                            <DropdownMenuItem @click="openEditLinkDialog(element.url, element.title, element.id)">
                                                <span>Edit</span>
                                                <!-- <Link :href="route('userfront.edit', {user: data.username, userFront: element.id})">Edit</Link> -->
                                            </DropdownMenuItem>
                                            <DropdownMenuItem @click="deleteLink(element.id, data.username)" class="text-red-500">
                                                <span>Remove</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                    <div class="flex items-start gap-4">
                                        <div class="space-y-1 overflow-hidden">
                                            <div class="flex justify-center select-none">
                                                {{ element.title }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </template>
                    </template>
                    <template v-if="!$page.props.auth.user">
                        <template v-for="element in data.links" :key="element.id">
                            <a :href="element.url" target="_blank" class="font-medium block">
                            <div class="w-64 sm:w-96">
                                    <div class="relative m-2 p-4 rounded-xl border border-[#19140035] text-sm leading-normal text-[#1b1b18] dark:text-neutral-200 hover:border-[#1915014a] dark:border-[#3E3E3A] dark:hover:border-[#62605b]">
                                        <div class="flex items-start justify-center">
                                            <div class="space-y-1 overflow-hidden">
                                                    <p class="select-none">{{ element.title }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </template>
                    </template>
                </section>
            </div>
        </div>
        <div v-if="!data.folders.length && !links.length" class="place-items-center pt-7">
            <p>An empty place here</p>
        </div>
    </main>
    <footer class="text-xs w-full flex justify-end pr-2">
        <TextLink :href="pol.privacypolicy()" class="no-underline">Privacy Policy</TextLink>
        <TextLink :href="pol.imprint()" class="no-underline pl-2">Imprint</TextLink>
    </footer>
</template>
