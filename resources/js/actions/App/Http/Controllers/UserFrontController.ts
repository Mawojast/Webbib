import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\UserFrontController::index
* @see app/Http/Controllers/UserFrontController.php:25
* @route '/{user}'
*/
export const index = (args: { user: string | { name: string } } | [user: string | { name: string } ] | string | { name: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/{user}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserFrontController::index
* @see app/Http/Controllers/UserFrontController.php:25
* @route '/{user}'
*/
index.url = (args: { user: string | { name: string } } | [user: string | { name: string } ] | string | { name: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'name' in args) {
        args = { user: args.name }
    }

    if (Array.isArray(args)) {
        args = {
            user: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        user: typeof args.user === 'object'
        ? args.user.name
        : args.user,
    }

    return index.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserFrontController::index
* @see app/Http/Controllers/UserFrontController.php:25
* @route '/{user}'
*/
index.get = (args: { user: string | { name: string } } | [user: string | { name: string } ] | string | { name: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserFrontController::index
* @see app/Http/Controllers/UserFrontController.php:25
* @route '/{user}'
*/
index.head = (args: { user: string | { name: string } } | [user: string | { name: string } ] | string | { name: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\UserFrontController::index
* @see app/Http/Controllers/UserFrontController.php:25
* @route '/{user}'
*/
const indexForm = (args: { user: string | { name: string } } | [user: string | { name: string } ] | string | { name: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserFrontController::index
* @see app/Http/Controllers/UserFrontController.php:25
* @route '/{user}'
*/
indexForm.get = (args: { user: string | { name: string } } | [user: string | { name: string } ] | string | { name: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserFrontController::index
* @see app/Http/Controllers/UserFrontController.php:25
* @route '/{user}'
*/
indexForm.head = (args: { user: string | { name: string } } | [user: string | { name: string } ] | string | { name: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\UserFrontController::indexFolder
* @see app/Http/Controllers/UserFrontController.php:41
* @route '/{user}/topic/{folder}'
*/
export const indexFolder = (args: { user: string | { name: string }, folder: number | { id: number } } | [user: string | { name: string }, folder: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexFolder.url(args, options),
    method: 'get',
})

indexFolder.definition = {
    methods: ["get","head"],
    url: '/{user}/topic/{folder}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserFrontController::indexFolder
* @see app/Http/Controllers/UserFrontController.php:41
* @route '/{user}/topic/{folder}'
*/
indexFolder.url = (args: { user: string | { name: string }, folder: number | { id: number } } | [user: string | { name: string }, folder: number | { id: number } ], options?: RouteQueryOptions) => {

    if (Array.isArray(args)) {
        args = {
            user: args[0],
            folder: args[1],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        user: typeof args.user === 'object'
        ? args.user.name
        : args.user,
        folder: typeof args.folder === 'object'
        ? args.folder.id
        : args.folder,
    }

    return indexFolder.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace('{folder}', parsedArgs.folder.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserFrontController::indexFolder
* @see app/Http/Controllers/UserFrontController.php:41
* @route '/{user}/topic/{folder}'
*/
indexFolder.get = (args: { user: string | { name: string }, folder: number | { id: number } } | [user: string | { name: string }, folder: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexFolder.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserFrontController::indexFolder
* @see app/Http/Controllers/UserFrontController.php:41
* @route '/{user}/topic/{folder}'
*/
indexFolder.head = (args: { user: string | { name: string }, folder: number | { id: number } } | [user: string | { name: string }, folder: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexFolder.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\UserFrontController::indexFolder
* @see app/Http/Controllers/UserFrontController.php:41
* @route '/{user}/topic/{folder}'
*/
const indexFolderForm = (args: { user: string | { name: string }, folder: number | { id: number } } | [user: string | { name: string }, folder: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexFolder.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserFrontController::indexFolder
* @see app/Http/Controllers/UserFrontController.php:41
* @route '/{user}/topic/{folder}'
*/
indexFolderForm.get = (args: { user: string | { name: string }, folder: number | { id: number } } | [user: string | { name: string }, folder: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexFolder.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserFrontController::indexFolder
* @see app/Http/Controllers/UserFrontController.php:41
* @route '/{user}/topic/{folder}'
*/
indexFolderForm.head = (args: { user: string | { name: string }, folder: number | { id: number } } | [user: string | { name: string }, folder: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexFolder.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

indexFolder.form = indexFolderForm

/**
* @see \App\Http\Controllers\UserFrontController::create
* @see app/Http/Controllers/UserFrontController.php:65
* @route '/{user}/create'
*/
export const create = (args: { user: string | { name: string } } | [user: string | { name: string } ] | string | { name: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/{user}/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserFrontController::create
* @see app/Http/Controllers/UserFrontController.php:65
* @route '/{user}/create'
*/
create.url = (args: { user: string | { name: string } } | [user: string | { name: string } ] | string | { name: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'name' in args) {
        args = { user: args.name }
    }

    if (Array.isArray(args)) {
        args = {
            user: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        user: typeof args.user === 'object'
        ? args.user.name
        : args.user,
    }

    return create.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserFrontController::create
* @see app/Http/Controllers/UserFrontController.php:65
* @route '/{user}/create'
*/
create.get = (args: { user: string | { name: string } } | [user: string | { name: string } ] | string | { name: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserFrontController::create
* @see app/Http/Controllers/UserFrontController.php:65
* @route '/{user}/create'
*/
create.head = (args: { user: string | { name: string } } | [user: string | { name: string } ] | string | { name: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\UserFrontController::create
* @see app/Http/Controllers/UserFrontController.php:65
* @route '/{user}/create'
*/
const createForm = (args: { user: string | { name: string } } | [user: string | { name: string } ] | string | { name: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserFrontController::create
* @see app/Http/Controllers/UserFrontController.php:65
* @route '/{user}/create'
*/
createForm.get = (args: { user: string | { name: string } } | [user: string | { name: string } ] | string | { name: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserFrontController::create
* @see app/Http/Controllers/UserFrontController.php:65
* @route '/{user}/create'
*/
createForm.head = (args: { user: string | { name: string } } | [user: string | { name: string } ] | string | { name: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \App\Http\Controllers\UserFrontController::edit
* @see app/Http/Controllers/UserFrontController.php:108
* @route '/{user}/{userFront}/edit'
*/
export const edit = (args: { user: string | { name: string }, userFront: number | { id: number } } | [user: string | { name: string }, userFront: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/{user}/{userFront}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserFrontController::edit
* @see app/Http/Controllers/UserFrontController.php:108
* @route '/{user}/{userFront}/edit'
*/
edit.url = (args: { user: string | { name: string }, userFront: number | { id: number } } | [user: string | { name: string }, userFront: number | { id: number } ], options?: RouteQueryOptions) => {

    if (Array.isArray(args)) {
        args = {
            user: args[0],
            userFront: args[1],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        user: typeof args.user === 'object'
        ? args.user.name
        : args.user,
        userFront: typeof args.userFront === 'object'
        ? args.userFront.id
        : args.userFront,
    }

    return edit.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace('{userFront}', parsedArgs.userFront.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserFrontController::edit
* @see app/Http/Controllers/UserFrontController.php:108
* @route '/{user}/{userFront}/edit'
*/
edit.get = (args: { user: string | { name: string }, userFront: number | { id: number } } | [user: string | { name: string }, userFront: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserFrontController::edit
* @see app/Http/Controllers/UserFrontController.php:108
* @route '/{user}/{userFront}/edit'
*/
edit.head = (args: { user: string | { name: string }, userFront: number | { id: number } } | [user: string | { name: string }, userFront: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\UserFrontController::edit
* @see app/Http/Controllers/UserFrontController.php:108
* @route '/{user}/{userFront}/edit'
*/
const editForm = (args: { user: string | { name: string }, userFront: number | { id: number } } | [user: string | { name: string }, userFront: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserFrontController::edit
* @see app/Http/Controllers/UserFrontController.php:108
* @route '/{user}/{userFront}/edit'
*/
editForm.get = (args: { user: string | { name: string }, userFront: number | { id: number } } | [user: string | { name: string }, userFront: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserFrontController::edit
* @see app/Http/Controllers/UserFrontController.php:108
* @route '/{user}/{userFront}/edit'
*/
editForm.head = (args: { user: string | { name: string }, userFront: number | { id: number } } | [user: string | { name: string }, userFront: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\UserFrontController::store
* @see app/Http/Controllers/UserFrontController.php:76
* @route '/{user}'
*/
export const store = (args: { user: string | { name: string } } | [user: string | { name: string } ] | string | { name: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/{user}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\UserFrontController::store
* @see app/Http/Controllers/UserFrontController.php:76
* @route '/{user}'
*/
store.url = (args: { user: string | { name: string } } | [user: string | { name: string } ] | string | { name: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'name' in args) {
        args = { user: args.name }
    }

    if (Array.isArray(args)) {
        args = {
            user: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        user: typeof args.user === 'object'
        ? args.user.name
        : args.user,
    }

    return store.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserFrontController::store
* @see app/Http/Controllers/UserFrontController.php:76
* @route '/{user}'
*/
store.post = (args: { user: string | { name: string } } | [user: string | { name: string } ] | string | { name: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UserFrontController::store
* @see app/Http/Controllers/UserFrontController.php:76
* @route '/{user}'
*/
const storeForm = (args: { user: string | { name: string } } | [user: string | { name: string } ] | string | { name: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UserFrontController::store
* @see app/Http/Controllers/UserFrontController.php:76
* @route '/{user}'
*/
storeForm.post = (args: { user: string | { name: string } } | [user: string | { name: string } ] | string | { name: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\UserFrontController::destroy
* @see app/Http/Controllers/UserFrontController.php:163
* @route '/{user}/{userFront}'
*/
export const destroy = (args: { user: string | { name: string }, userFront: number | { id: number } } | [user: string | { name: string }, userFront: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/{user}/{userFront}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\UserFrontController::destroy
* @see app/Http/Controllers/UserFrontController.php:163
* @route '/{user}/{userFront}'
*/
destroy.url = (args: { user: string | { name: string }, userFront: number | { id: number } } | [user: string | { name: string }, userFront: number | { id: number } ], options?: RouteQueryOptions) => {

    if (Array.isArray(args)) {
        args = {
            user: args[0],
            userFront: args[1],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        user: typeof args.user === 'object'
        ? args.user.name
        : args.user,
        userFront: typeof args.userFront === 'object'
        ? args.userFront.id
        : args.userFront,
    }

    return destroy.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace('{userFront}', parsedArgs.userFront.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserFrontController::destroy
* @see app/Http/Controllers/UserFrontController.php:163
* @route '/{user}/{userFront}'
*/
destroy.delete = (args: { user: string | { name: string }, userFront: number | { id: number } } | [user: string | { name: string }, userFront: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\UserFrontController::destroy
* @see app/Http/Controllers/UserFrontController.php:163
* @route '/{user}/{userFront}'
*/
const destroyForm = (args: { user: string | { name: string }, userFront: number | { id: number } } | [user: string | { name: string }, userFront: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UserFrontController::destroy
* @see app/Http/Controllers/UserFrontController.php:163
* @route '/{user}/{userFront}'
*/
destroyForm.delete = (args: { user: string | { name: string }, userFront: number | { id: number } } | [user: string | { name: string }, userFront: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\UserFrontController::update
* @see app/Http/Controllers/UserFrontController.php:120
* @route '/{user}/{userFront}'
*/
export const update = (args: { user: string | { name: string }, userFront: number | { id: number } } | [user: string | { name: string }, userFront: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/{user}/{userFront}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\UserFrontController::update
* @see app/Http/Controllers/UserFrontController.php:120
* @route '/{user}/{userFront}'
*/
update.url = (args: { user: string | { name: string }, userFront: number | { id: number } } | [user: string | { name: string }, userFront: number | { id: number } ], options?: RouteQueryOptions) => {

    if (Array.isArray(args)) {
        args = {
            user: args[0],
            userFront: args[1],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        user: typeof args.user === 'object'
        ? args.user.name
        : args.user,
        userFront: typeof args.userFront === 'object'
        ? args.userFront.id
        : args.userFront,
    }

    return update.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace('{userFront}', parsedArgs.userFront.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserFrontController::update
* @see app/Http/Controllers/UserFrontController.php:120
* @route '/{user}/{userFront}'
*/
update.put = (args: { user: string | { name: string }, userFront: number | { id: number } } | [user: string | { name: string }, userFront: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\UserFrontController::update
* @see app/Http/Controllers/UserFrontController.php:120
* @route '/{user}/{userFront}'
*/
update.patch = (args: { user: string | { name: string }, userFront: number | { id: number } } | [user: string | { name: string }, userFront: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\UserFrontController::update
* @see app/Http/Controllers/UserFrontController.php:120
* @route '/{user}/{userFront}'
*/
const updateForm = (args: { user: string | { name: string }, userFront: number | { id: number } } | [user: string | { name: string }, userFront: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UserFrontController::update
* @see app/Http/Controllers/UserFrontController.php:120
* @route '/{user}/{userFront}'
*/
updateForm.put = (args: { user: string | { name: string }, userFront: number | { id: number } } | [user: string | { name: string }, userFront: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UserFrontController::update
* @see app/Http/Controllers/UserFrontController.php:120
* @route '/{user}/{userFront}'
*/
updateForm.patch = (args: { user: string | { name: string }, userFront: number | { id: number } } | [user: string | { name: string }, userFront: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\UserFrontController::updatePosition
* @see app/Http/Controllers/UserFrontController.php:129
* @route '/{user}/{userFront}/position'
*/
export const updatePosition = (args: { user: string | { name: string }, userFront: number | { id: number } } | [user: string | { name: string }, userFront: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePosition.url(args, options),
    method: 'put',
})

updatePosition.definition = {
    methods: ["put","patch"],
    url: '/{user}/{userFront}/position',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\UserFrontController::updatePosition
* @see app/Http/Controllers/UserFrontController.php:129
* @route '/{user}/{userFront}/position'
*/
updatePosition.url = (args: { user: string | { name: string }, userFront: number | { id: number } } | [user: string | { name: string }, userFront: number | { id: number } ], options?: RouteQueryOptions) => {

    if (Array.isArray(args)) {
        args = {
            user: args[0],
            userFront: args[1],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        user: typeof args.user === 'object'
        ? args.user.name
        : args.user,
        userFront: typeof args.userFront === 'object'
        ? args.userFront.id
        : args.userFront,
    }

    return updatePosition.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace('{userFront}', parsedArgs.userFront.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserFrontController::updatePosition
* @see app/Http/Controllers/UserFrontController.php:129
* @route '/{user}/{userFront}/position'
*/
updatePosition.put = (args: { user: string | { name: string }, userFront: number | { id: number } } | [user: string | { name: string }, userFront: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePosition.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\UserFrontController::updatePosition
* @see app/Http/Controllers/UserFrontController.php:129
* @route '/{user}/{userFront}/position'
*/
updatePosition.patch = (args: { user: string | { name: string }, userFront: number | { id: number } } | [user: string | { name: string }, userFront: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updatePosition.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\UserFrontController::updatePosition
* @see app/Http/Controllers/UserFrontController.php:129
* @route '/{user}/{userFront}/position'
*/
const updatePositionForm = (args: { user: string | { name: string }, userFront: number | { id: number } } | [user: string | { name: string }, userFront: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatePosition.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UserFrontController::updatePosition
* @see app/Http/Controllers/UserFrontController.php:129
* @route '/{user}/{userFront}/position'
*/
updatePositionForm.put = (args: { user: string | { name: string }, userFront: number | { id: number } } | [user: string | { name: string }, userFront: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatePosition.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UserFrontController::updatePosition
* @see app/Http/Controllers/UserFrontController.php:129
* @route '/{user}/{userFront}/position'
*/
updatePositionForm.patch = (args: { user: string | { name: string }, userFront: number | { id: number } } | [user: string | { name: string }, userFront: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatePosition.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updatePosition.form = updatePositionForm

const UserFrontController = { index, indexFolder, create, edit, store, destroy, update, updatePosition }

export default UserFrontController