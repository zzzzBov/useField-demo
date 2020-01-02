import React, { useCallback } from 'react';
import { LogInForm } from './components'

export const App: React.FC = () => {
  const onSubmit = useCallback((username: string, password: string) => {
    alert(`Logged in with ${username}/${password}`)
  }, [])

  return (
    <LogInForm onSubmit={onSubmit} />
  );
}
