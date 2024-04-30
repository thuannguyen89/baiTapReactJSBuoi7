import React, { Component } from "react";
import StudentItem from "./studentItem";
import { connect } from 'react-redux';

class Students extends Component {
  renderListStudents = () => {
    const { listStudents, keyWord, getEditStudent } = this.props;

    const listStudentsFilter = listStudents ? listStudents.filter((student) => {
        return student.fullname.toLowerCase().indexOf(keyWord.toLowerCase()) !== -1;
    }) : [];

    return listStudentsFilter?.map((student) => {
      return <StudentItem 
        key={student.id} 
        student={student}
        getEditStudent={getEditStudent} 
        />;
    });
  };

  render() {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Mã SV</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.renderListStudents()}
          </tbody>
        </table>
      </div>
    );
  }
}

// Lay data tu reducer xuong component chuyen thanh props de su dung
const mapStateToProps = (state) => {
  return {
    // key: value
    listStudents: state.studentReducer.listStudents,
    keyWord: state.studentReducer.keyWord
  }
}

export default connect(mapStateToProps, null)(Students);
