<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Rules\MaxDashboardsRule;
use App\Rules\SecureUrlRule;

class StoreDashboardRequest extends FormRequest
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
                Rule::unique('dashboards', 'url')
                    ->where('user_id', $this->user()->id),
                new MaxDashboardsRule($this->user()),
                new SecureUrlRule(app('log'))
            ],
            'title' => [
                'max:70',
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
