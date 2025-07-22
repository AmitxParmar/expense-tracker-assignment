"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Receipt, ChevronDown, Shield } from "lucide-react"
import { EmployeeLayout } from "./layouts/EmployeeLayout"
import { AdminLayout } from "./layouts/AdminLayout"
import { mockUsers } from "../lib/mock-data"

export function ExpenseTracker() {
    const [currentUser, setCurrentUser] = useState(mockUsers[0]) // Default to employee
    const [activeTab, setActiveTab] = useState("expenses")

    const handleUserSwitch = (user: typeof mockUsers[0]) => {
        setCurrentUser(user)
        setActiveTab(user.role === "admin" ? "all-expenses" : "expenses")
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
                            <Badge variant={currentUser.role === "admin" ? "default" : "secondary"}>
                                {currentUser.role === "admin" ? (
                                    <Shield className="h-3 w-3 mr-1" />
                                ) : (
                                    <Shield className="h-3 w-3 mr-1" />
                                )}
                                {currentUser.role}
                            </Badge>

                            {/* User Switcher */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="flex items-center space-x-2">
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback>
                                                {currentUser.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="hidden sm:block">{currentUser.name}</span>
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    {mockUsers.map((user) => (
                                        <DropdownMenuItem
                                            key={user.id}
                                            onClick={() => handleUserSwitch(user)}
                                            className="flex items-center space-x-2"
                                        >
                                            <Avatar className="h-6 w-6">
                                                <AvatarFallback className="text-xs">
                                                    {user.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium">{user.name}</span>
                                                <span className="text-xs text-muted-foreground capitalize">{user.role}</span>
                                            </div>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {currentUser.role === "admin" ? (
                    <AdminLayout currentUser={currentUser} activeTab={activeTab} setActiveTab={setActiveTab} />
                ) : (
                    <EmployeeLayout currentUser={currentUser} activeTab={activeTab} setActiveTab={setActiveTab} />
                )}
            </main>
        </div>
    )
}
