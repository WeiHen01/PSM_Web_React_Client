import React from 'react'

const ForgetPassword = () => {

  const bodyStyle = {
    background: 'linear-gradient(to right, #301847, #C10214)', // Set your desired background color here // Ensure the gradient covers the entire viewport height
    display: 'flex',
    color: '#fff', // Set text color to contrast with the gradient
    fontSize: '24px',
    minHeight: '100vh', // Ensure the div covers the full viewport height
    overflowY: 'auto', // Add vertical scrollbar if content overflows
  };

  const shadowStyle = {
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', // Horizontal offset, Vertical offset, Blur radius, Color
  };

  return (
    <div style = {bodyStyle} className ="grid grid-cols-2 px-4 items-center h-screen">
      <title>BITU3973 | Forget Password</title>
      Forget Password ABC
    </div>
  )
}

export default ForgetPassword;
