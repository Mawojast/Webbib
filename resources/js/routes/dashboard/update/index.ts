import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\DashboardController::position
* @see app/Http/Controllers/DashboardController.php:123
* @route '/dashboard/{dashboard}/position'
*/
export const position = (args: { dashboard: number | { id: number } } | [dashboard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: position.url(args, options),
    method: 'put',
})

position.definition = {
    methods: ["put","patch"],
    url: '/dashboard/{dashboard}/position',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\DashboardController::position
* @see app/Http/Controllers/DashboardController.php:123
* @route '/dashboard/{dashboard}/position'
*/
position.url = (args: { dashboard: number | { id: number } } | [dashboard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return position.definition.url
            .replace('{dashboard}', parsedArgs.dashboard.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::position
* @see app/Http/Controllers/DashboardController.php:123
* @route '/dashboard/{dashboard}/position'
*/
position.put = (args: { dashboard: number | { id: number } } | [dashboard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: position.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\DashboardController::position
* @see app/Http/Controllers/DashboardController.php:123
* @route '/dashboard/{dashboard}/position'
*/
position.patch = (args: { dashboard: number | { id: number } } | [dashboard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: position.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\DashboardController::position
* @see app/Http/Controllers/DashboardController.php:123
* @route '/dashboard/{dashboard}/position'
*/
const positionForm = (args: { dashboard: number | { id: number } } | [dashboard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: position.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DashboardController::position
* @see app/Http/Controllers/DashboardController.php:123
* @route '/dashboard/{dashboard}/position'
*/
positionForm.put = (args: { dashboard: number | { id: number } } | [dashboard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: position.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DashboardController::position
* @see app/Http/Controllers/DashboardController.php:123
* @route '/dashboard/{dashboard}/position'
*/
positionForm.patch = (args: { dashboard: number | { id: number } } | [dashboard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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