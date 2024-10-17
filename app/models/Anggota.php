<?php

namespace App\Models;

class Anggota extends Model
{
    protected $table = 'anggota_koperasi';
    protected $fillable = [
        'nik', 'nama', 'tempat_lahir', 'tgl_lahir', 'gender', 'alamat', 'kd_desa', 'kd_kec', 'kd_kota', 'kd_pekerjaan', 'tgl_gabung', 'status_anggota', 'file_ktp'
    ];
}
