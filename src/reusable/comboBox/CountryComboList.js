import React from "react";

import API from "../../server/config/API";
import routesAPI from "../../server/config/routes";

import { CSelect } from "@coreui/react";

class CountryComboList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opts: [],
      selectedCountry: "",
    };
  }

  async componentDidMount() {
    let opts = [];
    let countries = await API.get(`${routesAPI.countries.v1}`);
    countries.data.forEach((el) => {
      opts.push(
        <option key={el.id} value={el.id}>
          {el.name}
        </option>
      );
    });
    this.setState({
      opts: opts,
      selectedCountry: this.props.selectedCountry ?? "",
    });
  }

  clearSelect = () => {
    this.setState({ selectedCountry: "" });
  };

  handleSelected = (e) => {
    this.setState({ selectedCountry: e.target.value }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state.selectedCountry);
      }
    });
  };

  render() {
    return (
      <>
        <CSelect
          id="country_select"
          name="country_select"
          value={this.state.selectedCountry}
          onChange={this.handleSelected}
        >
          <option value="0">Selecciones pais</option>
          {this.state.opts}
        </CSelect>
      </>
    );
  }
}

export default CountryComboList;
