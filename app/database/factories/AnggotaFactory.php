<?php

namespace App\Database\Factories;

use App\Models\Anggota;

class AnggotaFactory extends Factory
{
	public $model = Anggota::class;

	/**
	 * Create the blueprint for your factory
	 * @return array
	 */
	public function definition(): array
	{
		return [
			'nik' => $this->faker->randomNumber(6,true),
			'nama' => $this->faker->name,
			'tempat_lahir' => $this->faker->cityPrefix(),
			'tgl_lahir' => tick()->now(),
			'tgl_gabung' => tick()->now(),
			'status_anggota' => 'aktif',
			'kd_pekerjaan' => 1,
		];
	}
}
