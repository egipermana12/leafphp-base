<?php

namespace App\Controllers;
use App\Models\SimpananAnggota;
use App\Validations\SimpananValidation;

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

    public function store()
    {
        $data = [
             'refid_anggota' => request()->get('refid_anggota'),
             'jenis_simpanan' => request()->get('jenis_simpanan'),
             'tanggal_transaksi' => request()->get('tanggal_transaksi'),
             'harga' => request()->get('harga'),
             'ket' => request()->get('ket'),
        ];

        $validation = new SimpananValidation();
        $validated = $validation->validasiSimpanan($data);

        if(!$validated){
            $errors = form()->errors();
            return inertia('Simpanan/AddSimpanan', ['errors' => $errors]);
        }else{
            $save = SimpananAnggota::create($data)->save();
            if($save){
                 $page = request()->get('page') ? (int)request()->get('page') : 1;
                $search = request()->get('search') ? request()->get('search') : '';
                $type = request()->get('selectPinjamanType') ? request()->get('selectPinjamanType') : '';

                $where = array();
                $where['anggota_simpanan.jenis_simpanan'] = $type;

                $daftar = $this->genDaftar($page, $search, $where);
                $simpanan = $daftar;

                 $this->flash = ['status' => 'success', 'message' => 'Data simpanan berhasil disimpan!'];

                 return inertia('Simpanan/Simpanan', [
                    'simpanan' => $simpanan, 
                    'flash' => $this->flash
                ]);
            }else{
                return inertia('Simpanan/AddSimpanan', ['errors' => ['nik' => 'gagal']]);
            }
        }
    }

    public function edit($id){
        $find = SimpananAnggota::find($id);
        if($find)
        {
            $hargax = explode(".", $find['harga']);
            $find['harga_formateed'] = $hargax[0];
            return inertia('Simpanan/EditSimpanan', [
                'errors' => [],
                'simpanan' => $find
            ]);
        }else{
            response()->redirect('simpanan');
        }
    }

    public function update()
    {
        $id = request()->get('id');
        $find = SimpananAnggota::find($id);
        $data = [
             'refid_anggota' => request()->get('refid_anggota'),
             'jenis_simpanan' => request()->get('jenis_simpanan'),
             'tanggal_transaksi' => request()->get('tanggal_transaksi'),
             'harga' => request()->get('harga'),
             'ket' => request()->get('ket'),
        ];
        if($find){
            $validation = new SimpananValidation();
            $validated = $validation->validasiSimpanan($data);
            if(!$validated){
                $errors = form()->errors();
                return inertia('Simpanan/EditSimpanan', [
                    'errors' => $errors,
                    'simpanan' => $find
                ]);
            }else{
                $find->refid_anggota = $data['refid_anggota'];
                $find->jenis_simpanan = $data['jenis_simpanan'];
                $find->tanggal_transaksi = $data['tanggal_transaksi'];
                $find->harga = $data['harga'];
                $find->ket = $data['ket'];
                $update = $find->save();
                if($update){
                    $page = request()->get('page') ? (int)request()->get('page') : 1;
                    $search = request()->get('search') ? request()->get('search') : '';
                    $type = request()->get('selectPinjamanType') ? request()->get('selectPinjamanType') : '';

                    $where = array();
                    $where['anggota_simpanan.jenis_simpanan'] = $type;

                    $daftar = $this->genDaftar($page, $search, $where);
                    $simpanan = $daftar;

                     $this->flash = ['status' => 'success', 'message' => 'Data simpanan berhasil disimpan!'];

                     return inertia('Simpanan/Simpanan', [
                        'simpanan' => $simpanan, 
                        'flash' => $this->flash
                    ]);
                }else{
                    return inertia('Simpanan/AddSimpanan', ['errors' => ['nik' => 'gagal']]);
                }
            }
        }
    }

}
