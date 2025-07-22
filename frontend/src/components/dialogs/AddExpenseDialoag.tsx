"use client"
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import type { IUser } from "@/types/types"

interface AddExpenseDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    currentUser: IUser
}

const categories = ["travel", "meals", "office-supplies", "software", "training", "marketing", "other"]

export function AddExpenseDialog({ open, onOpenChange, currentUser }: AddExpenseDialogProps) {
    const [formData, setFormData] = useState({
        description: "",
        amount: "",
        category: "",
        date: new Date().toISOString().split("T")[0],
        receipt: null as File | null,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.description || !formData.amount || !formData.category) {
            toast.error("Please fill in all required fields")
            return
        }

        // Simulate API call
        toast.success("Expense submitted successfully!")

        // Reset form
        setFormData({
            description: "",
            amount: "",
            category: "",
            date: new Date().toISOString().split("T")[0],
            receipt: null,
        })

        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Expense</DialogTitle>
                    <DialogDescription>
                        Submit a new expense for approval. All fields marked with * are required.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="description">Description *</Label>
                        <Input
                            id="description"
                            placeholder="Enter expense description"
                            value={formData.description}
                            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="amount">Amount *</Label>
                            <Input
                                id="amount"
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                value={formData.amount}
                                onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="date">Date *</Label>
                            <Input
                                id="date"
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Category *</Label>
                        <Select
                            value={formData.category}
                            onValueChange={(value: string) => setFormData((prev) => ({ ...prev, category: value }))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category
                                            .split("-")
                                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                            .join(" ")}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="receipt">Receipt (Optional)</Label>
                        <Input
                            id="receipt"
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    receipt: e.target.files?.[0] || null,
                                }))
                            }
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">Submit Expense</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
