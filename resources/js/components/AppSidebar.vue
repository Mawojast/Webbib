<script setup lang="ts">
import NavMain from '@/components/NavMain.vue';
import NavTopic from '@/components/NavTopic.vue';
import NavUser from '@/components/NavUser.vue';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import userfront from '@/routes/userfront';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/vue3';
import { Monitor, Folder, LayoutGrid, CircleUserRound, Link as LinkIcon } from 'lucide-vue-next';
import AppLogo from './AppLogo.vue';
import { computed, ref } from "vue"


const page = usePage<SharedData>();
const name = ref(page.props.auth.user?.name);
const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: Monitor,
    },
    {
        title: 'Frontpage',
        href: '/'+name.value,
        icon: CircleUserRound
    },
    {
        title: 'Links',
        href: '/link',
        icon: LinkIcon,
    },
    {
        title: 'Explorer',
        href: '/explorer',
        icon: Folder,
    },
];

interface Folder {
    id: number;
    name: string;
    public: number;
    user_id: number;
    created_at: string;
    updated_at?: string;
}

const topicNavItems = computed<NavItem[]>(() =>
    page.props.auth.sidebarFolders.map(folder => ({
        id: folder.id,
        public: folder.public,
        title: folder.name,
        href: `/explorer/folder/${folder.id}`,
        icon: LayoutGrid,
    }))
);

// const footerNavItems: NavItem[] = [
//     {
//         title: '',
//         href: '',
//         icon: undefined,
//     },
// ];
</script>

<template>
    <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" as-child>
                        <Link :href="userfront.index({user: page.props.auth.user.name})">
                            <AppLogo />
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
            <NavMain :items="mainNavItems" />
            <NavTopic v-if="topicNavItems.length" :items="topicNavItems" />
        </SidebarContent>

        <SidebarFooter>
            <NavUser />
        </SidebarFooter>
    </Sidebar>
    <slot />
</template>
