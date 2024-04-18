// [{
//     "IPE_ID": "1365582",
//     "IPE_IDASIGNACION": "155548",
//     "IPE_ORDEN": 2,
//     "IPE_TIEMPO": 10,
//     "IPE_FECHA_LLEGADA": null,
//     "IPE_IDPUNTO": "1929",
//     "IPE_FECHA_PRESUPUESTADO": "2024-04-17T11:25:00.000Z",
//     "IPE_ESTADO": null,
//     "point": {
//         "PUN_ID": "1929",
//         "PUN_NOMBRE": "ALPINA PC_BRICENO",
//         "PUN_LATITUD": "4.939109802",
//         "PUN_LONGITUD": "-73.95948029"
//     },
//     "state": null
// },
// {
//     "IPE_ID": "1365588",
//     "IPE_IDASIGNACION": "155548",
//     "IPE_ORDEN": 8,
//     "IPE_TIEMPO": 56,
//     "IPE_FECHA_LLEGADA": "2024-04-17T10:55:51.000Z",
//     "IPE_IDPUNTO": "1952",
//     "IPE_FECHA_PRESUPUESTADO": "2024-04-17T17:10:00.000Z",
//     "IPE_ESTADO": 2,
//     "point": {
//         "PUN_ID": "1952",
//         "PUN_NOMBRE": "ALPINA PC_GIRARDOT",
//         "PUN_LATITUD": "4.25464",
//         "PUN_LONGITUD": "-74.8308"
//     },
//     "state": {
//         "ESTADOIPE_ID": 2,
//         "ESTADOIPE_ORDEN": 2,
//         "ESTADOIPE_NOMBRE": "ANTICIPADO"
//     }
// }]
export interface IItenary {
    IPE_ID: string;
    IPE_IDASIGNACION: string;
    IPE_ORDEN: number;
    IPE_TIEMPO: number;
    IPE_FECHA_LLEGADA: string | null;
    IPE_IDPUNTO: string;
    IPE_FECHA_PRESUPUESTADO: string;
    IPE_ESTADO: number;
    point: {
        PUN_ID: string;
        PUN_NOMBRE: string;
        PUN_LATITUD: string;
        PUN_LONGITUD: string;
    };
    state: {
        ESTADOIPE_ID: number;
        ESTADOIPE_ORDEN: number;
        ESTADOIPE_NOMBRE: string;
    } | null;
}
export interface IItenaryEvaluated {
    estado: EItenaryState;
    tiempoDiferencia: number | null; // En minutos
    tiempoDiferenciaStr: string | null;
}

export interface IItinerario extends IItenary {
    itinerarioEvaluated: IItenaryEvaluated;
}

export type EItenaryState = "ANTICIPADO" | "ATRASADO" | "A TIEMPO" | "NO DISPONIBLE"

export type EstadoVehiculo = "ENCENDIDO" | "APAGADO" | "EN TALLER" | "INCOMUNICADO" | "CON SINIESTRO" | "ALERTADO" | null;
// {
//     "Error_Code": "0",
//     "Error_Desc": "",
//     "WTLT_ID": "0",
//     "WTLT_PLACA": "FSV156",
//     "WTLT_MOBILEID": "0",
//     "WTLT_LAT": "7.4379083403125",
//     "WTLT_LON": "-73.5436868735969",
//     "WTLT_SPEED": "0",
//     "WTLT_HEADING": "0",
//     "WTLT_DATE_GPS": "2024-04-16T17:02:04.000Z",
//     "WTLT_DATE_SERVER": "2024-04-16T17:02:04.000Z",
//     "WTLT_LOCATION": "- LA GOMEZ (SAN) - VEINTE DE JULIO (SAN) KM ( 5.6 - 25.43 )",
//     "WTLT_EVENTID": "0",
//     "WTLT_EVENTO": "Reporte por Distancia (Movil Encendido)",
//     "WTLT_IDWT": "0",
//     "ESTADOVH": "ENCENDIDO",
//     "ESTADOIMG": "01-Flota-Primaria-35x28(Borde-Negro).png",
//     "TIPOSERVICIO_ID": 1,
//     "TIPOSERVICIO_DESCRIPCION": "PRIMARIA",
//     "VEHICULO_PUNTO": "10",
//     "VEHICULO_ID": 514,
//     "ITNE_ID": "155247",
//     "ITNE_IDREMOLQUE": 445,
//     "ITNE_ESTADO": 2,
//     "ITNE_IDTIPOVIAJE": 1,
//     "ITINE_ID": "411",
//     "ITINE_NOMBRE": "SANTA MARTA - SOPO VIA MAGDALENA MEDIO",
//     "ITINE_ORIGEN": "DS SANTA_MARTA_ CHEF",
//     "ITINE_DESTINO": "CEDI NACIONAL SOPO",
//     "ITNE_FECHA": "2024-04-15T15:12:00.000Z",
//     "ITNE_FECHA_2": "2024-04-17T14:01:00.000Z",
//     "ITNE_FECHA_INI": "2024-04-15T15:09:49.070Z",
//     "ITNE_FECHA_FIN": null,
//     "ITNE_CUMPLIMENTO": 2,
//     "CUBETAS_TOTAL": 0,
//     "ESTIBAS_TOTAL": 0,
//     "RECOLECCION_TOTAL": 0,
//     "PUNTOS_TOTAL": 20,
//     "PUNTOS_EJEC": 44,
//     "CONDUCTOR_ID": "120",
//     "CONDUCTOR_NOM": "80913026 - JUNCO MARTINEZ LUIS JAVIER",
//     "ACELERADAS": 0,
//     "EXCESO_VEL": 0,
//     "FRENADAS": 0,
//     "OCIO": 0,
//     "VELOCIDAD_PROMEDIO": 64,
//     "VELOCIDAD_MINIMA": 4,
//     "VELOCIDAD_MAXIMA": 90,
//     "TELEMETRIA_TEMPERATURA": "Movi",
//     "TELEMETRIA_HUMEDAD": "Movi",
//     "TELEMETRIA_FECHA": null,
//     "VEHICULO_STATUS": "1"
// }
export interface IVehiculo {
    Error_Code: string;
    Error_Desc: string;
    WTLT_ID: string;
    WTLT_PLACA: string;
    WTLT_MOBILEID: string;
    WTLT_LAT: string;
    WTLT_LON: string;
    WTLT_SPEED: string;
    WTLT_HEADING: string;
    WTLT_DATE_GPS: string;
    WTLT_DATE_SERVER: string;
    WTLT_LOCATION: string;
    WTLT_EVENTID: string;
    WTLT_EVENTO: string;
    WTLT_IDWT: string;
    ESTADOVH: EstadoVehiculo;
    ESTADOIMG: string;
    TIPOSERVICIO_ID: number;
    TIPOSERVICIO_DESCRIPCION: "PRIMARIA" | "SECUNDARIA" | "RECOLECCION DE LECHES";
    VEHICULO_PUNTO: string;
    VEHICULO_ID: number;
    ITNE_ID: string;
    ITNE_IDREMOLQUE: number;
    ITNE_ESTADO: number;
    ITNE_IDTIPOVIAJE: number;
    ITINE_ID: string;
    ITINE_NOMBRE: string;
    ITINE_ORIGEN: string;
    ITINE_DESTINO: string;
    ITNE_FECHA: string;
    ITNE_FECHA_2: string;
    ITNE_FECHA_INI: string;
    ITNE_FECHA_FIN: string;
    ITNE_CUMPLIMENTO: number;
    CUBETAS_TOTAL: number;
    ESTIBAS_TOTAL: number;
    RECOLECCION_TOTAL: number;
    PUNTOS_TOTAL: number;
    PUNTOS_EJEC: number;
    CONDUCTOR_ID: string;
    CONDUCTOR_NOM: string;
    ACELERADAS: number;
    EXCESO_VEL: number;
    FRENADAS: number;
    OCIO: number;
    VELOCIDAD_PROMEDIO: number;
    VELOCIDAD_MINIMA: number;
    VELOCIDAD_MAXIMA: number;
    TELEMETRIA_TEMPERATURA: string;
    TELEMETRIA_HUMEDAD: string;
    TELEMETRIA_FECHA: string;
    VEHICULO_STATUS: string;
    PUN_NOMBRE: string;
    PUN_LATITUD: string;
    PUN_LONGITUD: string;
}
