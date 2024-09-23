<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;


class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rol1 = new Role;
        $rol1->descripcionRol = "administrador";
        $rol1->save();

        $rol2 = new Role;
        $rol2->descripcionRol = "cliente";
        $rol2->save();

        $rol3 = new Role;
        $rol3->descripcionRol = "gestorComplejo";
        $rol3->save();
    }
}
