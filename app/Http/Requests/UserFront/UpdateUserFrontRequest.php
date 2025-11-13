<?php

namespace App\Http\Requests\UserFront;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Rules\SecureUrlRule;


class UpdateUserFrontRequest extends FormRequest
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
        $userFront = $this->route('userFront');
        $rules = [
            'url' => [
                'required',
                'string',
                'max:1024',
                'active_url',
                Rule::unique('user_fronts', 'url')
                    ->where('user_id', $this->user()->id)
                    ->ignore($userFront),
            ],
            'title' => [
                'string',
                'max:32',
            ],
        ];

        if ($this->input('url') !== $userFront->url) {
            $rules['url'][] = new SecureUrlRule(app('log'));
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'url.required' => 'URL is required',
            'url.unique' => 'Link already exists',
            'url.max' => 'Maximal 255 Zeichen',
            'title.max' => 'Maxmal 32 Zeichen'
        ];
    }
}
