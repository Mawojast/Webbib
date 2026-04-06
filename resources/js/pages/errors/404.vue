<script setup lang="ts">
import { Head, usePage } from '@inertiajs/vue3';
import { home } from '@/routes';
const page = usePage();
const paths = [
    '/welcome',
    '/register',
    '/login',
]

const imageSrc = (paths.some( path => path === page.url))
    ? '/logo/logo_webb_1.png'
    : '/logo/logo_webb.png'
</script>

<template>
    <Head title="404 - Site not found"/>
    <div class="min-h-screen flex flex-col">
        <header>
            <div class="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
                <a class="block text-teal-600 dark:text-teal-300" :href="home().url">
                    <span class="sr-only">Home</span>
                    <img :src="imageSrc" class="h-8 rounded">
                </a>
            </div>
        </header>
        <main class="flex flex-col flex-1 items-center justify-center p-6">
            <a :href="home().url">
                <img :src="imageSrc" class="rounded h-28">
            </a>
            <h1 class="text-6xl font-bold text-red-500 pt-10">Site Not Found</h1>
            <a :href="home().url" class="pt-6 text-blue-600 text-2xl">Home</a>
        </main>
    </div>
</template>
