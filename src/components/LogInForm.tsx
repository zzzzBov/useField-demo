import React, { FC, useCallback } from 'react'

// Import the useField hook along with any needed validators
import { useField, required } from '@zzzzbov/usefield'

interface ILogInFormProps {
  onSubmit(username: string, password: string): void
}

// `useField` can be used within any react control.
// This one is an example login form.
export const LogInForm: FC<ILogInFormProps> = ({
  // The onSubmit property here is used as an example to externalize the
  // submitted form data. This is done to keep the example brief but is not
  // strictly necessary.
  onSubmit
}) => {
  // Call the `useField` hook passing in as few or as many validators as
  // desired, along with an initial field value. In this case a single required
  // field validator is used.
  const username = useField({
    required
  }, '')

  // `useField` can be called as many times as needed for as many fields as
  // needed. While this makes managing data very straightforward, it may be too
  // verbose for complex forms that have more than a handful of fields.
  const password = useField({
    required
  }, '')

  // Set up a callback for the form submission
  const internalSubmit = useCallback((e) => {
    e.preventDefault()

    // Mark the fields as dirty since the fields might not have been edited yet
    username.touch()
    password.touch()

    // Check that the fields are valid.
    // Use the `valid` properties and NOT the `error` helpers as the error
    // helpers will return false if the fields are clean.
    if (username.valid && password.valid) {
      // Handle the form submission behavior.
      // This example uses an onSubmit property to keep things simple.
      onSubmit(username.value, password.value)
    }
  }, [onSubmit, username, password])

  return (
    <form
      method='POST'

      // Bind the submit callback on the form to take advantage of native form
      // submission behaviors, such as implicit form submission.
      onSubmit={internalSubmit}>
      <h1>Log In</h1>
      <div className='Field'>
        <label htmlFor='username'>Username:</label>
        {/*
          Display an error message to the user.
          
          If multiple validators are used, it may be desirable to check each
          validator explicitly, such as:

          { username.dirty && !username.validation.required && (
            <p>Username is required</p>
          ) }

          Alternatively, validator-specific messages may be left visible so
          that their current state is visibly toggled as the user changes the
          field value:

          <p>
            { username.validation.required ? '☑ ' : '☐ ' }
            Username is required
          </p>
         */}
        {username.error && (
          <p id='username-error'>Username is required</p>
        )}
        <input
          // The `error` property can be used to visually indicate an issue to 
          // the user such as by toggling a class.
          className={username.error ? 'error' : ''}
          id='username'
          name='u'
          type='text'
          aria-describedby='username-error'

          // Pass the current value to the field
          value={username.value}

          // Bind the `set()` method to the field.
          // Some extra boilerplate is used to access the current field value.
          // If the field should be marked as dirty, call touch as well:
          //
          // onChange={e => {
          //   username.set(e.target.value)
          //   username.touch()
          // }}
          onChange={e => username.set(e.target.value)}

          // `touch()` is bound to the blur handler so that the field is flagged
          // as dirty only after the user has finished editing the field.
          onBlur={username.touch}
        />
      </div>
      <div className='Field'>
        <label htmlFor='password'>Password:</label>
        {password.error && (
          <p id='password-error'>Password is required</p>
        )}
        <input
          className={password.error ? 'error' : ''}
          id='password'
          name='p'
          type='password'
          aria-describedby='password-error'
          value={password.value}
          onChange={e => password.set(e.target.value)}
          onBlur={password.touch}
        />
      </div>
      {/*
        A single submit button is used here to submit the form.
        If a reset button is also desirable, it may be added, and an `onReset`
        handler should be added to the <form> to reset the fields:

        onReset={() => {
          username.reset()
          password.reset()
        }}
      */}
      <button type='submit'>
        Log In
      </button>
    </form>
  )
}