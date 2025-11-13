<?php

namespace App\Http\Requests\Settings;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;

class ProfileImageUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'image' => [
                File::image()
                    ->min('1kb')
                    ->max('2mb')
                    //->dimensions(Rule::dimensions()->maxWidth(500)->maxHeight(500)),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'image.image' => 'Please select a valid image file.',
            'image.min' => 'Image is too small (min 1KB).',
            'image.max' => 'Image is too large (max 2MB).',
        ];
    }
}
