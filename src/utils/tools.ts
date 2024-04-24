import { JWT_SECRET } from '@/config'
import type { IItenary, IItenaryEvaluated } from '@/models/vehiculos.model'
import * as jose from 'jose'

export const verifyJWT = async (token: string) => {
    try {
        const secret = new TextEncoder().encode(JWT_SECRET)
        const { payload } = await jose.jwtVerify(token, secret)
        return payload
    } catch (error) {
        return false
    }
}

export const formatFecha = (fecha: string) => {
    //fecha formato español
    const fechaOptions: any =
    {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }
    const fechaDate = new Date(fecha)
    return fechaDate.toLocaleDateString('es-ES', fechaOptions)
}

export function evaluarItinerario(itinerario: IItenary) {
    const resultado: IItenaryEvaluated = {
        estado: 'NO DISPONIBLE',
        tiempoDiferencia: null,
        tiempoDiferenciaStr: null
    };

    // Verificar si no hay fechas disponibles
    if (!itinerario.IPE_FECHA_LLEGADA && !itinerario.IPE_FECHA_PRESUPUESTADO) {
        resultado.estado = 'NO DISPONIBLE';
        return resultado; // Retorna el objeto con los campos adecuados
    }
    // Verificar si no hay fechas disponibles
    if (!itinerario.IPE_FECHA_LLEGADA) {
        resultado.estado = 'NO DISPONIBLE';
        return resultado; // Retorna el objeto con los campos adecuados
    }

    // Si la fecha presupuestada es null, pero hay fecha de llegada, considerarlo 'A tiempo'
    if (!itinerario.IPE_FECHA_PRESUPUESTADO && itinerario.IPE_FECHA_LLEGADA) {
        resultado.estado = "A TIEMPO"
        return resultado;
    }

    // Convertimos las fechas a objetos de tipo Date para poder compararlas
    const fechaLlegada: any = new Date(itinerario.IPE_FECHA_LLEGADA!);
    const fechaPresupuestada: any = new Date(itinerario.IPE_FECHA_PRESUPUESTADO);
    let diferenciaMs = fechaLlegada - fechaPresupuestada;

    // Determinar si está anticipado o atrasado
    // Determinar si está anticipado o atrasado
    if (diferenciaMs < 0) {
        resultado.estado = "ANTICIPADO"
        diferenciaMs = -diferenciaMs; // Hacemos la diferencia positiva para el cálculo
    } else if (diferenciaMs > 0) {
        resultado.estado = "ATRASADO"
    } else {
        resultado.estado = "A TIEMPO"
        return resultado; // No hay diferencia de tiempo
    }

    // Calcular la diferencia de tiempo en días, horas, minutos y segundos
    const diferenciaDias = Math.floor(diferenciaMs / (24 * 60 * 60 * 1000));
    diferenciaMs -= diferenciaDias * (24 * 60 * 60 * 1000);
    const diferenciaHoras = Math.floor(diferenciaMs / (60 * 60 * 1000));
    diferenciaMs -= diferenciaHoras * (60 * 60 * 1000);
    const diferenciaMinutos = Math.floor(diferenciaMs / (60 * 1000));
    diferenciaMs -= diferenciaMinutos * (60 * 1000);
    const diferenciaSegundos = Math.round(diferenciaMs / 1000);

    // Asignar el tiempoDiferencia
    resultado.tiempoDiferencia = diferenciaDias * 24 * 60 + diferenciaHoras * 60 + diferenciaMinutos + (diferenciaSegundos / 60);

    // Formatear tiempoDiferenciaStr
    if (diferenciaDias > 0) {
        resultado.tiempoDiferenciaStr = `${diferenciaDias}d`;
    } else if (diferenciaHoras > 0) {
        resultado.tiempoDiferenciaStr = `${diferenciaHoras}h`;
    } else if (diferenciaMinutos > 0) {
        resultado.tiempoDiferenciaStr = `${diferenciaMinutos}min`;
    } else if (diferenciaSegundos > 0) {
        resultado.tiempoDiferenciaStr = `${diferenciaSegundos}seg`;
    }

    return resultado;
}
