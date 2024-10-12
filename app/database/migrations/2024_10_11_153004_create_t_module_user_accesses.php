<?php

use Leaf\Schema;
use Leaf\Database;
use Illuminate\Database\Schema\Blueprint;

class CreateTModuleUserAccesses extends Database
{
    /**
     * Run the migrations.
     * @return void
     */
    public function up()
    {
        if (!static::$capsule::schema()->hasTable('t_module_user_accesses')) :
            static::$capsule::schema()->create('t_module_user_accesses', function (Blueprint $table) {
                $table->unsignedBigInteger('user_id');
                $table->unsignedBigInteger('modul_id');
                $table->enum('access_level',['read', 'write', 'disable']);
                $table->foreign('user_id')->references('id')->on('users');
                $table->foreign('modul_id')->references('modul_id')->on('t_modules');
                $table->timestamps();
            });
        endif;

        // you can now build your migrations with schemas.
        // see: https://leafphp.dev/docs/mvc/schema.html
        // Schema::build('t_module_user_accesses');
    }

    /**
     * Reverse the migrations.
     * @return void
     */
    public function down()
    {
        static::$capsule::schema()->dropIfExists('t_module_user_accesses');
    }
}
