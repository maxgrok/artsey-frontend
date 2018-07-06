import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
// import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
// import FloatingActionButton from "./button";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit
  }
});

const URL = "https://api.artsy.net/api/"
const Token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTUzMTMyNDQ4MywiaWF0IjoxNTMwNzE5NjgzLCJhdWQiOiI1YjNjZWRjMmNkNTMwZTA4NTlhMzQ0NWEiLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWIzY2VkYzM4YjNiODEzNTQ0MmNkMDExIn0.CSvl6_A9XdChPrMIylGmCnb-iwb5-E1shyyBbC3QGJQ"

class Search extends React.Component {
  state = {
    name: "",
    searchResults: []
  };

  componentDidMount(){
    this.fetchSearch()
  }
  
  fetchSearch() {
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
                this.setState({
                    searchResults: json
                });
            });
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
