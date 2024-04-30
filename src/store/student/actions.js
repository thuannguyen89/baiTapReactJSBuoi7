import * as ActionType from "./constants";

const actDeleteStudent = (id) => {
    return {
        type: ActionType.DELETE_STUDENT,
        payload: id
    };
}

const actEditStudent = (id) => {
    return {
        type: ActionType.EDIT_STUDENT,
        payload: id
    };
}

const actSearchStudent = (keyWord) => {
    return {
        type: ActionType.SEARCH_STUDENT,
        payload: keyWord
    };
}

const actSubmitStudent = (student) => {
    return {
        type: ActionType.SUBMIT_STUDENT,
        payload: student
    };
}


const actResetStudent = () => {
    return {
        type: ActionType.RESET_STUDENT,
        payload: null
    };
}

export { actDeleteStudent, actEditStudent, actSearchStudent, actSubmitStudent, actResetStudent };