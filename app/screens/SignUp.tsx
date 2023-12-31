import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Snackbar from 'react-native-snackbar';

import Input from '@app/components/Input';
import {signUpUser} from '@app/utils/auth';
import {setUser} from '@app/store/authSlice';
import PrimaryButton from '@app/components/Button';

const SignUp = ({
  navigation,
}: {
  navigation?: {navigate: (routeName: string) => void};
}) => {
  const dispatch = useDispatch();

  const [signUpDetails, setSignUpDetails] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (
      !signUpDetails.name ||
      !signUpDetails.email ||
      !signUpDetails.password
    ) {
      return Snackbar.show({
        text: 'Both fields are required',
        backgroundColor: '#FF8080',
      });
    }

    setLoading(true);

    try {
      const user = await signUpUser(signUpDetails);

      dispatch(setUser(user));

      if (user) {
        navigation?.navigate('Home');
        setSignUpDetails({email: '', name: '', password: ''});
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      Snackbar.show({
        text: 'Error creating user',
        backgroundColor: '#FF8080',
      });
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <View>
        <Text style={styles.text}>Sign up for a new account</Text>
      </View>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Name"
          value={signUpDetails.name}
          onChangeText={text =>
            setSignUpDetails({...signUpDetails, name: text})
          }
        />
        <Input
          placeholder="Email"
          value={signUpDetails.email}
          onChangeText={text =>
            setSignUpDetails({...signUpDetails, email: text})
          }
        />
        <Input
          placeholder="Password"
          value={signUpDetails.password}
          onChangeText={text =>
            setSignUpDetails({...signUpDetails, password: text})
          }
        />
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <PrimaryButton title="Sign Up" onPress={handleSignUp} />
        )}
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 20,
  },

  text: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FF8080',
  },

  inputContainer: {
    width: '100%',
    marginTop: 30,
  },
});
