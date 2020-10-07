import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CFormText,
  CLabel,
  CRow,
  CInput,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Notification from "./../../reusable/Notification";

import API from "./../../server/config/API";
import routesAPI from "../../server/config/routes";

class CountryNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      code: "",
      notification: {
        type: "info",
        message: "",
      },
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    API.post(`${routesAPI.countries.v1}`, this.state)
      .then((resp) => {
        let data = resp.data;
        this.setState({
          notification: {
            type: "info",
            message: `Pais ${data.name} creado correctamente`,
          },
        });
      })
      .catch((err) => {
        this.setState({
          notification: {
            type: "danger",
            message: err.message,
          },
        });
      });
    e.preventDefault();
    e.target.reset();
  };

  render() {
    return (
      <>
        <CRow>
          <CCol xs="8"></CCol>
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
              <CCardHeader>Crear pais</CCardHeader>
              <CCardBody>
                <CForm onSubmit={this.handleSubmit}>
                  <CFormGroup>
                    <CLabel>Nombre</CLabel>
                    <CInput
                      type="text"
                      name="name"
                      value={this.state.value}
                      onChange={this.handleChange}
                      required
                    />
                    <CFormText className="help-block">
                      Nombre del pais, Ej. El Salvador
                    </CFormText>
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel>Codigo de pais</CLabel>
                    <CInput
                      type="text"
                      name="code"
                      value={this.state.value}
                      onChange={this.handleChange}
                      required
                    />
                    <CFormText className="help-block">
                      Codigo de pais, Ej. SV
                    </CFormText>
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

export default CountryNew;
