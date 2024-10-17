<?php
namespace App\Database\Seeds;

use App\Models\RefkotakecModel;
use App\Database\Factories\RefkotakecSeedFactory;
use Illuminate\Database\Seeder;

class RefkotakecSeedsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * @return void
     */
    public function run()
    {
        $data = [
            ['kd_kota' => '1', 'kd_kec' => '00', 'kd_kel' => '00', 'nm_wilayah' => 'KUNINGAN'],
            ['kd_kota' => '1', 'kd_kec' => '01', 'kd_kel' => '00', 'nm_wilayah' => 'Cigugur'],
            ['kd_kota' => '1', 'kd_kec' => '01', 'kd_kel' => '01', 'nm_wilayah' => 'Cigugur'],
            ['kd_kota' => '1', 'kd_kec' => '01', 'kd_kel' => '02', 'nm_wilayah' => 'Sukamulaya'],
            ['kd_kota' => '1', 'kd_kec' => '01', 'kd_kel' => '03', 'nm_wilayah' => 'Cigadung'],
            ['kd_kota' => '1', 'kd_kec' => '01', 'kd_kel' => '04', 'nm_wilayah' => 'Cipari'],
            ['kd_kota' => '1', 'kd_kec' => '01', 'kd_kel' => '05', 'nm_wilayah' => 'Cisantana'],
            ['kd_kota' => '1', 'kd_kec' => '01', 'kd_kel' => '06', 'nm_wilayah' => 'Cileleuy'],
            ['kd_kota' => '1', 'kd_kec' => '01', 'kd_kel' => '07', 'nm_wilayah' => 'Babakan Mulya'],
            ['kd_kota' => '1', 'kd_kec' => '01', 'kd_kel' => '08', 'nm_wilayah' => 'Gunung Keling'],
            ['kd_kota' => '1', 'kd_kec' => '01', 'kd_kel' => '09', 'nm_wilayah' => 'Puncak'],
            ['kd_kota' => '1', 'kd_kec' => '01', 'kd_kel' => '10', 'nm_wilayah' => 'Winduherang'],
        ];

        $refkotakecseed = new RefkotakecModel();
        $refkotakecseed::insert($data);
    }
}
