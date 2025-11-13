<?php

namespace App\Http\Requests\Explorer;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Rules\SecureUrlRule;

class UpdateLinkRequest extends FormRequest
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
        $link = $this->route('link');

        $rules = [
            'url' => [
                'required',
                'string',
                'max:1024',
                'active_url',
                Rule::unique('links', 'url')
                    ->where('folder_id', $link->folder_id)
                    ->ignore($link),
            ],
            'title' => [
                'max:120',
            ],
            'folder_id' => [
                'required',
                'integer'
            ]
        ];

        if ($this->input('url') !== $link->url) {
            $rules['url'][] = new SecureUrlRule(app('log'));
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'url.unique' => 'Link already exist',
        ];
    }
}
