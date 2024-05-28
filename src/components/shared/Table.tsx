import React from 'react'
import DataTable, { defaultThemes, type TableColumn } from 'react-data-table-component'

interface TableProps {

    columns: TableColumn<any>[],
    data: any[],
    customStyles?: any,
    pagination?: boolean,
    paginationPerPage?: number,
    paginationRowsPerPageOptions?: number[],
    [key: string]: any

}

export default function Table({ columns, data, customStyles, pagination = true, paginationPerPage = 10, paginationRowsPerPageOptions = [5, 10, 15, 20], ...props }: TableProps) {

    const styles: any = {
        header: {
            style: {
                minHeight: '56px',
                fontSize: '14px',
                fontWeight: 'bold',
            },
        },
        headRow: {
            style: {
                borderTopStyle: 'solid',
                borderTopWidth: '1px',
                borderTopColor: defaultThemes.default.divider.default,

            },
        },
        headCells: {
            style: {
                fontWeight: 'semi-bold',
                fontSize: '20px',
                borderRightStyle: 'solid',
                borderRightWidth: '1px',
                borderRightColor: defaultThemes.default.divider.default,
                borderLeftStyle: 'solid',
                borderLeftWidth: '1px',
                borderLeftColor: defaultThemes.default.divider.default,
                height: '56px',
            },
        },
        cells: {
            style: {
                borderRightStyle: 'solid',
                borderRightWidth: '1px',
                borderRightColor: defaultThemes.default.divider.default,
                borderLeftStyle: 'solid',
                borderLeftWidth: '1px',
                borderLeftColor: defaultThemes.default.divider.default,
                height: '56px',
            },
        },
    };

    return (
        <DataTable
            columns={columns}
            data={data}
            pagination={pagination}
            paginationPerPage={10}
            paginationRowsPerPageOptions={paginationRowsPerPageOptions}
            customStyles={customStyles ? customStyles : styles}
            dense
            className={`${props.className}`}
        />
    );

}
