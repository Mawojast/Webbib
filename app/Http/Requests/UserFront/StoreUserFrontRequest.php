<?php

namespace App\Http\Requests\UserFront;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Rules\SecureUrlRule;


class StoreUserFrontRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'url' => [
                'required',
                'string',
                'max:1024',
                'active_url',
                Rule::unique('user_fronts', 'url')
                    ->where('user_id', $this->user()->id),
                new SecureUrlRule(app('log'))
            ],
            'title' => [
                'string',
                'required',
                'max:32',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'url.unique' => 'URL already exists',
        ];
    }
}
