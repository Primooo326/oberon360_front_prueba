export interface Vehiculo {

    VH_ID: string; // id de vehiculo
    VH_PLACA: string; // placa de vehiculo
    VH_LAT: string; // latitud de vehiculo
    VH_LON: string; // longitud de vehiculo
    VH_ESTADO: string; // estado de vehiculo
    VH_LOCATION: string; // direccion de vehiculo
    VH_EVENTO: string; // evento de vehiculo
    VH_CLIENTE: string; // cliente de vehiculo
    VH_TIPO_SERVICIO: string; // tipo de servicio de vehiculo "Alpina" "Mobile"
    CONDUCTOR_ID: string; // conductor de vehiculo
    CONDUCTOR_NOM: string; // nombre de conductor de vehiculo

}

export interface VehiculoAlpina extends Vehiculo {
    TIPOSERVICIO_DESCRIPCION: string; // tipo de servicio de vehiculo
}

export interface VehiculoMobile extends Vehiculo {
    TIPOSERVICIO_DESCRIPCION: string; // tipo de servicio de vehiculo
}