export interface IUbicacion {
    ID: string;
    TipoIcono: ETipoIcono;
    Longitud: number;
    Latitud: number;
    Detalle: string;
    TiempoInicio: string;
    TiempoFinal: string;
    hora_actual: string;
}

export enum ETipoIcono {
    Primaria = 1,
    Secundaria = 2,
    Mobile = 3,
    Finca = 4,
    FincaVIP = 5,
}
// ubicacion cliente=
// {
//     "CLIUBIC_ID_REG": "151",
//     "CLIUBIC_ID_CLIENTE": "105",
//     "CLIUBIC_NOMBRE": "PRINCIPAL",
//     "CLIUBIC_TIPO_DIRECCION": " ",
//     "CLIUBIC_DIRECCION": "Cra. 14 # 94 – 65, Bogotá",
//     "CLIUBIC_ID_LOC_GEO_NV2": "1273",
//     "CLIUBIC_LATITUD": "4.67986499",
//     "CLIUBIC_LONGITUD": "-74.049625",
//     "CLIUBIC_DIRNORMAL": "Cra. 14 #94-65, Localidad de Chapinero, Bogotá, Colombia",
//     "CLIUBIC_FECHA": null,
//     "CLIUBIC_STATUS": "1",
//     "CLIUBIC_INSERT_DATE": "2024-02-14T16:05:36.043Z",
//     "CLIUBIC_INSERT_WINUSR": "oberon",
//     "CLIUBIC_INSERT_MACHINE": "190.252.107.103",
//     "CLIUBIC_INSERT_MAC": "20.22.123.228",
//     "CLIUBIC_INSERT_IP": "20.22.123.228",
//     "CLIUBIC_INSERT_SESSION_ID": null,
//     "CLIUBIC_INSERT_USER_ID": "1",
//     "CLIUBIC_UPDATE_DATE": null,
//     "CLIUBIC_UPDATE_WINUSR": null,
//     "CLIUBIC_UPDATE_MACHINE": null,
//     "CLIUBIC_UPDATE_MAC": null,
//     "CLIUBIC_UPDATE_IP": null,
//     "CLIUBIC_UPDATE_SESSION_ID": null,
//     "CLIUBIC_UPDATE_USER_ID": null,
//     "client": {
//         "CLIE_ID_REG": "105",
//         "CLIE_ID_REGENTIFICACION": "830088735",
//         "CLIE_TIPOID": 204,
//         "CLIE_DV": "4  ",
//         "CLIE_SIGLA": null,
//         "CLIE_NOMBRE": "EDIFICIO PLAZUELA 94 – PROPIEDAD HORIZONTAL",
//         "CLIE_COMERCIAL": "EDIFICIO PLAZUELA 94 – PROPIEDAD HORIZONTAL",
//         "CLIE_COD_GRUPO_EMPRE": "NA",
//         "CLIE_COD_SECTOR": "1047",
//         "CLIE_COD_NACIONALIDAD": null,
//         "CLIE_COD_ASESOR_COMERCIAL": "1",
//         "CLIE_COD_NIVEL_COMERCIAL": "1",
//         "CLIE_COD_ORIGEN_CONTACTO": "COM",
//         "CLIE_PAGINAWEB": "",
//         "CLIE_LOGO": null,
//         "CLIE_PROSPECTO": "1",
//         "CLIE_CENTCOS": null,
//         "CLIE_USER_FACTURISTA": null,
//         "CLIE_CRENTABILIDAD": null,
//         "CLIE_PERIODICIDAD_INC": null,
//         "CLIE_STATUS": "1",
//         "CLIE_INSERT_DATE": "2024-02-14T15:58:32.970Z",
//         "CLIE_INSERT_WINUSR": "oberon",
//         "CLIE_INSERT_MACHINE": "138.84.40.23",
//         "CLIE_INSERT_MAC": "20.22.123.228",
//         "CLIE_INSERT_IP": "20.22.123.228",
//         "CLIE_INSERT_SESSION_ID": null,
//         "CLIE_INSERT_USER_ID": "1",
//         "CLIE_UPDATE_DATE": null,
//         "CLIE_UPDATE_WINUSR": null,
//         "CLIE_UPDATE_MACHINE": null,
//         "CLIE_UPDATE_MAC": null,
//         "CLIE_UPDATE_IP": null,
//         "CLIE_UPDATE_SESSION_ID": null,
//         "CLIE_UPDATE_USER_ID": null,
//         "CLIE_COD_ALTERNO": null,
//         "CLIE_FILENAME": null,
//         "CLIE_DIAS_ENTREGA": null,
//         "CLIE_COP": null
//     }
// }
export interface IUbicacionCliente {
    CLIUBIC_ID_REG: string;
    CLIUBIC_ID_CLIENTE: string;
    CLIUBIC_NOMBRE: string;
    CLIUBIC_TIPO_DIRECCION: string;
    CLIUBIC_DIRECCION: string;
    CLIUBIC_ID_LOC_GEO_NV2: string;
    CLIUBIC_LATITUD: string;
    CLIUBIC_LONGITUD: string;
    CLIUBIC_DIRNORMAL: string;
    CLIUBIC_FECHA: string;
    CLIUBIC_STATUS: string;
    CLIUBIC_INSERT_DATE: string;
    CLIUBIC_INSERT_WINUSR: string;
    CLIUBIC_INSERT_MACHINE: string;
    CLIUBIC_INSERT_MAC: string;
    CLIUBIC_INSERT_IP: string;
    CLIUBIC_INSERT_SESSION_ID: string;
    CLIUBIC_INSERT_USER_ID: string;
    CLIUBIC_UPDATE_DATE: string;
    CLIUBIC_UPDATE_WINUSR: string;
    CLIUBIC_UPDATE_MACHINE: string;
    CLIUBIC_UPDATE_MAC: string;
    CLIUBIC_UPDATE_IP: string;
    CLIUBIC_UPDATE_SESSION_ID: string;
    CLIUBIC_UPDATE_USER_ID: string;
    client: ICliente;
}
export interface ICliente {
    CLIE_ID_REG: string;
    CLIE_ID_REGENTIFICACION: string;
    CLIE_TIPOID: number;
    CLIE_DV: string;
    CLIE_SIGLA: string;
    CLIE_NOMBRE: string;
    CLIE_COMERCIAL: string;
    CLIE_COD_GRUPO_EMPRE: string;
    CLIE_COD_SECTOR: string;
    CLIE_COD_NACIONALIDAD: string;
    CLIE_COD_ASESOR_COMERCIAL: string;
    CLIE_COD_NIVEL_COMERCIAL: string;
    CLIE_COD_ORIGEN_CONTACTO: string;
    CLIE_PAGINAWEB: string;
    CLIE_LOGO: string;
    CLIE_PROSPECTO: string;
    CLIE_CENTCOS: string;
    CLIE_USER_FACTURISTA: string;
    CLIE_CRENTABILIDAD: string;
    CLIE_PERIODICIDAD_INC: string;
    CLIE_STATUS: string;
    CLIE_INSERT_DATE: string;
    CLIE_INSERT_WINUSR: string;
    CLIE_INSERT_MACHINE: string;
    CLIE_INSERT_MAC: string;
    CLIE_INSERT_IP: string;
    CLIE_INSERT_SESSION_ID: string;
    CLIE_INSERT_USER_ID: string;
    CLIE_UPDATE_DATE: string;
    CLIE_UPDATE_WINUSR: string;
    CLIE_UPDATE_MACHINE: string;
    CLIE_UPDATE_MAC: string;
    CLIE_UPDATE_IP: string;
    CLIE_UPDATE_SESSION_ID: string;
    CLIE_UPDATE_USER_ID: string;
    CLIE_COD_ALTERNO: string;
    CLIE_FILENAME: string;
    CLIE_DIAS_ENTREGA: string;
    CLIE_COP: string;
}

// {
//     "CLIE_ID_REG": "2",
//     "CLIE_COMERCIAL": "EDIFICIO CAPITAL TOWER PH"
// }
export interface IClienteResponse {
    CLIE_ID_REG: string;
    CLIE_COMERCIAL: string;
}
export type TRiesgo = "vial" | "seguridad" 