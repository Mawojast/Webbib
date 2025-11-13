import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Explorer\ExplorerController::index
* @see app/Http/Controllers/Explorer/ExplorerController.php:22
* @route '/explorer'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/explorer',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Explorer\ExplorerController::index
* @see app/Http/Controllers/Explorer/ExplorerController.php:22
* @route '/explorer'
*/
index.url = (options?: RouteQueryOptions) => {




    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Explorer\ExplorerController::index
* @see app/Http/Controllers/Explorer/ExplorerController.php:22
* @route '/explorer'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Explorer\ExplorerController::index
* @see app/Http/Controllers/Explorer/ExplorerController.php:22
* @route '/explorer'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Explorer\ExplorerController::index
* @see app/Http/Controllers/Explorer/ExplorerController.php:22
* @route '/explorer'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Explorer\ExplorerController::index
* @see app/Http/Controllers/Explorer/ExplorerController.php:22
* @route '/explorer'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Explorer\ExplorerController::index
* @see app/Http/Controllers/Explorer/ExplorerController.php:22
* @route '/explorer'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\Explorer\ExplorerController::edit
* @see app/Http/Controllers/Explorer/ExplorerController.php:33
* @route '/explorer/{folder}/edit'
*/
export const edit = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/explorer/{folder}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Explorer\ExplorerController::edit
* @see app/Http/Controllers/Explorer/ExplorerController.php:33
* @route '/explorer/{folder}/edit'
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
* @see \App\Http\Controllers\Explorer\ExplorerController::edit
* @see app/Http/Controllers/Explorer/ExplorerController.php:33
* @route '/explorer/{folder}/edit'
*/
edit.get = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Explorer\ExplorerController::edit
* @see app/Http/Controllers/Explorer/ExplorerController.php:33
* @route '/explorer/{folder}/edit'
*/
edit.head = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Explorer\ExplorerController::edit
* @see app/Http/Controllers/Explorer/ExplorerController.php:33
* @route '/explorer/{folder}/edit'
*/
const editForm = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Explorer\ExplorerController::edit
* @see app/Http/Controllers/Explorer/ExplorerController.php:33
* @route '/explorer/{folder}/edit'
*/
editForm.get = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Explorer\ExplorerController::edit
* @see app/Http/Controllers/Explorer/ExplorerController.php:33
* @route '/explorer/{folder}/edit'
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
* @see \App\Http\Controllers\Explorer\ExplorerController::store
* @see app/Http/Controllers/Explorer/ExplorerController.php:41
* @route '/explorer'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/explorer',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Explorer\ExplorerController::store
* @see app/Http/Controllers/Explorer/ExplorerController.php:41
* @route '/explorer'
*/
store.url = (options?: RouteQueryOptions) => {




    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Explorer\ExplorerController::store
* @see app/Http/Controllers/Explorer/ExplorerController.php:41
* @route '/explorer'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Explorer\ExplorerController::store
* @see app/Http/Controllers/Explorer/ExplorerController.php:41
* @route '/explorer'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Explorer\ExplorerController::store
* @see app/Http/Controllers/Explorer/ExplorerController.php:41
* @route '/explorer'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Explorer\ExplorerController::destroy
* @see app/Http/Controllers/Explorer/ExplorerController.php:71
* @route '/explorer/{folder}'
*/
export const destroy = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/explorer/{folder}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Explorer\ExplorerController::destroy
* @see app/Http/Controllers/Explorer/ExplorerController.php:71
* @route '/explorer/{folder}'
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
* @see \App\Http\Controllers\Explorer\ExplorerController::destroy
* @see app/Http/Controllers/Explorer/ExplorerController.php:71
* @route '/explorer/{folder}'
*/
destroy.delete = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Explorer\ExplorerController::destroy
* @see app/Http/Controllers/Explorer/ExplorerController.php:71
* @route '/explorer/{folder}'
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
* @see \App\Http\Controllers\Explorer\ExplorerController::destroy
* @see app/Http/Controllers/Explorer/ExplorerController.php:71
* @route '/explorer/{folder}'
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
* @see \App\Http\Controllers\Explorer\ExplorerController::update
* @see app/Http/Controllers/Explorer/ExplorerController.php:54
* @route '/explorer/{folder}'
*/
export const update = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/explorer/{folder}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Explorer\ExplorerController::update
* @see app/Http/Controllers/Explorer/ExplorerController.php:54
* @route '/explorer/{folder}'
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
* @see \App\Http\Controllers\Explorer\ExplorerController::update
* @see app/Http/Controllers/Explorer/ExplorerController.php:54
* @route '/explorer/{folder}'
*/
update.put = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Explorer\ExplorerController::update
* @see app/Http/Controllers/Explorer/ExplorerController.php:54
* @route '/explorer/{folder}'
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
* @see \App\Http\Controllers\Explorer\ExplorerController::update
* @see app/Http/Controllers/Explorer/ExplorerController.php:54
* @route '/explorer/{folder}'
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

/**
* @see \App\Http\Controllers\Explorer\ExplorerController::updatePublic
* @see app/Http/Controllers/Explorer/ExplorerController.php:63
* @route '/explorer/{folder}/public'
*/
export const updatePublic = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePublic.url(args, options),
    method: 'put',
})

updatePublic.definition = {
    methods: ["put"],
    url: '/explorer/{folder}/public',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Explorer\ExplorerController::updatePublic
* @see app/Http/Controllers/Explorer/ExplorerController.php:63
* @route '/explorer/{folder}/public'
*/
updatePublic.url = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return updatePublic.definition.url
            .replace('{folder}', parsedArgs.folder.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Explorer\ExplorerController::updatePublic
* @see app/Http/Controllers/Explorer/ExplorerController.php:63
* @route '/explorer/{folder}/public'
*/
updatePublic.put = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePublic.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Explorer\ExplorerController::updatePublic
* @see app/Http/Controllers/Explorer/ExplorerController.php:63
* @route '/explorer/{folder}/public'
*/
const updatePublicForm = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatePublic.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Explorer\ExplorerController::updatePublic
* @see app/Http/Controllers/Explorer/ExplorerController.php:63
* @route '/explorer/{folder}/public'
*/
updatePublicForm.put = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatePublic.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updatePublic.form = updatePublicForm

const ExplorerController = { index, edit, store, destroy, update, updatePublic }

export default ExplorerController