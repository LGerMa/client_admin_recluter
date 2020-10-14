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

const banks_fields = [
  {
    key: "name",
    label: "Banco",
    _style: { width: "30%" },
  },
  {
    key: "country",
    label: "Pais",
    _style: { width: "30%" },
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

class BankList extends React.Component {
  state = {
    banks: [],
  };

  async componentDidMount() {
    let banks = await API.get(`${routesAPI.banks.v1}`);
    let banks_info = [];

    banks.data.forEach((bank) => {
      let status = "";

      switch (bank.status) {
        case "active":
          status = "Activo";
          break;
        case "inactive":
          status = "Inactivo";
          break;

        default:
          break;
      }

      banks_info.push({
        id: bank.id,
        name: bank.name,
        status: status,
        country: bank.country.name,
      });
    });

    this.setState({ banks: banks_info });
  }

  render() {
    return (
      <>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>Lista de bancos</CCardHeader>
              <CCardBody>
                <CDataTable
                  items={this.state.banks}
                  fields={banks_fields}
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
                            href={`#/banks/edit/${item.id}`}
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

export default BankList;
