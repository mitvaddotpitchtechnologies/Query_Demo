import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../src/screen/homescreen/HomeScreen';


const mockDispatch = jest.fn();
const mockNavigate = jest.fn();

jest.mock('../src/redux/hooks.ts', () => ({
    useAppDispatch: () => mockDispatch,

    useAppSelector: (selector: any) =>
        selector({
            auth: {
                email: 'test@gmail.com',
                isAuthenticated: true,
            },
        }),
}));

jest.mock('../src/redux/reducer/authSlice.ts', () => ({
    signOut: jest.fn(() => ({
        type: 'auth/signOut',
    })),
}));

describe('HomeScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // 1. HomeScreen render test
    it('renders HomeScreen correctly', () => {
        const { getByText } = render(
            <HomeScreen
                navigation={{
                    navigate: mockNavigate,
                } as any}
                route={{} as any}
            />,
        );

        expect(getByText('QUERY CACHE')).toBeTruthy();

        expect(
            getByText('A calmer way to fetch.'),
        ).toBeTruthy();

        expect(
            getByText(
                'Requests are deduplicated, cached for 30 seconds, and refreshed when mutations succeed.',
            ),
        ).toBeTruthy();

        expect(getByText('Signed in as')).toBeTruthy();

        expect(getByText('test@gmail.com')).toBeTruthy();
    });

    // 2. Email Redux state test
    it('displays email from Redux state', () => {
        const { getByText } = render(
            <HomeScreen
                navigation={{
                    navigate: mockNavigate,
                } as any}
                route={{} as any}
            />,
        );

        expect(
            getByText('test@gmail.com'),
        ).toBeTruthy();
    });

    // 3. Demo Screen navigation test
    it('navigates to DemoScreen when Demo Screen button is pressed', () => {
        const { getByText } = render(
            <HomeScreen
                navigation={{
                    navigate: mockNavigate,
                } as any}
                route={{} as any}
            />,
        );

        fireEvent.press(
            getByText('Demo Screen'),
        );

        expect(mockNavigate).toHaveBeenCalledTimes(1);

        expect(mockNavigate).toHaveBeenCalledWith(
            'DemoScreen',
        );
    });

    // 4. User Demo Screen navigation test
    it('navigates to UserDemoScreen when User Demo Screen button is pressed', () => {
        const { getByText } = render(
            <HomeScreen
                navigation={{
                    navigate: mockNavigate,
                } as any}
                route={{} as any}
            />,
        );

        fireEvent.press(
            getByText('User Demo Screen'),
        );

        expect(mockNavigate).toHaveBeenCalledTimes(1);

        expect(mockNavigate).toHaveBeenCalledWith(
            'UserDemoScreen',
        );
    });

    // 5. Sign out test
    it('dispatches signOut when Sign out button is pressed', () => {
        const { getByText } = render(
            <HomeScreen
                navigation={{
                    navigate: mockNavigate,
                } as any}
                route={{} as any}
            />,
        );

        fireEvent.press(
            getByText('Sign out'),
        );

        expect(mockDispatch).toHaveBeenCalledTimes(1);

        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'auth/signOut',
        });
    });

    // 6. Demo Screen should not navigate before button press
    it('does not navigate initially', () => {
        render(
            <HomeScreen
                navigation={{
                    navigate: mockNavigate,
                } as any}
                route={{} as any}
            />,
        );

        expect(
            mockNavigate,
        ).not.toHaveBeenCalled();
    });

    // 7. Sign out should not dispatch initially
    it('does not dispatch signOut initially', () => {
        render(
            <HomeScreen
                navigation={{
                    navigate: mockNavigate,
                } as any}
                route={{} as any}
            />,
        );

        expect(
            mockDispatch,
        ).not.toHaveBeenCalled();
    });
});