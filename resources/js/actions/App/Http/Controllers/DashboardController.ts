import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DashboardController::index
* @see app/Http/Controllers/DashboardController.php:26
* @route '/dashboard'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::index
* @see app/Http/Controllers/DashboardController.php:26
* @route '/dashboard'
*/
index.url = (options?: RouteQueryOptions) => {




    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::index
* @see app/Http/Controllers/DashboardController.php:26
* @route '/dashboard'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::index
* @see app/Http/Controllers/DashboardController.php:26
* @route '/dashboard'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DashboardController::index
* @see app/Http/Controllers/DashboardController.php:26
* @route '/dashboard'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::index
* @see app/Http/Controllers/DashboardController.php:26
* @route '/dashboard'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::index
* @see app/Http/Controllers/DashboardController.php:26
* @route '/dashboard'
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
* @see \App\Http\Controllers\DashboardController::create
* @see app/Http/Controllers/DashboardController.php:48
* @route '/dashboard/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/dashboard/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::create
* @see app/Http/Controllers/DashboardController.php:48
* @route '/dashboard/create'
*/
create.url = (options?: RouteQueryOptions) => {




    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::create
* @see app/Http/Controllers/DashboardController.php:48
* @route '/dashboard/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::create
* @see app/Http/Controllers/DashboardController.php:48
* @route '/dashboard/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DashboardController::create
* @see app/Http/Controllers/DashboardController.php:48
* @route '/dashboard/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::create
* @see app/Http/Controllers/DashboardController.php:48
* @route '/dashboard/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::create
* @see app/Http/Controllers/DashboardController.php:48
* @route '/dashboard/create'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \App\Http\Controllers\DashboardController::store
* @see app/Http/Controllers/DashboardController.php:56
* @route '/dashboard'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DashboardController::store
* @see app/Http/Controllers/DashboardController.php:56
* @route '/dashboard'
*/
store.url = (options?: RouteQueryOptions) => {




    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::store
* @see app/Http/Controllers/DashboardController.php:56
* @route '/dashboard'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DashboardController::store
* @see app/Http/Controllers/DashboardController.php:56
* @route '/dashboard'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DashboardController::store
* @see app/Http/Controllers/DashboardController.php:56
* @route '/dashboard'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\DashboardController::show
* @see app/Http/Controllers/DashboardController.php:86
* @route '/dashboard/{dashboard}'
*/
export const show = (args: { dashboard: number | { id: number } } | [dashboard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/dashboard/{dashboard}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::show
* @see app/Http/Controllers/DashboardController.php:86
* @route '/dashboard/{dashboard}'
*/
show.url = (args: { dashboard: number | { id: number } } | [dashboard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { dashboard: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { dashboard: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            dashboard: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        dashboard: typeof args.dashboard === 'object'
        ? args.dashboard.id
        : args.dashboard,
    }

    return show.definition.url
            .replace('{dashboard}', parsedArgs.dashboard.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::show
* @see app/Http/Controllers/DashboardController.php:86
* @route '/dashboard/{dashboard}'
*/
show.get = (args: { dashboard: number | { id: number } } | [dashboard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::show
* @see app/Http/Controllers/DashboardController.php:86
* @route '/dashboard/{dashboard}'
*/
show.head = (args: { dashboard: number | { id: number } } | [dashboard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DashboardController::show
* @see app/Http/Controllers/DashboardController.php:86
* @route '/dashboard/{dashboard}'
*/
const showForm = (args: { dashboard: number | { id: number } } | [dashboard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::show
* @see app/Http/Controllers/DashboardController.php:86
* @route '/dashboard/{dashboard}'
*/
showForm.get = (args: { dashboard: number | { id: number } } | [dashboard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::show
* @see app/Http/Controllers/DashboardController.php:86
* @route '/dashboard/{dashboard}'
*/
showForm.head = (args: { dashboard: number | { id: number } } | [dashboard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\DashboardController::edit
* @see app/Http/Controllers/DashboardController.php:94
* @route '/dashboard/{dashboard}/edit'
*/
export const edit = (args: { dashboard: number | { id: number } } | [dashboard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/dashboard/{dashboard}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::edit
* @see app/Http/Controllers/DashboardController.php:94
* @route '/dashboard/{dashboard}/edit'
*/
edit.url = (args: { dashboard: number | { id: number } } | [dashboard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { dashboard: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { dashboard: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            dashboard: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        dashboard: typeof args.dashboard === 'object'
        ? args.dashboard.id
        : args.dashboard,
    }

    return edit.definition.url
            .replace('{dashboard}', parsedArgs.dashboard.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::edit
* @see app/Http/Controllers/DashboardController.php:94
* @route '/dashboard/{dashboard}/edit'
*/
edit.get = (args: { dashboard: number | { id: number } } | [dashboard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::edit
* @see app/Http/Controllers/DashboardController.php:94
* @route '/dashboard/{dashboard}/edit'
*/
edit.head = (args: { dashboard: number | { id: number } } | [dashboard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DashboardController::edit
* @see app/Http/Controllers/DashboardController.php:94
* @route '/dashboard/{dashboard}/edit'
*/
const editForm = (args: { dashboard: number | { id: number } } | [dashboard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::edit
* @see app/Http/Controllers/DashboardController.php:94
* @route '/dashboard/{dashboard}/edit'
*/
editForm.get = (args: { dashboard: number | { id: number } } | [dashboard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::edit
* @see app/Http/Controllers/DashboardController.php:94
* @route '/dashboard/{dashboard}/edit'
*/
editForm.head = (args: { dashboard: number | { id: number } } | [dashboard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\DashboardController::update
* @see app/Http/Controllers/DashboardController.php:105
* @route '/dashboard/{dashboard}'
*/
export const update = (args: { dashboard: number | { id: number } } | [dashboard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/dashboard/{dashboard}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\DashboardController::update
* @see app/Http/Controllers/DashboardController.php:105
* @route '/dashboard/{dashboard}'
*/
update.url = (args: { dashboard: number | { id: number } } | [dashboard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { dashboard: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { dashboard: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            dashboard: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        dashboard: typeof args.dashboard === 'object'
        ? args.dashboard.id
        : args.dashboard,
    }

    return update.definition.url
            .replace('{dashboard}', parsedArgs.dashboard.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::update
* @see app/Http/Controllers/DashboardController.php:105
* @route '/dashboard/{dashboard}'
*/
update.put = (args: { dashboard: number | { id: number } } | [dashboard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\DashboardController::update
* @see app/Http/Controllers/DashboardController.php:105
* @route '/dashboard/{dashboard}'
*/
update.patch = (args: { dashboard: number | { id: number } } | [dashboard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\DashboardController::update
* @see app/Http/Controllers/DashboardController.php:105
* @route '/dashboard/{dashboard}'
*/
const updateForm = (args: { dashboard: number | { id: number } } | [dashboard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DashboardController::update
* @see app/Http/Controllers/DashboardController.php:105
* @route '/dashboard/{dashboard}'
*/
updateForm.put = (args: { dashboard: number | { id: number } } | [dashboard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DashboardController::update
* @see app/Http/Controllers/DashboardController.php:105
* @route '/dashboard/{dashboard}'
*/
updateForm.patch = (args: { dashboard: number | { id: number } } | [dashboard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\DashboardController::destroy
* @see app/Http/Controllers/DashboardController.php:156
* @route '/dashboard/{dashboard}'
*/
export const destroy = (args: { dashboard: number | { id: number } } | [dashboard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/{dashboard}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\DashboardController::destroy
* @see app/Http/Controllers/DashboardController.php:156
* @route '/dashboard/{dashboard}'
*/
destroy.url = (args: { dashboard: number | { id: number } } | [dashboard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { dashboard: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { dashboard: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            dashboard: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        dashboard: typeof args.dashboard === 'object'
        ? args.dashboard.id
        : args.dashboard,
    }

    return destroy.definition.url
            .replace('{dashboard}', parsedArgs.dashboard.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::destroy
* @see app/Http/Controllers/DashboardController.php:156
* @route '/dashboard/{dashboard}'
*/
destroy.delete = (args: { dashboard: number | { id: number } } | [dashboard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\DashboardController::destroy
* @see app/Http/Controllers/DashboardController.php:156
* @route '/dashboard/{dashboard}'
*/
const destroyForm = (args: { dashboard: number | { id: number } } | [dashboard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DashboardController::destroy
* @see app/Http/Controllers/DashboardController.php:156
* @route '/dashboard/{dashboard}'
*/
destroyForm.delete = (args: { dashboard: number | { id: number } } | [dashboard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\DashboardController::updatePosition
* @see app/Http/Controllers/DashboardController.php:123
* @route '/dashboard/{dashboard}/position'
*/
export const updatePosition = (args: { dashboard: number | { id: number } } | [dashboard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePosition.url(args, options),
    method: 'put',
})

updatePosition.definition = {
    methods: ["put","patch"],
    url: '/dashboard/{dashboard}/position',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\DashboardController::updatePosition
* @see app/Http/Controllers/DashboardController.php:123
* @route '/dashboard/{dashboard}/position'
*/
updatePosition.url = (args: { dashboard: number | { id: number } } | [dashboard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { dashboard: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { dashboard: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            dashboard: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        dashboard: typeof args.dashboard === 'object'
        ? args.dashboard.id
        : args.dashboard,
    }

    return updatePosition.definition.url
            .replace('{dashboard}', parsedArgs.dashboard.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::updatePosition
* @see app/Http/Controllers/DashboardController.php:123
* @route '/dashboard/{dashboard}/position'
*/
updatePosition.put = (args: { dashboard: number | { id: number } } | [dashboard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePosition.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\DashboardController::updatePosition
* @see app/Http/Controllers/DashboardController.php:123
* @route '/dashboard/{dashboard}/position'
*/
updatePosition.patch = (args: { dashboard: number | { id: number } } | [dashboard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updatePosition.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\DashboardController::updatePosition
* @see app/Http/Controllers/DashboardController.php:123
* @route '/dashboard/{dashboard}/position'
*/
const updatePositionForm = (args: { dashboard: number | { id: number } } | [dashboard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatePosition.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DashboardController::updatePosition
* @see app/Http/Controllers/DashboardController.php:123
* @route '/dashboard/{dashboard}/position'
*/
updatePositionForm.put = (args: { dashboard: number | { id: number } } | [dashboard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatePosition.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DashboardController::updatePosition
* @see app/Http/Controllers/DashboardController.php:123
* @route '/dashboard/{dashboard}/position'
*/
updatePositionForm.patch = (args: { dashboard: number | { id: number } } | [dashboard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatePosition.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updatePosition.form = updatePositionForm

const DashboardController = { index, create, store, show, edit, update, destroy, updatePosition }

export default DashboardController