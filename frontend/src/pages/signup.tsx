"client"

import React, { useState } from 'react';

export default function SignupScreen({ onSubmit }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card as React.CSSProperties}>
        <h2 style={styles.heading}>Welcome to CodeLeap network!</h2>
        <label style={styles.label}>Please enter your username</label>
        <input
          type="text"
          placeholder="John doe"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <button
          type="submit"
          disabled={!username.trim()}
          style={{
            ...styles.button,
            ...(username.trim() ? {} : styles.disabledButton),
          }}
        >
          ENTER
        </button>
      </form>
    </div>
  );
}

const styles = {

  container: {
    height: '100vh',
    width: '100vw',
    backgroundColor: '#d3d3d3',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    padding: '22px',
    backgroundColor: 'white',
    borderRadius: '16px',
    minWidth: '350px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: "500px",
    height: "205px",
    angle: "0 deg",
    top: "439px",
    left:"710px",
    opacity: "1",
    borderWidth: "1px",
    
  },

  heading: {
    margin: 0,
    fontFamily: 'Roboto, sans-serif',
    fontWeight: '700px',
    fontSize: '22px',
  },

  label: {
    fontSize: '16px',
    fontWeight: '400',
    fontFamily: 'Roboto, sans-serif', 
    marginTop: "20px"
  },

  input: {
    width: "480px",
    heigth: "34px",
    padding: '8px',
    fontSize: '14px',
    border: '1px solide #777777',
    borderRadius: '8px',
  },

  button: {
    marginTop: '12px',
    padding: '8px',
    fontWeight: '700',
    color: 'white',
    backgroundColor: '#7695EC',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    width: "120px",
    height: "40px",
    left: "5000px",
    position:"sticky",
    fontFamily: 'Roboto, sans-serif',
    fontSize: '16px',
  },

  disabledButton: {
    backgroundColor: '#747171ff',
    cursor: 'not-allowed',
  },

};
