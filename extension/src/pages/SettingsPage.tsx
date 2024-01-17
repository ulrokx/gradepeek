import { Button } from "../components/Button";
import { ChromeTab } from "../components/ChromeTab";
import { IOptions } from "../util/popupreducer";
import { ICourse } from "../util/types/generated";
interface ISettingsProps {
  settingsState: IOptions;
  onChange: (opts: IOptions) => void;
  onLogout: () => void;
  onHide: () => void;
}
export const SettingsPage: React.FC<ISettingsProps> = ({
  settingsState,
  onChange,
  onLogout,
  onHide,
}) => {
  const selectedStyles = "bg-green-500 hover:bg-green-600";
  return (
    <div className="w-full h-full block pb-4">
      <div className="w-5/6 rounded-lg h-full mx-auto flex flex-col p-3 bg-orange-200">
        <Button onClick={onHide}>Hide Some Courses</Button>
        <p className="text-center font-medium py-2">
          Change Course Display Name
        </p>
        <div className="flex flex-row justify-between items-center">
          <p className="font-medium">Courses Tab</p>
          <div className="space-x-2">
            <Button
              className={`w-14 ${
                settingsState.courseName == "Name" ? selectedStyles : null
              }`}
              onClick={() => onChange({ courseName: "Name" })}
            >
              Name
            </Button>
            <Button
              className={`w-14 ${
                settingsState.courseName == "Code" ? selectedStyles : null
              }`}
              onClick={() => onChange({ courseName: "Code" })}
            >
              Code
            </Button>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <p className="font-medium">Grades Tab</p>
          <div className="space-x-2">
            <Button
              className={`w-14 ${
                settingsState.gradeName == "Name" ? selectedStyles : ""
              }`}
              onClick={() => onChange({ gradeName: "Name" })}
            >
              Name
            </Button>
            <Button
              className={`w-14 ${
                settingsState.gradeName == "Code" ? selectedStyles : ""
              }`}
              onClick={() => onChange({ gradeName: "Code" })}
            >
              Code
            </Button>
          </div>
        </div>
        <Button
          className="mt-auto"
          chromeHref={
            "https://chrome.google.com/webstore/detail/gradepeek/omejkieijjncolaijiaofblaldkhbcam/reviews"
          }
        >
          Leave a review
        </Button>
        <Button chromeHref="https://gradepeek-cors.fly.dev/">
          Visit website
        </Button>
        <Button chromeHref="https://arcane-shore-95043.herokuapp.com/contact">
          Report an issue
        </Button>
        <Button
          className="bg-red-500 text-white hover:bg-red-600"
          onClick={onLogout}
        >
          Log Out
        </Button>
        <p className="text-center select-none">{settingsState.version}</p>
      </div>
    </div>
  );
};
