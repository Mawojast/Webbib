<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import TextLink from '@/components/TextLink.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthBase from '@/layouts/AuthLayout.vue';
import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head } from '@inertiajs/vue3';
import pol from '@/routes/pol';
</script>

<template>
    <AuthBase class="gradient">
        <Head title="Sign up - Webbib">
            <meta property="og:title" content="Webbib · Organize your link collections">
            <meta name="description" content="Save links and create collections where you can organize websites in topics." />
            <meta property="og:url" content="https://www.webbib.net/register">
            <meta property="og:image:alt" content="Save links and create collections where you can organize websites in topics.">
            <meta property="og:description" content="Save links and create collections where you can organize websites in topics.">
            <meta name="user-login" content="">
            <meta name="selected-link" value="/register" data-turbo-transient="">
        </Head>

        <Form
            v-bind="store.form()"
            :reset-on-success="['password', 'password_confirmation']"
            v-slot="{ errors, processing }"
            class="flex flex-col gap-6"
        >
            <div class="grid gap-6">
                <div class="grid gap-2">
                    <Label for="name">Name</Label>
                    <Input
                        id="name"
                        type="text"
                        required
                        autofocus
                        :tabindex="1"
                        autocomplete="name"
                        name="name"
                        placeholder="Full name"
                    />
                    <InputError :message="errors.name" />
                </div>

                <div class="grid gap-2">
                    <Label for="email">Email address</Label>
                    <Input
                        id="email"
                        type="email"
                        required
                        :tabindex="2"
                        autocomplete="email"
                        name="email"
                        placeholder="email@example.com"
                    />
                    <InputError :message="errors.email" />
                </div>

                <div class="grid gap-2">
                    <Label for="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        required
                        :tabindex="3"
                        autocomplete="new-password"
                        name="password"
                        placeholder="Password"
                    />
                    <InputError :message="errors.password" />
                </div>

                <div class="grid gap-2">
                    <Label for="password_confirmation">Confirm password</Label>
                    <Input
                        id="password_confirmation"
                        type="password"
                        required
                        :tabindex="4"
                        autocomplete="new-password"
                        name="password_confirmation"
                        placeholder="Confirm password"
                    />
                    <InputError :message="errors.password_confirmation" />
                </div>
                <div class="grid gap-2">
                    <p>By clicking "Create account" you agree to Webbib's <a target="_blank" class="text-orange-200" :href="pol.termsofservice().url">Terms of Service</a> and accept our <a :href="pol.userprivacypolicy().url" target="_blank" class="text-orange-200">Privacy Policy</a>.</p>
                </div>
                <Button
                    type="submit"
                    class="mt-2 w-full"
                    tabindex="5"
                    :disabled="processing"
                    data-test="register-user-button"
                >
                    <Spinner v-if="processing" />
                    Create account
                </Button>
            </div>

            <div class="text-center text-sm text-muted-foreground">
                Already have an account?
                <TextLink
                    :href="login()"
                    class="underline underline-offset-4"
                    :tabindex="6"
                    >Log in</TextLink
                >
            </div>
        </Form>
        <div class="text-xs w-full text-center ">
            <TextLink :href="pol.privacypolicy()" class="no-underline">Privacy Policy</TextLink>
            <TextLink :href="pol.imprint()" class="no-underline pl-2">Imprint</TextLink>
        </div>
    </AuthBase>
</template>
