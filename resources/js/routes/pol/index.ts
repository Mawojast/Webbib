import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\PolController::privacypolicy
* @see app/Http/Controllers/PolController.php:14
* @route '/pol/privacypolicy'
*/
export const privacypolicy = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: privacypolicy.url(options),
    method: 'get',
})

privacypolicy.definition = {
    methods: ["get","head"],
    url: '/pol/privacypolicy',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PolController::privacypolicy
* @see app/Http/Controllers/PolController.php:14
* @route '/pol/privacypolicy'
*/
privacypolicy.url = (options?: RouteQueryOptions) => {




    return privacypolicy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PolController::privacypolicy
* @see app/Http/Controllers/PolController.php:14
* @route '/pol/privacypolicy'
*/
privacypolicy.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: privacypolicy.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PolController::privacypolicy
* @see app/Http/Controllers/PolController.php:14
* @route '/pol/privacypolicy'
*/
privacypolicy.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: privacypolicy.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PolController::privacypolicy
* @see app/Http/Controllers/PolController.php:14
* @route '/pol/privacypolicy'
*/
const privacypolicyForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: privacypolicy.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PolController::privacypolicy
* @see app/Http/Controllers/PolController.php:14
* @route '/pol/privacypolicy'
*/
privacypolicyForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: privacypolicy.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PolController::privacypolicy
* @see app/Http/Controllers/PolController.php:14
* @route '/pol/privacypolicy'
*/
privacypolicyForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: privacypolicy.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

privacypolicy.form = privacypolicyForm

/**
* @see \App\Http\Controllers\PolController::userprivacypolicy
* @see app/Http/Controllers/PolController.php:26
* @route '/pol/userprivacypolicy'
*/
export const userprivacypolicy = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: userprivacypolicy.url(options),
    method: 'get',
})

userprivacypolicy.definition = {
    methods: ["get","head"],
    url: '/pol/userprivacypolicy',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PolController::userprivacypolicy
* @see app/Http/Controllers/PolController.php:26
* @route '/pol/userprivacypolicy'
*/
userprivacypolicy.url = (options?: RouteQueryOptions) => {




    return userprivacypolicy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PolController::userprivacypolicy
* @see app/Http/Controllers/PolController.php:26
* @route '/pol/userprivacypolicy'
*/
userprivacypolicy.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: userprivacypolicy.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PolController::userprivacypolicy
* @see app/Http/Controllers/PolController.php:26
* @route '/pol/userprivacypolicy'
*/
userprivacypolicy.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: userprivacypolicy.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PolController::userprivacypolicy
* @see app/Http/Controllers/PolController.php:26
* @route '/pol/userprivacypolicy'
*/
const userprivacypolicyForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: userprivacypolicy.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PolController::userprivacypolicy
* @see app/Http/Controllers/PolController.php:26
* @route '/pol/userprivacypolicy'
*/
userprivacypolicyForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: userprivacypolicy.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PolController::userprivacypolicy
* @see app/Http/Controllers/PolController.php:26
* @route '/pol/userprivacypolicy'
*/
userprivacypolicyForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: userprivacypolicy.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

userprivacypolicy.form = userprivacypolicyForm

/**
* @see \App\Http\Controllers\PolController::termsofservice
* @see app/Http/Controllers/PolController.php:38
* @route '/pol/termsofservice'
*/
export const termsofservice = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: termsofservice.url(options),
    method: 'get',
})

termsofservice.definition = {
    methods: ["get","head"],
    url: '/pol/termsofservice',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PolController::termsofservice
* @see app/Http/Controllers/PolController.php:38
* @route '/pol/termsofservice'
*/
termsofservice.url = (options?: RouteQueryOptions) => {




    return termsofservice.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PolController::termsofservice
* @see app/Http/Controllers/PolController.php:38
* @route '/pol/termsofservice'
*/
termsofservice.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: termsofservice.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PolController::termsofservice
* @see app/Http/Controllers/PolController.php:38
* @route '/pol/termsofservice'
*/
termsofservice.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: termsofservice.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PolController::termsofservice
* @see app/Http/Controllers/PolController.php:38
* @route '/pol/termsofservice'
*/
const termsofserviceForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: termsofservice.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PolController::termsofservice
* @see app/Http/Controllers/PolController.php:38
* @route '/pol/termsofservice'
*/
termsofserviceForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: termsofservice.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PolController::termsofservice
* @see app/Http/Controllers/PolController.php:38
* @route '/pol/termsofservice'
*/
termsofserviceForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: termsofservice.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

termsofservice.form = termsofserviceForm

/**
* @see \App\Http\Controllers\PolController::imprint
* @see app/Http/Controllers/PolController.php:50
* @route '/pol/imprint'
*/
export const imprint = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: imprint.url(options),
    method: 'get',
})

imprint.definition = {
    methods: ["get","head"],
    url: '/pol/imprint',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PolController::imprint
* @see app/Http/Controllers/PolController.php:50
* @route '/pol/imprint'
*/
imprint.url = (options?: RouteQueryOptions) => {




    return imprint.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PolController::imprint
* @see app/Http/Controllers/PolController.php:50
* @route '/pol/imprint'
*/
imprint.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: imprint.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PolController::imprint
* @see app/Http/Controllers/PolController.php:50
* @route '/pol/imprint'
*/
imprint.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: imprint.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PolController::imprint
* @see app/Http/Controllers/PolController.php:50
* @route '/pol/imprint'
*/
const imprintForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: imprint.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PolController::imprint
* @see app/Http/Controllers/PolController.php:50
* @route '/pol/imprint'
*/
imprintForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: imprint.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PolController::imprint
* @see app/Http/Controllers/PolController.php:50
* @route '/pol/imprint'
*/
imprintForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: imprint.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

imprint.form = imprintForm



const pol = {
    privacypolicy: Object.assign(privacypolicy, privacypolicy),
    userprivacypolicy: Object.assign(userprivacypolicy, userprivacypolicy),
    termsofservice: Object.assign(termsofservice, termsofservice),
    imprint: Object.assign(imprint, imprint),
}

export default pol