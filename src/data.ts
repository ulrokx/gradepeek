import { PROXY_URL } from "./constants";

export const queryCanvas = async (
    searchParam: URLSearchParams,
    url: URL,
    token: string,
    debug:boolean = false
) => {
    console.log(url.href)
    const localUrl = url
    localUrl.search = searchParam.toString();
    const response = await fetch(PROXY_URL, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "*/*",
            "Target-URL": localUrl.href,
            "Slow-Mode-Debug": debug ? "true" : "false"
        },
        
    });
    const data = await response.json()
    return data
};
