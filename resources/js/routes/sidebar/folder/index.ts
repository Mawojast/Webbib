import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\SidebarController::store
* @see app/Http/Controllers/SidebarController.php:34
* @route '/sidebar/folder/{folder}'
*/
export const store = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/sidebar/folder/{folder}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SidebarController::store
* @see app/Http/Controllers/SidebarController.php:34
* @route '/sidebar/folder/{folder}'
*/
store.url = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{folder}', parsedArgs.folder.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SidebarController::store
* @see app/Http/Controllers/SidebarController.php:34
* @route '/sidebar/folder/{folder}'
*/
store.post = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SidebarController::store
* @see app/Http/Controllers/SidebarController.php:34
* @route '/sidebar/folder/{folder}'
*/
const storeForm = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SidebarController::store
* @see app/Http/Controllers/SidebarController.php:34
* @route '/sidebar/folder/{folder}'
*/
storeForm.post = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\SidebarController::destroy
* @see app/Http/Controllers/SidebarController.php:82
* @route '/sidebar/folder/{folder}'
*/
export const destroy = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/sidebar/folder/{folder}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SidebarController::destroy
* @see app/Http/Controllers/SidebarController.php:82
* @route '/sidebar/folder/{folder}'
*/
destroy.url = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{folder}', parsedArgs.folder.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SidebarController::destroy
* @see app/Http/Controllers/SidebarController.php:82
* @route '/sidebar/folder/{folder}'
*/
destroy.delete = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\SidebarController::destroy
* @see app/Http/Controllers/SidebarController.php:82
* @route '/sidebar/folder/{folder}'
*/
const destroyForm = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SidebarController::destroy
* @see app/Http/Controllers/SidebarController.php:82
* @route '/sidebar/folder/{folder}'
*/
destroyForm.delete = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm



const folder = {
    store: Object.assign(store, store),
    destroy: Object.assign(destroy, destroy),
}

export default folder