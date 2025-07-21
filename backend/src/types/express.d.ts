import { Request } from 'express'; // Import Request for clarity
import type { Roles } from './types';

declare module 'express-serve-static-core' {
    interface Request {
        user: { // Example: Adding a 'user' property
            id: string;
            email: string;
            role: Roles
        };

    }
}