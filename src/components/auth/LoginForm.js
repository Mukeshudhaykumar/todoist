import React from 'react';
import { Row, Col, Alert, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import useAuth from '../../hooks/useauth';
import useScriptRef from '../../hooks/useScriptRef';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import '../../styles/auth/login.css';
import logo from '../../assets/LoginTitle.png';

const LoginForm = ({ className, onLogin, ...rest }) => {
  const { login } = useAuth();
  const scriptedRef = useScriptRef();
  const navigate = useNavigate(); // Initialize useNavigate hook

  return (
    <div className={`app-container ${className}`} {...rest}>
      <Formik
        initialValues={{
          email: 'string@gmail.com',
          password: 'stringS@1',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await login(values.email, values.password);
  
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
              if (onLogin) {
                onLogin(); // Call the onLogin prop if provided
                navigate('/tasks'); // Redirect to /tasks on successful login
              }
            }
          } catch (err) {
            console.error('Login failed:', err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} className="login-form">
            <img src={logo} alt="Login Title" className="login-title-image" />
            
            <div className="form-group mb-3">
              <input
                className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                name="email"
                type="email"
                placeholder="Email Address / Username"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                autoFocus
              />
              {touched.email && errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="form-group mb-4">
              <input
                className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                name="password"
                type="password"
                placeholder="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
              />
              {touched.password && errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            <div className="custom-control custom-checkbox text-left mb-4 mt-2">
              <input type="checkbox" className="custom-control-input" id="customCheck1" />
              <label className="custom-control-label" htmlFor="customCheck1">
                Save credentials.
              </label>
            </div>

            {errors.submit && (
              <Col sm={12}>
                <Alert variant="danger">{errors.submit}</Alert>
              </Col>
            )}

            <Row>
              <Col>
                <Button
                  className="bt-primary"
                  disabled={isSubmitting}
                  size="lg"
                  type="submit"
                  variant="primary"
                >
                  Login
                </Button>
              </Col>
            </Row>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
