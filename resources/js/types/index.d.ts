import { InertiaLinkProps } from '@inertiajs/vue3';
import type { LucideIcon } from 'lucide-vue-next';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon;
    isActive?: boolean;
}

export type AppPageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
};

export interface User {
    id: number;
    name: string;
    display_name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface Dashboard {
    id: number;
    title?: string;
    image: string;
    created_at: string;
    updated_at: string;
    url: string;
    position: number;
}

export interface Folder {
    id: number;
    name: string;
    public: boolean;
    created_at: string;
    updated_at: string;
    parent_id?: number;
    links: Link[];
}

export interface Link {
    created_at: string;
    folder_id?: number;
    id: number;
    image: string;
    tags: [];
    title?: string;
    updated_at: string;
    url: string;
}
export interface ChildFolder {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface AncestorFolder {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface FolderLink {
    id: number;
    folder_id: number
    title: string;
    url: string;
    image: string;
    created_at: string;
    updated_at: string;
    tags: Tag[];
}

export interface UserfrontLink {
    id?: number;
    title: string;
    url: string;
    image?: string;
    position?: number;
}

export interface Tag {
    name: string;
}

interface CreateLinkForm {
    url: string;
    title: string | null;
    tags: [];
    folder_id?: number;
}

interface EditLinkForm {
    url: string;
    title: string | null;
    tags: [];
    folder_id?: number;
}

export type BreadcrumbItemType = BreadcrumbItem;
