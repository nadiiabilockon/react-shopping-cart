import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Grid,
  Container,
  Form,
  Segment,
  Message,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { signin } from "../../redux/actions/userActions";

export default function SigninScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPssword] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      props.history.push("/");
    }
  }, [userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signin(email, password));
  };
  return (
    <Container className="signin-wrapper text-center">
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <h3>Login</h3>

          <Form size="large" loading={loading} onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                placeholder="Email"
                name="email"
                icon="email"
                iconPosition="left"
                onChange={(e) => setEmail(e.target)}
              />
              <Form.Input
                fluid
                type="password"
                icon="lock"
                iconPosition="left"
                onChange={(e) => setPssword(e.target)}
              />
              <Form.Button fluid size="large" content="Submit" />
            </Segment>
          </Form>
          {error && <Message error header="Action Forbidden" content={error} />}
          <Message>
            <p>New to Hebe?</p>
            <p>
              <Link to="/register">Create account</Link>
            </p>
          </Message>
        </Grid.Column>
      </Grid>
    </Container>
  );
}
