import { PROXY_URL } from "./constants";
import {
    ICGrades,
    ICourse,
    IEnrollments,
    IEvent,
    IUser,
} from "./types/generated";
const emptyParams = new URLSearchParams();
const pagesParams = new URLSearchParams([
    ["page", "1"],
    ["per_page", "50"],
]);
export const queryCanvas = async <ResponseType>(
    searchParam: URLSearchParams,
    url: URL,
    token: string,
    debug: boolean = false
): Promise<ResponseType | null> => {
    const localUrl = url;
    localUrl.search = searchParam.toString();
    const response = await fetch(PROXY_URL, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "*/*",
            "Target-URL": localUrl.href,
            "Slow-Mode-Debug": debug ? "true" : "false",
        },
    });
    if (response.ok) {
        const data: ResponseType = await response.json();
        return data;
    } else {
        return null
    }
};

export const getUser = async (madeUrl: string, apiKey: string) => {
    const url = new URL(madeUrl);
    const data = await queryCanvas<IUser>(emptyParams, url, apiKey);
    return data;
};

export const getCourses = async (
    madeUrl: string,
    apiKey: string,
    termId?: number
) => {
    const url = new URL(madeUrl);
    const data = await queryCanvas<Array<ICourse>>(pagesParams, url, apiKey);
    if(!data) {
        return []
    }
    if (termId && data) {
        const filtered = data.filter((c) => c.enrollment_term_id == termId);
        return filtered;
    } else {
        const filtered = data.filter(c => c.course_code)
        return filtered;
    }
};

export const getTodos = async (madeUrl: string, apiKey: string) => {
    const url = new URL(madeUrl);
    const data: Array<IEvent> = await queryCanvas(pagesParams, url, apiKey);
    const filtered = data.filter((e) => e.type == "submitting");
    return filtered;
};

export const getGrades = async (
    madeUrl: string,
    apiKey: string,
    courses: Array<ICourse>,
    userId: number
): Promise<Array<ICGrades>> => {
    const url = new URL(madeUrl);
    url.pathname = `/api/v1/users/${userId}/enrollments`;
    const data: Array<IEnrollments> = await queryCanvas(
        pagesParams,
        url,
        apiKey
    );
    const ctg = [];
    if (data) {
        data.forEach((e) => {
            courses.forEach((c) => {
                if (e.course_id == c.id) {
                    ctg.push({
                        name: c.name,
                        id: c.id,
                        grade: e.grades.current_score,
                        final: e.grades.final_score,
                        letter: e.grades.current_grade,
                    });
                }
            });
        });
        return ctg;
    }
};
