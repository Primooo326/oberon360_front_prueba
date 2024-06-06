
export interface IItenary {
    IPE_ID: string;
    IPE_IDASIGNACION: string;
    IPE_ORDEN: number;
    IPE_TIEMPO: number;
    IPE_FECHA_LLEGADA: string | null;
    IPE_IDPUNTO: string;
    IPE_FECHA_PRESUPUESTADO: string;
    IPE_ESTADO: number;
    mapPoint: {
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

export type EItenaryState = "ANTICIPADO" | "ATRASADO" | "A TIEMPO" | "NO DISPONIBLE" | "DISPONIBLE" | "EN OPERACION"

export type EstadoVehiculo = "ENCENDIDO" | "APAGADO" | "EN TALLER" | "INCOMUNICADO" | "CON SINIESTRO" | "ALERTADO" | null;
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
    statusItinerary: EItenaryState
}
export interface IConductor {
    CONDUCTOR_ID: string;
    CONDUCTOR_ID_TIPOIDENTIFICACION: string;
    CONDUCTOR_IDENTIFICACION: string;
    CONDUCTOR_CODCONDUCTOR: string;
    CONDUCTOR_PRIMERNOMBRE: string;
    CONDUCTOR_SEGUNDONOMBRE: string;
    CONDUCTOR_PRIMERAPELLIDO: string;
    CONDUCTOR_SEGUNDOAPELLIDO: string;
    CONDUCTOR_NOMBRE_COMPLETO: string;
    CONDUCTOR_ID_RH: number;
    CONDUCTOR_TELPERSONAL: string;
    CONDUCTOR_TELCORPORATIVO: string;
    CONDUCTOR_CORREO: string;
    CONDUCTOR_FOTO: string;
    CONDUCTOR_ESTADO: "1" | "0";
    typeIdentification: {
        TIP_IDEN_ID: string,
        TIP_IDEN_DESCRIPCION: TipoDocumento,
        TIP_IDEN_SIGLAS: TipDocSiglas
    },
    factorRh: {
        FACTOR_RH_ID_REG: 2,
        FACTOR_RH_CODIGO: "2",
        FACTOR_RH_DESCRIPCION: "A +",
        FACTOR_RH_SIGLA: null
    }
}
export type TipoDocumento = "CEDULA_DE_CIUDADANIA" | "NIT" | "CEDULA_DE_EXTRANJERIA" | "PEP" | "PASAPORTE" | "SIN_IDENTIFICACION" | "DOCUMENTO_EXTRANJERO" | "TARJETA_DE_IDENTIDAD"

export type TipDocSiglas = "CC" | "NIT" | "CE" | "PEP" | "PAS" | "SIN" | "DE" | "TI"





