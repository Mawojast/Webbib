<script setup lang="ts">
import { Link, Head } from '@inertiajs/vue3';
import LightDarkSwitch from '@/components/LightDarkSwitch.vue';
import { login, register } from '@/routes';
import dashboard from '@/routes/dashboard';
import { home } from '@/routes';
</script>

<template>
    <Head title="data.displayname"/>
    <header>
        <div class="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
            <a class="block text-teal-600 dark:text-teal-300" :href="home().url">
                <span class="sr-only">Home</span>
                <img src="/logo/logo_webb.png" class="h-8 rounded">
            </a>
            <div class="flex flex-1 items-center justify-end md:justify-between">
                <nav aria-label="Global" class="hidden md:block"></nav>

                <div class="flex items-center gap-4">
                    <LightDarkSwitch :onlyIcons="true" v-if="!$page.props.auth?.user" />
                    <nav class="flex  justify-end gap-6">
                        <Link
                        v-if="$page.props.auth?.user"
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
<div class="flex flex-col items-center justify-center min-h-screen">
    <a :href="home().url">
        <img src="/logo/logo_webb_1.png" class="h-28">
    </a>
    <h1 class="text-6xl font-bold text-red-500 pt-10">Site Not Found</h1>
    <p class="pt-8 text-lg text-neutral-200">Nothing to do here</p>
    <a :href="home().url" class="pt-6 text-blue-600 text-2xl ">Home</a>
  </div>
    </main>
</template>
