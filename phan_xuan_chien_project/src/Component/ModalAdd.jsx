import { useEffect, useRef, memo, useState, useCallback } from "react";
import Button from "@mui/material/Button";
import Modal from "../ComponentGeneral/Modal/Modal";
import { Autocomplete, Stack, TextField } from "@mui/material";
import "../scss/ModalAdd.styles.scss";
import axios from "axios";
import PropTypes from "prop-types";

const ModalAdd = (props) => {
  const { isShow, onCloseModal, modalSize, Id } = props;
  const _isMounted = useRef();
  const [dataRoles, setDataRoles] = useState([]);

  const [data, setData] = useState({
    Id: null,
    UserNames: null,
    Delete: null,
    Confirm: null,
    Role: null,
  });

  useEffect(() => {
    _isMounted.current = true;
    return () => {
      _isMounted.current = false;
    };
  }, []);

  const loadData = useCallback(() => {
    if (_isMounted.current && isShow) {
      axios
        .get(`https://65012c42736d26322f5b5c6a.mockapi.io/api/v1/roles`)
        .then((res) => {
          if (res.status === 200) {
            setDataRoles(res.data);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [isShow]);

  useEffect(() => {
    if (_isMounted.current && isShow) loadData();
  }, [isShow, loadData]);

  useEffect(() => {
    if (_isMounted.current && isShow) {
      if (Id !== null) {
        axios
          .get(`https://65012c42736d26322f5b5c6a.mockapi.io/api/v1/users/${Id}`)
          .then((res) => {
            if (res.status === 200) {
              const data = res.data;
              const obj = {
                Confirm: data.Confirm,
                Id: data.Id,
                UserNames: data.UserNames,
                Password: data.Password,
                Role: dataRoles.find((x) => x.RoleCode === data.Role),
                id: data.id,
              };
              setData(obj);
            }
          })
          .catch((error) => console.log(error));
      } else {
        setData({
          Id: null,
          UserNames: null,
          Delete: null,
          Confirm: null,
          Role: null,
        });
      }
    }
  }, [Id, dataRoles, isShow]);

  const onChange = (e, value) => {
      if (_isMounted.current && isShow)
        setData((state) => ({
          ...state,
          [value]: e,
        }));
    },
    onSubmit = () => {
      if (_isMounted.current && isShow) {
        const obj = {
          Id: data.Id,
          UserNames: data.UserNames,
          Delete: data.Delete,
          Confirm: data.Confirm,
          Role: data.Role.RoleCode,
          Password: data.Password,
        };
        if (Id) {
          axios
            .put(
              `https://65012c42736d26322f5b5c6a.mockapi.io/api/v1/users/${Id}`,
              obj
            )
            .then((res) => {
              if (res.status === 200) {
                onCloseModal(res);
              }
            })
            .catch((error) => console.log(error));
        } else {
          axios
            .post(
              `https://65012c42736d26322f5b5c6a.mockapi.io/api/v1/users`,
              obj
            )
            .then((res) => {
              if (res.status === 201) {
                onCloseModal(res);
              }
            })
            .catch((error) => console.log(error));
        }
      }
    };

  return (
    <Modal
      componentModalID={"ModalAdd"}
      isAnimation={true}
      isShow={isShow}
      // isLoading={isLoading}
      modalSize={modalSize}
      isScrollable={true}
      renderHeaderModal={() => <>{Id ? "Edit User" : "Add User"}</>}
      renderBodyModal={() => (
        <div className="p-1">
          <div className="col-md-12 row p-1 align-items-center">
            <div className="col-md-3">
              <label>Id</label>
            </div>
            <div className="col-md-9">
              <TextField
                disabled={Id ? true : false}
                onChange={(e) => onChange(e.target.value, "Id")}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={data.Id ?? ""}
              />
            </div>
          </div>
          <div className="col-md-12 row p-1 align-items-center">
            <div className="col-md-3">
              <label>Username</label>
            </div>
            <div className="col-md-9">
              <TextField
                onChange={(e) => onChange(e.target.value, "UserNames")}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={data.UserNames ?? ""}
              />
            </div>
          </div>
          <div className="col-md-12 row p-1 align-items-center">
            <div className="col-md-3">
              <label>Password</label>
            </div>
            <div className="col-md-9">
              <TextField
                onChange={(e) => onChange(e.target.value, "Password")}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={data.Password ?? ""}
              />
            </div>
          </div>
          <div className="col-md-12 row p-1 align-items-center">
            <div className="col-md-3">
              <label>Confirm</label>
            </div>
            <div className="col-md-9">
              <TextField
                onChange={(e) => onChange(e.target.value, "Confirm")}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={data.Confirm ?? ""}
              />
            </div>
          </div>
          <div className="col-md-12 row p-1 align-items-center">
            <div className="col-md-3">
              <label>Role</label>
            </div>
            <div className="col-md-9">
              <Autocomplete
                fullWidth
                disablePortal
                getOptionLabel={(option) => option.RoleName}
                id="combo-box-demo"
                onChange={(event, newValue) => {
                  onChange(newValue, "Role");
                }}
                value={data.Role}
                options={dataRoles}
                // sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
          </div>
        </div>
      )}
      renderFooterModal={() => (
        <div>
          <Stack spacing={2} direction="row">
            <Button onClick={onSubmit} variant="contained">
              Save
            </Button>
            <Button onClick={onCloseModal} variant="contained" color="error">
              Cancel
            </Button>
          </Stack>
        </div>
      )}
    />
  );
};

ModalAdd.propTypes = {
  modalSize: PropTypes.string.isRequired,
  Id: PropTypes.string.isRequired,
  isShow: PropTypes.bool,
  onCloseModal: PropTypes.string,
};

export default memo(ModalAdd);
