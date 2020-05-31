import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Container, Form, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { register } from "../../redux/actions/userActions";

export default function SigninScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPssword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [passwErr, setPasswErr] = useState("");

  const userRegister = useSelector((state) => state.userRegister);

  const { userInfo, loading, error } = userRegister;

  const redirect = props.location.search ? props.location.search.split('=')[1] : '/'

  const dispatch = useDispatch();

    useEffect(() => {
      if (userInfo) {
        props.history.push(redirect);
      }
    }, [userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === rePassword) {
      dispatch(register(name, email, password));
    } else {
      setPasswErr('Passwords not mutch')
    }
  };

  return (
    <Container className="wrapper text-center">
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <h3>Create Account</h3>
          <Form size="large" loading={loading} onSubmit={handleSubmit}>
              <Form.Input
                fluid
                placeholder="Name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Input
                fluid
                placeholder="Email"
                icon="mail"
                iconPosition="left"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Input
                fluid
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPssword(e.target.value)}
              />
              <Form.Input
                fluid
                placeholder="Repeat Password"
                type="password"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
              />
              <Form.Button color='black' fluid size="large" content="Create" />
          </Form>
          {(error || passwErr) && <Message error content={error || passwErr} />}
          <Message>
            <p> Already have an account?</p>
            <p>
              <Link to={redirect === '/' ? '/signin' : `/signin?redirect=${redirect}`}>Sign In</Link>
            </p>
          </Message>
        </Grid.Column>
      </Grid>
    </Container>
  );
}
