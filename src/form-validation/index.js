import React, { Component } from "react";
import FormInput from "./formInput";
import Search from "./search";
import Students from "./students";

export default class FormValidation extends Component {
    render() {
        return (
            <div className="container">
                <h1 className="display-4 text-center my-3">Quản Lý Sinh Viên với Form Validation</h1>

                <FormInput />
                
                <hr />
                <Search />
                <Students />
            </div>
        );
    }
}
