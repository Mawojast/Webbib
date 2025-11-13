import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PolController::privacyPolicy
* @see app/Http/Controllers/PolController.php:14
* @route '/pol/privacypolicy'
*/
export const privacyPolicy = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: privacyPolicy.url(options),
    method: 'get',
})

privacyPolicy.definition = {
    methods: ["get","head"],
    url: '/pol/privacypolicy',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PolController::privacyPolicy
* @see app/Http/Controllers/PolController.php:14
* @route '/pol/privacypolicy'
*/
privacyPolicy.url = (options?: RouteQueryOptions) => {




    return privacyPolicy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PolController::privacyPolicy
* @see app/Http/Controllers/PolController.php:14
* @route '/pol/privacypolicy'
*/
privacyPolicy.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: privacyPolicy.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PolController::privacyPolicy
* @see app/Http/Controllers/PolController.php:14
* @route '/pol/privacypolicy'
*/
privacyPolicy.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: privacyPolicy.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PolController::privacyPolicy
* @see app/Http/Controllers/PolController.php:14
* @route '/pol/privacypolicy'
*/
const privacyPolicyForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: privacyPolicy.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PolController::privacyPolicy
* @see app/Http/Controllers/PolController.php:14
* @route '/pol/privacypolicy'
*/
privacyPolicyForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: privacyPolicy.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PolController::privacyPolicy
* @see app/Http/Controllers/PolController.php:14
* @route '/pol/privacypolicy'
*/
privacyPolicyForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: privacyPolicy.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

privacyPolicy.form = privacyPolicyForm

/**
* @see \App\Http\Controllers\PolController::userPrivacyPolicy
* @see app/Http/Controllers/PolController.php:26
* @route '/pol/userprivacypolicy'
*/
export const userPrivacyPolicy = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: userPrivacyPolicy.url(options),
    method: 'get',
})

userPrivacyPolicy.definition = {
    methods: ["get","head"],
    url: '/pol/userprivacypolicy',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PolController::userPrivacyPolicy
* @see app/Http/Controllers/PolController.php:26
* @route '/pol/userprivacypolicy'
*/
userPrivacyPolicy.url = (options?: RouteQueryOptions) => {




    return userPrivacyPolicy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PolController::userPrivacyPolicy
* @see app/Http/Controllers/PolController.php:26
* @route '/pol/userprivacypolicy'
*/
userPrivacyPolicy.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: userPrivacyPolicy.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PolController::userPrivacyPolicy
* @see app/Http/Controllers/PolController.php:26
* @route '/pol/userprivacypolicy'
*/
userPrivacyPolicy.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: userPrivacyPolicy.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PolController::userPrivacyPolicy
* @see app/Http/Controllers/PolController.php:26
* @route '/pol/userprivacypolicy'
*/
const userPrivacyPolicyForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: userPrivacyPolicy.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PolController::userPrivacyPolicy
* @see app/Http/Controllers/PolController.php:26
* @route '/pol/userprivacypolicy'
*/
userPrivacyPolicyForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: userPrivacyPolicy.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PolController::userPrivacyPolicy
* @see app/Http/Controllers/PolController.php:26
* @route '/pol/userprivacypolicy'
*/
userPrivacyPolicyForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: userPrivacyPolicy.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

userPrivacyPolicy.form = userPrivacyPolicyForm

/**
* @see \App\Http\Controllers\PolController::termsOfService
* @see app/Http/Controllers/PolController.php:38
* @route '/pol/termsofservice'
*/
export const termsOfService = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: termsOfService.url(options),
    method: 'get',
})

termsOfService.definition = {
    methods: ["get","head"],
    url: '/pol/termsofservice',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PolController::termsOfService
* @see app/Http/Controllers/PolController.php:38
* @route '/pol/termsofservice'
*/
termsOfService.url = (options?: RouteQueryOptions) => {




    return termsOfService.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PolController::termsOfService
* @see app/Http/Controllers/PolController.php:38
* @route '/pol/termsofservice'
*/
termsOfService.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: termsOfService.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PolController::termsOfService
* @see app/Http/Controllers/PolController.php:38
* @route '/pol/termsofservice'
*/
termsOfService.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: termsOfService.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PolController::termsOfService
* @see app/Http/Controllers/PolController.php:38
* @route '/pol/termsofservice'
*/
const termsOfServiceForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: termsOfService.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PolController::termsOfService
* @see app/Http/Controllers/PolController.php:38
* @route '/pol/termsofservice'
*/
termsOfServiceForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: termsOfService.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PolController::termsOfService
* @see app/Http/Controllers/PolController.php:38
* @route '/pol/termsofservice'
*/
termsOfServiceForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: termsOfService.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

termsOfService.form = termsOfServiceForm

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

const PolController = { privacyPolicy, userPrivacyPolicy, termsOfService, imprint }

export default PolController