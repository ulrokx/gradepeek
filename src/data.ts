import { PROXY_URL } from "./constants";

export const queryCanvas = async (
    searchParam: URLSearchParams,
    url: URL,
    token: string,
    debug:boolean = false
) => {
    url.search = searchParam.toString();
    const response = await fetch(PROXY_URL, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "*/*",
            "Target-URL": url.href,
            "Slow-Mode-Debug": debug ? "true" : "false"
        },
        
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        console.log(response);
        const error = await response.json();
        return error;
    }
};
