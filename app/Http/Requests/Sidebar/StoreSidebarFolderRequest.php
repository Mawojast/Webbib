<?php

namespace App\Http\Requests\Sidebar;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreSidebarFolderRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'folder' => [
                'required',
                'integer',
                Rule::unique('sidebar_folders', 'folder_id')
                    ->where('user_id', $this->user()->id),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'folder.unique' => 'Topic already exists in Sidebar',
        ];
    }

    public function prepareForValidation(): void
    {

        $this->merge([
            'folder' => $this->route('folder')->id,
        ]);
    }
}
