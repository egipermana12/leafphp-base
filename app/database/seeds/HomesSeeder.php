<?php
namespace App\Database\Seeds;

use App\Models\Home;
use App\Database\Factories\HomeFactory;
use Illuminate\Database\Seeder;

class HomesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * @return void
     */
    public function run()
    {
        (new HomeFactory)->create(150)->save();
    }
}
