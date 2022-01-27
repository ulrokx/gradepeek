import { Button } from "../components/Button";

export const SettingsPage = () => {
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
                        <Button>Name</Button>
                        <Button>Code</Button>
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <p className="font-medium">Grades Tab</p>
                    <div className="space-x-2">
                        <Button>Name</Button>
                        <Button>Code</Button>
                    </div>
                </div>
                <Button className="mt-auto">Leave a review</Button>
                <Button>Report an issue</Button>
                <Button className="bg-red-500 text-white hover:bg-red-600d">
                    Log Out
                </Button>
            </div>
        </div>
    );
};
