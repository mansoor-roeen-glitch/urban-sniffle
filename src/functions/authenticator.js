// Dependencies 
import fetchEndpoint from "./fetchAnEndpoint";

// Funtion to redirect users if they are authenticated
// Using this I prevent users from having to login again and again
// And prevent users from being able to access /register, /login, /reset unless they are logged out
const authenticatedRedirect = (redirectUserTo) => {
  
  let pathname = window.location.pathname

  if (pathname === '/register' || pathname === '/reset' || pathname === '/login' ) {
    redirectUserTo('/')
  } else {
    redirectUserTo(pathname)
  }

}

// Function to redirect users if they are not authenticated
// Using this I can make sure users are being redirected to specific pathnames or /login by default
// And prevent users from accessing the app unless they are logged in
const notAuthenticatedRedirect = (redirectUserTo) => {

  // Function used to find out the redirect pathname
  const reLocation = () => {
    if (window.location.pathname === "/register") {
      return "/register";
    } else if (window.location.pathname === "/reset") {
      return "/reset";
    } else if (window.location.pathname === "/login") {
      return '/login'
    } else {
      return "/login"
    }
  }

  // Using redirectUserTo object to redirect the unauthenticated user
  redirectUserTo(reLocation());

}

// Function to check the user token
// And update ther user information
const authenticator = async (token, setToken, setUser) => {
 
  if (token) {
  
    // Getting the user infromation and checking the token
    let response = await fetchEndpoint({token, endpoint: '/auth/user/'}); 
    
    if (response.status_code === 200) {   
      
      setToken(token)
      setUser(response)
      return 'authenticated'

    } else {

      setToken('')
      return 'not_authenticated';

    }

  } else {

    return 'not_authenticated';

  }

}

export {
  authenticator,
  notAuthenticatedRedirect,
  authenticatedRedirect,
}