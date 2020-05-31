import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Container, Form, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { signin } from "../../redux/actions/userActions";

export default function SigninScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPssword] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signin(email, password));
  };
  return (
    <Container className="wrapper text-center">
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <h3>Login</h3>

          <Form size="large" loading={loading} onSubmit={handleSubmit}>
              <Form.Input
                fluid
                placeholder="Email"
                icon="mail"
                iconPosition="left"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Input
                fluid
                type="password"
                icon="lock"
                iconPosition="left"
                value={password}
                onChange={(e) => setPssword(e.target.value)}
              />
              <Form.Button color="black" fluid size="large" content="Sign In" />
          </Form>
          {error && <Message error header="Action Forbidden" content={error} />}
          <Message>
            <p>New to Hebe?</p>
            <p>
              <Link
                to={
                  redirect === "/"
                    ? "register"
                    : `register?redirect=${redirect}`
                }
              >
                Create account
              </Link>
            </p>
          </Message>
        </Grid.Column>
      </Grid>
    </Container>
  );
}
