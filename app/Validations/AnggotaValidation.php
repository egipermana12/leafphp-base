<?php

namespace App\Validations;

class AnggotaValidation
{
    public function validasiCreate($data)
    {
        form()->message([
          'required' => '{field} tidak boleh kosong',
          'text' => '{field} harus text',
        ]);
        $validated = form()->validate($data, [
            'nik' => 'required',
            'nama' => 'required',
            'tgl_gabung' => 'required',
            'status_anggota' => 'required',
            'jns_kelamin' => 'required',
        ]);
        return $validated;
    }
}
