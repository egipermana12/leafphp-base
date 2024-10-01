<?php

namespace App\Controllers;
use Inertia\Inertia;
use App\Models\Home;

class HomeController extends \Leaf\Controller
{
  public function index()
  {
    $data = Home::orderBy('user')->take(10)->get();
    render('Home',['data' => $data]);
  }

  public function dashboard()
  {
    $data = Home::orderBy('user')->take(10)->get();
    return inertia('Dashboard/Dashboard', [
      'data' => $data
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

    $data = [
      'data' => $daftar,
      'pagination' => [
        'total' => $count,
        'per_page' => $perPage,
        'current_page' => $page,
        'last_page' => ceil($count / $perPage)
      ],
      'searchQuery' => $search
    ];
    return inertia('Account/Account', [
      'data' => $data
    ]);
  }
}
