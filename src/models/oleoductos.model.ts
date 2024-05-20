interface IOleoducto {
    classification: string;
    session: string;
    channel: string;
    title: string;
    author: string;
    description: string;
    eventLocation: string;
    eventStartTime: string;
    eventEndTime: string;
    notes?: string;
    attachments?: string[];
}

// [{ "Estación inicial": "Caño Limon", "Latitud inicial": 6.932876053, "Longitud inicial": -71.16668089, "Estación final": "Banadia", "Latitud final": 6.908421866, "Longitud final": -71.84867717 }]

interface IOleoductoTrazo {
    "EstaciónInicial": string;
    "LatitudInicial": number;
    "LongitudInicial": number;
    "EstaciónFinal": string;
    "LatitudFinal": number;
    "LongitudFinal": number;
}

interface IOleoductioProtocolo {
    Id_Oleoducto: number | string;
    nombre_protocolo: string;
    fecha: string;
    estado_protocolo: "Pendiente" | "En proceso" | "Completado";
    bitacora: string;
}