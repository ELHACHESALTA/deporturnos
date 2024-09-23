<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user1 = new User;
        $user1->name = "admin";
        $user1->email = "admin@gmail.com";
        $user1->password = "Admin123";
        $user1->idRol = 1;
        $user1->bajaUsuario = null;
        $user1->save();
    }
}
