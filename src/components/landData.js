import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import landservices from '../services/land'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../css/loader.css'

export default function LandData() {
    const params = useParams();
    const [rowData, setRowData] = useState([]);
    const [gridApi, setGridApi] = useState(null);
    const navigate = useNavigate();
    let [total, setTotal] = useState();

    function backHome() {
        navigate('/');
    }


    useEffect(() => {
        if(gridApi) {
            gridApi.showLoadingOverlay();
            landservices.getById(params.id, params.date_start, params.date_end).then(data => {
                let calcul = 0;
                for(let i = 0; i < data.data.contribution.length; i++) {
                    calcul = calcul + data.data.contribution[i].total;
                    setTotal(calcul);
                }
                setRowData(data.data.contribution);
                console.log(data.data);
                gridApi.hideOverlay();
            }).catch(err => {
                console.error(err);
                gridApi.showNoRowsOverlay();
            })
        }
    }, [gridApi])

    const onGridReady = (params) => {
        setGridApi(params.api);
    }

    const nameFilterParams = {
        filterOptions: ['contains', 'notContains'],
        textFormatter: (r) => {
          if (r == null) return null;
          return r
            .toLowerCase()
            .replace(/[àáâãäå]/g, 'a')
            .replace(/æ/g, 'ae')
            .replace(/ç/g, 'c')
            .replace(/[èéêë]/g, 'e')
            .replace(/[ìíîï]/g, 'i')
            .replace(/ñ/g, 'n')
            .replace(/[òóôõö]/g, 'o')
            .replace(/œ/g, 'oe')
            .replace(/[ùúûü]/g, 'u')
            .replace(/[ýÿ]/g, 'y');
        },
        debounceMs: 200,
        suppressAndOrCondition: true,
      };

    const [columnDefs, setColumnDefs] = useState([
        {headerName: 'Kingdom ID', field: 'kingdomId'},
        {headerName: 'Name', field: 'name', filterParams: nameFilterParams},
        {headerName: 'Dev Points', field: 'total'},
        {headerName: 'Continent Player', field: 'continent'}
    ]);

    const defaultColDef = useMemo(() => {
        return {
            sortable: true,
            flex: 1,
            minWidth: 50,
            filter: true,
        }
    }, [])

    

      

    return (
        <>
        <div className="appbar" style={{marginBottom: "2%"}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: "1"}}>
                        <Button onClick={backHome} color='inherit'>Land Contribution</Button>
                    </Typography>
                    <Button style={{ marginRight: "5%"}} color='inherit' onClick={backHome}> go back </Button>
                </Toolbar>
            </AppBar>
        </div>
        <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                overlayLoadingTemplate={
                    "<div class='loader'></div>"
                }
                overlayNoRowsTemplate={
                    '<span className="ag-overlay-loading-center">No data (be sure you put a good id for the land)</span>'
                }
                onGridReady={onGridReady}
            >
            </AgGridReact>
        </div>
        <p>Total of how many dev points this land earn between {params.date_start} and {params.date_end} : {total}.</p>
        </>
    )
}