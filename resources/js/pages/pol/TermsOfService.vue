<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import LightDarkSwitch from '@/components/LightDarkSwitch.vue';
const data = defineProps(['htmlText']);
</script>

<template>
<Head title="Webbib - Privacy Policy" />
<header>
    <div class="flex h-16 items-center gap-8 px-3">
        <a href="/">
            <span class="sr-only">Home</span>
            <img src="/logo/logo_webb.png" class="h-8 rounded">
        </a>
        <div class="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" class="hidden md:block"></nav>
            <div class="flex items-center gap-4">
                <nav class="flex  justify-end gap-6">
                    <Link
                    v-if="$page.props.auth.user"
                    :href="route('dashboard.index')"
                    class="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] dark:text-[#EDEDEC] hover:border-[#1915014a] dark:border-[#3E3E3A]  dark:hover:border-[#62605b]"
                    >
                        Dashboard
                    </Link>
                    <template v-else>
                        <Link
                        :href="route('login')"
                        class="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                        >
                            Log in
                        </Link>
                        <Link
                        :href="route('register')"
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
<main class="pt-8 terms-of-service">
    <div v-html="data.htmlText" class="raw-html terms-of-service-content"></div>
    <div class="h-28"></div>
</main>

</template>
