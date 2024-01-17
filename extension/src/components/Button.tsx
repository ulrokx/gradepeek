import { MouseEventHandler } from "react";

interface IButtonProps {
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  chromeHref?: string;
}

export const Button: React.FC<IButtonProps> = ({
  children,
  className = "",
  onClick,
  chromeHref,
}) => {
  //fix this shit
  return (
    <button
      onClick={
        chromeHref ? () => chrome.tabs.create({ url: chromeHref }) : onClick
      }
      className={`px-2 py-1 my-1 rounded-lg transition-all font-semibold text-center cursor-pointer hover:scale-105 bg-blue-200 hover:bg-blue-500 ${className} `}
    >
      {children}
    </button>
  );
};
