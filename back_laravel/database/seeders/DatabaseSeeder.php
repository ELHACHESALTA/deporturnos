<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RolesTableSeeder::class,
            UsersTableSeeder::class,
            AdministradorsTableSeeder::class,
            ClientesTableSeeder::class,
            GestorComplejosTableSeeder::class,
            DeportesTableSeeder::class,
            ServiciosTableSeeder::class,
            ComplejosTableSeeder::class,
            ComplejoServiciosTableSeeder::class,
            CanchasTableSeeder::class,
            DiasTableSeeder::class,
            TurnosTableSeeder::class,
            ReservasTableSeeder::class
        ]);
    }
}
