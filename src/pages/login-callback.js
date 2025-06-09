import * as React from "react";
import { default as axios } from 'axios';
import { useAuth } from '../context/auth-context';
import { navigate } from 'gatsby';

const LoginCallbackPage = (props) => {
  const { setToken, setProfileName } = useAuth()

  React.useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const code = params.get("code");

    axios.post("https://accounts.besarts.biz.id/realms/besart/protocol/openid-connect/token", {
      code: code,
      grant_type: "authorization_code",
      client_id: "besart-gallery",
      redirect_uri: "https://besarts.biz.id/login-callback"
    }, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(function (response) {
      setToken(response.data.access_token)

      axios.get("https://accounts.besarts.biz.id/realms/besart/protocol/openid-connect/userinfo", {
        headers: {
          'Authorization': 'Bearer ' + response.data.access_token
        }
      }).then(function(response) {
        setProfileName(response.data.name)
      })

      navigate("/")
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [])
  
  return <p>Please wait...</p>;
}

export default LoginCallbackPage