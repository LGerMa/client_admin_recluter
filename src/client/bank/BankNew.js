import React from "react";

import {
  CButton,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CFormGroup,
  CLabel,
  CInput,
  CForm,
} from "@coreui/react";

import CountryComboList from "../../reusable/comboBox/CountryComboList";
import CIcon from "@coreui/icons-react";
import Notification from "./../../reusable/Notification";

import API from "./../../server/config/API";
import routesAPI from "../../server/config/routes";

class BankNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      country_id: "",
      notification: {
        type: "info",
        message: "",
      },
    };
    this.countrycombo = React.createRef();
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCountrySelected = (e) => {
    this.setState({ country_id: e });
  };

  clearState = () => {
    this.setState({
      name: "",
      country_id: "",
    });
    this.countrycombo.current.clearSelect();
  };

  handleSubmit = (e) => {
    if (this.state.country_id === "" || this.state.country_id === "0") {
      this.setState({
        notification: {
          type: "warning",
          message: "Debes seleccionar un pais",
        },
      });
    } else {
      let params = {
        name: this.state.name,
        country_id: this.state.country_id,
      };

      API.post(`${routesAPI.banks.v1}`, params)
        .then((resp) => {
          let data = resp.data;
          this.setState({
            notification: {
              type: "info",
              message: `Banco ${data.name} creado correctamente`,
            },
          });

          this.clearState();
        })
        .catch((err) => {
          this.setState({
            notification: {
              type: "danger",
              message: err.message,
            },
          });
        });

      e.target.reset();
    }

    e.preventDefault();
  };
  render() {
    return (
      <>
        <CRow>
          {this.state.notification.message && (
            <CCol xs="8">
              <Notification
                type={this.state.notification.type}
                message={this.state.notification.message}
              />
            </CCol>
          )}
          <CCol xs="8">
            <CCard>
              <CCardHeader>Crear banco</CCardHeader>
              <CCardBody>
                <CForm onSubmit={this.handleSubmit}>
                  <CFormGroup>
                    <CLabel>Nombre</CLabel>
                    <CInput
                      type="text"
                      name="name"
                      onChange={this.handleChange}
                      required
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel>Seleccione pais</CLabel>
                    <CountryComboList
                      ref={this.countrycombo}
                      onChange={this.handleCountrySelected}
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CButton type="submit" size="sm" color="primary">
                      <CIcon name="cil-scrubber" /> Enviar
                    </CButton>{" "}
                    <CButton type="reset" size="sm" color="danger">
                      <CIcon name="cil-ban" /> Limpiar
                    </CButton>
                  </CFormGroup>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
    );
  }
}

export default BankNew;
