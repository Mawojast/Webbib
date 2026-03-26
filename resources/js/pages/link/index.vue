<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem, SharedData, Tag, Link as UserLink } from '@/types';
import { EditLinkForm, CreateLinkForm } from '@/types';
import { Head, Link, usePage, useForm } from '@inertiajs/vue3';
import InputError from '@/components/InputError.vue';
import Vue3TagsInput from 'vue3-tags-input'
import { Plus, EllipsisVertical, ChevronLeft } from 'lucide-vue-next';
import { destroy } from "@/routes/links"
import { update, store } from "@/routes/link"
import explorer from '@/routes/explorer';
import folder from '@/routes/explorer/folder';
import TagBadge from '@/components/Tag.vue'
import type {
    ColumnDef,
    ColumnFiltersState,
    ExpandedState,
    SortingState,
    VisibilityState,
} from '@tanstack/vue-table'
import {
    FlexRender,
    getCoreRowModel,
    getExpandedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useVueTable,
} from '@tanstack/vue-table'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { createReusableTemplate } from '@vueuse/core'
import { ArrowUpDown, ChevronDown } from 'lucide-vue-next'
import { h } from 'vue'
import { valueUpdater }  from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { watch, ref, computed } from 'vue';

const props = defineProps<{
    lastUsedTags: Tag[];
    links: UserLink[];
}>();

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Link',
        href: '/link',
    },
];

const title = 'Links - Webbib';
const links = computed(() => props.links);
const lastUsedTags = ref([...props.lastUsedTags]);

// removes https://wwww from url
function normalizeDisplayUrl(url: string): string {
    return url
        .trim()
        .replace(/^https?:\/\//i, "")
        .replace(/^www\./i, "");
}

// ensures date format d-m-Y
function formatDateDMY(dateString: string): string {
    const date = new Date(dateString)

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const dd = day < 10 ? '0' + day : day;
    const mm = month < 10 ? '0' + month : month;

    return dd+"-"+mm+"-"+year;
}


/**
 * Handle link table
 */
const columns: ColumnDef<UserLink>[] = [
// {
//     id: 'select',
//     header: ({ table }) => h(Checkbox, {
//         'modelValue': table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
//         'onUpdate:modelValue': value => table.toggleAllPageRowsSelected(!!value),
//         'ariaLabel': 'Select all',
//     }),
//     cell: ({ row }) => h(Checkbox, {
//         'modelValue': row.getIsSelected(),
//         'onUpdate:modelValue': value => row.toggleSelected(!!value),
//         'ariaLabel': 'Select row',
//     }),
//     enableSorting: false,
//     enableHiding: false,
// },
{
    accessorKey: 'settings',
    accessorFn: row => row.id,
    header: 'Delete',
    cell: ({ row }) => row.original.id,
    enableHiding: false
},
{
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => h('span', { class: 'capitalize ' }, row.getValue('title')),
    enableHiding: false
},
{
    accessorKey: 'link',
    header: 'Link',
    accessorFn: row => ({
        link: {
            created_at: row.created_at,
            folder_id: row.folder_id,
            id: row.id,
            tags: row.tags,
            title: row.title,
            url: row.url,
        }
    }),
    cell: ({ row }) => {
        return h('span', {}, row.getValue('folder'))
    },
    enableHiding: false
},
{
    accessorKey: 'url',
    header: ({ column }) => {
        return h(Button, {
            variant: 'ghost',
            onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        }, () => ['Url', h(ArrowUpDown, {})])
    },
    cell: ({ row }) => h('span', { class: '' }, row.getValue('url')),
},
{
    accessorKey: 'folder',
    header: 'Folder',
    accessorFn: row => ({
        display: row.folder_name,
        id: row.folder_id
    }),
    cell: ({ row }) => {
        return h('span', {}, row.getValue('folder'))
    },
},
{
    accessorKey: 'tags',
    header: ({ column }) => {
        return h(Button, {
            variant: 'ghost',
            onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        }, () => ['Tags', h(ArrowUpDown, {})])
    },
    cell: ({ row }) => {
        const tags = row.original.tags || [];
        const tagString = tags.map(tag => tag.name).join(', ');
        return h('span', { class: 'capitalize' }, tagString || '-');
    },
    filterFn: (row, columnId, filterValue: string) => {
        if (!filterValue || !filterValue.trim()) return true;

        const tags = row.original.tags || [];
        const tagNames = tags.map(tag => tag.name.toLowerCase());
        const searchTerms = filterValue
            .toLowerCase()
            .trim()
            .split(/\s+/)
            .filter(term => term.length > 0);

        return searchTerms.every(searchTerm =>
            tagNames.some(tagName => tagName.includes(searchTerm))
        );
    },
},
{
    accessorKey: 'created_at',
    header: ({ column }) => {
        return h(Button, {
            variant: 'ghost',
            onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        }, () => ['Created', h(ArrowUpDown, { })])
    },
    cell: ({ row }) => h('span', { class: 'lowercase' }, formatDateDMY(row.getValue('created_at'))),
},

//   {
//     id: 'actions',
//     enableHiding: false,
//     cell: ({ row }) => {
//       const payment = row.original
//       return h(ReuseTemplate, {
//         payment,
//         onExpand: row.toggleExpanded,
//       })
//     },
//   },
]

const pagination = ref({ pageIndex: 0, pageSize: 50 });
const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})
const expanded = ref<ExpandedState>({})
const table = useVueTable({
  data: computed(() => links.value),
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
  onExpandedChange: updaterOrValue => valueUpdater(updaterOrValue, expanded),
  onPaginationChange: updaterOrValue => valueUpdater(updaterOrValue, pagination),
  state: {
    get sorting() { return sorting.value },
    get columnFilters() { return columnFilters.value },
    get columnVisibility() { return columnVisibility.value },
    get rowSelection() { return rowSelection.value },
    get expanded() { return expanded.value },
    get pagination() { return pagination.value },
  },
})


const selectedIds = computed(() =>
    table.getSelectedRowModel().rows.map(r => r.original.id)
)

const rows = computed(() => {
    const row = table.getRowModel();
    return row.getVisibleCells();
});





/**
 * Search columns
 */
const activeSearchColumn = ref<'title' | 'url' | 'tags'>('title')

const updateFilter = (value: string) => {
    if (activeSearchColumn.value === 'tags') {
        table.getColumn('tags')?.setFilterValue(value);
    } else {
        table.getColumn(activeSearchColumn.value)?.setFilterValue(value);
    }
}

// Reset search columns to column title
const resetFilters = () => {
    activeSearchColumn.value = 'title'
    table.getColumn('title')?.setFilterValue('')
    table.getColumn('url')?.setFilterValue('')
    table.getColumn('tags')?.setFilterValue('')
}

// Changing search column
watch(activeSearchColumn, () => {
    table.getColumn('title')?.setFilterValue('')
    table.getColumn('url')?.setFilterValue('')
    table.getColumn('tags')?.setFilterValue('')
})

// Edit Link
const accordionValue = ref<string>('');
const editLinkForm = useForm<EditLinkForm>({
    url: '',
    title: '',
    tags: [],
});

const editingLinkId = ref(0);
const isEditLinkDialogOpen = ref(false);

function openEditLinkDialog(link){
    editLinkForm.url = link.url;
    editLinkForm.title = link.title;
    editLinkForm.tags = link.tags.map(t => t.name);
    editingLinkId.value = link.id;
    editLinkForm.folder_id = link.folder_id;
    isEditLinkDialogOpen.value = true;
}

const submitEditLink = () => {
    editLinkForm.put(update({link: editingLinkId.value}).url, {
        preserveScroll: true,
        onSuccess: () => {
            isEditLinkDialogOpen.value = false;
        },
    });
};

const updateEditLinkTags = (newTags: []) => {
    editLinkForm.tags = newTags;
};

const addEditFormTag = (tag: Tag) => {
    const tagExists = editLinkForm.tags.some(t =>
        t === tag.name
    );
    if (!tagExists) {
        editLinkForm.tags.push(tag.name);
    }
};

watch(isEditLinkDialogOpen, (newValue) => {
    if (!newValue) {
        editLinkForm.reset();
        editLinkForm.clearErrors();
        editingLinkId.value = 0;
        accordionValue.value = '';
        isEditLinkDialogOpen.value = false;
    }
});

// Create Link
const isCreateLinkDialogOpen = ref(false);

const createLinkForm = useForm<CreateLinkForm>({
    url: '',
    title: '',
    tags: [],
});

const submitLink = () => {
    createLinkForm.post(store().url, {
        preserveScroll: true,
        onSuccess: () => {
            isCreateLinkDialogOpen.value = false;
            createLinkForm.reset();
        },
    });
};

const updateCreateLinkTags = (newTags: []) => {
    createLinkForm.tags = newTags;
};

const addCreateFormTag = (tag: Tag) => {

    const tagExists = createLinkForm.tags.some(t =>
        t === tag.name
    );

    if (!tagExists) {
        createLinkForm.tags.push(tag.name);
    }
};

watch(isCreateLinkDialogOpen, (newValue) => {
    if (!newValue) {
        createLinkForm.reset();
        createLinkForm.clearErrors();
        accordionValue.value = '';
    }
});

/**
 * Delete selected links
 */
const deleteSelectedForm = useForm({
  ids: [],
})
const deleteSelectedLinks = () => {
  if (!selectedIds.value.length) return

  if (!confirm('Delete all selected links?')) return

    deleteSelectedForm.ids = selectedIds.value

    deleteSelectedForm.delete(destroy.url(), {
        preserveScroll: true,
        onSuccess: () => {
            table.resetRowSelection()
        },
    })
}

/**
 * Delete one link
 */
const deleteForm = useForm({
    ids: [] as number[],
});

const deleteLink = (id: number) => {
    //if (!confirm("Delete link?")) return;

    deleteForm.ids = [id];
    deleteForm.delete(destroy.url(), {
        preserveScroll: true,
        onSuccess: () => {
        },
    })
};

</script>

<template>
<Head :title="title" />
<AppLayout :breadcrumbs="breadcrumbs">
    <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div class="w-full">
            <div class="flex items-center py-2 justify-between gap-2">
                <!-- Search Input -->
                <Input
                    class="max-w-sm bg-neutral-100 dark:bg-neutral-800"
                    :placeholder="'Search ' + activeSearchColumn.charAt(0).toUpperCase() + activeSearchColumn.slice(1)"
                    :model-value="table.getColumn(activeSearchColumn)?.getFilterValue() as string"
                    @update:model-value="updateFilter"
                />
                <Button @click="isCreateLinkDialogOpen = true" class="rounded-sm bg-neutral-200 dark:bg-neutral-800 dark:text-gray-200 text-gray-700 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-700">
                    <Plus />
                </Button>
                <!-- Create Link Dialog -->
                <Dialog v-model:open="isCreateLinkDialogOpen">
                    <DialogContent class="sm:max-w-md animate-in fade-in-90 zoom-in-80 duration-200">
                    <form @submit.prevent="submitLink" class="space-y-6">
                        <DialogHeader>
                            <DialogTitle class="text-center pb-2">Add Link</DialogTitle>
                            <DialogDescription>
                            <div class="grid gap-2">
                                <Input id="url" v-model="createLinkForm.url" required placeholder="URL" />
                                <InputError :message="createLinkForm.errors.url" />
                                <Input id="title" v-model="createLinkForm.title" placeholder="Title" />
                                <InputError :message="createLinkForm.errors.title" />
                                <vue3-tags-input
                                    placeholder="Input tags"
                                    :tags="createLinkForm.tags"
                                    @on-tags-changed="updateCreateLinkTags"
                                    id="showHeaderLinkForm-tags-input"
                                />
                                <InputError :message="createLinkForm.errors.tags" />
                                <!-- Preview Tags -->
                                <Accordion type="single" collapsible class="w-full" v-model="accordionValue" v-if="props.lastUsedTags.length">
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>Last Tags</AccordionTrigger>
                                        <AccordionContent>
                                            <div class="preview-tags-qs pt-2">
                                                <div class="preview-tags-list-qs flex flex-wrap gap-2">
                                                    <TagBadge
                                                        v-for="previewTag in props.lastUsedTags"
                                                        :key="previewTag"
                                                        @click="addCreateFormTag(previewTag)"
                                                        :name="previewTag.name"
                                                    >
                                                        {{ previewTag.name }}
                                                    </TagBadge>
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <div class="flex items-center gap-4">
                                <Button :disabled="createLinkForm.processing">Save</Button>
                            </div>
                        </DialogFooter>
                    </form>
                    </DialogContent>
                </Dialog>
            </div>
            <div class="flex gap-8 pt-2 flex-wrap">
                <!-- Search by title button -->
                <div>
                    <Button
                        :variant="activeSearchColumn === 'title' ? 'title' : 'outline'"
                        @click="activeSearchColumn = 'title'"
                        class=" h-6.5 rounded-sm"
                    >
                        Title
                    </Button>
                </div>
                <!-- Search by url button -->
                <div>
                    <Button
                        :variant="activeSearchColumn === 'url' ? 'title' : 'outline'"
                        @click="activeSearchColumn = 'url'"
                        class=" h-6.5 rounded-sm"
                    >
                        URL
                    </Button>
                </div>
                <!-- Search by url tags -->
                <div>
                    <Button
                        :variant="activeSearchColumn === 'tags' ? 'title' : 'outline'"
                        @click="activeSearchColumn = 'tags'"
                        class="h-6.5 rounded-sm"
                    >
                        Tags
                    </Button>
                </div>

                <!-- Sort by created_at button-->
                <Button
                    class="bg-neutral-100 dark:bg-neutral-800 dark:text-gray-200 text-gray-700 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-700 p-3 h-6.5 rounded-sm"
                    @click="table.getHeaderGroups()[0].headers[3].column.toggleSorting(table.getHeaderGroups()[0].headers[3].column.getIsSorted() === 'asc')">
                        <ArrowUpDown />
                </Button>
            </div>
            <div class="rounded-md pt-5">
                <div class=" grid gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5">
                    <template v-if="table.getRowModel().rows?.length">
                        <template v-for="row in table.getRowModel().rows" :key="row.id">
                            <!-- Link card elements -->
                            <Card
                                :data-state="row.getIsSelected() ? 'selected' : undefined"
                                class="rounded-md dark:bg-[hsl(0,0%,14.9%)] bg-[hsl(0,0%,95.9%)] gap-0 p-1 shadow-none"
                            >
                                <CardHeader class="h-34 p-0">
                                    <!-- Edit Dropdown -->
                                    <div class="flex rounded w-full justify-end dark:bg-[hsl(0,0%,20.9%)] bg-[hsl(0,0%,77.9%)]">
                                        <DropdownMenu v-if="!isEditLinkDialogOpen">
                                            <DropdownMenuTrigger as-child >
                                                <EllipsisVertical class="w-5 h-6 flex items-center justify-center cursor-pointer text-neutral-200"/>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent class="grid gap-5 font-bold w-40" align="end" >
                                                <DropdownMenuItem  @click="openEditLinkDialog(row.getVisibleCells()[1].row.original)">
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem @click="deleteLink(row.getVisibleCells()[1].row.original.id)" class="text-red-600 pt-">
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <!-- TITLE -->
                                    <CardTitle class="text-lg font-semibold line-clamp-3 text-center">
                                        {{ row.getVisibleCells()[1].row.original.title }}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent class="p-0 m-0">
                                    <!-- URL -->
                                    <div class="h-8">
                                            <div class="line-clamp-1 break-all">
                                                <a :href="row.getVisibleCells()[1].row.original.url" target="_blank" rel="noopener noreferrer" class="text-sm">
                                                    {{ normalizeDisplayUrl(row.getVisibleCells()[1].row.original.url) }}
                                                </a>
                                            </div>

                                    </div>
                                    <!-- FOLDER_NAME -->
                                    <div class="h-8">
                                        <div class="text-sm text-neutral-500 h-8">
                                            Folder:
                                            <template v-if="row.getVisibleCells()[4].getValue().display">
                                                <Link :href="folder.index(row.getVisibleCells()[1].row.original.folder_id)">{{ row.getVisibleCells()[4].getValue().display }}</Link>
                                            </template>
                                            <template v-else>
                                                <span>-</span>
                                            </template>
                                        </div>
                                    </div>
                                    <!-- CREATED_AT -->
                                    <div class="h-8">
                                        <div class="flex w-full border bottom-0">
                                            <span class="text-sm text-neutral-500  border">
                                                {{ formatDateDMY(row.getVisibleCells()[1].row.original.created_at) }}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                    <!-- TAGS -->
                                        <div class="flex gap-2 flex-wrap">
                                            <template v-if="row.getVisibleCells()[1].row.original.tags?.length">
                                                <TagBadge
                                                    v-for="tag in row.getVisibleCells()[1].row.original.tags"
                                                    :key="tag.id"
                                                    :name="tag.name"
                                                    class="hover:cursor-auto"
                                                >
                                                    {{ tag.name }}
                                                </TagBadge>
                                            </template>
                                            <template v-else>
                                                <span class="text-neutral-400 text-sm"></span>
                                            </template>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </template>
                    </template>
                    <!-- Edit Link Dialog -->
                    <Dialog v-model:open="isEditLinkDialogOpen">
                        <DialogContent :onOpenAutoFocus="(e) => e.preventDefault()" class="sm:max-w-md animate-in fade-in-90 zoom-in-80 duration-200">
                            <form @submit.prevent="submitEditLink" class="space-y-6">
                                <DialogHeader>
                                    <DialogTitle class="text-center pb-2">Edit Link</DialogTitle>
                                    <DialogDescription>
                                        <div class="grid gap-2">
                                            <Input id="url" v-model="editLinkForm.url" required placeholder="URL" class="" />
                                            <InputError :message="editLinkForm.errors.url" />
                                            <Input id="title" v-model="editLinkForm.title" placeholder="Title" />
                                            <InputError :message="editLinkForm.errors.title" />
                                            <vue3-tags-input placeholder="Tags" :tags="editLinkForm.tags" @on-tags-changed="updateEditLinkTags" id="showHeaderLinkForm-tags-input"/>
                                            <InputError :message="editLinkForm.errors.tags" />
                                            <!-- Preview Tags -->
                                            <Accordion type="single" collapsible class="w-full" v-model="accordionValue" v-if="lastUsedTags.length">
                                                <AccordionItem value="item-1">
                                                    <AccordionTrigger>Last Tags</AccordionTrigger>
                                                    <AccordionContent>
                                                        <div class="preview-tags">
                                                            <div class="preview-tags-list flex flex-wrap gap-2">
                                                                <TagBadge
                                                                    v-for="previewTag in props.lastUsedTags"
                                                                    :key="previewTag"
                                                                    @click="addEditFormTag(previewTag)"
                                                                    :name="previewTag.name"
                                                                >
                                                                    {{ previewTag.name }}
                                                                </TagBadge>
                                                            </div>
                                                        </div>
                                                    </AccordionContent>
                                                </AccordionItem>
                                            </Accordion>
                                        </div>
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <div class="flex items-center gap-4">
                                        <Button :disabled="editLinkForm.processing">Save</Button>
                                    </div>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div class="flex items-center justify-end space-x-2 py-4">
                <div class="space-x-2">
                    <Button
                        v-if="table.getCanPreviousPage()"
                        variant="outline"
                        size="sm"
                        :disabled="!table.getCanPreviousPage()"
                        @click="table.previousPage()"
                    >
                        Previous
                    </Button>
                    <Button
                        v-if="table.getCanNextPage()"
                        variant="outline"
                        size="sm"
                        :disabled="!table.getCanNextPage()"
                        @click="table.nextPage()"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    </div>
</AppLayout>
</template>
