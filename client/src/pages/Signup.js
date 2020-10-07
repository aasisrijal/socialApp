import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";

//for mui
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = makeStyles((theme) => ({
  ...theme.spreadIt,
}));

const Signup = ({ history }) => {
  const classes = styles();
  const [values, setValues] = useState({
    email: "",
    handle: "",
    password: "",
    loading: false,
    error: "",
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });

    const userData = {
      email: values.email,
      handle: values.handle,
      password: values.password,
    };
    axios
      .post("/auth/signup", userData)
      .then((res) => {
        localStorage.setItem("authToken", `Bearer ${res.data.token}`);
        if (res.data && res.data.error) {
          setValues({ ...values, error: res.data.error, loading: false });
        }
        setValues({ ...values, loading: false });
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        setValues({ ...values, error: err.response.data, loading: false });
      });
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm></Grid>
      <Grid item sm>
        <h2 className={classes.logo}>SocialApp</h2>
        <Typography variant="h2" className={classes.pageTitle}>
          Signup
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="handle"
            name="handle"
            type="text"
            label="handle"
            className={classes.textField}
            onChange={handleChange("handle")}
            fullWidth
          />

          <TextField
            id="email"
            name="email"
            type="email"
            label="email"
            className={classes.textField}
            onChange={handleChange("email")}
            fullWidth
          />

          <TextField
            id="password"
            name="password"
            type="password"
            label="password"
            className={classes.textField}
            onChange={handleChange("password")}
            fullWidth
          />

          {values.error && (
            <Typography variant="body2" className={classes.error}>
              {values.error.error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={values.loading}
          >
            Signup
            {values.loading && (
              <CircularProgress className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            Already have an account ? Login <Link to="/login">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm></Grid>
    </Grid>
  );
};

// Signup.PropTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default Signup;
