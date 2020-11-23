import React from "react";

import API from "../../../server/config/API";
import routesAPI from "../../../server/config/routes";

import CompanyDocumentNew from "./CompanyDocumentNew";
import CompanyDocumentEdit from "./CompanyDocumentEdit";

import { CCard, CCardBody, CCardHeader, CDataTable } from "@coreui/react";

class CompanyDocumentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyDocuments: [],
    };
  }

  companyDocumentListRefresh = () => {
    this.fetchCompanyDocuments();
  };

  componentDidMount() {
    this.fetchCompanyDocuments();
  }

  async fetchCompanyDocuments() {
    let company_documents = await API.get(
      `${routesAPI.companies.v1}/${this.props.company_id}/${routesAPI.companies.documents}`
    );

    let documentsInfo = [];

    company_documents.data.forEach((document) => {
      documentsInfo.push({
        id: document.id,
        document_type: document.document_type.doc_type,
        document_value: document.document_value,
      });
    });

    this.setState({ companyDocuments: documentsInfo });
  }

  document_fields = [
    {
      key: "document_type",
      label: "Tipo de documento",
    },
    {
      key: "document_value",
      label: "Documento",
    },
    {
      key: "actions",
      label: "Acciones",
      filter: false,
    },
  ];

  render() {
    return (
      <>
        <CCard>
          <CCardHeader>
            Lista de documentos
            <div className="card-header-actions">
              <CompanyDocumentNew
                company_id={this.props.company_id}
                rerenderParent={this.companyDocumentListRefresh}
              />
            </div>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={this.state.companyDocuments}
              fields={this.document_fields}
              itemsPerPage={5}
              pagination
              hover
              tableFilter
              scopedSlots={{
                actions: (item, index) => {
                  return (
                    <td className="py-2">
                      <CompanyDocumentEdit
                        company_id={this.props.company_id}
                        document_id={item.id}
                        rerenderParent={this.companyDocumentListRefresh}
                      />
                    </td>
                  );
                },
              }}
            />
          </CCardBody>
        </CCard>
      </>
    );
  }
}

export default CompanyDocumentList;
