import * as ActionType from "./constants";

const initState = {
    listStudents: null,
    keyWord: '',
    editStudent: null,
}

const studentReducer = (state = initState, action) => {
    /**
     * action: add/update/edit/delete/search
     * action = { type: type, payload: data}
     * {
     *   type: 'DELETE',
     *   payload: 1,
     * }
     * 
     * {
     *   type: 'EDIT',
     *   payload: user,
     * }
     */
    switch (action.type) {
        case ActionType.DELETE_STUDENT:
            handleDeleteStudent(state, action.payload);
            return {
                ...state
            };
        case ActionType.SEARCH_STUDENT:
            state.keyWord = action.payload;
            return {
                ...state
            };
        case ActionType.SUBMIT_STUDENT:
            handleSubmitStudent(state, action.payload);
            return {
                ...state
            };
        case ActionType.EDIT_STUDENT:
            handleEditStudent(state, action.payload);
            return {
                ...state
            };
        case ActionType.RESET_STUDENT:
            handleResetStudent(state);
            return {
                ...state
            }
        default:
            return {
                ...state
            };
    };
}

// Delete Student
const handleDeleteStudent = (state, id) => {
    const listStudentsFilter = state.listStudents.filter((student) => student.id !== id);
    state.listStudents = listStudentsFilter;
};


// Add || Update Student
const handleSubmitStudent = (state, student) => {
    let listStudentsClone = [];
    if (state.listStudents) {
        listStudentsClone = [...state.listStudents];
        const index = listStudentsClone.findIndex((item) => item.id === student.id);
        if (index !== -1) {
            // Update
            listStudentsClone[index] = student;
        } else {
            // Add
            listStudentsClone.push(student);
        }
    } else {
        // Add
        listStudentsClone.push(student);
    }

    state.listStudents = listStudentsClone;
}


// Edit Student
const handleEditStudent = (state, id) => {
    const index = state.listStudents.findIndex((student) => student.id === id);
    if (index !== -1) {
        const student = state.listStudents[index];
        state.editStudent = student;
    } else {
        state.editStudent = null;
    }
};

// Reset Student
const handleResetStudent = (state) => {
    state.editStudent = null;
}

export default studentReducer;