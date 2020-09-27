import React from 'react'
import {render, fireEvent, screen, cleanup, getByText} from '@testing-library/react'

import Questionnaire from './Questionnaire'

afterEach(cleanup)

//renders correct content
test("renders correct content", () => {
    render(<Questionnaire/>)

    screen.getByText("Allergies")
    screen.getByText("Do you have allergies?")
    screen.getByText("General Questions")
    screen.getByText("What is your gender?")
    screen.getByText("What is your date of birth?")
    screen.getByText("What is your country of birth?")
    screen.getByText("What is your marital status?")
    screen.getByText("Intoxications")
    screen.getByText("Do you smoke?")
    screen.getByText("Do you drink alchohol?")

    screen.getByLabelText("Do you have allergies?").hasAttribute('type', 'checkbox')
    screen.getByLabelText("What is your gender?").hasAttribute('type', 'text')
    screen.getByLabelText("What is your date of birth?").hasAttribute('type', 'date')
    screen.getByLabelText("What is your country of birth?").hasAttribute('type', 'text')
    screen.getByLabelText("What is your marital status?").hasAttribute('type', 'text')
    screen.getByLabelText("Do you smoke?").hasAttribute('type', 'checkbox')
    screen.getByLabelText("Do you drink alchohol?").hasAttribute('type', 'checkbox')

    
})

//validation of form elements
test('validate allergy box -- success', () => {
    render(<Questionnaire/>)

    const input = screen.getByLabelText('Do you have allergies?')

    fireEvent.click(input)
    expect(input.checked).toBe(true)

    fireEvent.click(input)
    expect(input.checked).toBe(false)
})

test('validate alchohol box -- success', () => {
    render(<Questionnaire/>)

    const input = screen.getByLabelText('Do you drink alchohol?')

    fireEvent.click(input)
    expect(input.checked).toBe(true)

    fireEvent.click(input)
    expect(input.checked).toBe(false)
})

test('validate smoke box -- success', () => {
    render(<Questionnaire/>)

    const input = screen.getByLabelText('Do you smoke?')

    fireEvent.click(input)
    expect(input.checked).toBe(true)

    fireEvent.click(input)
    expect(input.checked).toBe(false)
})

test('validate gender box -- entry', () => {
    render(<Questionnaire/>)

    const input = screen.getByLabelText('What is your gender?')

    fireEvent.change(input, {target: {value: 'Male'}})
    expect(input.value).toBe('Male')
})

test('validate dob box -- entry', () => {
    render(<Questionnaire/>)

    const input = screen.getByLabelText('What is your date of birth?')

    fireEvent.change(input, {target: {value: '2020-09-26'}})
    expect(input.value).toBe('2020-09-26')
})

test('validate birthCountry box -- entry', () => {
    render(<Questionnaire/>)

    const input = screen.getByLabelText('What is your country of birth?')

    fireEvent.change(input, {target: {value: 'Canada'}})
    expect(input.value).toBe('Canada')
})

test('validate marital box -- entry', () => {
    render(<Questionnaire/>)

    const input = screen.getByLabelText('What is your marital status?')

    fireEvent.change(input, {target: {value: 'Single'}})
    expect(input.value).toBe('Single')
})

test('submit and input validation', () => {
    render(<Questionnaire/>)

    const button = screen.getByText('Submit')

    fireEvent.click(button)

    //expected error message from empty submit
    expect(screen.getByText('Please provide a gender'))

    const genderInput = screen.getByLabelText('What is your gender?')
    const dobInput = screen.getByLabelText('What is your date of birth?')
    const countryInput = screen.getByLabelText('What is your country of birth?')
    const maritalInput = screen.getByLabelText('What is your marital status?')

    //numeric input for gender
    fireEvent.change(genderInput, {target: {value: 'asd123dsd'}})
    fireEvent.click(button)
    expect(screen.getByText('Gender must only contain alphabetic characters'))

    //correct input for gender, blank dob
    fireEvent.change(genderInput, {target: {value: 'Male'}})
    fireEvent.click(button)
    expect(screen.getByText('Please provide a date'))

    //correct dob, blank birth country
    fireEvent.change(dobInput, {target: {value: '2020-09-26'}})
    fireEvent.click(button)
    expect(screen.getByText('Please provide a country of birth'))

    //numeric entry for birth country
    fireEvent.change(countryInput, {target: {value: 'Cana6a'}})
    fireEvent.click(button)
    expect(screen.getByText('Birth country must only contain alphabetic characters'))

    //correct entry for birth country, blank marital
    fireEvent.change(countryInput, {target: {value: 'Canada'}})
    fireEvent.click(button)
    expect(screen.getByText('Please provide a marital status'))

    //numeric marital entry
    fireEvent.change(maritalInput, {target: {value: 'S1ingle'}})
    fireEvent.click(button)
    expect(screen.getByText('Marital status must only contain alphabetic characters'))

    //correct marital status and expect questionnaire results
    fireEvent.change(maritalInput, {target: {value: 'Single'}})
    fireEvent.click(button)
    expect(screen.getByText('Questionnaire Results'))

    //results should not change if input box changes
    fireEvent.change(maritalInput, {target: {value: 'Married'}})
    expect(screen.getByText('Single'))

})

