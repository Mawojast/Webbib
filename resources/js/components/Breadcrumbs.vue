<script setup lang="ts">
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Link } from '@inertiajs/vue3';

interface BreadcrumbItemType {
    title: string;
    href?: string;
}

const props = defineProps<{
    breadcrumbs: BreadcrumbItem[];
    exceptFirst?: boolean;
}>();
</script>

<template>
    <Breadcrumb class="hidden lg:block dark:text-gray-200 text-gray-700">
        <BreadcrumbList>
            <template v-for="(item, index) in breadcrumbs" :key="index">
                <template v-if="!(exceptFirst && index === 0)">
                    <BreadcrumbItem v-if="!(index === 2 && breadcrumbs.length > 4)">
                        <template v-if="index === breadcrumbs.length - 1">
                            <BreadcrumbPage><span class="text-[#1b1b18] dark:text-[#EDEDEC]">{{ item.title }}</span></BreadcrumbPage>
                        </template>
                        <template v-else>
                            <BreadcrumbLink as-child>
                                <Link :href="item.href ?? '#'"><span class="text-[#1b1b18] dark:text-[#EDEDEC]">{{ item.title }}</span></Link>
                            </BreadcrumbLink>
                        </template>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator v-if="index !== breadcrumbs.length - 1 && !(index === 1 && breadcrumbs.length > 4)"/>
                    <BreadcrumbSeparator v-if="index === 1 && breadcrumbs.length > 4"/>
                </template>
            </template>
        </BreadcrumbList>
    </Breadcrumb>

    <Breadcrumb class="block lg:hidden dark:text-gray-200 text-gray-700">
        <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink as-child v-if="!exceptFirst">
                        <Link :href="breadcrumbs[0].href ?? '#'"><span class="text-[#1b1b18] dark:text-[#EDEDEC]">{{ breadcrumbs[0].title }}</span></Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator v-if="breadcrumbs.length - 1 > 0 && !exceptFirst" />
                <BreadcrumbSeparator v-if="breadcrumbs.length - 1 > 1 && !exceptFirst"/>
                <BreadcrumbItem v-if="breadcrumbs.length - 1 !== 0">
                    <BreadcrumbPage><span class="text-[#1b1b18] dark:text-[#EDEDEC]">{{ breadcrumbs[breadcrumbs.length - 1].title }}</span></BreadcrumbPage>
                </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>
</template>
