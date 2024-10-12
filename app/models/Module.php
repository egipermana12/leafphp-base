<?php

namespace App\Models;

class Module extends Model
{
    protected $table = 't_modules';
    protected $primaryKey = 'modul_id';
    protected $fillable = [
        'modul_id','modul_name', 'modul_description',
    ];
    public $timestamps = true; 
}
