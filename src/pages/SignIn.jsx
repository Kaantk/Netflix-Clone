import { ErrorMessage, Field, Form, Formik } from "formik";
import { FormValidations } from "../validations/FormValidation";
import { NavLink } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export const SignIn = () => {
  const { signIn } = UserAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    setIsLoading(true);
    try {
      await signIn(email, password);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  return (
    <div className="w-full h-screen relative">
      <div id="background-efect" className="absolute inset-0">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="w-full h-full bg-black absolute top-0 left-0 opacity-60 z-10"></div>
      </div>
      <div className="relative z-20 w-full h-full flex items-center justify-center">
        <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white px-14 pt-12 w-full">
          <Formik
            validationSchema={FormValidations}
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ isValid, dirty, values }) => (
              <div className="w-full flex">
                <div className="flex flex-col w-full">
                  <div className="text-2xl font-semibold mb-5">Sign In</div>
                  <Form>
                    <div className="mb-3">
                      <Field
                        name="email"
                        type="email"
                        placeholder="E-mail"
                        className="p-3 focus:outline-none w-full mt-2 bg-gray-700 rounded"
                      />
                      <ErrorMessage
                        name="email"
                        component="small"
                        className="text-red-600 text-xs"
                      />
                    </div>
                    <div className="mb-3">
                      <Field
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="p-3 focus:outline-none w-full my-2 bg-gray-700 rounded"
                      />
                      <ErrorMessage
                        name="password"
                        component="small"
                        className="text-red-600 text-xs"
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        disabled={!isValid || !dirty || isLoading}
                        className={`bg-red-600 py-3 my-4 rounded font-bold w-full ${
                          !isValid || !dirty
                            ? "opacity-60 cursor-not-allowed"
                            : "hover:bg-gray-900"
                        }`}
                      >
                        {isLoading ? (
                          <ClipLoader color="#ffffff" size={18} />
                        ) : (
                          "Sign Up"
                        )}
                      </button>
                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <p>
                          <input className="mr-2" type="checkbox" />
                          Remember me
                        </p>
                        <a className="hover:underline cursor-pointer">
                          Need Help?
                        </a>
                      </div>
                      <p className="py-8">
                        <span className="text-gray-600">New to Netflix?</span>{" "}
                        <NavLink to="/signup" className="text-md">
                          Sign Up
                        </NavLink>
                      </p>
                    </div>
                  </Form>
                </div>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
