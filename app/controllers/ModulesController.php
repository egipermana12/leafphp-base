<?php

namespace App\Controllers;
use App\Models\Module;

class ModulesController extends \Leaf\Controller
{
    public function index()
    {
        render('module');
    }

    public function ModuleSidebar()
    {
        $modules = Module::orderBy('urutan', 'asc')->get();
        if($modules)
        {
            response()->json([
                'status' => true,
                'message' => 'Data berhasil ditemukan',
                'data' => $modules
            ], 200);
        }else{
            response()->json([
                'status' => false,
                'message' => 'Data tidak ditemukan',
                'data' => []
            ], 204);
        }
    }
}
