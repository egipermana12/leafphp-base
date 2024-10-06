<?php

namespace App\Validations;

class UserValidation {
    public function validUser($data = []){
        form()->message([
          'required' => '{field} tidak boleh kosong',
          'text' => '{field} harus text',
        ]);
        $validated = form()->validate($data, [
            'user' => 'required|text',
        ]);
        return $validated;
    }
}
