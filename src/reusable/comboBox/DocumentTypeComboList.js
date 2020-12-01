import React from "react";
import API from "../../server/config/API";
import routesAPI from "../../server/config/routes";

import { CSelect } from "@coreui/react";

class DocumentTypeComboList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opts: [],
      selectedDocumentType: "",
    };
  }

  async componentDidMount() {
    let opts = [];
    let documentTypesList = await API.get(`${routesAPI.documentTypes.v1}`);
    documentTypesList.data.forEach((el) => {
      opts.push(
        <option key={el.id} value={el.id}>
          {el.doc_type}
        </option>
      );
    });
    this.setState({
      opts: opts,
      selectedDocumentType: this.props.selectedDocumentType ?? "",
    });
  }

  handleSelected = (e) => {
    this.setState({ selectedDocumentType: e.target.value }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state.selectedDocumentType);
      }
    });
  };

  render() {
    return (
      <>
        <CSelect
          id="document_type_select"
          name="document_type_select"
          value={this.state.selectedDocumentType}
          onChange={this.handleSelected}
        >
          <option value="0">Seleccione documento</option>
          {this.state.opts}
        </CSelect>
      </>
    );
  }
}

export default DocumentTypeComboList;
