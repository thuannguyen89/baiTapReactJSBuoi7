import React, { Component } from "react";
import { connect } from "react-redux";
import { actDeleteStudent, actEditStudent } from "./../store/student/actions";

class StudentItem extends Component {
  handleDeleteStudent = () => {
    this.props.getDeleteStudent(this.props.student.id)
  }
  handleEditStudent = () => {
    this.props.getEditStudent(this.props.student);
  }
  render() {
    const {id, fullname, email, phoneNumber} = this.props.student;
    return (
      <tr>
        <td>{id}</td>
        <td>{fullname}</td>
        <td>{email}</td>
        <td>{phoneNumber}</td>
        <td>
          <button 
            className="btn btn-info mr-2"
            onClick={() => {
              this.props.editStudent(id)
            }}
            data-toggle="modal" 
            data-target="#modelIdUser"
          >Edit</button>
          <button 
            className="btn btn-danger"
            onClick={() => {
              this.props.deleteStudent(id)
            }}
          >Delete</button>
        </td>
      </tr>
    );
  }
}

// Gui action len StudentReducer
const mapDispatchToProps = (dispatch) => {
  return {
    // key: value
    deleteStudent: (id) => {
      dispatch(actDeleteStudent(id));
    },

    editStudent: (id) => {
      dispatch(actEditStudent(id));
    }
  }
}

export default connect(null, mapDispatchToProps) (StudentItem);
