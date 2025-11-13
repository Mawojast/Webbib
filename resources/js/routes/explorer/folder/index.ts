import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Explorer\FolderController::edit
* @see app/Http/Controllers/Explorer/FolderController.php:42
* @route '/explorer/folder/{folder}/edit'
*/
export const edit = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/explorer/folder/{folder}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Explorer\FolderController::edit
* @see app/Http/Controllers/Explorer/FolderController.php:42
* @route '/explorer/folder/{folder}/edit'
*/
edit.url = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{folder}', parsedArgs.folder.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Explorer\FolderController::edit
* @see app/Http/Controllers/Explorer/FolderController.php:42
* @route '/explorer/folder/{folder}/edit'
*/
edit.get = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Explorer\FolderController::edit
* @see app/Http/Controllers/Explorer/FolderController.php:42
* @route '/explorer/folder/{folder}/edit'
*/
edit.head = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Explorer\FolderController::edit
* @see app/Http/Controllers/Explorer/FolderController.php:42
* @route '/explorer/folder/{folder}/edit'
*/
const editForm = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Explorer\FolderController::edit
* @see app/Http/Controllers/Explorer/FolderController.php:42
* @route '/explorer/folder/{folder}/edit'
*/
editForm.get = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Explorer\FolderController::edit
* @see app/Http/Controllers/Explorer/FolderController.php:42
* @route '/explorer/folder/{folder}/edit'
*/
editForm.head = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\Explorer\FolderController::index
* @see app/Http/Controllers/Explorer/FolderController.php:21
* @route '/explorer/folder/{folder}'
*/
export const index = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/explorer/folder/{folder}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Explorer\FolderController::index
* @see app/Http/Controllers/Explorer/FolderController.php:21
* @route '/explorer/folder/{folder}'
*/
index.url = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return index.definition.url
            .replace('{folder}', parsedArgs.folder.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Explorer\FolderController::index
* @see app/Http/Controllers/Explorer/FolderController.php:21
* @route '/explorer/folder/{folder}'
*/
index.get = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Explorer\FolderController::index
* @see app/Http/Controllers/Explorer/FolderController.php:21
* @route '/explorer/folder/{folder}'
*/
index.head = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Explorer\FolderController::index
* @see app/Http/Controllers/Explorer/FolderController.php:21
* @route '/explorer/folder/{folder}'
*/
const indexForm = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Explorer\FolderController::index
* @see app/Http/Controllers/Explorer/FolderController.php:21
* @route '/explorer/folder/{folder}'
*/
indexForm.get = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Explorer\FolderController::index
* @see app/Http/Controllers/Explorer/FolderController.php:21
* @route '/explorer/folder/{folder}'
*/
indexForm.head = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\Explorer\FolderController::store
* @see app/Http/Controllers/Explorer/FolderController.php:51
* @route '/explorer/folder/{folder}'
*/
export const store = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/explorer/folder/{folder}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Explorer\FolderController::store
* @see app/Http/Controllers/Explorer/FolderController.php:51
* @route '/explorer/folder/{folder}'
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
* @see \App\Http\Controllers\Explorer\FolderController::store
* @see app/Http/Controllers/Explorer/FolderController.php:51
* @route '/explorer/folder/{folder}'
*/
store.post = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Explorer\FolderController::store
* @see app/Http/Controllers/Explorer/FolderController.php:51
* @route '/explorer/folder/{folder}'
*/
const storeForm = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Explorer\FolderController::store
* @see app/Http/Controllers/Explorer/FolderController.php:51
* @route '/explorer/folder/{folder}'
*/
storeForm.post = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Explorer\FolderController::destroy
* @see app/Http/Controllers/Explorer/FolderController.php:75
* @route '/explorer/folder/{folder}'
*/
export const destroy = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/explorer/folder/{folder}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Explorer\FolderController::destroy
* @see app/Http/Controllers/Explorer/FolderController.php:75
* @route '/explorer/folder/{folder}'
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
* @see \App\Http\Controllers\Explorer\FolderController::destroy
* @see app/Http/Controllers/Explorer/FolderController.php:75
* @route '/explorer/folder/{folder}'
*/
destroy.delete = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Explorer\FolderController::destroy
* @see app/Http/Controllers/Explorer/FolderController.php:75
* @route '/explorer/folder/{folder}'
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
* @see \App\Http\Controllers\Explorer\FolderController::destroy
* @see app/Http/Controllers/Explorer/FolderController.php:75
* @route '/explorer/folder/{folder}'
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

/**
* @see \App\Http\Controllers\Explorer\FolderController::update
* @see app/Http/Controllers/Explorer/FolderController.php:65
* @route '/explorer/folder/{folder}'
*/
export const update = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/explorer/folder/{folder}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Explorer\FolderController::update
* @see app/Http/Controllers/Explorer/FolderController.php:65
* @route '/explorer/folder/{folder}'
*/
update.url = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{folder}', parsedArgs.folder.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Explorer\FolderController::update
* @see app/Http/Controllers/Explorer/FolderController.php:65
* @route '/explorer/folder/{folder}'
*/
update.put = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Explorer\FolderController::update
* @see app/Http/Controllers/Explorer/FolderController.php:65
* @route '/explorer/folder/{folder}'
*/
const updateForm = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Explorer\FolderController::update
* @see app/Http/Controllers/Explorer/FolderController.php:65
* @route '/explorer/folder/{folder}'
*/
updateForm.put = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm



const folder = {
    edit: Object.assign(edit, edit),
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    destroy: Object.assign(destroy, destroy),
    update: Object.assign(update, update),
}

export default folder