<script setup lang="ts">
import AppLogoIcon from '@/components/AppLogoIcon.vue';
import { Link, usePage, useForm } from '@inertiajs/vue3';
import { Plus, EllipsisVertical } from 'lucide-vue-next';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from '@/components/ui/alert-dialog'
import { ref } from 'vue';

const page = usePage();
const name = page.props.name;
const quote = page.props.quote;

defineProps(['folders']);

const deleteId = ref<number | null>(null);
const confirmDelete = (id: number) => deleteId.value = id;
const proceedDelete = () => {
  if (deleteId.value !== null) {
    deleteFolder(deleteId.value);
    deleteId.value = null;
  }
};

const deleteForm = useForm({});
const deleteFolder = (id: number) => {
    deleteForm.delete(route('explorer.destroy', {folder: id}), {
    preserveScroll: true,
  });
};

const DeDate = (date: string): string => new Date(date).toLocaleDateString('de-DE');

</script>

<template>
    <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Name</TableHead>
                <TableHead class="hidden sm:table-cell">created</TableHead>
                <TableHead>Delete</TableHead>
                <TableHead>Rename</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-for="folder in folders" :key="folder.id">
                <TableCell>
                    <Link :href="route('explorer.folder.index', folder.id)">{{ folder.name }}</Link>
                </TableCell>
                <TableCell class="hidden sm:table-cell">
                    {{ DeDate(folder.created_at) }}
                </TableCell>
                <TableCell>
                    <AlertDialog>
                        <AlertDialogTrigger as-child>
                            <button @click="confirmDelete(folder.id)">Delete</button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Ordner löschen?</AlertDialogTitle>
                            </AlertDialogHeader>
                            <div class="text-sm text-muted-foreground">
                                Dieser Vorgang kann nicht rückgängig gemacht werden.
                            </div>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction @click="proceedDelete">Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </TableCell>
                <TableCell>
                    <Link :href="route('explorer.edit', folder.id)">Rename</Link>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
</template>
