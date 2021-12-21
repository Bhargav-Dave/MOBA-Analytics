import React from "react";
import { Button, ButtonGroup, makeStyles } from "@material-ui/core";
import { Home } from "@material-ui/icons";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    marginTop: 10,
    marginLeft: 10,
  },
});

function Navbar() {
  const classes = useStyles();
  return (
    <div>
      <ButtonGroup
        className={classes.root}
        size="large"
        color="primary"
        variant="contained"
      >
        <Button startIcon={<Home />} to="/">
          Home
        </Button>
        <Button component={RouterLink} to="/sign-in">
          SignIn
        </Button>
        <Button component={RouterLink} to="/sign-up">
          SignUp
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default Navbar;
