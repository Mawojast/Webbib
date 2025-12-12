<script setup lang="ts">
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { BreadcrumbItemType } from '@/types';
import HeaderLinkForm from './HeaderLinkForm.vue';
import { inject } from 'vue';
// import { Tag  } from 'lucide-vue-next';

const props = withDefaults(
    defineProps<{
        breadcrumbs?: BreadcrumbItemType[];
    }>(),
    {
        breadcrumbs: () => [],
    },
);

const appSidebarHeader = inject('appSidebarHeader', {
    showHeaderLinkForm: null,
    lastUsedTags: []
});

</script>

<template>
    <header
    class="flex min-h-16 shrink-0 items-center gap-2 border-b border-sidebar-border/70 px-4
           transition-[width,height] ease-linear"
    >
        <div class="flex items-center gap-2 w-full">
            <SidebarTrigger class="-ml-1" />
            <template v-if="breadcrumbs && breadcrumbs.length > 0">
                <Breadcrumbs :breadcrumbs="breadcrumbs" />
            </template>
            <div class="  w-full py-3" v-if="appSidebarHeader.showHeaderLinkForm">
            <HeaderLinkForm :lastUsedTags="appSidebarHeader.lastUsedTags" />
            </div>
        </div>
    </header>
</template>
