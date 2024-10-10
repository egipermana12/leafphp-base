<?php

namespace App\Controllers;
use Inertia\Inertia;
use App\Models\User;
use App\Validations\UserValidation;


class UserController extends Controller
{
    public function index()
    {
        $page = request()->get('page') ? (int)request()->get('page') : 1;
        $perPage = 5;
        $offset = ($page - 1) * $perPage;

        $search = request()->get('search') ? request()->get('search') : null;

        $query = User::query()->offset($offset)->limit($perPage);

        if($search){
            $query->where('user', 'LIKE', '%' . $search . '%');
        }

        $data = $query->get();

        $count = User::when($search, fn($q) => $q->where('fullname', 'LIKE', '%' . $search . '%'))->count();

        $daftar = [
            'users' => $data,
            'pagination' => [
                'total' => $count,
                'per_page' => $perPage,
                'current_page' => $page,
                'last_page' => ceil($count / $perPage)
            ]
        ];

        return inertia('User/User', ['users' => $daftar]);
    }

    public function store()
    {
        $data = [
            'username' => request()->get('username'),
            'fullname' => request()->get('fullname'),
            'email' => request()->get('email'),
            'password' => request()->get('password'),
        ];

        $validation = new UserValidation();
        $validated = $validation->validUserRegister($data);

        if(!$validated){
            $errors = form()->errors();
              response()->json([
                'status' => false,
                'errors' => $errors
            ], 422);
        }else{
            $register = auth()->register($data, ['username', 'email']);
            if($register){
                response()->json([
                    'status' => true,
                    'message' => 'Data user berhasil ditambahkan'
                ], 200);
            }else{
                $errors = auth()->errors();

                foreach ($errors as $key => $error) {
                    // Jika error adalah string, ubah menjadi array
                    if (is_string($error)) {
                        $errors[$key] = [$error];
                    }
                }
                response()->json([
                    'status' => false,
                    'errors' => $errors
                ], 422);
            }
        }
    }
}
