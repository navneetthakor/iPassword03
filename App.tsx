import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Formik } from 'formik';

// defining schema for password length
import * as yup from 'yup';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
const passwordSchema = yup.object().shape({
  passwordLength: yup.number().min(4, 'Must be min length of 4').max(16, 'Must be max length of 16').required('length is required'),
});

const App = () => {
  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);
  const [isLowerCase, setIsLowerCase] = useState(true);
  const [isUpperCase, setIsUpperCase] = useState(false);
  const [isNumber, setIsNumber] = useState(false);

  // functions required for password creation funcitonality 
  const generatePassword = (passwordLength: number) => {
    let drawer = '';
    if (isLowerCase) {
      drawer += 'abcdefghijklmnopqrstuvwxyz';
    }
    if (isUpperCase) {
      drawer += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    if (isNumber) {
      drawer += '0123456789';
    }
    const generatedPasswd = createPassword(drawer, passwordLength);
    setPassword(generatedPasswd);
    setIsPasswordGenerated(true);
  };

  const createPassword = (drawer: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const index = Math.round(Math.random() * drawer.length);
      result += drawer.charAt(index);
    }
    return result;
  };

  const resetInputs = () => {
    setPassword('');
    setIsPasswordGenerated(false);
    setIsLowerCase(true);
    setIsUpperCase(false);
    setIsNumber(false);
  }


  return (
    <SafeAreaView>

      <ScrollView>
        <Text style={styles.h1Heading}>iPassword</Text>

        <View style={styles.MainBody}>
          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={passwordSchema}
            onSubmit={(values) => {
              generatePassword(Number(values.passwordLength));
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleReset,
              handleSubmit,
              /* and other goodies */
            }) => (
              <>
                <View style={styles.inputWrapper}>

                  <View style={styles.inputTextWrapper}>
                    <Text style={styles.label}>Password Length</Text>
                    {errors.passwordLength && touched.passwordLength &&
                      <Text style={styles.error}>{errors.passwordLength}</Text>
                    }
                  </View>

                  <View style={styles.inputFieldWrapper}>
                    <TextInput
                      onChangeText={handleChange('passwordLength')}
                      onBlur={handleBlur('passwordLength')}
                      value={values.passwordLength}
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                {/* check-box  */}
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputTextWrapper}>Include lowercase</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={isLowerCase}
                    onPress={() => setIsLowerCase(!isLowerCase)}
                    fillColor="#29AB87"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputTextWrapper}>Include uppoerCase</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={isUpperCase}
                    onPress={() => setIsUpperCase(!isUpperCase)}
                    fillColor="#29AB87"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputTextWrapper}>Include Numbers</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={isNumber}
                    onPress={() => setIsNumber(!isNumber)}
                    fillColor="#29AB87"
                  />
                </View>

                <View style={styles.buttonWrapper}>
                  <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                    <Text> Generate</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={() => {handleReset(); resetInputs()}}>
                    <Text> Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        {isPasswordGenerated &&
          <View style={styles.passwdArea}>
            <Text selectable style={{fontSize: 20}}>{password}</Text>
          </View>
        }
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  h1Heading: {
    fontSize: 25,
    fontWeight: '800',
    color: '#0CF123',
    marginHorizontal: '35%',
    marginVertical: 20,
  },
  MainBody: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 10,
  },

  inputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 5,
  },
  inputTextWrapper: {
    width: 250,
    marginVertical: 10,
    fontSize: 16,
    fontWeight: '700',

  },
  inputFieldWrapper: {
    borderColor: 'lightgray',
    borderWidth: 1,
    height: 40,
    width: 100,
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
  },
  error: {
    color: 'red',
  },

  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  button: {
    backgroundColor: 'gray',
    width: 100,
    height: 35,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  passwdArea:{
    marginHorizontal: 10,
    marginTop: 80,
    height: 200,
    borderRadius: 8,
    backgroundColor: '#0F0F33',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
// style={{borderColor: 'lightgray', borderWidth: 1,}}