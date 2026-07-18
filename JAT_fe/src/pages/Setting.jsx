import { useState } from "react";
import { useTheme } from "./Context/ThemeContext";
import api from "./auth/api";
import { Button } from "./ui/Button";
import { HiOutlineSun ,HiOutlineMoon ,HiOutlineShieldCheck} from "react-icons/hi";


export const Setting = () => {
    const {darkMode ,toggleTheme } = useTheme()

    return(
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your preferences and account</p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 divide-gray-200 dark:divide-gray-800">
                <div className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
                            {darkMode ? <HiOutlineMoon className="text-primary-600" size={20} />:<HiOutlineSun className="text-primary-600" />}
                        </div>
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">Appearance</p>
                            <p className="text-sm text-gray-500">Switch between light and dark mode</p>
                        </div>
                    </div>
                    <button onClick={toggleTheme} className={`flex px-1 relative w-12 h-6 rounded-full transition-colors ${darkMode?'bg-primary-600':'bg-gray-300' }`}>
                        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                            darkMode? 'translate-x-0':'translate-x-5' }`}/>
                    </button>
                </div>

                <div className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
                            <HiOutlineShieldCheck className="text-gray-600" size={20}/>
                        </div>
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">Account</p>
                            <p className="text-sm text-gray-500">gedish@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end">
                <Button variant="danger">
                    Sign Out
                </Button>
            </div>
        </div>
    )

}