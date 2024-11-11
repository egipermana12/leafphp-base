<?php

namespace App\Controllers;
use App\Models\SimpananAnggota;


class SimpananController extends \Leaf\Controller 
{
    public $flash;

    public function genDaftar($page, $search, $where)
    {
        $perPage = 5;
        $offset = ($page - 1) * $perPage;

        $cari = array();
        $typePinjaman = $where['anggota_simpanan.jenis_simpanan'];
        if($typePinjaman != '')
        {
            $cari['anggota_simpanan.jenis_simpanan'] = $typePinjaman;
        }

        $query = new SimpananAnggota;
        $daftar = $query->getDaftar(0,$cari, $search, $offset, $perPage);
        $count = $query->getDaftar(1,$cari, $search, $offset, $perPage);

        $simpanan = [
          'simpanan' => $daftar,
          'pagination' => [
            'total' => $count,
            'per_page' => $perPage,
            'current_page' => $page,
            'last_page' => ceil($count / $perPage)
          ],
          'searchQuery' => $search,
          'searchType' => $typePinjaman,
        ];
        return $simpanan;
    }

    public function index()
    {
        $page = request()->get('page') ? (int)request()->get('page') : 1;
        $search = request()->get('search') ? request()->get('search') : '';
        $type = request()->get('selectPinjamanType') ? request()->get('selectPinjamanType') : '';

        $where = array();
        $where['anggota_simpanan.jenis_simpanan'] = $type;

        $daftar = $this->genDaftar($page, $search, $where);
        $simpanan = $daftar;

        $this->flash = ['status' => null, 'message' => null];

        return inertia('Simpanan/Simpanan', [
            'simpanan' => $simpanan, 
            'flash' => $this->flash
        ]);
    }

    public function create()
    {
        return inertia('Simpanan/AddSimpanan', ['errors' => []]);
    }
}
