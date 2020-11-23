import React from "react";

import API from "../../../server/config/API";
import routesAPI from "../../../server/config/routes";

import CompanyContactNew from "./CompanyContactNew";
import CompanyContactEdit from "./CompanyContactEdit";
import { CCard, CCardBody, CCardHeader, CDataTable } from "@coreui/react";

class CompanyContactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyContacts: [],
    };
  }

  contactListRefresh = () => {
    this.fetchCompanyContactList();
  };

  async fetchCompanyContactList() {
    let company_contacts = await API.get(
      `${routesAPI.companies.v1}/${this.props.company_id}/${routesAPI.companies.company_contacts}`
    );

    let contactsInfo = [];

    company_contacts.data.forEach((contact) => {
      contactsInfo.push({
        id: contact.id,
        name: contact.contact_name || " - ",
        email: contact.contact_email || " - ",
        phone: contact.contact_phone || " - ",
        position: contact.contact_position || " - ",
      });
    });

    this.setState({ companyContacts: contactsInfo });
  }

  componentDidMount() {
    this.fetchCompanyContactList();
  }

  contact_fields = [
    {
      key: "name",
      label: "Nombre contacto",
    },
    {
      key: "email",
      label: "Correo contacto",
    },
    {
      key: "phone",
      label: "Teléfono contacto",
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
            Lista de contactos
            <div className="card-header-actions">
              <CompanyContactNew
                company_id={this.props.company_id}
                rerenderParent={this.contactListRefresh}
              />
            </div>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={this.state.companyContacts}
              fields={this.contact_fields}
              itemsPerPage={5}
              pagination
              hover
              tableFilter
              scopedSlots={{
                actions: (item, index) => {
                  return (
                    <td className="py-2">
                      <CompanyContactEdit
                        company_id={this.props.company_id}
                        contact_id={item.id}
                        rerenderParent={this.contactListRefresh}
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

export default CompanyContactList;
