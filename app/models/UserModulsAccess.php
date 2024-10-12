<?php

namespace App\Models;
use Leaf\Db;

class UserModulsAccess extends Model
{
    protected $table = 't_module_user_accesses';
    protected $fillable = [
        'user_id','modul_id', 'access_level',
    ];
    public $timestamps = true;  

    public function getUserAccess($userId, $modulName)
    {
        $query = UserModulsAccess::query()
                ->join('t_modules', 't_module_user_accesses.modul_id', '=', 't_modules.modul_id')
                ->where('t_module_user_accesses.user_id', $userId)
                ->where('t_modules.modul_name', $modulName)
                ->first()
                ;
        return $query;
    }
}
