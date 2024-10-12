import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput,TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import  BouncyCheckbox from 'react-native-bouncy-checkbox';

//form validation 

import * as Yup from 'yup';
import { Formik } from 'formik';


const PasswordSchema = Yup.object().shape({
  passwordLength:Yup.number()
  .min(4,'should be min 4 characters')
  .max(16,'should max of 16 char')
  .required('This is Required')
})


export default function App() {

  const [passowrd, setPassword]= useState('')
  const [isPassGenrated, setIsPassGenrated] =useState(false)
  const [lowerCase, setLowerCase]= useState(true)
  const [upperCase, setUpperCase]=useState(true)
  const [numbers , setNumbers] = useState(false)
  const [symbols, setSymbols]= useState(false)
  
  const genratePasswordString=(passwordLength:number)=>{

    let characterList = '';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars ='abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    if(upperCase){
      characterList+=upperCaseChars
    }
    if(lowerCase){
      characterList+=lowerCaseChars
    }
    if(numbers){
      characterList+=numberChars
    }
    if(symbols){
      characterList+=specialChars
    }
    

    const passwordResult=createPassword(characterList,passwordLength)
    
    setPassword(passwordResult)
    setIsPassGenrated(true)

  }


  const createPassword = (characters:string,passwordLength:number)=>{
    let result =''
    for(let i =0; i<passwordLength; i++){
      const characterIndex = Math.round(Math.random()*characters.length)
      result += characters.charAt(characterIndex)

    }
    return result

  }
  
  const resetPassword =() =>{
    setPassword('')
    setIsPassGenrated(false)
    setLowerCase(false)
    setUpperCase(true)
    setNumbers(false)
    setSymbols(false)
    //
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}> Password Generator </Text>

          <Formik
       initialValues={{ passwordLength: ''}}
       validationSchema={PasswordSchema}
       onSubmit={values =>{
        console.log(values)
        genratePasswordString(+values.passwordLength)
       }}
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleSubmit,
         handleReset,
         /* and other goodies */
       }) => (
        <>
          <View style={styles.inputWrapper}> 
            <View style={styles.inputColumn}>
              <Text style={styles.heading}> Password Length </Text>
              {touched.passwordLength && errors.passwordLength &&(
                <Text style={styles.errorText}>
                  {errors.passwordLength}
                </Text>
              )}
              
            </View>
            <TextInput
              style={styles.inputStyle}
              value={values.passwordLength}
              onChangeText={handleChange('passwordLength')}
              placeholder="ex.8"
              keyboardType='numeric'
             />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.heading}> Includes Lower Case</Text>
            <BouncyCheckbox
              isChecked={lowerCase}
              onPress={()=>setLowerCase(!lowerCase)}
              fillColor="#29AB87"
            
            />
          </View>
          <View style={styles.inputWrapper}>
          <Text style={styles.heading}> Set Upper Case  </Text>
            <BouncyCheckbox
              isChecked={upperCase}
              onPress={()=>setUpperCase(!upperCase)}
              fillColor="#43GHM7"
            
            />
          </View>
          <View style={styles.inputWrapper}>
          <Text style={styles.heading}> Set Numbers </Text>
            <BouncyCheckbox
              isChecked={numbers}
              onPress={()=>setNumbers(!numbers)}
              fillColor="#FE53E8"
            
            />
          </View>
          <View style={styles.inputWrapper}>
          <Text style={styles.heading}> Set Symbols </Text>
            <BouncyCheckbox
              isChecked={symbols}
              onPress={()=>setSymbols(!symbols)}
              fillColor="#AB3333"
            
            />
          </View>
        
          <View style={styles.formAction}>
            <TouchableOpacity
            disabled={!isValid}
            style={styles.primaryBtn}
            onPress={handleSubmit}
            >
                <Text> Genrate Password </Text>
              </TouchableOpacity>
            <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={()=>{
              handleReset();
              resetPassword()
            }}
            >
              <Text>
                reset
              </Text>
            </TouchableOpacity>
          </View>
        </>
       )}
     </Formik>


      </View>

      {isPassGenrated?(
        <View style={[styles.card,styles.cardElevated]}>
          <Text style={styles.subTitle}>Result: </Text>
          <Text style={styles.description}>Long Press to Copy </Text>
          <Text selectable={true} style={styles.generatedPassword}>{passowrd}</Text>
        </View>
      ) : null}

      </SafeAreaView>

    </ScrollView>


  )
}

const styles = StyleSheet.create({
  appContainer:{
    flex:1,
    

  },
  formContainer:{
    margin:8,
    padding:8,

  },
  title:{
    fontSize:32,
    fontWeight:'bold',
    marginBottom:15,

  },
  inputWrapper:{
    marginBottom:15,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row'

  },
  formAction:{
    flexDirection:'row',
    justifyContent:'center'

  },
  inputColumn:{
    flexDirection:'column'
  },
  inputStyle:{
    padding:8,
    width:'30%',
    borderWidth:1,
    borderRadius:4,
    borderColor:'#ccc',
  },
  heading:{
    fontSize:15,

  },
  errorText:{
    fontSize:12,
    color:'#ffod10'

  },
  primaryBtn:{
   width:120,
   padding:10,
   borderRadius:8,
   marginHorizontal:8,
   backgroundColor:'#5DA3FA',
  },
  secondaryBtn:{
    width:120,
   padding:10,
   borderRadius:8,
   marginHorizontal:8,
   backgroundColor:'#5DA3FA',

  },
  passGenerated:{},
  passGeneratedText:{},
  card:{
    padding:12,
    borderRadius:6,
    marginHorizontal:12,
  },
  cardElevated:{
    backgroundColor:"#ffffff",
    elevation:1,
    shadowOffset:{
      width:1,
      height:1,
    },
    shadowColor:"#333",
    shadowOpacity:0.3,
    shadowRadius:2,
  },
  subTitle:{
    fontSize:26,
    fontWeight:'600',
    marginBottom:2,
  },
  description:{
    color:'#758283',
    marginBottom:8,
  },
  generatedPassword:{
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#000'
  },
})
