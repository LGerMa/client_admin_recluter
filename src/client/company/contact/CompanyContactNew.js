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
import { freeSet } from "@coreui/icons";

import Notification from "./../../../reusable/Notification";
import API from "./../../../server/config/API";
import routesAPI from "./../../../server/config/routes";

class CompanyContactNew extends React.Component {
  initial_state = {
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
    this.setState({ modal: !this.state.modal });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = () => {
    let params = {
      contact_name: this.state.name,
      contact_phone: this.state.phone,
      contact_position: this.state.position,
      contact_email: this.state.email,
    };
    API.post(
      `${routesAPI.companies.v1}/${this.props.company_id}/${routesAPI.companies.company_contacts}`,
      params
    )
      .then((resp) => {
        this.setState({
          notification: {
            type: "info",
            message: `Contacto creado correctamente`,
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
          color="success"
          variant="outline"
          shape="square"
          size="sm"
          title="Agregar contacto"
          onClick={this.toggle}
        >
          <CIcon content={freeSet.cilPlus} />
        </CButton>
        <CModal show={this.state.modal} onClose={this.toggle}>
          <CModalHeader closeButton>Agregar contacto</CModalHeader>
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

export default CompanyContactNew;
