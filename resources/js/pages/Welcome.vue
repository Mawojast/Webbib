<script setup lang="ts">
import { login, register } from '@/routes';
import dashboard from "@/routes/dashboard"
import { privacypolicy, imprint } from '@/routes/pol';
import { Head, Link } from '@inertiajs/vue3';
import TextLink from '@/components/TextLink.vue';
//import { privacyPolicy } from '@/actions/App/Http/Controllers/PolController';

withDefaults(
    defineProps<{
        canRegister: boolean;
    }>(),
    {
        canRegister: true,
    },
);
</script>

<template>
    <Head title="Organize link collections · Webbib">
        <meta name="description" content="Manage your website collections and create topics with links that can be set to public or kept private." />
        <meta name="selected-link" value="/" data-turbo-transient="">
        <meta property="og:title" content="Webbib · Organize your link collections">
        <meta property="og:url" content="https://www.webbib.net">
        <meta property="og:image:type" content="image/png">
        <meta property="og:image" content="https://www.webbib.net/hero-next-next.png">
        <meta property="og:image:alt" content="Manage your website collections and create topics with links that can be set to public or kept private.">
        <meta property="og:description" content="Manage your website collections and create topics with links that can be set to public or kept private.">
    </Head>
    <header class="not-has-[nav]:hidden  w-full text-sm gradient sticky top-0 border-b-4 border-neutral-100 p-2 z-50">
        <nav class="flex items-center pr-2 ">
            <div class="flex justify-start">
                <img src="/logo/logo_webbib_transparent.png" alt="webbib header logo" class=" h-9 ">
            </div>
            <div class="flex justify-end w-full gap-4">
                <Link
                    v-if="$page.props.auth.user"
                    :href="dashboard.index()"
                    class="bg-white text-gray-800 font-bold rounded  py-2 px-4 shadow-lg"
                >
                    Dashboard
                </Link>
                <template v-else>
                    <Link
                        :href="login()"
                        class=" bg-white text-gray-800 font-bold rounded  py-2 px-4 shadow-lg"
                    >
                        Log in
                    </Link>
                    <Link
                        :href="register()"
                        class=" bg-white text-gray-800 font-bold rounded  py-2 px-4 shadow-lg"
                    >
                        Sign up
                    </Link>
                </template>
            </div>
        </nav>
    </header>
    <div class="flex  min-h-screen flex-col items-center bg-[#FDFDFC]  text-[#1b1b18]  lg:justify-center  leading-normal tracking-normal gradient">
        <div class="w-full md:hidden pt-5">
            <div class="w-full overflow-hidden leading-none rotate-180">
                <svg class="relative block w-full h-12 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    viewBox="0 0 1200 120"
                    fill="currentColor"
                >
                    <path d="M321.39,56.44c58-10.79,114.72-30.13,172-41.86,82.39-16.9,168.19-17.16,250.45.39,75.77,15.83,147.59,47.84,221.46,69.08,118.49,33.66,260.78,39.09,334.7-7.75V0H0V27.35C86.29,68,188.92,68.68,321.39,56.44Z"></path>
                </svg>
            </div>
            <h1 class="w-full my-2 text-5xl font-bold leading-tight text-center bg-white text-gray-800">
                Webbib
            </h1>
            <div class="w-full overflow-hidden leading-none">
                <svg class="wave-top" viewBox="0 0 1439 147" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g transform="translate(-1.000000, -14.000000)" fill-rule="nonzero">
                            <g class="wave" fill="#f8fafc">
                                <path d="M1440,84 C1383.555,64.3 1342.555,51.3 1317,45 C1259.5,30.824 1206.707,25.526 1169,22 C1129.711,18.326 1044.426,18.475 980,22 C954.25,23.409 922.25,26.742 884,32 C845.122,37.787 818.455,42.121 804,45 C776.833,50.41 728.136,61.77 713,65 C660.023,76.309 621.544,87.729 584,94 C517.525,105.104 484.525,106.438 429,108 C379.49,106.484 342.823,104.484 319,102 C278.571,97.783 231.737,88.736 205,84 C154.629,75.076 86.296,57.743 0,32 L0,0 L1440,0 L1440,84 Z"></path>
                            </g>
                            <g transform="translate(1.000000, 15.000000)" fill="#FFFFFF">
                                <g transform="translate(719.500000, 68.500000) rotate(-180.000000) translate(-719.500000, -68.500000) ">
                                    <path d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496" opacity="0.100000001"></path>
                                    <path d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z" opacity="0.100000001"></path>
                                    <path d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z" opacity="0.200000003"></path>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            </div>
        </div>

        <!--Hero-->
        <div class="pt-18 max-w-240">
            <div class="container  mx-auto flex flex-wrap flex-col md:flex-row items-center">
                <!--Left Col-->
                <div class="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
                    <h2 class="my-4 text-5xl font-bold leading-tight w-full lg:mx-0 xs:mx-auto text-neutral-100">
                        Managing Websites
                    </h2>
                    <p class="leading-normal text-2xl mb-8 text-neutral-100 font-medium">
                        Save links, create collections and organize websites into topics.
                    </p>
                    <Link :href="register()" class="lg:mx-0 xs:mx-auto w-full">
                        <button class="bg-white text-gray-800 font-bold rounded my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                            Sign up
                        </button>
                    </Link>
                </div>
                <!--Right Col-->
                <div class="w-full md:w-3/5 py-6 text-center">
                    <img class="w-full ls:w-4/5 z-50" src="hero-next-next.png" alt="Webbib welcome page"/>
                </div>
            </div>
        </div>

        <div class="hidden md:block w-full" >
            <div class="w-full overflow-hidden leading-none rotate-180">
                <svg class="relative block w-full h-12 text-white"
                    xmlns="https://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    viewBox="0 0 1200 120"
                    fill="currentColor"
                >
                    <path d="M321.39,56.44c58-10.79,114.72-30.13,172-41.86,82.39-16.9,168.19-17.16,250.45.39,75.77,15.83,147.59,47.84,221.46,69.08,118.49,33.66,260.78,39.09,334.7-7.75V0H0V27.35C86.29,68,188.92,68.68,321.39,56.44Z"></path>
                </svg>
            </div>
            <h1 class="w-full my-2 text-5xl font-bold leading-tight text-center bg-white text-gray-800">
                Webbib
            </h1>
            <div class="w-full overflow-hidden leading-none">
                <svg class="wave-top" viewBox="0 0 1439 147" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g transform="translate(-1.000000, -14.000000)" fill-rule="nonzero">
                            <g class="wave" fill="#f8fafc">
                                <path d="M1440,84 C1383.555,64.3 1342.555,51.3 1317,45 C1259.5,30.824 1206.707,25.526 1169,22 C1129.711,18.326 1044.426,18.475 980,22 C954.25,23.409 922.25,26.742 884,32 C845.122,37.787 818.455,42.121 804,45 C776.833,50.41 728.136,61.77 713,65 C660.023,76.309 621.544,87.729 584,94 C517.525,105.104 484.525,106.438 429,108 C379.49,106.484 342.823,104.484 319,102 C278.571,97.783 231.737,88.736 205,84 C154.629,75.076 86.296,57.743 0,32 L0,0 L1440,0 L1440,84 Z"></path>
                            </g>
                            <g transform="translate(1.000000, 15.000000)" fill="#FFFFFF">
                                <g transform="translate(719.500000, 68.500000) rotate(-180.000000) translate(-719.500000, -68.500000) ">
                                    <path d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496" opacity="0.100000001"></path>
                                    <path d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z" opacity="0.100000001"></path>
                                    <path d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z" opacity="0.200000003"></path>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            </div>
        </div>

        <section class="border-t-4 border-l-4 border-b-4 border-neutral-100 rounded-tl-lg gradient pt-1 pl-1">
            <div class=" container max-w-5xl mx-auto border-t-4 border-r-4 border-neutral-100 rounded-tr-lg gradient ">
                <div class="flex flex-wrap justify-center items-center">
                    <div class="w-5/6 sm:w-1/2 p-6 pt-20 text-center">
                        <h3 class="text-3xl text-gray-100 font-bold leading-none mb-3 text-center">
                            Save Links
                        </h3>
                        <p class="text-neutral-100 mb-8 text-center font-medium text-2xl">
                            Create a personal dashboard to keep track of your frequently visited websites.
                        </p>
                    </div>
                    <div class="w-full sm:w-1/2 p-6">
                        <img class="" src="/explorerScreenshot0564558-next-next.png" alt="Save links in the dashboard">
                    </div>
                </div>
                <div class="flex flex-wrap flex-col-reverse sm:flex-row">
                    <div class="w-full sm:w-1/2 p-6 ">
                        <img src="undraw_resume-folder_hf4p.svg" alt="Available folder system to create topics">
                    </div>
                    <div class="w-full sm:w-1/2 p-6 flex items-center">
                        <div class="align-middle pt-10">
                            <h3 class="text-3xl text-gray-100 font-bold leading-none mb-3 text-center">
                                Available Folder System
                            </h3>
                            <p class="text-gray-100 mb-8 text-2xl font-medium text-center">
                                Add topic folders to build your link collections. Pin topics to the sidebar to access with one click.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap justify-center items-center">
                    <div class="w-5/6 sm:w-1/2   pt-20 text-center">
                        <h3 class="text-3xl text-gray-100 font-bold leading-none mb-3 text-center">
                            Customize Your User Page
                        </h3>
                        <p class="text-neutral-100 mb-8 text-center font-medium text-2xl">
                            Select your profile picture, then decide which topics to display publicly on your user page or keep private.
                        </p>
                    </div>
                    <div class="w-full sm:w-1/2 ">
                        <img class="" src="userpageScreenshot4532545.png" alt="Costumized user page">
                    </div>
                </div>
            </div>
            <footer class="text-sm w-full text-right lg:hidden border-r-4 border-neutral-100 pr-1">
                <TextLink :href="privacypolicy()" class="text-neutral-900 no-underline">Privacy Policy</TextLink>
                <TextLink :href="imprint()" class="text-neutral-900 no-underline pl-2">Imprint</TextLink>
            </footer>
            <div class=" border-r-4 border-neutral-100 text-sm"></div>
        </section>
        <footer class="text-sm w-full text-right hidden lg:block pr-1">
            <TextLink :href="privacypolicy()" class="text-neutral-300 no-underline">Privacy Policy</TextLink>
            <TextLink :href="imprint()" class="text-neutral-300 no-underline pl-2">Imprint</TextLink>
        </footer>
    </div>
</template>
