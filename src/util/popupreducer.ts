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
        | "setFromStorage"
        | "setURLs"
        | "setError"
        | "setTermID"
        | "setData"
        | "logOut"
    payload?: {
        apiKey?: string;
        schoolUrl?: string;
        user?: {};
        courses?: Array<ICourse>;
        todos?: Array<IEvent>;
        grades?: Array<ICGrades>;
        urls?: ReturnType<typeof makeUrls>;
        allCourses?: Array<ICourse>
        termID?: number,
        errors?: boolean
    };
}

export const PopupReducer = (
    state: IState,
    action: ReducerAction
): typeof initialState => {
    switch (action.type) {
        case "setFromStorage":
            return {
                ...state,
                apiKey: action.payload.apiKey,
                schoolUrl: action.payload.schoolUrl,
                termID: action.payload.termID
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
        case "setTermID":
            return {
                ...state,
                termID: action.payload.termID
            }
        case "setData":
            const {courses, allCourses, grades, todos, user, apiKey, schoolUrl, termID, urls, errors} = action.payload
            return {
                ...state,
                courses: courses ? courses : state.courses,
                allCourses: allCourses ? allCourses : state.allCourses,
                grades: grades ? grades : state.grades,
                todos: todos ? todos : state.todos,
                user: user ? user : state.user,
                apiKey: apiKey ? apiKey : state.apiKey,
                schoolUrl: schoolUrl ? schoolUrl : state.schoolUrl,
                termID: termID ? termID : state.termID,
                urls: urls ? urls : state.urls,
                errors: errors ? errors : state.errors
            }
        case "logOut":
            return {
                ...initialState
            }
    }
};
