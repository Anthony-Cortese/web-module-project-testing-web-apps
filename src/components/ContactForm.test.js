import React from 'react';
import {render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
  
          
  
  test('renders THREE error messages if user enters no values into any fields.', async () => {
      render(<ContactForm />)
  
  });
  
  test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
      
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
  
  });
  
  test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
      render(<ContactForm />)
      const inputFirstName = await screen.findByLabelText(/first name*/i)
      const inputLastName = await screen.findByLabelText(/last name*/i)
      const inputEmail = await screen.findByLabelText(/email/i)
      fireEvent.change(inputFirstName, { target: { value: "Tony", name: "firstName" } })
      fireEvent.change(inputLastName, { target: { value: "Cortese", name: "lastName" } })
      fireEvent.change(inputEmail, { target: { value: "tonyCortese@gmail.com", name: "email" } })
  });
  
  test('renders all fields text when all fields are submitted.', async () => { 
  
  })