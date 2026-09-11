
import React from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import type { RootScreenProps, } from '../../navigation/AppNavigator';
import { useAppDispatch, useAppSelector, } from '../../redux/hooks';
import { signOut, } from '../../redux/reducer/authSlice';

export default function HomeScreen({ navigation, }: RootScreenProps<'HomeScreen'>) {

    const dispatch = useAppDispatch();
    const { email } = useAppSelector(state => state.auth);

    return (
        <View style={styles.container}>

            <Text style={styles.eyebrow}>
                QUERY CACHE
            </Text>
            <Text style={styles.eyebrow}>
                QUERY CACHE
            </Text>
            <Text style={styles.title}>
                A calmer way to fetch.
            </Text>

            <Text style={styles.copy}>
                Requests are deduplicated, cached for
                30 seconds, and refreshed when
                mutations succeed.
            </Text>

            <View style={styles.panel}>

                <Text style={styles.panelTitle}>
                    Signed in as
                </Text>
                <Text style={styles.email}>
                    {email}
                </Text>

            </View>

            <Button
                title="Demo Screen"
                onPress={() =>
                    navigation.navigate('DemoScreen')
                }
                color="#e85d3f"
            />

            <View style={styles.buttonSpacer} />

            <Button
                title="User Demo Screen"
                onPress={() =>
                    navigation.navigate('UserDemoScreen')
                }
                color="#16213e"
            />

            <View style={styles.spacer} />

            <Button
                title="Sign out"
                onPress={() =>
                    dispatch(signOut())
                }
                color="#68738b"
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#f7f8fc',
    },

    eyebrow: {
        color: '#e85d3f',
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1.4,
    },

    title: {
        color: '#16213e',
        fontSize: 32,
        fontWeight: '800',
        marginTop: 12,
    },

    copy: {
        color: '#68738b',
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 26,
        marginTop: 12,
    },

    panel: {
        backgroundColor: '#16213e',
        borderRadius: 10,
        marginBottom: 24,
        padding: 20,
    },

    panelTitle: {
        color: '#aeb8cc',
        fontSize: 13,
    },

    username: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        marginTop: 6,
    },

    email: {
        color: '#fff',
        fontSize: 16,
        marginTop: 5,
        fontWeight: '700',
    },

    buttonSpacer: {
        paddingVertical: 5,
    },

    spacer: {
        flex: 1,
    },
});

