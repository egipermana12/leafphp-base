<?php

use Leaf\Schema;
use Leaf\Database;
use Illuminate\Database\Schema\Blueprint;

class CreateAnggtatables extends Database
{
    /**
     * Run the migrations.
     * @return void
     */
    public function up()
    {
        if (!static::$capsule::schema()->hasTable('anggota_koperasi')) :
            static::$capsule::schema()->create('anggota_koperasi', function (Blueprint $table) {
                $table->increments('id');
                $table->string('nik', 16)->unique();
                $table->string('nama', 100);
                $table->string('tempat_lahir', 50)->nullable();
                $table->date('tgl_lahir')->nullable();
                $table->enum('gender', ['L', 'P'])->default('L');
                $table->string('alamat', 255)->nullable();
                $table->char('kd_desa', 2)->default('00');
                $table->char('kd_kec', 2)->default('00');
                $table->char('kd_kota', 1)->default('0');
                $table->integer('kd_pekerjaan')->nullable();
                $table->date('tgl_gabung')->nullable();
                $table->enum('status_anggota', ['aktif', 'nonaktif'])->default('aktif');
                $table->string('file_ktp', 255);
                $table->timestamps();
            });
        endif;

        // you can now build your migrations with schemas.
        // see: https://leafphp.dev/docs/mvc/schema.html
        // Schema::build('anggota_koperasi');
    }

    /**
     * Reverse the migrations.
     * @return void
     */
    public function down()
    {
        static::$capsule::schema()->dropIfExists('anggota_koperasi');
    }
}
