<script setup lang="ts">
import { Link, useForm } from '@inertiajs/vue3';
import { EllipsisVertical } from 'lucide-vue-next';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import explorer from "@/routes/explorer"
import sidebar from "@/routes/sidebar"

const data =  defineProps(['folders', 'sidebarFolders']);

const isSidebarFolder = (id) => {
   return data.sidebarFolders.some(folder => folder.id == id);
};

const deleteForm = useForm({});
const deleteFolder = (id: number) => {
    deleteForm.delete(explorer.destroy({folder: id}).url, {
    preserveScroll: true,
  });
};

const publicForm = useForm({});
const publicFolder = (id: number) => {
    publicForm.put(explorer.update.public({folder: id}).url, {
    preserveScroll: true,
  });
};

const moveToSidebarForm = useForm({});
const moveToSidebar = (id: number) => {
    moveToSidebarForm.post(sidebar.folder.store({folder: id}).url, {
    preserveScroll: true,
  });
};

</script>

<template>
<!-- Explorer Folder List -->
<ul class="flex flex-wrap gap-x-8 gap-y-4">
    <li v-for="folder in folders" :key="folder.id">
        <div class="w-40 rounded-sm bg-gradient-to-b from-[#e9e9e9] to-[#eeebeb]
            shadow-sm dark:from-[#272525] dark:to-[#272727]">
            <div class="border-b-2 border-background flex items-center justify-end py-1">
                <DropdownMenu>
                    <DropdownMenuTrigger as-child >
                        <EllipsisVertical class="w-4 h-4 flex items-center justify-center cursor-pointer"/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent class="w-40" align="end">
                        <DropdownMenuItem as-child >
                            <Link :href="explorer.edit(folder.id)">Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem @click="moveToSidebar(folder.id)" v-if="!isSidebarFolder(folder.id)">
                            <span>Move to Sidebar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem @click="publicFolder(folder.id)" v-if="!folder.public">
                            <span>Make it Public</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem @click="publicFolder(folder.id)" v-if="folder.public">
                            <span>Make it Private</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem @click="deleteFolder(folder.id)" class="text-red-500">
                            <span>Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <a :href="explorer.folder.index(folder.id).url">
            <div class="flex items-center justify-center border min-h-20 px-2 text-center break-all select-none">
                {{ folder.name }}
            </div>
            </a>
        </div>
    </li>
</ul>
</template>
