import React from "react";

import CompanyEditBasic from "./CompanyEditBasic";
import CompanyContactList from "./contact/CompanyContactList";
import CompanyDocumentList from "./document/CompanyDocumentList";

import { CCol, CRow } from "@coreui/react";

const CompanyEdit = (props) => {
  const id = props.match.params.id;
  return (
    <>
      <CompanyEditBasic key={id} id={id} />
      <CRow>
        <CCol xs="6">
          <CompanyDocumentList key={id} company_id={id} />
        </CCol>
        <CCol xs="6">
          <CompanyContactList key={id} company_id={id} />
        </CCol>
      </CRow>
    </>
  );
};

export default CompanyEdit;
