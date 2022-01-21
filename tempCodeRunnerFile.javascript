const feed = async () => {
    const response = await fetch(PROXY_URL, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "*/*",
            "Target-URL": url.href,
            "Slow-Mode-Debug": debug ? "true" : "false",
        },
    });
    return response;
};
console.log(feed())
