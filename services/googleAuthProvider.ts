
import {
    GoogleSignin,
    GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId: ''
});

const onGoogleButtonClick = async () => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    const { idToken } = await GoogleSignin.signIn();

}   




