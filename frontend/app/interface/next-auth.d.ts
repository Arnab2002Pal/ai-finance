// The .d.ts file extension stands for TypeScript Declaration file. It's used to define the types for libraries or modules that might not have built-in type definitions, or when you need to augment (extend) existing types, as is the case with next-auth.

import NextAuth from 'next-auth';

// Extend the User and Session interfaces

declare module 'next-auth' {
    interface Session {
        user: {
            user_id?: number;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
        accessToken?: string;
    }

    interface User {
        user_id?: number;
    }
}
