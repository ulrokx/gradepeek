import { Button } from "../components/Button";
import { IOptions } from "../util/popupreducer";
interface ISettingsProps {
    settingsState: IOptions;
    onChange: (opts: IOptions) => void;
    onLogout: () => void
}
export const SettingsPage: React.FC<ISettingsProps> = ({
    settingsState,
    onChange,
    onLogout
}) => {
    const selectedStyles = "bg-green-500 hover:bg-green-600";
    return (
        <div className="w-full h-full block pb-4">
            <div className="w-5/6 rounded-lg h-full mx-auto flex flex-col p-3 bg-amber-200">
                <Button>Hide Some Courses</Button>
                <p className="text-center font-medium underline">
                    Change Course Display Name
                </p>
                <div className="flex flex-row justify-between items-center">
                    <p className="font-medium">Courses Tab</p>
                    <div className="space-x-2">
                        <Button
                            className={`w-14 ${
                                settingsState.courseName == "Name"
                                    ? selectedStyles
                                    : null
                            }`}
                            onClick={() => onChange({ courseName: "Name" })}
                        >
                            Name
                        </Button>
                        <Button
                            className={`w-14 ${
                                settingsState.courseName == "Code"
                                    ? selectedStyles
                                    : null
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
                                settingsState.gradeName == "Name"
                                    ? selectedStyles
                                    : ""
                            }`}
                            onClick={() => onChange({ gradeName: "Name" })}
                        >
                            Name
                        </Button>
                        <Button
                            className={`w-14 ${
                                settingsState.gradeName == "Code"
                                    ? selectedStyles
                                    : ""
                            }`}
                            onClick={() => onChange({ gradeName: "Code" })}
                        >
                            Code
                        </Button>
                    </div>
                </div>
                <Button className="mt-auto">Leave a review</Button>
                <Button>Report an issue</Button>
                <Button className="bg-red-500 text-white hover:bg-red-600" onClick={onLogout}>
                    Log Out
                </Button>
            </div>
        </div>
    );
};
