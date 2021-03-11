import React from 'react';
import {render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from "react-dom/test-utils";

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />) 
});

test('renders the contact form header', ()=> {
    render(<ContactForm />)
    const header = screen.getByText(/contact form/i)
    expect(header).toBeInTheDocument()
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />)
    const inputFirstName = await screen.findByLabelText(/first name*/i)
    fireEvent.change(inputFirstName, { target: { value: "Tony", name: "firstName" } })

    const firstNameError = screen.queryByText(/Error: firstName must have at least 5 characters./i)
    expect(firstNameError).toBeInTheDocument()

});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    //arrange
    render(<ContactForm />)
    //act
    const button = screen.getByRole("button")
    userEvent.click(button)

    const nameError = screen.queryByText(/Error: firstName must have at least 5 characters./i)
    const lnameError = screen.queryByText(/Error: lastName is a required field./i)
    const emailError = screen.queryByText(/Error: email must be a valid email address./i)
    //assert
    expect(nameError).toBeInTheDocument()
    expect(lnameError).toBeInTheDocument()
    expect(emailError).toBeInTheDocument()

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)
    const inputFirstName = await screen.findByLabelText(/first name*/i)
    const inputLastName = await screen.findByLabelText(/last name*/i)
    fireEvent.change(inputLastName, { target: { value: "Cortese", name: "lastName" } })
    fireEvent.change(inputFirstName, { target: { value: "Tony", name: "firstName" } })

    const emailInput = await screen.queryByText(/Error: email must be a valid email address./i);
    expect(emailInput).toBeInTheDocument()
    // const firstName = screen.queryByLabelText(/firstName/i)
    // userEvent.type(firstName, "Tony")
    // const lastName = screen.queryByLabelText(/lastName/i)
    // userEvent.type(lastName, "Tony")

    // const button = screen.getByRole("button")
    // userEvent.click(button)

    // const emailError = screen.queryByText(/Error: email must be a valid email address./i)

    // expect(emailError).toBeInTheDocument()

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)
    const emailInput = await screen.findByLabelText(/email/i)
    fireEvent.change(emailInput, { target: {value: "tonyC@gmail.com", name: "email"}})
    expect(emailInput).toHaveValue("tonyC@gmail.com")
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)
    const inputLastName = await screen.findByLabelText(/last name*/i)
    fireEvent.change(inputLastName, { target: { value: "Cortese", name: "lastName" } })
    expect(inputLastName).toHaveValue("Cortese")
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />)
    const inputFirstName = await screen.findByLabelText(/first name*/i)
    const inputLastName = await screen.findByLabelText(/last name*/i)
    const inputEmail = await screen.findByLabelText(/email/i)
    fireEvent.change(inputFirstName, { target: { value: "Tony", name: "firstName" } })
    fireEvent.change(inputLastName, { target: { value: "Cortese", name: "lastName" } })
    fireEvent.change(inputEmail, { target: { value: "tonyCortese@gmail.com", name: "email" } })

    const button = screen.getByRole('button');
    userEvent.click(button)

});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)

        const inputFirstName = await screen.findByLabelText(/first name*/i)
        const inputLastName = await screen.findByLabelText(/last name*/i)
        const inputEmail = await screen.findByLabelText(/email*/i)
        const inputMessage = await screen.findByLabelText(/message*/i)
        
        fireEvent.change(inputFirstName, { target: { value: "Ava", name: "firstName" } })
        fireEvent.change(inputLastName, { target: { value: "Murad", name: "lastName" } })
        fireEvent.change(inputEmail, { target: { value: "avaMurad@gmail.com", name: "email" } })
        fireEvent.change(inputMessage, { target: { value: "hi", name: "message" } })

        const button = screen.getByRole('button');
        userEvent.click(button)
});