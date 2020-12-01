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

import DocumentTypeComboList from "./../../../reusable/comboBox/DocumentTypeComboList";

import Notification from "./../../../reusable/Notification";
import API from "./../../../server/config/API";
import routesAPI from "./../../../server/config/routes";
import handleCodes from "./../../../server/config/handleCodes";

class CompanyDocumentEdit extends React.Component {
  initial_state = {
    id: "",
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
      id: "",
      document_type_id: "",
      document_type_value: "",
      notification: {
        type: "info",
        message: "",
      },
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDocumentTypeSelected = (e) => {
    this.setState({ document_type_id: e });
  };

  toggle = () => {
    if (this.state.modal) this.setState(this.initial_state);

    if (!this.state.modal) this.fetchCompanyDocument();
    this.setState({ modal: !this.state.modal });
  };

  async fetchCompanyDocument() {
    let documentInfo = await API.get(
      `${routesAPI.companies.v1}/${this.props.company_id}/${routesAPI.companies.documents}/${this.props.document_id}`
    );

    if (documentInfo.status === handleCodes.ok) {
      this.setState({
        id: documentInfo.data.id,
        document_type_id: documentInfo.data.document_type.id,
        document_type_value: documentInfo.data.document_value,
      });
    } else {
      this.setState({
        notification: {
          type: "error",
          message: "Error al cargar el documento",
        },
      });
    }
  }

  handleSubmit = () => {
    let params = {
      document_value: this.state.document_type_value,
      document_type_id: this.state.document_type_id,
    };
    API.put(
      `${routesAPI.companies.v1}/${this.props.company_id}/${routesAPI.companies.documents}/${this.props.document_id}`,
      params
    )
      .then((resp) => {
        if (resp.status === handleCodes.ok) {
          this.setState({
            notification: {
              type: "info",
              message: `Documento actualizado correctamente`,
            },
          });
          this.props.rerenderParent();
        } else {
          this.setState({
            notification: {
              type: "warning",
              message: `Documento no pudo ser actualizado`,
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
          color="primary"
          variant="outline"
          shape="square"
          size="sm"
          title="Editar documento"
          onClick={this.toggle}
        >
          <CIcon name="cil-pencil" />
        </CButton>
        <CModal show={this.state.modal} onClose={this.toggle}>
          <CModalHeader closeButton>Editar documento</CModalHeader>
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
                  key={this.state.document_type_id}
                  selectedDocumentType={this.state.document_type_id}
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

export default CompanyDocumentEdit;
