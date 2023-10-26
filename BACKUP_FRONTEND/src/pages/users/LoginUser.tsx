import React, { useState } from "react";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../../config.js";
import { useSnackbar } from "notistack";
import emailValidator from "../../utils/validation/emailValidator";
import verifyToken from "../../utils/auth/verifyToken.jsx";
import store from "../../store/store.jsx";

const RegisterUser = () => {
  // Input field values for logging in a user as state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error state for displaying error messages if the user enters invalid input
  const [emailError, setEmailError] = useState(false);

  // Validate input fields
  const validateEmail = () => {
    if (emailValidator(email) === false) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  // Handle onChange events for input fields
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) {
      validateEmail();
    }
  };

  // Loading state for displaying a spinner while the request is being sent to the backend
  const [loading, setLoading] = useState(false);

  // useNavigate is a hook that returns a navigate function that we can use to navigate to a different page
  const navigate = useNavigate();
  // useSnackbar is a hook that returns an object with two properties: enqueueSnackbar and closeSnackbar
  // enqueueSnackbar is a function that takes an object as an argument
  // and displays a snackbar with the message and the variant that we pass in the object
  // closeSnackbar is a function that takes an id as an argument and closes the snackbar with that id
  // https://iamhosseindhv.com/notistack/demos#use-snackbar
  const { enqueueSnackbar } = useSnackbar();

  const handleLoginUser = () => {
    // Validate email address to be the correct format otherwise return before sending a request to the backend
    validateEmail();
    if (emailError || !email || !password) {
      return;
    }

    const data = {
      email: email,
      password: password,
    };

    setLoading(true);

    axios
      .post(BACKEND_URL + "/users/login", data)
      .then((response) => {
        setLoading(false);
        // Save the JWT token in a cookie
        const token = response.data.token;
        console.log("JWT token in LoginUser.jsx: " + token);
        // Cookie expires one day before the JWT token expires this is to avoid
        // the case where the JWT token expires before the cookie and the user is
        // logged out before the cookie expires.
        Cookies.set("jwt", token, { expires: 29 });
        verifyToken(token);
        enqueueSnackbar("You are logged in!", {
          variant: "success",
        });

        store.dispatch({
          type: "COMPANIES_LIST_SHOW_TYPE",
          payload: "card",
        });

        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar(
          "Error logging in! Did you use the right credentials?",
          { variant: "error" }
        );
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton destination={"/"} />
      <h1 className="text-3xl my-4">Login</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Email</label>
          <input
            type="text"
            value={email}
            onChange={handleEmailChange}
            onBlur={validateEmail}
            className={`border-2 border-gray-500 px-4 py-2 w-full ${
              emailError ? "border-red-500" : ""
            }`}
          />
          {emailError ? (
            <p className="text-red-500 text-sm">
              Email must be a valid email address.
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleLoginUser}>
          Login
        </button>
      </div>
    </div>
  );
};

export default RegisterUser;
