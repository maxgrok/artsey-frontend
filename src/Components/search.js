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

  fetchSearch = () => {
    console.log(
      `${URL}artists?size=5&term=${encodeURIComponent(
        this.props.searchTerm
      )}&page=1`
    );
    fetch(
      `${URL}artists?size=5&term=${encodeURIComponent(
        this.props.searchTerm
      )}&page=1`,
      {
        headers: {
          "X-Xapp-Token": Token
        }
      }
    )
      .then(resp => {
        return resp.json();
      })
      .then(json => {
        console.log(json);
        this.props.setSearchResults(json);
      });
  };

  handleSearch = event => {
    event.preventDefault();

    this.fetchSearch();
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <form
          className={classes.formControl}
          style={{ margin: "0 auto" }}
          onSubmit={this.handleSearch}
        >
          <InputLabel htmlFor="name-simple" />
          <Input id="name-simple" className="name-simple" onChange={this.props.setSearchTerm} />
          <Button
            type="submit"
            variant="extendedFab"
            color="primary"
            aria-label="delete"
            className={this.props.button}
            onTouchTap={this.handleSearch}
          >
            Search
          </Button>
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Search);
