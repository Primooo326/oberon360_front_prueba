import DataTable from 'react-data-table-component';
import Llamadas from "@assets/img/img-asistencia/llamadas.png";
import type { IAsistencia } from '@/models/asistencia.model';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function TableAsistencia({ data }: { data: IAsistencia[] }) {

    const customStyles = {
        rows: {
            style: {
                minHeight: '72px', // override the row height
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                color: "#00e7ff",
                backgroundColor: "transparent",

            },
        },
        head: {
            style: {
                fontSize: "18px",
                backgroundImage: "linear-gradient(to right,rgba(16, 26, 50, 1),rgba(0, 82, 118, 1))",
                borderRadius: "10px",
            }
        },
        headRow: {
            style: {
                backgroundColor: "linear-gradient(90deg, rgba(0,231,255,1) 0%, rgba(0,255,255,1) 100%)",
                borderRadius: "10px",
            }
        },
        header: {
            style: {
                backgroundColor: "transparent",

                fontSize: '22px',
                minHeight: '56px',
                paddingLeft: '16px',
                paddingRight: '8px',
            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
            },
        },
    };
    const handleLlamar = () => {
        toast.promise(
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("Llamada realizada")
                }, 2000)
            }),
            {
                pending: 'Llamando...',
                success: 'Llamada realizada',
                error: 'Error al realizar la llamada'
            }
        )
    };
    const columns = [
        { name: "ASISTENCIA ID", selector: (row: any) => row.ASISTENCIA_ID, sortable: true },
        { name: "EMPLEADO ID", selector: (row: any) => row.ASISTENCIA_EMPLEADOID, sortable: true },
        { name: "FECHA ASIS", selector: (row: any) => row.ASISTENCIA_FECHA, sortable: true },
        { name: "HORA ASIS", selector: (row: any) => row.ASISTENCIA_HORA, sortable: true },
        { name: "FECHA CIERRE", selector: (row: any) => row.ASISTENCIA_FECHAC, sortable: true },
        { name: "HORA CIERRE", selector: (row: any) => row.ASISTENCIA_HORAC, sortable: true },
        { name: "ID PUESTO", selector: (row: any) => row.ASISTENCIA_IDPUESTO, sortable: true },
        { name: "DESCRIPCION P", selector: (row: any) => row.COPTO_DESCRIPCION, sortable: true },
        { name: "CARGO", selector: (row: any) => row.ASISTENCIA_CARGOID, sortable: true },
        { name: "CLIENTE", selector: (row: any) => row.CLIE_NOMBRE, sortable: true },
        { name: "UBICACION", selector: (row: any) => row.CLIUBIC_DIRECCION, sortable: true },
        { name: "DIRECCION", selector: (row: any) => row.CLIUBIC_DIRECCION, sortable: true },
        { name: "FEC_PROG", selector: (row: any) => row.CLIUBIC_DIRECCION, sortable: true },
        { name: "HORA_PROG", selector: (row: any) => row.HORA_HORAINI, sortable: true },
        { name: "FEC_FIN", selector: (row: any) => row.ASISTENCIA_FECHAC, sortable: true },
        { name: "HORA_FIN", selector: (row: any) => row.HORA_FECFIN, sortable: true },
        { name: "INCIDENCIA", selector: (row: any) => row.HORA_INCIDENCIA, sortable: true },
        { name: "ESTADO_ASIST", selector: (row: any) => row.ESTADO_ASISTENCIA, sortable: true },
        {
            name: "LLAMAR", selector: () => <img src={Llamadas} style={{ width: "100px" }} onClick={handleLlamar} alt='llamar' />
            , sortable: true
        },
    ]

    useEffect(() => { }, [data])


    return (
        <>
            <DataTable
                columns={columns}
                data={data}
                pagination
                customStyles={customStyles}
                fixedHeader={true}
                fixedHeaderScrollHeight={"600px"}
            />
        </>
    )
}
