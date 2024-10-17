<?php

namespace App\Controllers;
use App\Models\Anggota;
use Inertia\Inertia;
use App\Validations\AnggotaValidation;

class AnggotaController extends Controller
{
    public function index()
    {
        $page = request()->get('page') ? (int)request()->get('page') : 1;
        $perPage = 5;
        $offset = ($page - 1) * $perPage;

        $search = request()->get('search') ? request()->get('search') : null;

        $query = Anggota::query()->offset($offset)->limit($perPage);

        if($search){
            $query->where('nik', 'LIKE', '%' . $search . '%');
        }

        $daftar = $query->get();
        $count = Anggota::when($search, fn($q) => $q->where('nik', 'LIKE', '%' . $search . '%'))->count();

        $anggota = [
          'anggota' => $daftar,
          'pagination' => [
            'total' => $count,
            'per_page' => $perPage,
            'current_page' => $page,
            'last_page' => ceil($count / $perPage)
          ],
          'searchQuery' => $search
        ];

        return inertia('Anggota/Anggota', [
            'anggota' => $anggota
        ]);
    }

    public function create()
    {
        return inertia('Anggota/AddAnggota', ['errors' => []]);
    }

    public function store()
    {
        $data = [
            'nik' => request()->get('nik'),
            'nama' => request()->get('nama'),
            'tgl_gabung' => request()->get('tgl_gabung'),
            'jns_kelamin' => request()->get('jns_kelamin'),
            'status_anggota' => request()->get('status_anggota'),
        ];

        $validation = new AnggotaValidation();
        $validated = $validation->validasiCreate($data);

        if(!$validated){
            $errors = form()->errors();
            return inertia('Anggota/AddAnggota', ['errors' => $errors]);
        }else{
            $save = Anggota::create($data)->save();
            if($save){
                return app()->push('/anggota');
            }else{
                return inertia('Anggota/AddAnggota', ['errors' => ['nik' => 'gagal']]);
            }
        }

    }
}
