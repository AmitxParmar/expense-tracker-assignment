
export interface IUser {
    _id: string;
    name: string;
    email: string;
    role: "employee" | "admin";
    createdAt: string;
}

export interface IExpenses {
    amount: number;
    category: string;
    date: Date;
    notes: string;
    status: "pending" | "approved" | "rejected";
    user: IUser;
}

export interface IAuditLog {
    action: string;
    details: string;
    user: IUser;
    timestamp: Date;
}

export type Credentials = {
    email: string;
    password: string;
}


export interface ICustomResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
