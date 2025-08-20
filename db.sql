create database if not exists agenda_cita;
use agenda_cita;

-----tabla de  usuarios----

create table if not exists usuarios(
    id int auto_increment primary key,
    telefono varchar(20) not null,
    nombre varchar(50) not null,
    estado varchar(50) not null,                  
    correo varchar(50) not null
);

---------tabla de ciitas--------

create table if not exists citas(
    id int auto_increment primary key,
    id_Usuario int not null,
    fecha date not null,
    estatus varchar(50) not null,
    hora time not null,
    foreign key (id_Usuario) references usuarios(id) on delete cascade on update cascade
);





