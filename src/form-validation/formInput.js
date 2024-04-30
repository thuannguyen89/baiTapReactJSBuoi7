import React, { Component } from "react";
import { connect } from "react-redux";
import { actSubmitStudent, actResetStudent } from "./../store/student/actions";

class FormInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {
                id: '',
                fullname: '',
                email: '',
                phoneNumber: ''
            },
            errors: {
                id: '',
                fullname: '',
                email: '',
                phoneNumber: ''
            }
        };
    }

    handleOnchange = (event) => {
        const { name, value, minLength, pattern } = event.target;
        const newValues = { ...this.state.values, [name]: value};

        // Check form validation
        let newErrors = { ... this.state.errors };
        if (!value.trim()) {
            newErrors[name] = 'Vui lòng nhập thông tin.';
        } else {
            let errorMessage = '';

            // Validate minLength
            if (minLength) {
                if (value.length < minLength) {
                    errorMessage = 'Độ dài Họ tên phải từ 4 ký tự'
                }
            }

            // Validate pattern
            if (pattern && !errorMessage) {
                const regex = new RegExp(pattern);
                const valid = regex.test(value);
                if (!valid) {
                    switch (name) {
                        case "fullname":
                            errorMessage = 'Họ tên phải là chữ';
                            break;
                        case "phoneNumber":
                            errorMessage = 'Số điện thoại không đúng định dạng';
                            break;
                        case "email":
                            errorMessage = 'Email không đúng định dạng';
                            break;
                        default:
                            errorMessage = '';
                            break;
                    }
                }
            }

            newErrors[name] = errorMessage; 
        }

        this.setState({
            values: newValues,
            errors: newErrors
        });
    };

    handleFormStudentSubmit = (event) => {
        event.preventDefault();
        
        // Validate form is valid from state.errors
        let isValid = true;
        Object.values(this.state.errors).forEach((item) => {
            if (item) {
                isValid = false;
            }
        });

        // Validate form is valid from state.values
        let newErrors = { ... this.state.errors };
        Object.entries(this.state.values).forEach((item) => {
            if (!item[1]) {
                isValid = false;
                newErrors[item[0]] = 'Vui lòng nhập thông tin.';
            }
        });

        this.setState({
            errors: newErrors
        });

        if (isValid) {
            this.props.submitStudent(this.state.values);
        }
    }
    
    // Lan dau khoi tao khong chay
    // Chay khi nhan props ke tiep co su thay doi
    UNSAFE_componentWillReceiveProps(nextProps) {
        const { editStudent } = nextProps;
    
        if (editStudent) {
            this.setState({
                values: {
                    id: editStudent.id,
                    fullname: editStudent.fullname,
                    email: editStudent.email,
                    phoneNumber: editStudent.phoneNumber,
                }
            });
        } else {
            this.setState({
                values: {
                    id: '',
                    fullname: '',
                    email: '',
                    phoneNumber: ''
                }
            });
        }
    }

    render() {
        return (
            <div className="formInputStudent">
                <form onSubmit={this.handleFormStudentSubmit}>
                    <div className="row">
                        <div className="col-md-6 my-2">
                            <input type="text" className="form-control" placeholder="Mã Sinh Viên" value={this.state.values.id} 
                                name="id" 
                                onChange={this.handleOnchange} 
                                onBlur={this.handleOnchange} />
                            { this.state.errors.id && (
                                <span className="text text-danger">{this.state.errors.id}</span>
                            )}
                        </div>
                        <div className="col-md-6 my-2">
                            <input type="text" className="form-control" placeholder="Họ và Tên" value={this.state.values.fullname}
                                name="fullname" 
                                onChange={this.handleOnchange} 
                                onBlur={this.handleOnchange} 
                                minLength="4"
                                pattern="^[a-zA-Z ]+$" />
                            { this.state.errors.fullname && (
                                <span className="text text-danger">{this.state.errors.fullname}</span>
                            )}
                        </div>
                        <div className="col-md-6 my-2">
                            <input type="text" className="form-control" placeholder="Email" value={this.state.values.email}
                                name="email" 
                                onChange={this.handleOnchange} 
                                onBlur={this.handleOnchange} 
                                pattern="^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$" />
                            { this.state.errors.email && (
                                <span className="text text-danger">{this.state.errors.email}</span>
                            )}
                        </div>
                        <div className="col-md-6 my-2">
                            <input type="text" className="form-control" placeholder="Số điện thoại" value={this.state.values.phoneNumber}
                                name="phoneNumber" 
                                onChange={this.handleOnchange} 
                                onBlur={this.handleOnchange}  
                                pattern="^(03|05|07|08|09)\d{8}$" />
                            { this.state.errors.phoneNumber && (
                                <span className="text text-danger">{this.state.errors.phoneNumber}</span>
                            )}
                        </div>

                        <div className="col-md-12 my-2">
                            <button type="submit" className="btn btn-primary" onClick={this.handleFormStudentSubmit}>
                                {this.props.editStudent ? 'Sửa Sinh Viên' : 'Thêm Sinh Viên'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // key: value
        resetStudent: () => {
            dispatch(actResetStudent());
        },
        submitStudent: (student) => {
            dispatch(actSubmitStudent(student));
        }
    }
}
  
const mapStateToProps = (state) => {
    return {
        //key: value
        editStudent: state.studentReducer.editStudent
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormInput);