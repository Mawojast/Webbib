import '../css/app.css';

import { createInertiaApp, router } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import type { DefineComponent } from 'vue';
import { createApp, h } from 'vue';
import { initializeTheme } from './composables/useAppearance';

import Toaster from '@/components/ui/toast/Toaster.vue'
import { useToast } from '@/components/ui/toast/use-toast'

const appName = import.meta.env.VITE_APP_NAME;

createInertiaApp({
    title: (title) => `${title}`,
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.vue`,
            import.meta.glob<DefineComponent>('./pages/**/*.vue')
        ),
    setup({ el, App, props, plugin }) {
        const vueApp = createApp({
            render: () =>
                h('div', {}, [
                    h(App, props),
                    h(Toaster),
                ]),
        });

        vueApp.use(plugin);
        vueApp.mount(el);

        const { toast } = useToast();

        router.on('invalid', (event) => {
            event.preventDefault();
            const status = event?.detail?.response?.status ?? null;

            if ([429, 419, 401].includes(status)) {
                return;
            }
            toast({
                title: 'Error',
                description: 'An error has occured',
                variant: 'destructive',
            });
        });
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on page load...
initializeTheme();
