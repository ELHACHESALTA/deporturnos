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
        $user1->name = "Admin";
        $user1->email = "admin@gmail.com";
        $user1->password = "Admin123";
        $user1->idRol = 1;
        $user1->bajaUsuario = null;
        $user1->save();

        $user2 = new User;
        $user2->name = "Cliente";
        $user2->email = "cliente@gmail.com";
        $user2->password = "Cliente123";
        $user2->idRol = 2;
        $user2->bajaUsuario = null;
        $user2->save();
    
        $user3 = new User;
        $user3->name = "Gestor";
        $user3->email = "gestor@gmail.com";
        $user3->password = "Gestor123";
        $user3->idRol = 3;
        $user3->bajaUsuario = null;
        $user3->save();

        $user4 = new User;
        $user4->name = "Cliente dos";
        $user4->email = "clientedos@gmail.com";
        $user4->password = "Clientedos123";
        $user4->idRol = 2;
        $user4->bajaUsuario = null;
        $user4->save();

        $user5 = new User;
        $user5->name = "Cliente tres";
        $user5->email = "clientetres@gmail.com";
        $user5->password = "Clientetres123";
        $user5->idRol = 2;
        $user5->bajaUsuario = null;
        $user5->save();
    
        $user6 = new User;
        $user6->name = "Gestor dos";
        $user6->email = "gestordos@gmail.com";
        $user6->password = "Gestordos123";
        $user6->idRol = 3;
        $user6->bajaUsuario = null;
        $user6->save();

        $user7 = new User;
        $user7->name = "Gestor tres";
        $user7->email = "gestortres@gmail.com";
        $user7->password = "Gestortres123";
        $user7->idRol = 3;
        $user7->bajaUsuario = null;
        $user7->save();

        $user8 = new User;
        $user8->name = "Gestor cuatro";
        $user8->email = "gestorcuatro@gmail.com";
        $user8->password = "Gestorcuatro123";
        $user8->idRol = 3;
        $user8->bajaUsuario = null;
        $user8->save();

        $user9 = new User;
        $user9->name = "Gestor cinco";
        $user9->email = "gestorcinco@gmail.com";
        $user9->password = "Gestorcinco123";
        $user9->idRol = 3;
        $user9->bajaUsuario = null;
        $user9->save();

        $user10 = new User;
        $user10->name = "Gestor seis";
        $user10->email = "gestorseis@gmail.com";
        $user10->password = "Gestorseis123";
        $user10->idRol = 3;
        $user10->bajaUsuario = null;
        $user10->save();

        $user11 = new User;
        $user11->name = "Gestor siete";
        $user11->email = "gestorsiete@gmail.com";
        $user11->password = "Gestorsiete123";
        $user11->idRol = 3;
        $user11->bajaUsuario = null;
        $user11->save();

        $user12 = new User;
        $user12->name = "Gestor ocho";
        $user12->email = "gestorocho@gmail.com";
        $user12->password = "Gestorocho123";
        $user12->idRol = 3;
        $user12->bajaUsuario = null;
        $user12->save();
    }
}
