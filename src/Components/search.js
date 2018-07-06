<<<<<<< HEAD
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FloatingActionButton from './button';
import Button from '@material-ui/core/Button';
=======
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import FloatingActionButton from "./button";
import Button from "@material-ui/core/Button";
>>>>>>> 21236e904277ed249db7b815e5eb012c42e44a98

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit
  }
});

class Search extends React.Component {
  state = {
    name: ""
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <FormControl
          className={classes.formControl}
          style={{ margin: "0 auto" }}
        >
          <InputLabel htmlFor="name-simple" />
          <Input
            id="name-simple"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <Button
            variant="extendedFab"
            color="primary"
            aria-label="delete"
            className={this.props.button}
          >
            Search
          </Button>
        </FormControl>
      </div>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Search);
