/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import axios from "axios";

const onSubmitHandler = async(e) => {
  const clientId = 'ec96e711a8bd468fa6e27ddae9671c2c';
  const redirectUri = 'http://localhost:3000/home';

  let codeVerifier = generateRandomString(128);

  await generateCodeChallenge(codeVerifier).then(codeChallenge => {
    let state = generateRandomString(16);
    let scope = 'user-top-read user-library-read';

    localStorage.setItem('code_verifier', codeVerifier);

    let args = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      scope: scope,
      redirect_uri: redirectUri,
      state: state,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge
    });

    window.location = 'https://accounts.spotify.com/authorize?' + args;
//     const urlParams = new URLSearchParams(window.location.search);
  });
//       const urlParams = new URLSearchParams(window.location.search);
// let code = urlParams.get('code');
// console.log("2: ", code)
}

function generateRandomString(length) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier) {
  function base64encode(string) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);

  return base64encode(digest);
}

const loginContainer = {
  display: "flex",
  borderWidth: "50%",
  boxShadow: "0 0 3px 2px #cec7c759",
  alignItems: "center",
  padding: 20,
  borderRadius: 20,
  justifyContent: "center",
  borderLeft: 500,
  marginLeft: "25%",
  marginRight: "25%",
  marginTop: "50%",
};

export default function Login() {
        return (
            <form style={loginContainer}>
                <h3>Sign In</h3>

                <div className="mb-3">
                    <label>Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                    />
                </div>
                <div className="mb-3">
                    <div className="custom-control custom-checkbox">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck1"
                        />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary" onClick={onSubmitHandler}>Submit</button>
                </div>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        );
}
