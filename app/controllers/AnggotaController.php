<?php

namespace App\Controllers;
use App\Models\Anggota;
use Inertia\Inertia;
use App\Validations\AnggotaValidation;

class AnggotaController extends Controller
{
    public $flash;

    public function __construct()
    {
        
    }

    public function genDaftar($page, $search)
    {
        $perPage = 5;
        $offset = ($page - 1) * $perPage;
        $query = Anggota::query()->offset($offset)->limit($perPage);
        if($search){
            $query->where('nama', 'LIKE', '%' . $search . '%');
        }

        $daftar = $query->get();
        $count = Anggota::when($search, fn($q) => $q->where('nama', 'LIKE', '%' . $search . '%'))->count();

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
        return $anggota;
    }

    public function index()
    {
        $page = request()->get('page') ? (int)request()->get('page') : 1;
        $search = request()->get('search') ? request()->get('search') : null;

        $daftar = $this->genDaftar($page, $search);
        $anggota = $daftar;

        $this->flash = ['status' => null, 'message' => null];

        return inertia('Anggota/Anggota', [
            'anggota' => $anggota, 
            'flash' => $this->flash
        ]);
    }

    public function create()
    {
        return inertia('Anggota/AddAnggota', ['errors' => []]);
    }

    public function store()
    {
        $file = request()->files('file_ktp');
        $data = [
            'nik' => request()->get('nik'),
            'nama' => request()->get('nama'),
            'tempat_lahir' => request()->get('tempat_lahir'),
            'tgl_lahir' => request()->get('tgl_lahir'),
            'tgl_gabung' => request()->get('tgl_gabung'),
            'jns_kelamin' => request()->get('jns_kelamin'),
            'status_anggota' => request()->get('status_anggota'),
        ];
        if($file){
            $data['file_ktp'] = request()->get('file_ktp');
        }

        $validation = new AnggotaValidation();
        $validated = $validation->validasiCreate($data);

        if(!$validated){
            $errors = form()->errors();
            return inertia('Anggota/AddAnggota', ['errors' => $errors]);
        }else{
            $save = Anggota::create($data)->save();
            if($save){
                 $daftar = $this->genDaftar(1, null);
                 $anggota = $daftar;

                 $this->flash = ['status' => 'success', 'message' => 'Data anggota berhasil disimpan!'];

                 return inertia('Anggota/Anggota', [
                    'anggota' => $anggota, 
                    'flash' => $this->flash
                ]);
            }else{
                return inertia('Anggota/AddAnggota', ['errors' => ['nik' => 'gagal']]);
            }
        }

    }
}
