<script setup lang="ts">

import { useForm, Link } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import { EllipsisVertical, Plus } from 'lucide-vue-next';
import draggable from 'vuedraggable'

import dashboard from "@/routes/dashboard"



import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from '@/components/ui/dropdown-menu';


const data = defineProps<{
    dashboards: array
    positionMode: boolean
}>();

const order = ref([...data.dashboards])

const emit = defineEmits<{
  (e: 'update:positionMode', value: boolean): void
}>()

const positionMode = computed({
  get: () => data.positionMode,
  set: (newVal: boolean) => emit('update:positionMode', newVal),
})


const changeOrderForm = useForm({dashboardId: '', from: '', to: ''});
const submitChangeOrder = (changedOrder: any) => {
    const id = changedOrder.moved.element.id;
    changeOrderForm.from = data.dashboards[changedOrder.moved.oldIndex].position;
    changeOrderForm.to = data.dashboards[changedOrder.moved.newIndex].position;

    changeOrderForm.put(dashboard.update.position({dashboard: id}).url, {
        preserveScroll: true,
        onError: (error) => {
        }
    })
}

const deleteLinkForm = useForm({});
const deleteLink = (id: number) => {
    deleteLinkForm.delete(dashboard.destroy({dashboard: id}).url, {
        preserveScroll: true,
        onSuccess: () => {
            order.value = order.value.filter(item => item.id !== id);
        },
    });
};

</script>

<template>
    <section class="mt-8">
        <!-- vuedraggable: https://github.com/SortableJS/vue.draggable.next -->
        <!-- Position mode is active -->


        <template v-if="positionMode">
        <draggable
        v-model="order"
        item-key="id"
        @change="submitChangeOrder"
        handle=".drag-handle"
        class="grid gap-4 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
            <template #item="{ element }">
                <div
                class="relative rounded-md p-[1px]"
                :class="positionMode
                ? 'animate-border bg-gradient-to-r from-stone-900 via-stone-500 to-stone-200 bg-[length:200%_200%]'
                : 'dark:border-neutral-700 border border-gray-200'"
                >
                    <!-- Eigentliche Card -->
                    <div class="p-4 rounded-sm bg-white dark:bg-neutral-900 cursor-grab drag-handle">
                        <div class="flex items-start gap-4">
                            <div class="w-full overflow-hidden place-items-center">
                                <div class="space-y-1 min-h-16  break-all gird">
                                    <div class="place-items-center">

                                        <img
                                            v-if="element.image"
                                            :src="element.image"
                                            class="w-10 h-10 mt-1"
                                            :alt="`Icon for ${element.title}`"
                                        />
                                    </div>
                                    <div class="py-1 min-h-8">
                                        <span v-if="element.title">{{ element.title }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </draggable>
        </template>
        <!-- Position mode is inactive -->
        <template v-else>
            <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" v-if="data.dashboards.length">
                <li
                    v-for="link in order"
                    :key="link.id"
                    class="relative p-4 rounded-md border dark:border-neutral-700 select-none"
                >
                    <div class="absolute top-2 right-2 z-10">
                        <DropdownMenu>
                            <DropdownMenuTrigger as-child>
                                <button class="rounded-full hover:bg-muted">
                                    <EllipsisVertical class="w-4 h-4" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent class="w-40" align="end">
                                <DropdownMenuItem as-child>
                                    <Link :href="dashboard.edit({dashboard: link.id})">Edit</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem @click="deleteLink(link.id)" class="text-red-500">
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <a :href="link.url" target="_blank" class="font-medium">
                    <div class="flex items-start gap-4">

                        <div class="w-full overflow-hidden place-items-center">
                            <div class="space-y-1 min-h-16  break-all gird">
                                <div class="place-items-center">
                                    <img
                                        v-if="link.image"
                                        :src="link.image"
                                        class="w-10 h-10 mt-1"
                                        :alt="`Icon for ${link.title}`"
                                    />
                                </div>
                                <div class="py-1 min-h-8">
                                    <span v-if="link.title">{{ link.title }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    </a>
                </li>
            </ul>
        </template>
    </section>
</template>

