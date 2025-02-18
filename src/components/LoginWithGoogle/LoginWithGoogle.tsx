import * as React from 'react';

import axios from 'axios';
import { API_URL } from '../../api/api.consts';
import { useAuthStore } from '../../store/authStore';

import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const GOOGLE_OAUTH_WEB_CLIENT_ID =
  '614979262322-44klvjn86nf4rv4iduqjhni4auhf0tf9.apps.googleusercontent.com';
const GOOGLE_OAUTH_IOS_CLIENT_ID =
  '614979262322-ch0ckq8qhj6svd1aotkde0f92cuhbeep.apps.googleusercontent.com';

GoogleSignin.configure({
  webClientId: GOOGLE_OAUTH_WEB_CLIENT_ID, // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
  iosClientId: GOOGLE_OAUTH_IOS_CLIENT_ID, // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  forceCodeForRefreshToken: true,
  profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});

const signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const response = await GoogleSignin.signIn();
    if (isSuccessResponse(response)) {
      const verifiedUser = await axios.post(
        `${API_URL}auth/google/verify`,
        {
          idToken: response.data?.idToken,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const { accessToken, refreshToken } = verifiedUser.data;
      useAuthStore.getState().setTokens(accessToken, refreshToken);
    }
  } catch (error) {
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          console.log('PLAY_SERVICES_NOT_AVAILABLE', error);
          break;
        case statusCodes.IN_PROGRESS:
          console.log('IN_PROGRESS', error);
          break;
        case statusCodes.SIGN_IN_CANCELLED:
          console.log('SIGN_IN_CANCELLED', error);
        default:
          console.log('isErrorWithCode, default:', error);
      }
    } else {
      console.log(
        "an error that's not related to google sign in occurred",
        error,
      );
    }
  }
};

export const LoginWithGoogle = () => {
  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Light}
      onPress={signIn}
    />
  );
};
