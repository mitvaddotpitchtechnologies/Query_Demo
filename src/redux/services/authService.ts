// src/api/authService.ts

export type LoginResponse = {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    image: string;
    accessToken: string;
    refreshToken: string;
};

type User = {
    id: number;
    username: string;
    email: string;
    password: string;
};

export const loginApi = async (
    email: string,
    password: string,
): Promise<LoginResponse> => {
    // Step 1: Get users
    const usersResponse = await fetch(
        'https://dummyjson.com/users?limit=100',
    );

    if (!usersResponse.ok) {
        throw new Error('Unable to fetch users');
    }

    const usersData = await usersResponse.json();

    // Step 2: Find user using EMAIL
    const user: User | undefined = usersData.users.find(
        (item: User) =>
            item.email.toLowerCase() === email.toLowerCase(),
    );

    if (!user) {
        throw new Error('Email not found');
    }

    // Step 3: Check password
    if (user.password !== password) {
        throw new Error('Invalid password');
    }

    // Step 4: DummyJSON login API
    const loginResponse = await fetch(
        'https://dummyjson.com/auth/login',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: user.username,
                password: password,
                expiresInMins: 30,
            }),
        },
    );

    const data = await loginResponse.json();

    if (!loginResponse.ok) {
        throw new Error(data?.message || 'Login failed');
    }

    return data;
};