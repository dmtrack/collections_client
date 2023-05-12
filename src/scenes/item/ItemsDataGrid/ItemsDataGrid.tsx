import { FC } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { dateFormat, timestampToDateTime } from '../../../utils/functions';
import { NameCell } from './NameCell';
import { TextCell } from './TextCell';
import { mdToString } from '../../../components/Markdown/mdToString';
import { DateCell } from './DateCell';
import { useTranslation } from 'react-i18next';
import { ToolBar } from './ToolBar';
import { IItem } from '../../../models/IItem';
import { ItemConfigType } from '../../../state/models/ICollection.state';

interface ItemsDataGridProps {
    itemConfigs: ItemConfigType[];
    items: IItem[];
    loading?: boolean;
}

export const ItemsDataGrid: FC<ItemsDataGridProps> = ({
    itemConfigs,
    items,
    loading,
}) => {
    const { t } = useTranslation('translation', { keyPrefix: 'items' });
    const navigate = useNavigate();
    const filteredConfigs = itemConfigs.filter((config) => !config.hidden);

    const getColumnConfig = (type: string): Omit<GridColDef, 'field'> => {
        if (type.includes('str')) {
            return {
                renderCell: (params) => <TextCell source={params.row[type]} />,
            };
        }
        if (type.includes('bool')) {
            return { type: 'boolean', minWidth: 150 };
        }
        if (type.includes('numb')) {
            return { type: 'number', minWidth: 100 };
        }
        if (type.includes('date')) {
            return {
                type: 'date',
                minWidth: 120,
                valueFormatter: (params) => dateFormat(params.value),
                renderCell: (params) => <DateCell params={params} />,
            };
        }
        if (type.includes('txt')) {
            return {
                renderCell: (params) => (
                    <TextCell source={mdToString(params.row[type])} />
                ),
            };
        }
        return { type: 'string' };
    };

    const defaultColumn: GridColDef[] = [
        {
            field: 'name',
            minWidth: 200,
            headerName: t('itemName') || '',
            renderCell: (params) => <NameCell params={params} />,
        },
        {
            field: 'timestamp',
            minWidth: 140,
            headerName: t('date') || '',
            valueFormatter: (params) => timestampToDateTime(params.value),
            renderCell: (params) => <DateCell params={params} />,
        },
    ];
    const columns: GridColDef[] = filteredConfigs.map((config) => ({
        field: config.type,
        headerName: config.label,
        minWidth: 200,
        flex: 1,
        ...getColumnConfig(config.type),
    }));

    return (
        <Box width='100%' mt={3}>
            <DataGrid
                rowSpacingType='margin'
                getRowHeight={({ model }) =>
                    Math.ceil(model.name.length / 24) * 23 + 23
                }
                columns={[...defaultColumn, ...columns]}
                rows={items}
                onRowClick={(row) => navigate(`/items/${row.id}`)}
                disableRowSelectionOnClick
                autoHeight
                loading={loading}
                slots={{ toolbar: ToolBar, loadingOverlay: LinearProgress }}
            />
        </Box>
    );
};
