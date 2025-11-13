<?php

namespace App\Http\Requests\Explorer;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Rules\MaxLinksRule;
use App\Rules\SecureUrlRule;


class StoreLinkRequest extends FormRequest
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
                Rule::unique('links', 'url')
                    ->where('folder_id', $this->input('folder_id')),
                new MaxLinksRule($this->user()),
                new SecureUrlRule(app('log'))
            ],
            'title' => [
                'max:120',
            ],
            'folder_id' => [
                'required',
                'integer'
            ]
        ];
    }

    public function messages(): array
    {
        return [
            'url.unique' => 'Link already exist',
        ];
    }
}
