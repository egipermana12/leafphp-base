<?php

namespace App\Controllers;
use App\Models\RefkotakecModel;

class KotakecController extends \Leaf\Controller
{
    public function index()
    {
        render('kotakec');
    }

    public function getKabupaten()
    {
        $kab = RefkotakecModel::query()->where('kd_kec', '=', '00')->where('kd_kel', '=', '00')->get();
        response()->json([
          'status' => true,
          'message' => 'Data Kabupaten',
          'data' => $kab
        ], 200);
    }
}
