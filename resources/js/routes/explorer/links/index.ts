import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Explorer\LinkController::index
* @see app/Http/Controllers/Explorer/LinkController.php:20
* @route '/explorer/links'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/explorer/links',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Explorer\LinkController::index
* @see app/Http/Controllers/Explorer/LinkController.php:20
* @route '/explorer/links'
*/
index.url = (options?: RouteQueryOptions) => {




    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Explorer\LinkController::index
* @see app/Http/Controllers/Explorer/LinkController.php:20
* @route '/explorer/links'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Explorer\LinkController::index
* @see app/Http/Controllers/Explorer/LinkController.php:20
* @route '/explorer/links'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Explorer\LinkController::index
* @see app/Http/Controllers/Explorer/LinkController.php:20
* @route '/explorer/links'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Explorer\LinkController::index
* @see app/Http/Controllers/Explorer/LinkController.php:20
* @route '/explorer/links'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Explorer\LinkController::index
* @see app/Http/Controllers/Explorer/LinkController.php:20
* @route '/explorer/links'
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
* @see \App\Http\Controllers\Explorer\LinkController::create
* @see app/Http/Controllers/Explorer/LinkController.php:28
* @route '/explorer/links/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/explorer/links/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Explorer\LinkController::create
* @see app/Http/Controllers/Explorer/LinkController.php:28
* @route '/explorer/links/create'
*/
create.url = (options?: RouteQueryOptions) => {




    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Explorer\LinkController::create
* @see app/Http/Controllers/Explorer/LinkController.php:28
* @route '/explorer/links/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Explorer\LinkController::create
* @see app/Http/Controllers/Explorer/LinkController.php:28
* @route '/explorer/links/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Explorer\LinkController::create
* @see app/Http/Controllers/Explorer/LinkController.php:28
* @route '/explorer/links/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Explorer\LinkController::create
* @see app/Http/Controllers/Explorer/LinkController.php:28
* @route '/explorer/links/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Explorer\LinkController::create
* @see app/Http/Controllers/Explorer/LinkController.php:28
* @route '/explorer/links/create'
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
* @see \App\Http\Controllers\Explorer\LinkController::store
* @see app/Http/Controllers/Explorer/LinkController.php:36
* @route '/explorer/links'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/explorer/links',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Explorer\LinkController::store
* @see app/Http/Controllers/Explorer/LinkController.php:36
* @route '/explorer/links'
*/
store.url = (options?: RouteQueryOptions) => {




    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Explorer\LinkController::store
* @see app/Http/Controllers/Explorer/LinkController.php:36
* @route '/explorer/links'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Explorer\LinkController::store
* @see app/Http/Controllers/Explorer/LinkController.php:36
* @route '/explorer/links'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Explorer\LinkController::store
* @see app/Http/Controllers/Explorer/LinkController.php:36
* @route '/explorer/links'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Explorer\LinkController::show
* @see app/Http/Controllers/Explorer/LinkController.php:60
* @route '/explorer/links/{link}'
*/
export const show = (args: { link: string | number } | [link: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/explorer/links/{link}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Explorer\LinkController::show
* @see app/Http/Controllers/Explorer/LinkController.php:60
* @route '/explorer/links/{link}'
*/
show.url = (args: { link: string | number } | [link: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { link: args }
    }


    if (Array.isArray(args)) {
        args = {
            link: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        link: args.link,
    }

    return show.definition.url
            .replace('{link}', parsedArgs.link.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Explorer\LinkController::show
* @see app/Http/Controllers/Explorer/LinkController.php:60
* @route '/explorer/links/{link}'
*/
show.get = (args: { link: string | number } | [link: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Explorer\LinkController::show
* @see app/Http/Controllers/Explorer/LinkController.php:60
* @route '/explorer/links/{link}'
*/
show.head = (args: { link: string | number } | [link: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Explorer\LinkController::show
* @see app/Http/Controllers/Explorer/LinkController.php:60
* @route '/explorer/links/{link}'
*/
const showForm = (args: { link: string | number } | [link: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Explorer\LinkController::show
* @see app/Http/Controllers/Explorer/LinkController.php:60
* @route '/explorer/links/{link}'
*/
showForm.get = (args: { link: string | number } | [link: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Explorer\LinkController::show
* @see app/Http/Controllers/Explorer/LinkController.php:60
* @route '/explorer/links/{link}'
*/
showForm.head = (args: { link: string | number } | [link: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Explorer\LinkController::edit
* @see app/Http/Controllers/Explorer/LinkController.php:68
* @route '/explorer/links/{link}/edit'
*/
export const edit = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/explorer/links/{link}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Explorer\LinkController::edit
* @see app/Http/Controllers/Explorer/LinkController.php:68
* @route '/explorer/links/{link}/edit'
*/
edit.url = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { link: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { link: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            link: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        link: typeof args.link === 'object'
        ? args.link.id
        : args.link,
    }

    return edit.definition.url
            .replace('{link}', parsedArgs.link.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Explorer\LinkController::edit
* @see app/Http/Controllers/Explorer/LinkController.php:68
* @route '/explorer/links/{link}/edit'
*/
edit.get = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Explorer\LinkController::edit
* @see app/Http/Controllers/Explorer/LinkController.php:68
* @route '/explorer/links/{link}/edit'
*/
edit.head = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Explorer\LinkController::edit
* @see app/Http/Controllers/Explorer/LinkController.php:68
* @route '/explorer/links/{link}/edit'
*/
const editForm = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Explorer\LinkController::edit
* @see app/Http/Controllers/Explorer/LinkController.php:68
* @route '/explorer/links/{link}/edit'
*/
editForm.get = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Explorer\LinkController::edit
* @see app/Http/Controllers/Explorer/LinkController.php:68
* @route '/explorer/links/{link}/edit'
*/
editForm.head = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Explorer\LinkController::update
* @see app/Http/Controllers/Explorer/LinkController.php:80
* @route '/explorer/links/{link}'
*/
export const update = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/explorer/links/{link}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Explorer\LinkController::update
* @see app/Http/Controllers/Explorer/LinkController.php:80
* @route '/explorer/links/{link}'
*/
update.url = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { link: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { link: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            link: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        link: typeof args.link === 'object'
        ? args.link.id
        : args.link,
    }

    return update.definition.url
            .replace('{link}', parsedArgs.link.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Explorer\LinkController::update
* @see app/Http/Controllers/Explorer/LinkController.php:80
* @route '/explorer/links/{link}'
*/
update.put = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Explorer\LinkController::update
* @see app/Http/Controllers/Explorer/LinkController.php:80
* @route '/explorer/links/{link}'
*/
update.patch = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Explorer\LinkController::update
* @see app/Http/Controllers/Explorer/LinkController.php:80
* @route '/explorer/links/{link}'
*/
const updateForm = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Explorer\LinkController::update
* @see app/Http/Controllers/Explorer/LinkController.php:80
* @route '/explorer/links/{link}'
*/
updateForm.put = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Explorer\LinkController::update
* @see app/Http/Controllers/Explorer/LinkController.php:80
* @route '/explorer/links/{link}'
*/
updateForm.patch = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Explorer\LinkController::destroy
* @see app/Http/Controllers/Explorer/LinkController.php:104
* @route '/explorer/links/{link}'
*/
export const destroy = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/explorer/links/{link}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Explorer\LinkController::destroy
* @see app/Http/Controllers/Explorer/LinkController.php:104
* @route '/explorer/links/{link}'
*/
destroy.url = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { link: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { link: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            link: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        link: typeof args.link === 'object'
        ? args.link.id
        : args.link,
    }

    return destroy.definition.url
            .replace('{link}', parsedArgs.link.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Explorer\LinkController::destroy
* @see app/Http/Controllers/Explorer/LinkController.php:104
* @route '/explorer/links/{link}'
*/
destroy.delete = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Explorer\LinkController::destroy
* @see app/Http/Controllers/Explorer/LinkController.php:104
* @route '/explorer/links/{link}'
*/
const destroyForm = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Explorer\LinkController::destroy
* @see app/Http/Controllers/Explorer/LinkController.php:104
* @route '/explorer/links/{link}'
*/
destroyForm.delete = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm



const links = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default links