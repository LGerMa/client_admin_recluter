import React from "react";
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import Notification from "./../../../reusable/Notification";
import API from "./../../../server/config/API";
import routesAPI from "./../../../server/config/routes";

class CompanyContactEdit extends React.Component {
  initial_state = {
    id: "",
    name: "",
    email: "",
    phone: "",
    position: "",
    notification: {
      type: "info",
      message: "",
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      id: "",
      name: "",
      email: "",
      phone: "",
      position: "",
      notification: {
        type: "info",
        message: "",
      },
    };
  }

  toggle = () => {
    if (this.state.modal) this.setState(this.initial_state);

    if (!this.state.modal) this.fetchCompanyContact();
    this.setState({ modal: !this.state.modal });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  async fetchCompanyContact() {
    let contactInfo = await API.get(
      `${routesAPI.companies.v1}/${this.props.company_id}/${routesAPI.companies.company_contacts}/${this.props.contact_id}`
    );

    if (contactInfo.status === 200) {
      this.setState({
        id: contactInfo.data.id,
        name: contactInfo.data.contact_name,
        phone: contactInfo.data.contact_phone,
        email: contactInfo.data.contact_email,
        position: contactInfo.data.contact_position,
      });
    } else {
      this.setState({
        notification: {
          type: "error",
          message: "Error al cargar contacto",
        },
      });
    }
  }

  handleSubmit = () => {
    let params = {
      contact_name: this.state.name,
      contact_phone: this.state.phone,
      contact_position: this.state.position,
      contact_email: this.state.email,
    };

    API.put(
      `${routesAPI.companies.v1}/${this.props.company_id}/${routesAPI.companies.company_contacts}/${this.props.contact_id}`,
      params
    )
      .then((resp) => {
        this.setState({
          notification: {
            type: "info",
            message: `Contacto actualizado correctamente`,
          },
        });
        this.props.rerenderParent();
      })
      .catch((err) => {
        this.setState({
          notification: {
            type: "danger",
            message: err.message,
          },
        });
      });
  };

  render() {
    return (
      <>
        <CButton
          color="primary"
          variant="outline"
          shape="square"
          size="sm"
          title="Editar contacto"
          onClick={this.toggle}
        >
          <CIcon name="cil-pencil" />
        </CButton>
        <CModal show={this.state.modal} onClose={this.toggle}>
          <CModalHeader closeButton>Editar contacto</CModalHeader>
          <CModalBody>
            {this.state.notification.message && (
              <Notification
                type={this.state.notification.type}
                message={this.state.notification.message}
              />
            )}
            <CForm>
              <CFormGroup>
                <CLabel>Nombre</CLabel>
                <CInput
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel>Email</CLabel>
                <CInput
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel>Teléfono</CLabel>
                <CInput
                  type="text"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.handleChange}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel>Posición</CLabel>
                <CInput
                  type="text"
                  name="position"
                  value={this.state.position}
                  onChange={this.handleChange}
                />
              </CFormGroup>
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={this.handleSubmit}>
              Enviar
            </CButton>{" "}
            <CButton color="secondary" onClick={this.toggle}>
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>
      </>
    );
  }
}

export default CompanyContactEdit;
