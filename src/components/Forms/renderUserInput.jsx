import React, { Component } from "react";
import axios from "axios";
import * as FA from "react-fontawesome";
import { AsyncCreatable } from "react-select";
import { GravatarValue, GravatarOption } from "./Gravator";

const { REACT_API_SERVER } = process.env;
export class RenderUserInput extends Component {
  constructor(props) {
    super(props);
    this.arrowRedner = this.arrowRedner.bind(this);
    this.arrowRedner = this.arrowRedner.bind(this);
    this.getOptions = this.getOptions.bind(this);
  }

  arrowRedner() {
    return <span>+</span>;
  }

  async getOptions(value) {
    const token = localStorage.getItem("token");
    if (value === "") {
      return { options: [] };
    }
    let options = await axios({
      method: "GET",
      url: `${REACT_API_SERVER}/user/alluser?name=${value}&orderby=username`,
      headers: { Authorization: `Bearer ${token}` }
    }).then(data =>
      data.data.map(user => ({
        label: user.username,
        value: user.username,
        id: user.id,
        picture: user.picture || "/common/guestuser.jpg"
      }))
    );

    return { options: options };
  }
  render() {
    const { input } = this.props;
    return (
      <div className="userTag">
        <label>{this.props.placeholder}</label>
        <AsyncCreatable
          {...this.props}
          arrowRenderer={this.arrowRedner}
          name={input.name}
          value={input.value}
          autosize={false}
          onChange={value => input.onChange(value)}
          onBlur={() => input.onBlur(input.value)}
          valueComponent={GravatarValue}
          optionComponent={GravatarOption}
          loadOptions={this.getOptions}
          noResultsText="No user found."
          promptTextCreator={value => `Finding user ${value}`}
          newOptionCreator={({ label }) => ({
            label: label,
            value: label,
            id: label,
            picture: "guestuser.jpg"
          })}
        />
        {this.props.meta.touched && this.props.meta.error ? (
          <div className="warn">
            <FA className="left-hand-icon" name="exclamation-circle" />
            {this.props.meta.error}
          </div>
        ) : null}
      </div>
    );
  }
}
