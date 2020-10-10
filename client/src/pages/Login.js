import React, { useState, useEffect } from "react";
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

//reudx
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

const styles = makeStyles((theme) => ({
  ...theme.spreadIt,
}));

const Login = ({ history, UI: { loading, error }, loginUser }) => {
  const classes = styles();
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
  });

  useEffect(() => {
    setValues({...setValues, error: error})
    
  }, [error])

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setValues({ ...values, loading: true });

    const userData = {
      email: values.email,
      password: values.password,
    };
    console.log(userData);

    loginUser(userData, history);
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm></Grid>
      <Grid item sm>
        <h2 className={classes.logo}>SocialApp</h2>
        <Typography variant="h2" className={classes.pageTitle}>
          Login
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
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
            disabled={loading}
          >
            Login
            {loading && (
              <CircularProgress className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            Don't have an account ? Sign Up <Link to="/signup">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm></Grid>
    </Grid>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
