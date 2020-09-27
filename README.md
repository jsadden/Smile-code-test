### Basic Tasks:

- [X] Add a `Table` class component and populate it with results from the `getPatients()` function.

- [X] Sort the table based on youngest birthdate to oldest.

* [X] Add a search function to the page. Add two inputs to `Table` component - a textbox that takes in a name (it can be the first or last name of a patient), and a date picker for date of birth. Modify the query and function `getPatients()` to include search results for a `Patient` based on the name passed in, and the date of birth passed in from the date picker. The results should be reflected in the table. Use the [SearchParameters section](https://www.hl7.org/fhir/patient.html#search) to help with building your query. 

* [X] Apply validation to the inputs - the name box cannot contain non-alphabetic characters, and the date field must be a valid date structure (YYYY/MM/DD).

* [X] Output the time the request was made on the page to show the results are as of that time. Display in the following format `Mon 06 Mar 2017 at 00:00:00`. For example, `Results as of Mon 06 Mar 2017 at 00:00:00`

* [X] Commit your work.

### Intermediate Tasks:

- [ ] Add `Questionnaire` componenent, generate a form using the `questionnaire.json` file in the `assets` folder. The form should have validation applied to each input and form input elements should be controlled component.

- [ ] Using the results from the form, generate a [`QuestionnaireResponse`](https://www.hl7.org/fhir/questionnaireresponse.html). The `QuestionnaireResponse` should follow the structure outlined in the [Resource Content Section](https://www.hl7.org/fhir/questionnaireresponse.html#resource)

- [ ] Display your results in a neat and clean manner.

- [ ] Update the `Questionnaire` Component to be mobile-friendly.

- [ ] Please include unit tests for your work.

- [ ] Commit your work.

### Advanced Tasks:

- [ ] Refactor `Practitioner` class component into functional component using [React hooks](https://reactjs.org/docs/hooks-intro.html).

- [ ] Add `PractitionerCard` component, display the each practitioner in card format, display data in proper format. ie. Date of birth in (YYYY/MM/DD) format, replace `undefined` value with `N/A`. Add Typechecking with [PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html).

- [ ] Display loading state until the request is not complete.

- [ ] Add a delete button in `PractitionerCard`, should ask for confirmation when clicked. Remove the particular `Practitioner` when confirmed. Note: No need to make server request.

- [ ] Add [`ErrorBoundary`](https://reactjs.org/docs/error-boundaries.html) component, use this component to make sure it catches the javascript errors thrown from `Practitioner` component.

- [ ] Commit your work.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
