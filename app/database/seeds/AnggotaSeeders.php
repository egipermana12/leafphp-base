<?php
namespace App\Database\Seeds;

use App\Models\AnggotaSeeder;
use App\Database\Factories\AnggotaFactory;
use Illuminate\Database\Seeder;

class AnggotaSeeders extends Seeder
{
    /**
     * Run the database seeds.
     * @return void
     */
    public function run()
    {
        // You can directly create db records

        // $anggotaseeder = new AnggotaSeeder();
        // $anggotaseeder->field = 'value';
        // $anggotaseeder->save();

        // or

        // AnggotaSeeder::create([
        //    'field' => 'value'
        // ]);
        (new AnggotaFactory)->create(15)->save();
    }
}
