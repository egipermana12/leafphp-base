<?php

namespace App\Database\Factories;

use App\Models\Home;

class HomeFactory extends Factory
{
	public $model = Home::class;

	/**
	 * Create the blueprint for your factory
	 * @return array
	 */
	public function definition(): array
	{
		return [
			'user' => $this->faker->name,
		];
	}
}
