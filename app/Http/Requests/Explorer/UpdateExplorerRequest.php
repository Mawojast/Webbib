<?php

namespace App\Http\Requests\Explorer;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class UpdateExplorerRequest extends FormRequest
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
                    ->whereNull('parent_id')
                    ->ignore($this->route('folder'))
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Name is required',
            'name.string' => 'Der Name muss aus Buchstaben bestehen.',
            'name.exists' => 'Ordner existiert nicht.',
            'name.max' => 'Maximal 32 Zeichen',
        ];
    }
}
