import DataTable, { defaultThemes, type TableProps, type TableColumn } from 'react-data-table-component'

export interface CustomTableProps {
    data: any;
    columns: TableColumn<any>[];
    customStyles?: any;
    propsDataTable?: TableProps<any>;
}

export default function Table({ data, columns, customStyles, propsDataTable }: CustomTableProps) {



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
    const propsTable: TableProps<any> = {
        columns: [],
        data: [],
        pagination: true,
        paginationPerPage: 10,
        paginationRowsPerPageOptions: [5, 10, 15, 20],
        customStyles: customStyles ? customStyles : styles,
        dense: true
    }

    return (
        <DataTable
            {...propsTable}
            columns={columns}
            data={data}
            progressComponent={<div>Loading...</div>}
            noDataComponent={<div>No data</div>}
        />
    );

}
