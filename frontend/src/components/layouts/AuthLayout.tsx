import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

const AuthLayout = () => (
    <>
        <Navbar />
        <div className="container min-h-full h-[calc(100vh-8vh)] flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex overflow-hidden">
                <div className="absolute inset-0 bg-zinc-900" />


                <div className="absolute bottom-6 left-30 z-20 flex items-center text-lg font-medium">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-12 w-12"
                    >
                        <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                    </svg>
                    <div className="text-6xl font-grotesk text-muted border py-2 px-6 font-black tracking-wider w-fit h-fit stroke-black drop-shadow-xl hover:invert cursor-pointer">
                        Expense-Tracker
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <Outlet />
                </div>
            </div>
        </div>
    </>
);

export default AuthLayout;