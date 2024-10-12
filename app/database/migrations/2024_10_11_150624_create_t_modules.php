<?php

use Leaf\Schema;
use Leaf\Database;
use Illuminate\Database\Schema\Blueprint;

class CreateTModules extends Database
{
    /**
     * Run the migrations.
     * @return void
     */
    public function up()
    {
        if (!static::$capsule::schema()->hasTable('t_modules')) :
            static::$capsule::schema()->create('t_modules', function (Blueprint $table) {
                $table->unsignedBigInteger('modul_id');
                $table->string('modul_name');
                $table->string('modul_description');
                $table->timestamps();
                $table->primary('modul_id');
            });
        endif;

        // you can now build your migrations with schemas.
        // see: https://leafphp.dev/docs/mvc/schema.html
        // Schema::build('t_modules');
    }

    /**
     * Reverse the migrations.
     * @return void
     */
    public function down()
    {
        static::$capsule::schema()->dropIfExists('t_modules');
    }
}
