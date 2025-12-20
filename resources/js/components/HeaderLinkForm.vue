<script setup lang="ts">
import { ref, watch } from 'vue'
import Vue3TagsInput from 'vue3-tags-input'
import { useForm } from '@inertiajs/vue3'
import { Tag, CreateLinkForm } from '@/types'
import { Button } from '@/components/ui/button';
import InputError from '@/components/InputError.vue';
import { Input } from '@/components/ui/input';
import link from '@/routes/link';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import TagBadge from '@/components/Tag.vue'

const tagsAccordion = ref('')
const listAccordion = ref('')
const data = defineProps<{
    lastUsedTags: Tag[]
}>();

const lastUsedTags = ref<Tag[]>([...data.lastUsedTags]);

// Create new Link
const isCreateLinkDialogOpen = ref(false);

const createLinkForm = useForm<CreateLinkForm>({
  url: '',
  title: '',
  tags: [] as string[],
});

const submitLink = () => {
    createLinkForm.post(link.store().url, {
        preserveScroll: true,
        onSuccess: () => {
            isCreateLinkDialogOpen.value = false;
            tagsAccordion.value = '';

            const newTags: Tag[] = [...createLinkForm.tags]
                .reverse()
                .map(name => ({
                        name,
                    })
                );

            const seen = new Set<string>();

            const merged: Tag[] = [
                ...newTags,
                ...lastUsedTags.value,
            ]
            .filter(tag => {
                if (!tag.name) return false;
                if (seen.has(tag.name)) return false;

                seen.add(tag.name);
                return true;
            })
            .slice(0, 8);

            lastUsedTags.value.splice(0, lastUsedTags.value.length, ...merged);

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
        tagsAccordion.value = '';
    }
});

// Close accordion list if accoridion tags was closed
watch(tagsAccordion, (value) => {
    if (!value) {
        listAccordion.value = '';
        createLinkForm.reset();
    }
})

watch(listAccordion, (value) => {
    if (!value && tagsAccordion.value === 'tags') {
         listAccordion.value = '';
    }
})
</script>

<template>
    <form @submit.prevent="submitLink" class="space-y-6 py-1.5">
                    <div class="flex gap-2">
                        <Accordion type="single" collapsible class="w-full" v-model="tagsAccordion">
                            <AccordionItem value="tags" class="border-0">
                                <div class="flex w-full pb-2">
                                    <div class="grid items-center w-full ">
                                        <Input id="url" v-model="createLinkForm.url" required placeholder=""/>
                                        <InputError :message="createLinkForm.errors.url" />
                                    </div>
                                    <AccordionTrigger class="px-2 h-5">Tags</AccordionTrigger>
                                </div>
                                <AccordionContent>
                                    <vue3-tags-input
                                        placeholder="Tags"
                                        :tags="createLinkForm.tags"
                                        @on-tags-changed="updateCreateLinkTags"
                                        id="showHeaderLinkForm-tags-input"
                                    />
                                    <InputError :message="createLinkForm.errors.tags" />
                                    <Accordion type="single" collapsible class="w-full" default-value="list" v-model="listAccordion">
                                        <AccordionItem value="list" class="border-0">
                                            <AccordionTrigger>last</AccordionTrigger>
                                            <AccordionContent>
                                                <div class="preview-tags-qs pt-2">
                                                    <div class="preview-tags-list-qs flex flex-wrap gap-2">
                                                        <TagBadge
                                                            v-for="previewTag in lastUsedTags"
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
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <div class="flex pl-2">
                            <Button :disabled="createLinkForm.processing" class="rounded-sm bg-neutral-200 dark:bg-neutral-800 dark:text-gray-200 text-gray-700 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-700 shadow-sm">Save</Button>
                        </div>
                    </div>
            </form>
</template>

