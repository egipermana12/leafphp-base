<?php

namespace App\Models;
use Leaf\Db;


class SimpananAnggota extends Model
{
    protected $table = 'anggota_simpanan';

    protected $fillable = [
        'refid_anggota', 'tanggal_transaksi', 'harga', 'jenis_simpanan', 'ket'
    ];

    public function anggota()
    {
        return $this->hasMany(Anggota::class);
    }

    public function getDaftar($daftar = 0,$where = array(), $q = '', $offset, $limit)
    {
        $query = SimpananAnggota::
            select('anggota_simpanan.id','anggota_simpanan.harga','anggota_simpanan.jenis_simpanan','anggota_simpanan.ket','anggota_simpanan.refid_anggota','agt.nik', 'agt.nama')
            ->join('anggota_koperasi as agt', 'anggota_simpanan.refid_anggota', '=', 'agt.id')
            ->where($where);
        if($q != ''){
            $query->where('agt.nama', 'LIKE', '%' . $q . '%')->orWhere('agt.nik', 'LIKE', '%' . $q . '%');
        }
        if($daftar == 0){
            $data =  $query->orderBy('anggota_simpanan.refid_anggota')
            ->offset($offset)->limit($limit)
            ->get();
        }else{
            $data = $query->count();
        }
        return $data;
    }
}
