import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
* @see app/Http/Controllers/Settings/ProfileController.php:22
* @route '/settings/profile'
*/
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/settings/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
* @see app/Http/Controllers/Settings/ProfileController.php:22
* @route '/settings/profile'
*/
edit.url = (options?: RouteQueryOptions) => {




    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
* @see app/Http/Controllers/Settings/ProfileController.php:22
* @route '/settings/profile'
*/
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
* @see app/Http/Controllers/Settings/ProfileController.php:22
* @route '/settings/profile'
*/
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
* @see app/Http/Controllers/Settings/ProfileController.php:22
* @route '/settings/profile'
*/
const editForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
* @see app/Http/Controllers/Settings/ProfileController.php:22
* @route '/settings/profile'
*/
editForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
* @see app/Http/Controllers/Settings/ProfileController.php:22
* @route '/settings/profile'
*/
editForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\Settings\ProfileController::update
* @see app/Http/Controllers/Settings/ProfileController.php:68
* @route '/settings/profile'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/settings/profile',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Settings\ProfileController::update
* @see app/Http/Controllers/Settings/ProfileController.php:68
* @route '/settings/profile'
*/
update.url = (options?: RouteQueryOptions) => {




    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\ProfileController::update
* @see app/Http/Controllers/Settings/ProfileController.php:68
* @route '/settings/profile'
*/
update.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::update
* @see app/Http/Controllers/Settings/ProfileController.php:68
* @route '/settings/profile'
*/
const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::update
* @see app/Http/Controllers/Settings/ProfileController.php:68
* @route '/settings/profile'
*/
updateForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Settings\ProfileController::destroy
* @see app/Http/Controllers/Settings/ProfileController.php:98
* @route '/settings/profile'
*/
export const destroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/settings/profile',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Settings\ProfileController::destroy
* @see app/Http/Controllers/Settings/ProfileController.php:98
* @route '/settings/profile'
*/
destroy.url = (options?: RouteQueryOptions) => {




    return destroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\ProfileController::destroy
* @see app/Http/Controllers/Settings/ProfileController.php:98
* @route '/settings/profile'
*/
destroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::destroy
* @see app/Http/Controllers/Settings/ProfileController.php:98
* @route '/settings/profile'
*/
const destroyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::destroy
* @see app/Http/Controllers/Settings/ProfileController.php:98
* @route '/settings/profile'
*/
destroyForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

/**
* @see \App\Http\Controllers\Settings\ProfileController::imageEdit
* @see app/Http/Controllers/Settings/ProfileController.php:34
* @route '/settings/profile/image'
*/
export const imageEdit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: imageEdit.url(options),
    method: 'get',
})

imageEdit.definition = {
    methods: ["get","head"],
    url: '/settings/profile/image',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\ProfileController::imageEdit
* @see app/Http/Controllers/Settings/ProfileController.php:34
* @route '/settings/profile/image'
*/
imageEdit.url = (options?: RouteQueryOptions) => {




    return imageEdit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\ProfileController::imageEdit
* @see app/Http/Controllers/Settings/ProfileController.php:34
* @route '/settings/profile/image'
*/
imageEdit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: imageEdit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::imageEdit
* @see app/Http/Controllers/Settings/ProfileController.php:34
* @route '/settings/profile/image'
*/
imageEdit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: imageEdit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::imageEdit
* @see app/Http/Controllers/Settings/ProfileController.php:34
* @route '/settings/profile/image'
*/
const imageEditForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: imageEdit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::imageEdit
* @see app/Http/Controllers/Settings/ProfileController.php:34
* @route '/settings/profile/image'
*/
imageEditForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: imageEdit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::imageEdit
* @see app/Http/Controllers/Settings/ProfileController.php:34
* @route '/settings/profile/image'
*/
imageEditForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: imageEdit.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

imageEdit.form = imageEditForm

/**
* @see \App\Http\Controllers\Settings\ProfileController::imageUpdate
* @see app/Http/Controllers/Settings/ProfileController.php:46
* @route '/settings/profile/image'
*/
export const imageUpdate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: imageUpdate.url(options),
    method: 'post',
})

imageUpdate.definition = {
    methods: ["post"],
    url: '/settings/profile/image',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Settings\ProfileController::imageUpdate
* @see app/Http/Controllers/Settings/ProfileController.php:46
* @route '/settings/profile/image'
*/
imageUpdate.url = (options?: RouteQueryOptions) => {




    return imageUpdate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\ProfileController::imageUpdate
* @see app/Http/Controllers/Settings/ProfileController.php:46
* @route '/settings/profile/image'
*/
imageUpdate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: imageUpdate.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::imageUpdate
* @see app/Http/Controllers/Settings/ProfileController.php:46
* @route '/settings/profile/image'
*/
const imageUpdateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: imageUpdate.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::imageUpdate
* @see app/Http/Controllers/Settings/ProfileController.php:46
* @route '/settings/profile/image'
*/
imageUpdateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: imageUpdate.url(options),
    method: 'post',
})

imageUpdate.form = imageUpdateForm

/**
* @see \App\Http\Controllers\Settings\ProfileController::imageDestroy
* @see app/Http/Controllers/Settings/ProfileController.php:81
* @route '/settings/profile/image'
*/
export const imageDestroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: imageDestroy.url(options),
    method: 'delete',
})

imageDestroy.definition = {
    methods: ["delete"],
    url: '/settings/profile/image',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Settings\ProfileController::imageDestroy
* @see app/Http/Controllers/Settings/ProfileController.php:81
* @route '/settings/profile/image'
*/
imageDestroy.url = (options?: RouteQueryOptions) => {




    return imageDestroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\ProfileController::imageDestroy
* @see app/Http/Controllers/Settings/ProfileController.php:81
* @route '/settings/profile/image'
*/
imageDestroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: imageDestroy.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::imageDestroy
* @see app/Http/Controllers/Settings/ProfileController.php:81
* @route '/settings/profile/image'
*/
const imageDestroyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: imageDestroy.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::imageDestroy
* @see app/Http/Controllers/Settings/ProfileController.php:81
* @route '/settings/profile/image'
*/
imageDestroyForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: imageDestroy.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

imageDestroy.form = imageDestroyForm

const ProfileController = { edit, update, destroy, imageEdit, imageUpdate, imageDestroy }

export default ProfileController