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
    public function validUserRegister($data = []){
        form()->message([
          'required' => '{field} tidak boleh kosong',
          'text' => '{field} harus text',
          'email' => '{field} harus format email'
        ]);
        $validated = form()->validate($data, [
            'username' => 'required|text',
            'fullname' => 'required|text',
            'email' => 'required|email',
            'password' => 'required|min:3',
        ]);
        return $validated;
    }

    public function validasLogin($data = []){
        form()->message([
          'required' => '{field} tidak boleh kosong',
        ]);
        $validated = form()->validate($data, [
            'email' => 'required',
            'password' => 'required',
        ]);
        return $validated;
    }
}
