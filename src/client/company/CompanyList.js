import React from "react";

import API from "../../server/config/API";
import routesAPI from "../../server/config/routes";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
} from "@coreui/react";

const companies_fields = [
  {
    key: "company_code",
    label: "Código de empresa",
    _style: { width: "20%" },
  },
  {
    key: "name",
    label: "Empresa",
    _style: { width: "20%" },
  },
  {
    key: "country",
    label: "Pais",
    _style: { width: "20%" },
  },
  {
    key: "status",
    label: "Estatus",
    _style: { width: "20%" },
  },
  {
    key: "actions",
    label: "Acciones",
    _style: { width: "20%" },
    filter: false,
  },
];

class CompanyList extends React.Component {
  state = {
    companies: [],
  };

  async componentDidMount() {
    let companies = await API.get(`${routesAPI.companies.v1}`);
    let companies_info = [];

    companies.data.forEach((company) => {
      let status = "";

      switch (company.status) {
        case "active":
          status = "Activo";
          break;
        case "inactive":
          status = "Inactivo";
          break;

        default:
          break;
      }

      companies_info.push({
        id: company.id,
        company_code: company.company_code,
        name: company.name,
        status: status,
        country: company.country.name,
      });
    });

    this.setState({ companies: companies_info });
  }

  render() {
    return (
      <>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>Lista de empresas</CCardHeader>
              <CCardBody>
                <CDataTable
                  items={this.state.companies}
                  fields={companies_fields}
                  itemsPerPage={15}
                  pagination
                  hover
                  tableFilter
                  scopedSlots={{
                    actions: (item, index) => {
                      return (
                        <td className="py-2">
                          <CButton
                            color="primary"
                            variant="outline"
                            shape="square"
                            size="sm"
                            href={`#/companies/edit/${item.id}`}
                          >
                            Editar
                          </CButton>
                        </td>
                      );
                    },
                  }}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
    );
  }
}

export default CompanyList;
