<script setup lang="ts">
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage, useForm } from '@inertiajs/vue3';
import { EllipsisVertical } from 'lucide-vue-next';
import { useSidebar } from '@/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { destroy } from '@/routes/sidebar/folder';
import  explorer  from '@/routes/explorer';

defineProps<{
    items: NavItem[];
}>();

const page = usePage<SharedData>();


const { state } = useSidebar()


const removeFromSidebarForm = useForm({});
function removeFromSidebar(id: number){
    removeFromSidebarForm.delete(destroy({folder: id}).url, {
        preserveScroll: true,
    });
}

const publicForm = useForm({});
const publicFolder = (id: number) => {
    publicForm.put(explorer.update.public({folder: id}).url, {
    preserveScroll: true,
  });
}
</script>

<template>
    <SidebarGroup class="px-2 py-0">
        <SidebarGroupLabel>Topics</SidebarGroupLabel>
        <SidebarMenu>
            <SidebarMenuItem v-for="item in items" :key="item.title" class="flex">
                <SidebarMenuButton
                    as-child :is-active="item.href === page.url"
                    :tooltip="item.title"
                >
                    <Link :href="item.href">
                        <span>{{ item.title }}</span>
                    </Link>
                </SidebarMenuButton>
                <DropdownMenu v-if="state === 'expanded'">
            <DropdownMenuTrigger as-child>
                <button class="rounded-full hover:bg-muted">
                   <EllipsisVertical class="w-4 h-4" />
                <!-- <MoreVertical class="w-5 h-5 text-muted-foreground" /> -->
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-40" align="end">
                <DropdownMenuItem @click="removeFromSidebar(item.id)">
                    Remove From Sidebar
                </DropdownMenuItem>
                <DropdownMenuItem as-child >
                <Link :href="explorer.edit(item.id)">
                    Edit
                </Link>
                </DropdownMenuItem>

                <DropdownMenuItem @click="publicFolder(item.id)"  v-if="!item.public">
                    Make it Public
                </DropdownMenuItem>
                <DropdownMenuItem @click="publicFolder(item.id)"  v-if="item.public">
                Make it Private
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    </SidebarGroup>
</template>
