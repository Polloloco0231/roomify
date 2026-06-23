const MOCK_DATA = {
habitaciones: [
    {
        id: "hab-001",
        nombre: "Habitación Estándar",
        imagen: "assets/images/habitaciones/habitacion1-pers2.jpg",
        camas: 1,
        maxPersonas: 2,
        precioPorNoche: 150000,
        servicios: {
        internet: true,
        minibar: false,
        jacuzzi: false,
        tv: true,
        aireAcondicionado: true
    },
    disponible: true
    },
    {
        id: "hab-002",
        nombre: "Habitación Doble",
        imagen: "assets/images/habitaciones/habitacion2-pers4.jpg",
        camas: 2,
        maxPersonas: 4,
        precioPorNoche: 250000,
        servicios: {
        internet: true,
        minibar: true,
        jacuzzi: false,
        tv: true,
        aireAcondicionado: true
    },
    disponible: true
    },
    {
        id: "hab-003",
        nombre: "Suite Junior",
        imagen: "assets/images/habitaciones/habitacion3-pers2.jpg",
        camas: 1,
        maxPersonas: 2,
        precioPorNoche: 320000,
        servicios: {
        internet: true,
        minibar: true,
        jacuzzi: true,
        tv: true,
        aireAcondicionado: true
    },
    disponible: true
    },
    {
        id: "hab-004",
        nombre: "Habitación Familiar",
        imagen: "assets/images/habitaciones/habitacion4-pers2.jpg",
        camas: 3,
        maxPersonas: 6,
        precioPorNoche: 400000,
        servicios: {
        internet: true,
        minibar: false,
        jacuzzi: false,
        tv: true,
        aireAcondicionado: true
    },
        disponible: true
    },
    {
        id: "hab-005",
        nombre: "Suite Premium",
        imagen: "assets/images/habitaciones/habitacion5-pers4.jpg",
        camas: 2,
        maxPersonas: 4,
        precioPorNoche: 580000,
        servicios: {
        internet: true,
        minibar: true,
        jacuzzi: true,
        tv: true,
        aireAcondicionado: true
    },
    disponible: true
    }
],

usuarios: [
    {
id: "admin-001",
identificacion: "000000",
nombre: "Administrador",
nacionalidad: "Colombiana",
email: "admin@hotelcarmen.com",
telefono: "3000000000",
password: "admin123",
rol: "admin"
    }
],

reservas: []
};