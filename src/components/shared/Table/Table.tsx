import { responseTableExample } from '@/utils/dataTemp';
import React, { useEffect, useState } from 'react'
import DataTable, { defaultThemes, type TableColumn } from 'react-data-table-component'

export interface TableProps {
    api: string;
    customStyles?: any;
    pagination?: boolean;
    paginationPerPage?: number;
    paginationRowsPerPageOptions?: number[];
}

export default function Table({ api, customStyles, pagination = true, paginationPerPage = 10, paginationRowsPerPageOptions = [5, 10, 15, 20] }: TableProps) {

    const [data, setData] = useState([]);
    const [columns, setColumns] = useState<TableColumn<any>[]>([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await responseTableExample(api);
                setColumns(response.columns);
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [api]);

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
            paginationPerPage={paginationPerPage}
            paginationRowsPerPageOptions={paginationRowsPerPageOptions}
            customStyles={customStyles ? customStyles : styles}
            dense
        />
    );

}
