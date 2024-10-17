<?php

namespace App\Models;

class RefkotakecModel extends Model
{
    protected $table = 'refkota_kec';
    protected $primaryKey = ['kd_kota', 'kd_kec', 'kd_kel'];
    public $incrementing = false;
    protected $fillable = [
        'kd_kota', 'kd_kec', 'kd_kel', 'nm_wilayah'
    ];
    public $timestamps = true; 
}
