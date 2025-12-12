<script setup lang="ts">
const props = defineProps<{
    name?: string
}>();
</script>
<template>
    <span
        class="px-2 py-1 rounded bg-gray-200 dark:bg-[hsl(0,0%,28.9%)] font-bold text-black dark:text-white text-xs cursor-pointer uppercase select-none"
    >
        {{ props.name }}
                                            </span>
</template>
