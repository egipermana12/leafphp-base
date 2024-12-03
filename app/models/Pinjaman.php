<?php

namespace App\Models;

class Pinjaman extends Model
{
    protected $table = 'anggota_pinjaman';

    public function genereteDaftar($daftar = 0,$where = array(), $q = '', $offset, $limit)
    {
        $query = Pinjaman::
        select('anggota_pinjaman.id', 'anggota_pinjaman.refid_anggota', 'anggota_pinjaman.harga_pinjaman', 'anggota_pinjaman.tenor','anggota_pinjaman.status', 'anggota_pinjaman.ket', 'agt.nik', 'agt.nama')
        ->join('anggota_koperasi as agt', 'anggota_pinjaman.refid_anggota', '=', 'agt.id')
        ->where($where);
        if($q != ''){
            $query->where('agt.nama', 'LIKE', '%' . $q . '%')->orWhere('agt.nik', 'LIKE', '%' . $q . '%');
        }
        if($daftar == 0){
            $data =  $query->orderBy('anggota_pinjaman.refid_anggota')
            ->offset($offset)->limit($limit)
            ->get();
        }else{
            $data = $query->count();
        }
        return $data;
    }
    
}


