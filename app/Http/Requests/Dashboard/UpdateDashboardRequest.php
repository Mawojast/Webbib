<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Rules\SecureUrlRule;

class UpdateDashboardRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $dashboard = $this->route('dashboard');

        $rules = [
            'url' => [
                'required',
                'string',
                'max:1024',
                'active_url',
                Rule::unique('dashboards', 'url')
                    ->where('user_id', $this->user()->id)
                    ->ignore($dashboard),
            ],
            'title' => [
                'max:70',
            ],
        ];

        if ($this->input('url') !== $dashboard->url) {
            $rules['url'][] = new SecureUrlRule(app('log'));
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'url.required' => 'URL is required',
            'url.unique' => 'Link already exists',
        ];
    }
}
