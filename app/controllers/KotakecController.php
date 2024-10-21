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
        if($kab){
            response()->json([
              'status' => true,
              'message' => 'Data Kabupaten',
              'data' => $kab
            ], 200);
        }else{
            response()->json([
              'status' => false,
              'message' => 'Data Kabupaten',
              'data' => []
            ], 400);
        }
    }

    public function getKecamatan($kd_kota)
    {
        $kd_kota = $kd_kota ? $kd_kota : '1';
        $kec = RefkotakecModel::query()->where('kd_kota', '=', $kd_kota)->where('kd_kec', '!=', '00')->where('kd_kel', '=', '00')->get();
        if($kec){
            response()->json([
              'status' => true,
              'message' => 'Data Kecamantan',
              'data' => $kec
            ], 200);
        }else{
            response()->json([
              'status' => false,
              'message' => 'Data Kecamantan',
              'data' => []
            ], 400);
        }
    }

    public function getKelurahan($kd_kota, $kd_kec)
    {
        $kel = RefkotakecModel::query()->where('kd_kota', '=', $kd_kota)->where('kd_kec', '=', $kd_kec)->where('kd_kel', '!=', '00')->get();
        if($kel){
            response()->json([
              'status' => true,
              'message' => 'Data Kecamantan',
              'data' => $kel
            ], 200);
        }else{
            response()->json([
              'status' => false,
              'message' => 'Data Kecamantan',
              'data' => []
            ], 400);
        }
    }
}
