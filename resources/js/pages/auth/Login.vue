<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import TextLink from '@/components/TextLink.vue';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthBase from '@/layouts/AuthLayout.vue';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/vue3';
import axios from 'axios';
import { ref } from 'vue';
import pol from '@/routes/pol';

defineProps<{
    status?: string;
    canResetPassword: boolean;
    message?: string;
    retry_after?: number;
    canRegister: boolean;
}>();

const errorMessage = ref<string | null>(null);
const showError = ref(false);
const isLocked = ref(false);

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            const data = JSON.parse(error.response.data);
            const statusCode = error.response.status;
            const msg = data.message || 'An error occurred'; // <== nicht errorMessage

            if (statusCode === 429) {
                 // JSON ist schon geparst, kein JSON.parse nötig
                errorMessage.value = data.message || msg;
                showError.value = true;
                isLocked.value = true;

                const retryAfter = (data.retry_after ?? 5) * 1000;
                setTimeout(() => {
                    showError.value = false;
                    errorMessage.value = null;
                    isLocked.value = false;
                }, retryAfter);
            }
            // Optionally, return a rejected promise to ensure `.catch` is triggered in individual requests
            return Promise.reject(error);
        }
    }
);
</script>

<template>
    <AuthBase class="gradient text-neutral-200">
        <Head title="Sign in - Webbib">
            <meta name="description" content="Save links and create collections where you can organize websites into topics." />
            <meta property="og:title" content="Webbib · Organize your link collections">
            <meta property="og:url" content="https://www.webbib.net/login">
            <meta property="og:image" content="https://www.webbib.net/hero-next-next.png">
            <meta property="og:image:alt" content="Save links and create collections where you can organize websites into topics.">
            <meta property="og:description" content="Save links and create collections where you can organize websites into topics.">
            <meta name="user-login" content="">
            <meta name="selected-link" value="/login" data-turbo-transient="">
        </Head>
        <div
            v-if="status"
            class="mb-4 text-center text-sm font-medium text-green-600"
        >
            {{ status }}
        </div>

        <Form
            v-bind="store.form()"
            :reset-on-success="['password']"
            v-slot="{ errors, processing }"
            class="flex flex-col gap-6"
        >
            <div class="grid gap-6">
                <div class="grid gap-2">
                    <Label for="email">Email or Username</Label>
                    <Input
                        id="identifier"
                        type="text"
                        name="username"
                        required
                        autofocus
                        :tabindex="1"
                        placeholder="Email or Username"
                    />
                    <InputError :message="errors.username" />
                </div>

                <div class="grid gap-2">
                    <div class="flex items-center justify-between">
                        <Label for="password">Password</Label>
                        <TextLink
                            v-if="canResetPassword"
                            :href="request()"
                            class="text-sm"
                            :tabindex="5"
                        >
                            Forgot password?
                        </TextLink>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        required
                        :tabindex="2"
                        autocomplete="current-password"
                        placeholder="Password"
                    />
                    <InputError :message="errors.password" />
                </div>

                <div class="flex items-center justify-between">
                    <Label for="remember" class="flex items-center space-x-3">
                        <Checkbox id="remember" name="remember" :tabindex="3" />
                        <span>Remember me</span>
                    </Label>
                </div>

                <template v-if="isLocked">
                    <transition name="fade">
                        <div
                            v-if="showError"
                            class="mb-4 rounded-md bg-red-100 p-3 text-center text-sm font-medium text-red-600"
                        >
                            {{ errorMessage }}
                        </div>
                    </transition>
                </template>
                <template v-else>
                    <Button
                    type="submit"
                    class="mt-4 w-full"
                    :tabindex="4"
                    :disabled="processing"
                    data-test="login-button"
                >
                    <Spinner v-if="processing" />
                    Log in
                </Button>
                </template>
            </div>

            <div
                class="text-center text-sm text-muted-foreground"
                v-if="canRegister"
            >
                Don't have an account?
                <TextLink :href="register()" :tabindex="5">Sign up</TextLink>
            </div>
        </Form>
        <div class="text-xs w-full text-center">
            <TextLink :href="pol.privacypolicy()" class="no-underline">Privacy Policy</TextLink>
            <TextLink :href="pol.imprint()" class="no-underline pl-2">Imprint</TextLink>
        </div>
    </AuthBase>
</template>
