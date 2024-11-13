<?php

namespace App\Validations;

class SimpananValidation 
{
    public function validasiSimpanan($data)
    {
        form()->message([
          'required' => '{field} tidak boleh kosong',
          'date' => '{field} harus format tanggal',
        ]);

        $cek = [
            'refid_anggota' => 'required',
            'jenis_simpanan' => 'required',
            'tanggal_transaksi' => 'required|date',
            'harga' => 'required'
        ];

        $validated = form()->validate($data, $cek);
        return $validated;
    }
}
