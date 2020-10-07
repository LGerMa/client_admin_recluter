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
import API from "../../server/config/API";
import routesAPI from "../../server/config/routes";

class CountryEdit extends React.Component {
  state = {
    id: "",
    name: "",
    code: "",
    notification: {
      type: "info",
      message: "",
    },
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    let params = {
      name: this.state.name,
      code: this.state.code,
    };

    API.put(`${routesAPI.countries.v1}/${this.state.id}`, params)
      .then((resp) => {
        if (resp.status === 200) {
          this.setState({
            notification: {
              type: "success",
              message: `Pais ${this.state.name} actualizado correctamente`,
            },
          });
        } else {
          this.setState({
            notification: {
              type: "warning",
              message: `Pais ${this.state.name} no puedo ser actualizado`,
            },
          });
        }
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
  };

  componentDidMount() {
    API.get(`${routesAPI.countries.v1}/${this.props.match.params.id}`)
      .then((resp) => {
        this.setState({
          id: resp.data.id,
          name: resp.data.name,
          code: resp.data.code,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

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
                      value={this.state.name}
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
                      value={this.state.code}
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

export default CountryEdit;
