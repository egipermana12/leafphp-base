<?php

use Leaf\Schema;
use Leaf\Database;
use Illuminate\Database\Schema\Blueprint;

class CreateRefkotaKecs extends Database
{
    /**
     * Run the migrations.
     * @return void
     */
    public function up()
    {
        if (!static::$capsule::schema()->hasTable('refkota_kec')) :
            static::$capsule::schema()->create('refkota_kec', function (Blueprint $table) {
                $table->char('kd_kota',1)->default('0');
                $table->char('kd_kec',2)->default('00');
                $table->char('kd_kel',2)->default('00');
                $table->char('nm_wilayah',100);
                $table->timestamps();
                $table->primary(['kd_kota', 'kd_kec', 'kd_kel']);
            });
        endif;

        // you can now build your migrations with schemas.
        // see: https://leafphp.dev/docs/mvc/schema.html
        // Schema::build('refkota_kecs');
    }

    /**
     * Reverse the migrations.
     * @return void
     */
    public function down()
    {
        static::$capsule::schema()->dropIfExists('refkota_kec');
    }
}
