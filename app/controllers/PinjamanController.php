<?php

namespace App\Controllers;
use App\Models\Pinjaman;

class PinjamanController extends \Leaf\Controller 
{
    public function index()
    {
        return inertia('Pinjaman/Pinjaman');
    }

    public function generateDaftar($page, $search, $where = array())
    {
        $perPage = 1;
        $offset = ($page - 1) * $perPage;

        $cari = array();
        $typeStatus = $where['anggota_pinjaman.status'];
        if($typeStatus != '')
        {
            $cari['anggota_pinjaman.status'] = $typeStatus;
        }

        $query = new Pinjaman;
        $daftar = $query->genereteDaftar(0,$cari, $search, $offset, $perPage);
        $count = $query->genereteDaftar(1,$cari, $search, $offset, $perPage);

        $pinjaman = [
          'pinjaman' => $daftar,
          'pagination' => [
            'total' => $count,
            'per_page' => $perPage,
            'current_page' => $page,
            'last_page' => ceil($count / $perPage)
          ],
          'searchQuery' => $search
        ];
        return $pinjaman;
    }

    public function daftarPinjamanapi()
    {
        $page = request()->get('page') ? (int)request()->get('page') : 1;
        $search = request()->get('search') ? request()->get('search') : '';
        $status = request()->get('statusPinjaman') ? request()->get('statusPinjaman') : '';

        $where = array();
        $where['anggota_pinjaman.status'] = $status;

        $daftar = $this->generateDaftar($page, $search, $where);

        $pinjaman = $daftar;

        response()->json([
          'status' => true,
          'message' => 'Data pinjaman',
          'data' => $pinjaman
      ], 200);
    }

    public function create()
    {
        return inertia('Pinjaman/AddPinjaman', ['errors' => []]);
    }
}
