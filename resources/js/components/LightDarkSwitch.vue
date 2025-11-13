<script setup lang="ts">
import { useAppearance } from '@/composables/useAppearance';
import { Moon, Sun } from 'lucide-vue-next';
import { computed, ref } from 'vue';

interface Props {
    class?: string;
    onlyIcons?: boolean;
}

const { class: containerClass = '', onlyIcons } = defineProps<Props>();

const { appearance, updateAppearance } = useAppearance();

const tabs = [
    { value: 'light', Icon: Sun, label: 'Light' },
    { value: 'dark', Icon: Moon, label: 'Dark' },
] as const;

</script>

<template>
    <div :class="['inline-flex gap-1 rounded-lg ', containerClass]">

        <template v-for="{ value, Icon, label } in tabs" :key="value">
            <button
            v-if="value !== appearance"
            @click="updateAppearance(value)"
            :class="[
                'flex items-center rounded-md px-3.5 py-1.5 transition-colors ',
                appearance === value
                    ? 'bg-white shadow-sm dark:bg-neutral-700 dark:text-neutral-100'
                    : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
            ]"
            >
                <component :is="Icon" class="-ml-1 h-4 w-4"/>
                <span class="ml-1.5 text-sm" v-if="!onlyIcons">{{ label }}</span>
            </button>
        </template>

    </div>
</template>
