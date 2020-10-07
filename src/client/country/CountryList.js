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

const countries_fields = [
  {
    key: "name",
    label: "Pais",
    _style: { width: "40%" },
  },
  {
    key: "code",
    label: "Código Pais",
    _style: { width: "40%" },
  },
  {
    key: "actions",
    label: "Acciones",
    _style: { width: "20%" },
    filter: false,
  },
];

class CountryList extends React.Component {
  state = {
    countries: [],
    countryInfo: {},
  };

  async componentDidMount() {
    let countries = await API.get(`${routesAPI.countries.v1}`);
    this.setState({ countries: countries.data });
  }

  handleCountryInfo = (item) => {
    this.setState({ countryInfo: item });
  };

  render() {
    return (
      <>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>Lista de paises</CCardHeader>
              <CCardBody>
                <CDataTable
                  items={this.state.countries}
                  fields={countries_fields}
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
                            href={`#/countries/edit/${item.id}`}
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

export default CountryList;
