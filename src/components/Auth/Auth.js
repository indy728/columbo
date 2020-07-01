import React, { Component } from 'react'
import styled from 'styled-components'

class Auth extends Component {
    state = {
        loginControls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email',
                    autocomplete: 'email',
                },
                value: '',
                validation: {
                  required: true,
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                    autocomplete: 'current-password',
                },
                value: '',
                validation: {
                  required: true,
                  length: {
                      absMin: 6,
                      absMax: 26
                  },
                },
                valid: false,
                touched: false
            },
        },
        signUpControls: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Choose a Username',
                    autocomplete: 'username',
                },
                value: '',
                validation: {
                    required: true,
                    length: {
                        absMin: 5,
                        absMax: 22,
                    },
                    chars: 'alnum',
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email',
                    autocomplete: 'email',
                },
                value: '',
                validation: {
                  required: true,
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                    autocomplete: 'new-password',
                },
                value: '',
                validation: {
                  required: true,
                  length: {
                      absMin: 6,
                      absMax: 26
                  },
                },
                valid: false,
                touched: false
            },
            verifyPassword: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Re-enter Password',
                    autocomplete: 'verify-password',
                },
                value: '',
                validation: {
                  required: true,
                  match: 'password',
                },
                valid: false,
                touched: false
            },
    }}

    inputChangedHandler = (event, controlName) => {
        let controls = {...this.state.loginControls}
        if (this.state.isSignUp) controls = {...this.state.signUpControls}
        const updatedControls = updateObject(controls, {
            [controlName]: updateObject(controls[controlName], {
                value: event.target.value,
                valid: this.checkValidity(event.target.value, controls[controlName].validation),
                touched: true
            })
        })

        let formIsValid = true
        for (let inputIdentifier in controls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid
        }

        this.updateControlsAndFormValidity(updatedControls, formIsValid)
    }


    render() {
        return (
            null
        )
    }
}

export default Auth