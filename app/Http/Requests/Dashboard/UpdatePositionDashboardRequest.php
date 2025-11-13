<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Dashboard;

class UpdatePositionDashboardRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'from' => [
                'required',
                'integer',
            ],
            'to' => [
                'required',
                'integer',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'to.required' => 'Required position was not setted',
            'from.required' => 'Required position was not setted',
            'to.integer' => 'Required positon must be a number',
            'from.integer' => 'Required position must be a number'
        ];
    }
    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            $userId = $this->user()->id;
            $maxPosition = Dashboard::where('user_id', $userId)->max('position');

            $from = (int) $this->input('from');
            $to = (int) $this->input('to');

            if ($from < 1 || $from > $maxPosition || $to < 1 || $to > $maxPosition) {
                $validator->errors()->add('outOfPlace', 'One or both positions are out of allowed range.');
            }

            if ($from === $to) {
                $validator->errors()->add('sameValues', 'The new position must be different.');
            }

            $dashboard = $this->route('dashboard');
            if ($dashboard && $dashboard->position !== $from) {
                $validator->errors()->add('positionMismatch', 'Dashboard position does not match the current record.');
            }
        });
    }
}
