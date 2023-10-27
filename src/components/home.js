import React, { useEffect, useState } from "react";
import axios from "axios";
import { json } from "react-router-dom";


const getAuth = async (code) => {
    //make post request to SPOTIFY API for access token, sending relavent info
    console.log(localStorage.getItem('code_verifier'))
    console.log("code: ", code)
    const token_url = 'https://accounts.spotify.com/api/token';
    let body = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: 'http://localhost:3000/home',
      client_id: 'ec96e711a8bd468fa6e27ddae9671c2c',
      code_verifier: localStorage.getItem('code_verifier')
    });

    const headers = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
 
    console.log(1)
    const response = axios.post('https://accounts.spotify.com/api/token', body, headers)
      .then(response => {
        if (response.status === 200){
          console.log(response)
          localStorage.setItem('at', response.data.access_token)
          return response.data.access_token
        }
        
      })
      .catch(error => {
        console.error('Error:', error);
      });

      //console.log(response)
    //return access token
    //console.log(response.data.access_token);   
}

export default function Home() {
  const [tracks, setTracks] = useState([]);
  const [code, setCode] = useState([])
  // const urlParams = new URLSearchParams(window.location.search);
  // let code = urlParams.get('code');

  useEffect(() => {
    const fetchData = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        let code = urlParams.get('code');
        if (code) {
            try {
                const accessToken = await getAuth(code);

                const at = localStorage.getItem('at')
                console.log("at: ", at)
                const headers = {
                  headers: {
                    'Authorization': `Bearer ${at}`
                  }
                }

                axios.get('https://api.spotify.com/v1/me/tracks', headers). then(response => {
                  if (response.status === 200){
                    console.log(response)
                  }
                  
                }).catch(err => {
                  console.log(err)
                })
                // ...
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    };

    fetchData(); // Call the async function
}, [code]);

  if (!code) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      {tracks.map(track => (
        <div key={track.id}>
          {track.name} - {track.artists.map(artist => artist.name).join(', ')}
        </div>
      ))}
    </div>
  );
}
