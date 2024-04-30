import React, { Component } from "react";
import { connect } from "react-redux";
import { actSearchStudent } from "./../store/student/actions";

class Search extends Component {
    handleKeyWord = (event) => {
        this.props.getKeyWord(event.target.value);
    };

    render() {
        return (
            <div className="d-flex justify-content-between align-items-center">
                <input type="text" className="form-control mb-3 w-50" placeholder="Tìm kiếm theo Họ tên SV" onChange={(event) => { this.props.searchStudent(event.target.value) }} />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // key: value
    searchStudent: (keyWord) => {
      dispatch(actSearchStudent(keyWord));
    }
  }
}

export default connect(null, mapDispatchToProps)(Search);