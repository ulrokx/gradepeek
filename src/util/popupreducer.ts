import { makeUrls } from "./makeUrls";
import { ICGrades, ICourse, IEnrollment, IEnrollments, IEvent, IUser } from "./types/generated";

export const initialState: IState = {
    courses: [], //async
    todos: [], //async
    grades: [], //calculated here?
    apiKey: "", //inputted
    schoolUrl: "", //inputted
    urls: null, //calculated
    errors: false,
    user: {},
    allCourses: [],
    termID: null
};

type IState = {
    courses: Array<ICourse> | [],
    todos: Array<IEvent> | [],
    grades: Array<ICGrades> | [],
    apiKey: string | "",
    schoolUrl: string | "",
    urls: ReturnType<typeof makeUrls> | null,
    errors: boolean,
    user: IUser | {},
    allCourses: Array<ICourse> | []
    termID: number | null
}

interface ReducerAction {
    type:
        | "valid"
        | "setFromStorage"
        | "setUser"
        | "setCourses"
        | "setTodos"
        | "setGrades"
        | "setURLs"
        | "setError"
        | "setAllCourses"
        | "setTermID"
    payload?: {
        key?: string;
        school?: string;
        user?: {};
        courses?: Array<ICourse>;
        todos?: Array<IEvent>;
        grades?: Array<ICGrades>;
        urls?: ReturnType<typeof makeUrls>;
        allCourses?: Array<ICourse>
        termID?: number
    };
}

export const PopupReducer = (
    state: IState,
    action: ReducerAction
): typeof initialState => {
    switch (action.type) {
        case "valid":
            return {
                ...state,
                apiKey: action.payload.key,
                schoolUrl: action.payload.school,
                errors: null,
                urls: makeUrls(action.payload.school),
            };
        case "setFromStorage":
            return {
                ...state,
                apiKey: action.payload.key,
                schoolUrl: action.payload.school,
                termID: action.payload.termID
            };
        case "setUser":
            return {
                ...state,
                user: action.payload.user,
            };
        case "setCourses":
            return {
                ...state,
                courses: action.payload.courses,
            };
        case "setTodos":
            return {
                ...state,
                todos: action.payload.todos,
            };
        case "setGrades":
            return {
                ...state,
                grades: action.payload.grades,
            };
        case "setURLs":
            return {
                ...state,
                urls: action.payload.urls,
            };
        case "setError":
            return {
                ...state,
                errors: true,
            };
        case "setAllCourses":
            return {
                ...state,
                allCourses: action.payload.allCourses
            }
        case "setTermID":
            return {
                ...state,
                termID: action.payload.termID
            }
    }
};
