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

        $user2 = new User;
        $user2->name = "cliente";
        $user2->email = "cliente@gmail.com";
        $user2->password = "Cliente123";
        $user2->idRol = 2;
        $user2->bajaUsuario = null;
        $user2->save();
    
        $user3 = new User;
        $user3->name = "gestor";
        $user3->email = "gestor@gmail.com";
        $user3->password = "Gestor123";
        $user3->idRol = 3;
        $user3->bajaUsuario = null;
        $user3->save();
    }
}
