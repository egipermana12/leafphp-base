<?php

namespace App\Models;

class Home extends Model
{
    protected $table = 'homes';

    protected $fillable = [
        'user',
    ];

    public $timestamps = true;
}
