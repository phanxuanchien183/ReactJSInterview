import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ModalAdd from "./ModalAdd";
import ModalCustomChoice from "../ComponentGeneral/ModalCustomChoice";

import {
  Alert,
  Autocomplete,
  LinearProgress,
  Snackbar,
  TextField,
} from "@mui/material";

const Content = () => {
  const _isMounted = useRef(false);
  const _modalChoiseRef = useRef(false);

  const [dataTable, setDataTable] = useState([]),
    [isModalAdd, setIsModalAdd] = useState(false),
    [isLoad, setIsLoad] = useState(false),
    [dataRoles, setDataRoles] = useState([]),
    [page, setPage] = useState({
      pageSize: 10,
      pageNumber: 1,
      pageTotalPage: 0,
    }),
    [filter, setFilter] = useState({
      Id: "",
      UserNames: "",
      Role: null,
    }),
    [dataId, setDataId] = useState(null),
    [open, setOpen] = useState(false),
    [dataDelete, setDataDelete] = useState(null);

  useEffect(() => {
    _isMounted.current = true;
    return () => {
      _isMounted.current = false;
    };
  }, []);

  function paginate(array, page_size, page_number) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }

  const loadData = useCallback(() => {
    if (_isMounted.current) {
      setIsLoad(true);
      axios
        .get(`https://65012c42736d26322f5b5c6a.mockapi.io/api/v1/users`)
        .then((res) => {
          if (res.status === 200) {
            setPage((state) => ({
              ...state,
              pageTotalPage: Math.ceil(res.data.length / 10),
            }));
            // const datas = paginate(res.data, page.pageSize, page.pageNumber);
            setDataTable(paginate(res.data, page.pageSize, page.pageNumber));
          }
        })
        .catch((error) => console.log(error));

      axios
        .get(`https://65012c42736d26322f5b5c6a.mockapi.io/api/v1/roles`)
        .then((res) => {
          if (res.status === 200) {
            setDataRoles(res.data);
          }
        })
        .catch((error) => console.log(error));
      setIsLoad(false);
    }
  }, [page.pageNumber, page.pageSize]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onOpenModal = (Id) => {
      if (Id !== undefined) {
        setDataId(Id);
      }
      setIsModalAdd(true);
    },
    onCloseModal = (res) => {
      if (res.status === 201) {
        setOpen(true);

        loadData();
      }
      setDataId(null);
      setIsModalAdd(false);
    },
    nextPage = () => {
      if (_isMounted.current)
        if (
          page.pageTotalPage === page.pageNumber ||
          page.pageNumber < page.pageTotalPage
        )
          setPage((state) => ({
            ...state,
            pageNumber: page.pageNumber + 1,
          }));
    },
    backPage = () => {
      if (_isMounted.current)
        if (page.pageNumber > 1)
          setPage((state) => ({
            ...state,
            pageNumber: page.pageNumber - 1,
          }));
    },
    onChange = (e, value) => {
      if (_isMounted.current)
        setFilter((state) => ({
          ...state,
          [value]: e !== "" ? e : "",
        }));
    },
    onSearch = () => {
      if (_isMounted.current) {
        setIsLoad(true);

        axios
          .get(`https://65012c42736d26322f5b5c6a.mockapi.io/api/v1/users`)
          .then((res) => {
            if (res.status === 200) {
              var result = res.data;
              if (filter.Id !== "") {
                result = result.filter((x) => x.Id == filter.Id);
              }

              if (filter.UserNames !== "") {
                result = result.filter((x) => x.UserNames == filter.UserNames);
              }

              if (filter.Role !== null) {
                result = result.filter((x) => x.Role == filter.Role.RoleCode);
              }
              setIsLoad(false);
              setPage((state) => ({
                ...state,
                pageTotalPage: Math.ceil(result.length / 10),
              }));
              //   setDataTable(result);
              setDataTable(paginate(result, page.pageSize, 1));
            }
          })
          .catch((error) => console.log(error));
      }
    },
    onClear = () => {
      if (_isMounted.current) {
        setIsLoad(true);

        setFilter((state) => ({
          ...state,
          Id: "",
          UserNames: "",
          Role: null,
        }));
        setIsLoad(false);

        loadData();
      }
    },
    onOpenModalDelete = (data) => {
      if (_isMounted.current && data) {
        setDataDelete(data);
        _modalChoiseRef.current.setError?.();
        _modalChoiseRef.current?.onOpenModal?.(true);
      }
    },
    onSubmitModalDelete = () => {
      if (_isMounted.current) {
        setIsLoad(true);

        axios
          .delete(
            `https://65012c42736d26322f5b5c6a.mockapi.io/api/v1/users/${dataDelete?.id}`
          )
          .then((res) => {
            if (res.status === 200) {
              setOpen(true);
              _modalChoiseRef.current.onCloseModal?.();
              setIsLoad(true);

              loadData();
            }
          })
          .catch((error) => console.log(error));
      }
    };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="content m-4">
      <div className="content_top row">
        <div className="col-md-12 row align-items-center p-1">
          <div className="col-md-5 row align-items-center">
            <div className="col-md-2">
              <label>Id</label>
            </div>
            <div className="col-md-10">
              <TextField
                value={filter.Id}
                onChange={(e) => onChange(e.target.value, "Id")}
                type="number"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </div>
          </div>
          <div className="col-md-5 row align-items-center">
            <div className="col-md-2 right">
              <label>Role</label>
            </div>
            <div className="col-md-10">
              <Autocomplete
                fullWidth
                disablePortal
                getOptionLabel={(option) => option.RoleName}
                id="combo-box-demo"
                onChange={(event, newValue) => {
                  onChange(newValue, "Role");
                }}
                options={dataRoles}
                // sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
        <div className="col-md-12 row  p-1">
          <div className="col-md-5 row align-items-center">
            <div className="col-md-2">
              <label>Username</label>
            </div>
            <div className="col-md-10">
              <TextField
                value={filter.UserNames}
                onChange={(e) => onChange(e.target.value, "UserNames")}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </div>
          </div>
          <div className="col-md-5"></div>
          <div className="col-md-2">
            <Stack spacing={2} direction="row">
              <Button onClick={onSearch} variant="contained">
                Search
              </Button>
              <Button onClick={onClear} variant="contained" color="inherit">
                Clear
              </Button>
            </Stack>
          </div>
        </div>
        <hr />
        <div className="col-md-12 row">
          <div className="col-md-6">
            <Stack spacing={2} direction="row">
              <Button onClick={() => onOpenModal()} variant="contained">
                Add new
              </Button>
            </Stack>
          </div>
          <div className="col-md-6 right">
            <img
              onClick={backPage}
              src={"assets/icon/left-arrow.svg"}
              alt="arrow-down"
              width={40}
              height={40}
            />
            {page.pageNumber}/{page.pageTotalPage}
            <img
              onClick={nextPage}
              src={"assets/icon/right-arrow.svg"}
              alt="arrow-down"
              width={40}
              height={40}
            />
          </div>
        </div>
        <dir className="col-md-12 table-wrapper-scroll-y my-custom-scrollbar">
          {isLoad && <LinearProgress />}
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
              {dataTable.length > 0 ? (
                dataTable.map((data) => {
                  return (
                    <tr key={data.id}>
                      <th scope="row">{data.id}</th>
                      <td>{data.Id}</td>
                      <td>{data.UserNames}</td>
                      <td>
                        {
                          dataRoles?.find((x) => x.RoleCode === data.Role)
                            ?.RoleName
                        }
                      </td>
                      <td>
                        <Stack spacing={2} direction="row">
                          <Button
                            onClick={() => onOpenModal(data.id)}
                            variant="contained"
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => onOpenModalDelete(data)}
                            variant="contained"
                            color="error"
                          >
                            Delete
                          </Button>
                        </Stack>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td className="text-center text-muted" colSpan={5}>
                    No Data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <Stack spacing={2} sx={{ width: "100%" }}>
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Success!
              </Alert>
            </Snackbar>
          </Stack>
          <ModalAdd
            Id={dataId}
            isShow={isModalAdd}
            onCloseModal={onCloseModal}
            modalSize={"lg"}
          />
          <ModalCustomChoice
            refs={_modalChoiseRef}
            title={"Confirm delete"}
            question={`Do you want to delete user ${dataDelete?.UserNames}`}
            onSubmitButtonClick={() => onSubmitModalDelete()}
          />
        </dir>
      </div>
    </div>
  );
};

export default Content;
