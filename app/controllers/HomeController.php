<?php

namespace App\Controllers;
use Inertia\Inertia;
use App\Models\Home;
use App\Validations\UserValidation;
use App\Models\Module;

class HomeController extends \Leaf\Controller
{
  public function index()
  {
    $data = Home::orderBy('user')->take(10)->get();
    render('Home',['data' => $data]);
  }

  public function dashboard()
  {
    $user = auth()->status();
    return inertia('Dashboard/Dashboard', [
      'user' => $user,
    ]);
  }

  public function account()
  {
    $page = request()->get('page') ? (int)request()->get('page') : 1;
    $perPage = 5;
    $offset = ($page - 1) * $perPage;

    $search = request()->get('search') ? request()->get('search') : null;

    $query = Home::query()->offset($offset)->limit($perPage);

    if($search){
      $query->where('user', 'LIKE', '%' . $search . '%');
    }

    $daftar = $query->get();
    $count = Home::when($search, fn($q) => $q->where('user', 'LIKE', '%' . $search . '%'))->count();

    $posts = [
      'posts' => $daftar,
      'pagination' => [
        'total' => $count,
        'per_page' => $perPage,
        'current_page' => $page,
        'last_page' => ceil($count / $perPage)
      ],
      'searchQuery' => $search
    ];
    return inertia('Account/Account', [
      'posts' => $posts
    ]);
  }

  public function store()
  {
    $data = [
      'user' => request()->get('user')
    ];
    
    $validation = new UserValidation();
    $validated = $validation->validUser($data);

    // Jika validasi gagal, kembalikan respon dengan error
    if (!$validated) {
      $errors = form()->errors();
      response()->json([
        'status' => false,
        'errors' => $errors
      ], 422);
    }else{
      $save = new Home;
      $save->user = $data['user'];
      $save->save();
      if($save){
        response()->json([
          'status' => true,
          'message' => 'Data berhasil disimpan'
        ], 200);
      }else{
        response()->json([
          'status' => false,
          'message' => 'Something error'
        ], 400);
      }
    }
  }

  public function getById($id){
    $find = Home::find($id);
    if($find){
      response()->json([
          'status' => true,
          'message' => 'Data berhasil ditemukan',
          'data' => $find
        ], 200);
    }else{
      response()->json([
          'status' => false,
          'message' => 'Id not found'
        ], 400);
    }
  }

  public function updateById($id)
  {
    $find = Home::find($id);
    if($find){
      $data = [
        'user' => request()->get('user')
      ];
      
      $validation = new UserValidation();
      $validated = $validation->validUser($data);

      if (!$validated) {
      $errors = form()->errors();
        response()->json([
          'status' => false,
          'errors' => $errors
        ], 422);
      }else{
        $find->user = $data['user'];
        $find->save();
        if($find){
          response()->json([
            'status' => true,
            'message' => 'Data berhasil diupdate'
          ], 200);
        }else{
          response()->json([
            'status' => false,
            'message' => 'Something error'
          ], 400);
        }
      }
    }else{
       response()->json([
          'status' => false,
          'message' => 'Id not found'
        ], 400);
    }
  }

  public function delete()
  {
    $ids = request()->get('ids');
    $idsInt = array_map('intval', $ids); // Mengubah string menjadi integer

    $del = Home::whereIn('id', $idsInt)->delete();
    
    if($del){
      response()->json([
          'status' => true,
          'message' => 'Data berhasil dihapus'
        ], 200);
    }else{
      response()->json([
          'status' => false,
          'message' => 'Something wrong'
        ], 500);
    }
  }

}
