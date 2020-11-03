import React from "react";
import Notification from "./../../reusable/Notification";
import API from "../../server/config/API";
import routesAPI from "../../server/config/routes";

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
  CSwitch,
  CTextarea,
} from "@coreui/react";
import CountryComboList from "../../reusable/comboBox/CountryComboList";
import CIcon from "@coreui/icons-react";

class CompanyEditBasic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      country_id: "",
      status: 0,
      isChecked: false,
      additional_info: "",
      notification: {
        type: "info",
        message: "",
      },
    };

    this.countrycombo = React.createRef();
  }

  componentDidMount() {
    API.get(`${routesAPI.companies.v1}/${this.props.id}`)
      .then((resp) => {
        this.setState({
          id: resp.data.id,
          name: resp.data.name,
          country_id: resp.data.country.id.toString(),
          status: resp.data.status === "active" ? 0 : 1,
          isChecked: resp.data.status === "active",
          additional_info: resp.data.additional_info,
        });
      })
      .catch((err) => console.log(err.message));
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChecked = () => {
    let isChecked = !this.state.isChecked;
    this.setState({
      status: isChecked ? 0 : 1,
      isChecked: isChecked,
    });
  };

  handleCountrySelected = (e) => {
    this.setState({ country_id: e });
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
        status: this.state.status,
        additional_info: this.state.additional_info,
      };

      API.put(`${routesAPI.companies.v1}/${this.state.id}`, params)
        .then((resp) => {
          if (resp.status === 200) {
            this.setState({
              notification: {
                type: "success",
                message: `Empresa ${this.state.name} actualizado correctamente`,
              },
            });
          } else {
            this.setState({
              notification: {
                type: "warning",
                message: `Empresa ${this.state.name} no puedo ser actualizado`,
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
    }

    e.preventDefault();
  };

  clearState = () => {
    this.setState({
      name: "",
      country_id: "",
    });
    this.countrycombo.current.clearSelect();
  };

  render() {
    return (
      <>
        <CRow>
          {this.state.notification.message && (
            <CCol xs="6">
              <Notification
                type={this.state.notification.type}
                message={this.state.notification.message}
              />
            </CCol>
          )}
          <CCol xs="6">
            <CCard>
              <CCardHeader>Editar Empresa</CCardHeader>
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
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel>Seleccione pais</CLabel>
                    <CountryComboList
                      key={this.state.country_id}
                      selectedCountry={this.state.country_id}
                      ref={this.countrycombo}
                      onChange={this.handleCountrySelected}
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel>Estado</CLabel>
                    <br />
                    <CSwitch
                      color="primary"
                      size="lg"
                      variant="3d"
                      checked={this.state.isChecked}
                      onChange={this.handleChecked}
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel>Información adicional</CLabel>
                    <CTextarea
                      name="additional_info"
                      onChange={this.handleChange}
                      value={this.state.additional_info}
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

export default CompanyEditBasic;
