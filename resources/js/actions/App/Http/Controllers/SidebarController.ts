import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SidebarController::storeFolder
* @see app/Http/Controllers/SidebarController.php:34
* @route '/sidebar/folder/{folder}'
*/
export const storeFolder = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeFolder.url(args, options),
    method: 'post',
})

storeFolder.definition = {
    methods: ["post"],
    url: '/sidebar/folder/{folder}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SidebarController::storeFolder
* @see app/Http/Controllers/SidebarController.php:34
* @route '/sidebar/folder/{folder}'
*/
storeFolder.url = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { folder: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { folder: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            folder: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        folder: typeof args.folder === 'object'
        ? args.folder.id
        : args.folder,
    }

    return storeFolder.definition.url
            .replace('{folder}', parsedArgs.folder.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SidebarController::storeFolder
* @see app/Http/Controllers/SidebarController.php:34
* @route '/sidebar/folder/{folder}'
*/
storeFolder.post = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeFolder.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SidebarController::storeFolder
* @see app/Http/Controllers/SidebarController.php:34
* @route '/sidebar/folder/{folder}'
*/
const storeFolderForm = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeFolder.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SidebarController::storeFolder
* @see app/Http/Controllers/SidebarController.php:34
* @route '/sidebar/folder/{folder}'
*/
storeFolderForm.post = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeFolder.url(args, options),
    method: 'post',
})

storeFolder.form = storeFolderForm

/**
* @see \App\Http\Controllers\SidebarController::destroyFolder
* @see app/Http/Controllers/SidebarController.php:82
* @route '/sidebar/folder/{folder}'
*/
export const destroyFolder = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyFolder.url(args, options),
    method: 'delete',
})

destroyFolder.definition = {
    methods: ["delete"],
    url: '/sidebar/folder/{folder}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SidebarController::destroyFolder
* @see app/Http/Controllers/SidebarController.php:82
* @route '/sidebar/folder/{folder}'
*/
destroyFolder.url = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { folder: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { folder: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            folder: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        folder: typeof args.folder === 'object'
        ? args.folder.id
        : args.folder,
    }

    return destroyFolder.definition.url
            .replace('{folder}', parsedArgs.folder.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SidebarController::destroyFolder
* @see app/Http/Controllers/SidebarController.php:82
* @route '/sidebar/folder/{folder}'
*/
destroyFolder.delete = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyFolder.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\SidebarController::destroyFolder
* @see app/Http/Controllers/SidebarController.php:82
* @route '/sidebar/folder/{folder}'
*/
const destroyFolderForm = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyFolder.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SidebarController::destroyFolder
* @see app/Http/Controllers/SidebarController.php:82
* @route '/sidebar/folder/{folder}'
*/
destroyFolderForm.delete = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyFolder.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroyFolder.form = destroyFolderForm

const SidebarController = { storeFolder, destroyFolder }

export default SidebarController