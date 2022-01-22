export const makeUrls = (url: string) => {
    if (url.endsWith("/")) {
        url = url.slice(0, url.length - 1);
    }
    return {
        courses: `${url}/api/v1/courses`,
        me: `${url}/api/v1/users/self/profile`,
        todos: `${url}/api/v1/users/self/todo`,
        grades: `${url}/api/v1/users`,
        base: url
    };
};
