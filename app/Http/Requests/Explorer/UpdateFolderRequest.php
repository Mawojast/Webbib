<?php

namespace App\Http\Requests\Explorer;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Folder;

class UpdateFolderRequest extends FormRequest
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
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Name is required',
            'name.string' => 'Der Name muss aus Buchstaben bestehen.',
            'name.unique' => 'Bereits vorhanden.',
            'name.max' => 'Maximal 32 Zeichen',
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            $folder = Folder::find($this->route('folder')->id);

            if (!$folder) return;

            $exists = Folder::where('name', $this->input('name'))
                ->where('user_id', $folder->user_id)
                ->where('parent_id', $folder->parent_id)
                ->where('id', '!=', $folder->id)
                ->exists();

            if ($exists) {
                $validator->errors()->add('name', 'Der Name existiert bereits.');
            }
        });
    }
}
