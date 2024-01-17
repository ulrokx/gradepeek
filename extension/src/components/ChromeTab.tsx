import { ChangeEvent } from "react";

interface IChromeTab {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: any;
}

export const ChromeTab: React.FC<IChromeTab> = ({
  href,
  children,
  className = "",
  onClick,
}) => {
  const makeNewTab = () => {
    if (href) chrome.tabs.create({ url: href });
  };
  return (
    <a className={className} onClick={href ? makeNewTab : onClick}>
      {children}
    </a>
  );
};
