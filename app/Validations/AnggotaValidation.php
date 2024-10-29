<?php

namespace App\Validations;

use App\Validations\FileUploadValidation;

class AnggotaValidation
{
    
    public function validasiCreate($data)
    {
        form()->rule('image', function($file){
            $validasiImage = new FileUploadValidation();
            $image = $validasiImage->simpleValidation($file);
            
            form()->message('image', '{field}' . $image);
            
            // All validations passed
            if($image != ''){
                return $file === 'image';
            }
            return true;
        });

        form()->message([
          'required' => '{field} tidak boleh kosong',
          'date' => '{field} harus format tanggal',
        ]);


        $cek = [
            'nik' => 'required',
            'nama' => 'required',
            'tempat_lahir' => 'required',
            'tgl_lahir' => 'required|date',
            'tgl_gabung' => 'required|date',
            'status_anggota' => 'required',
            'jns_kelamin' => 'required',
        ];

        if(isset($data['file_ktp'])){
            $cek['file_ktp'] = 'image';
        }

        $validated = form()->validate($data, $cek);
        return $validated;
    }
}
