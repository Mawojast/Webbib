import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Explorer\ExplorerController::publicMethod
* @see app/Http/Controllers/Explorer/ExplorerController.php:63
* @route '/explorer/{folder}/public'
*/
export const publicMethod = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: publicMethod.url(args, options),
    method: 'put',
})

publicMethod.definition = {
    methods: ["put"],
    url: '/explorer/{folder}/public',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Explorer\ExplorerController::publicMethod
* @see app/Http/Controllers/Explorer/ExplorerController.php:63
* @route '/explorer/{folder}/public'
*/
publicMethod.url = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return publicMethod.definition.url
            .replace('{folder}', parsedArgs.folder.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Explorer\ExplorerController::publicMethod
* @see app/Http/Controllers/Explorer/ExplorerController.php:63
* @route '/explorer/{folder}/public'
*/
publicMethod.put = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: publicMethod.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Explorer\ExplorerController::publicMethod
* @see app/Http/Controllers/Explorer/ExplorerController.php:63
* @route '/explorer/{folder}/public'
*/
const publicMethodForm = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: publicMethod.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Explorer\ExplorerController::publicMethod
* @see app/Http/Controllers/Explorer/ExplorerController.php:63
* @route '/explorer/{folder}/public'
*/
publicMethodForm.put = (args: { folder: number | { id: number } } | [folder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: publicMethod.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

publicMethod.form = publicMethodForm



const update = {
    public: Object.assign(publicMethod, publicMethod),
}

export default update