import React, { useEffect } from 'react'

export const DashboardPage = ({user}) => {
  useEffect(() => {
    console.log('user', user)
  }, []);
  return (
    <div>{user.identities.username.id}</div>
  )
}
