<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import LightDarkSwitch from '@/components/LightDarkSwitch.vue';
import { login, register } from '@/routes';
import dashboard from "@/routes/dashboard"
const data = defineProps(['htmlText']);
</script>

<template>
<Head title="Webbib - Privacy Policy">
    <meta name="robots" content="noindex, nofollow">
</Head>
<header>
    <div class="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-3">
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
<main>
    <div class="imprint-content raw-html text-neutral-100">
        <h1>Imprint</h1>

        <h3>Webbib</h3>
        <p>Jan Beck</p>
        <p>c/o Autorenglück #38898</p>
        <p>Albert-Einstein-Str. 47</p>
        <p>02977 Hoyerswerda</p>

        <p>Kontakt</p>
        <p>E-Mail: info@webbib.net</p>
    </div>
</main>

</template>
