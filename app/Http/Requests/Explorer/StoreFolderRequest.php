<?php

namespace App\Http\Requests\Explorer;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use App\Rules\MaxFoldersRule;


class StoreFolderRequest extends FormRequest
{
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
                    ->where('parent_id', $this->route('folder')->id),
                new MaxFoldersRule($this->user()),
            ],
        ];
    }

    public function messages()
    {
        return [
            'name.unique' => 'Topic exists',
        ];
    }
}
