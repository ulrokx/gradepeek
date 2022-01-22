let url = "https://google.com/";
if (url.endsWith("/")) {
    url = url.slice(0, url.length - 1);
}
console.log(url);
