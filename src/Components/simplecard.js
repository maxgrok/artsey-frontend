import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  }
};

class SimpleCard extends React.Component {
  constructor(props) {
    super(props);
  }
  handleClick = event => {
    console.log(event);
  };

  render() {
    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;

    return (
      <div>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={this.props.bgImage}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography variant="headline" component="h2">
              {this.props.name}
            </Typography>
            <Typography component="p">{this.props.description}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={this.handleClick}>
              Artists
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);
