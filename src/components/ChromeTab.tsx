export const ChromeTab = ({ href, children, className }) => {
    const makeNewTab = () => {
        chrome.tabs.create({ url: href });
    };
    return (
        <a className={className} onClick={makeNewTab}>
            {children}
        </a>
    );
};
