import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";

const URL = "https://api.artsy.net/api/";
const Token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTUzMTMyNDQ4MywiaWF0IjoxNTMwNzE5NjgzLCJhdWQiOiI1YjNjZWRjMmNkNTMwZTA4NTlhMzQ0NWEiLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWIzY2VkYzM4YjNiODEzNTQ0MmNkMDExIn0.CSvl6_A9XdChPrMIylGmCnb-iwb5-E1shyyBbC3QGJQ";

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
  constructor(props) {
    super(props);
  }

  handleSearch = event => {
    event.preventDefault();

    this.props.searchFor(this.props.type);
  };

  render() {
    const { classes } = this.props;

    return (
      <span className={classes.container}>
        <form
          className={classes.formControl}
          style={{ margin: "0 auto" }}
          onSubmit={this.handleSearch}
        >
          <InputLabel htmlFor="name-simple" />
          <Input
            id="name-simple"
            onChange={e => this.props.setSearchTerm(e, this.props.type)}
          />
          <Button
            type="submit"
            variant="extendedFab"
            color="primary"
            aria-label="delete"
            className={this.props.button}
          >
            Search
          </Button>
        </form>
      </span>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Search);
