import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\UserFrontController::index
* @see app/Http/Controllers/UserFrontController.php:41
* @route '/{user}/topic/{folder}'
*/
export const index = (args: { user: string | { name: string }, folder: number | { id: number } } | [user: string | { name: string }, folder: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/{user}/topic/{folder}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserFrontController::index
* @see app/Http/Controllers/UserFrontController.php:41
* @route '/{user}/topic/{folder}'
*/
index.url = (args: { user: string | { name: string }, folder: number | { id: number } } | [user: string | { name: string }, folder: number | { id: number } ], options?: RouteQueryOptions) => {

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

    return index.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace('{folder}', parsedArgs.folder.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserFrontController::index
* @see app/Http/Controllers/UserFrontController.php:41
* @route '/{user}/topic/{folder}'
*/
index.get = (args: { user: string | { name: string }, folder: number | { id: number } } | [user: string | { name: string }, folder: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserFrontController::index
* @see app/Http/Controllers/UserFrontController.php:41
* @route '/{user}/topic/{folder}'
*/
index.head = (args: { user: string | { name: string }, folder: number | { id: number } } | [user: string | { name: string }, folder: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\UserFrontController::index
* @see app/Http/Controllers/UserFrontController.php:41
* @route '/{user}/topic/{folder}'
*/
const indexForm = (args: { user: string | { name: string }, folder: number | { id: number } } | [user: string | { name: string }, folder: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserFrontController::index
* @see app/Http/Controllers/UserFrontController.php:41
* @route '/{user}/topic/{folder}'
*/
indexForm.get = (args: { user: string | { name: string }, folder: number | { id: number } } | [user: string | { name: string }, folder: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserFrontController::index
* @see app/Http/Controllers/UserFrontController.php:41
* @route '/{user}/topic/{folder}'
*/
indexForm.head = (args: { user: string | { name: string }, folder: number | { id: number } } | [user: string | { name: string }, folder: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm



const folder = {
    index: Object.assign(index, index),
}

export default folder