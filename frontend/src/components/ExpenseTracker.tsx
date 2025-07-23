import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Receipt, ChevronDown, Shield } from "lucide-react"
import { EmployeeLayout } from "./layouts/EmployeeLayout"
import { AdminLayout } from "./layouts/AdminLayout"
import { useAuth } from "@/hooks/useAuth"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from "./ui/dropdown-menu"


export function ExpenseTracker() {

    const { user: currentUser, logout } = useAuth()
    const [activeTab, setActiveTab] = useState<string>("expenses")

    const handleLogout = () => {
        logout.mutate()
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <Receipt className="h-8 w-8 text-blue-600" />
                                <h1 className="text-xl font-semibold text-gray-900">ExpenseTracker</h1>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            {/* Role Badge */}
                            <Badge variant={currentUser?.role === "admin" ? "default" : "secondary"}>
                                {currentUser?.role === "admin" ? (
                                    <Shield className="h-3 w-3 mr-1" />
                                ) : (
                                    <Shield className="h-3 w-3 mr-1" />
                                )}
                                {currentUser?.role}
                            </Badge>

                            <DropdownMenu>
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>
                                        {currentUser?.name ?? ""}
                                    </AvatarFallback>
                                </Avatar>
                                <DropdownMenuTrigger className="flex items-center justify-center">
                                    <span className="hidden sm:block">{currentUser?.name}</span>
                                    <ChevronDown className="h-4 w-4" />

                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="start">

                                    <DropdownMenuItem onClick={() => handleLogout()}>
                                        LOGOUT
                                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                    </DropdownMenuItem>

                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {currentUser?.role === "admin" ? (
                    <AdminLayout currentUser={currentUser} activeTab={activeTab} setActiveTab={setActiveTab} />
                ) : (
                    currentUser && <EmployeeLayout currentUser={currentUser} activeTab={activeTab} setActiveTab={setActiveTab} />
                )}
            </main>
        </div>
    )
}
