import {
    Bell,
    User,
} from "lucide-react";

function Navbar() {
    return (
        <header className="sticky top-0 z-30 h-20 border-b border-slate-200 bg-black">
            <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Left - Logo */}
                <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                        LegalMatrix
                    </h1>

                    <p className="mt-0.5 text-xs text-white sm:text-sm">
                        Legal Metrology Compliance System
                    </p>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-3 sm:gap-5">

                    {/* Notification */}
                    <button
                        className="relative rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-blue-600"
                        title="Notifications"
                    >
                        <Bell size={21} />

                        {/* Notification dot */}
                        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500"></span>
                    </button>

                    {/* Divider */}
                    <div className="hidden h-8 w-px bg-slate-200 sm:block"></div>

                    {/* Officer */}
                    <div className="flex items-center gap-2 sm:gap-3">

                        {/* Avatar */}
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-700 sm:h-10 sm:w-10">
                            <User size={20} />
                        </div>

                        {/* Officer details */}
                        <div className="hidden sm:block">
                            <p className="text-sm font-semibold text-white">
                                Officer
                            </p>

                            <p className="text-xs text-gray-300">
                                Inspector
                            </p>
                        </div>

                    </div>

                </div>

            </div>
        </header>
    );
}

export default Navbar;