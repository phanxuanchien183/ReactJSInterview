import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Content = () => {
    const _isMounted = useRef(false);

    const [dataTable, setDataTable] = useState([])

    useEffect(() => {
        _isMounted.current = true;
        return () => {
            _isMounted.current = false;
        };
    }, []);

    //     const loadData = async () => {
    //         if (!_isMounted.current) return;
    //         // const result = await UsersService.GetPage();
    // console.log(UsersService.GetPage)
    //         // return result;
    //     };

    const loadData = useCallback(
        () => {
            if (_isMounted.current) {
                // loadData();
                axios.get(`https://65005b3318c34dee0cd4c697.mockapi.io/api/v1/users`)
                    .then(res => {
                        if (res.status === 200) {
                            setDataTable(res.data)
                        }
                    })
                    .catch(error => console.log(error));
            }
        },
        []
    );

    useEffect(() => {
        loadData()
    }, [loadData]);

    return (
        <div className='content col-md-10'>
            <div className="content_top row">
                <div className="col-md-12">
                    DASHBOARD
                </div>
                <hr />
                <div className="col-md-12">
                    <Stack spacing={2} direction="row">
                        <Button variant="contained">Add new</Button>
                    </Stack>
                </div>
                <dir className="col-md-12">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">ID</th>
                                <th scope="col">Username</th>
                                <th scope="col">Role</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {dataTable.map(({ name, value }, key) => (
                                <MenuItem key={key} value={value}>
                                    {name}
                                </MenuItem>
                            ))} */}

                            {dataTable.map((data, i) => {
                                return <tr>
                                    <th scope="row">{i + 1}</th>
                                    <td>{data.Id}</td>
                                    <td>{data.UserNames}</td>
                                    <td>{data.Role}</td>
                                    <td>{data.Delete ? "true" : "flase"}</td>
                                </tr>
                            })}

                        </tbody>
                    </table>
                </dir>
            </div>
        </div >
    )
}

export default memo(Content)