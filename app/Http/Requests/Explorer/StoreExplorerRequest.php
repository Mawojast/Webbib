<?php

namespace App\Http\Requests\explorer;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Rules\MaxFoldersRule;

class StoreExplorerRequest extends FormRequest
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
            'name' => [
                'required',
                'string',
                'max:32',
                Rule::unique('folders', 'name')
                    ->where('user_id', $this->user()->id)
                    ->whereNull('parent_id'),
                new MaxFoldersRule($this->user()),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'name.unique' => $this->input('name').' exists.',
        ];
    }

}
