import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\UserFrontController::position
* @see app/Http/Controllers/UserFrontController.php:129
* @route '/{user}/{userFront}/position'
*/
export const position = (args: { user: string | { name: string }, userFront: number | { id: number } } | [user: string | { name: string }, userFront: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: position.url(args, options),
    method: 'put',
})

position.definition = {
    methods: ["put","patch"],
    url: '/{user}/{userFront}/position',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\UserFrontController::position
* @see app/Http/Controllers/UserFrontController.php:129
* @route '/{user}/{userFront}/position'
*/
position.url = (args: { user: string | { name: string }, userFront: number | { id: number } } | [user: string | { name: string }, userFront: number | { id: number } ], options?: RouteQueryOptions) => {

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

    return position.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace('{userFront}', parsedArgs.userFront.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserFrontController::position
* @see app/Http/Controllers/UserFrontController.php:129
* @route '/{user}/{userFront}/position'
*/
position.put = (args: { user: string | { name: string }, userFront: number | { id: number } } | [user: string | { name: string }, userFront: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: position.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\UserFrontController::position
* @see app/Http/Controllers/UserFrontController.php:129
* @route '/{user}/{userFront}/position'
*/
position.patch = (args: { user: string | { name: string }, userFront: number | { id: number } } | [user: string | { name: string }, userFront: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: position.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\UserFrontController::position
* @see app/Http/Controllers/UserFrontController.php:129
* @route '/{user}/{userFront}/position'
*/
const positionForm = (args: { user: string | { name: string }, userFront: number | { id: number } } | [user: string | { name: string }, userFront: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: position.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UserFrontController::position
* @see app/Http/Controllers/UserFrontController.php:129
* @route '/{user}/{userFront}/position'
*/
positionForm.put = (args: { user: string | { name: string }, userFront: number | { id: number } } | [user: string | { name: string }, userFront: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: position.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UserFrontController::position
* @see app/Http/Controllers/UserFrontController.php:129
* @route '/{user}/{userFront}/position'
*/
positionForm.patch = (args: { user: string | { name: string }, userFront: number | { id: number } } | [user: string | { name: string }, userFront: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: position.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

position.form = positionForm



const update = {
    position: Object.assign(position, position),
}

export default update