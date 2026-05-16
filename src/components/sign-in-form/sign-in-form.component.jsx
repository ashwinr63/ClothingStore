import { useState } from "react"
import { useLocation, useNavigate } from 'react-router-dom';

import FormInput from '../form-input/form-input.component'
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component"

import toast from 'react-hot-toast';
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils"

import {ButtonContainer, SignInContainer} from './sign-in-form.styles.jsx'

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';


    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }
    const signInWithGoogle = async () => {
        try {
            await signInWithGooglePopup();
            toast.success('Signed in successfully');
            navigate(from, { replace: true });
        } catch (error) {
            toast.error('Google sign in failed');
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password)
            resetFormFields();
            toast.success('Signed in successfully');
            navigate(from, { replace: true });
            
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    toast.error('Incorrect password for email')
                    break
                case 'auth/user-not-found':
                    toast.error('User Not Found')
                    break
                default:
                    toast.error('Error signing in')
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormFields({ ...formFields, [name]: value })
    }

    return (
        <SignInContainer>
            <h2>Already have an account</h2>
            <span>Sign in with Email and Password</span>
            <form onSubmit={handleSubmit}>

                <FormInput label='Email' type='email'
                    required
                    onChange={handleChange}
                    name='email'
                    value={email} />

                <FormInput label='Password' type='password'
                    required
                    onChange={handleChange}
                    name='password'
                    value={password}
                />
            <ButtonContainer>
                <Button type='submit' buttonType={BUTTON_TYPE_CLASSES.inverted}> Login </Button>
                <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}> Google </Button>
                </ButtonContainer>
            </form>

        </SignInContainer>
    )
}


export default SignInForm