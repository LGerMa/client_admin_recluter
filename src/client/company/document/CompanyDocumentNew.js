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

import DocumentTypeComboList from "./../../../reusable/comboBox/DocumentTypeComboList";

import Notification from "./../../../reusable/Notification";
import API from "./../../../server/config/API";
import routesAPI from "./../../../server/config/routes";

class CompanyDocumentNew extends React.Component {
  initial_state = {
    document_type_id: "",
    document_type_value: "",
    notification: {
      type: "info",
      message: "",
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      document_type_id: "",
      document_type_value: "",
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

  handleDocumentTypeSelected = (e) => {
    this.setState({ document_type_id: e });
  };

  handleSubmit = () => {
    let params = {
      document_value: this.state.document_type_value,
      document_type_id: this.state.document_type_id,
    };
    API.post(
      `${routesAPI.companies.v1}/${this.props.company_id}/${routesAPI.companies.documents}`,
      params
    )
      .then((resp) => {
        if (resp.status === 201) {
          this.setState({
            notification: {
              type: "info",
              message: `Documento creado correctamente`,
            },
          });
          this.props.rerenderParent();
        } else {
          this.setState({
            notification: {
              type: "warning",
              message: `Documento no pudo ser creado`,
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
  };

  render() {
    return (
      <>
        <CButton
          color="success"
          variant="outline"
          shape="square"
          size="sm"
          title="Agregar documentp"
          onClick={this.toggle}
        >
          <CIcon content={freeSet.cilPlus} />
        </CButton>
        <CModal show={this.state.modal} onClose={this.toggle}>
          <CModalHeader closeButton>Agregar documento</CModalHeader>
          <CModalBody>
            {this.state.notification.message && (
              <Notification
                type={this.state.notification.type}
                message={this.state.notification.message}
              />
            )}
            <CForm>
              <CFormGroup>
                <CLabel>Seleccione tipo de documento</CLabel>
                <DocumentTypeComboList
                  onChange={this.handleDocumentTypeSelected}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel>Valor</CLabel>
                <CInput
                  type="text"
                  name="document_type_value"
                  value={this.state.document_type_value}
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

export default CompanyDocumentNew;
