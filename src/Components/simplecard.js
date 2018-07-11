import React from "react";
// import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
// import SimpleModal from '@material-ui/core/SimpleModal';
import Modal from "./modal";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
// import ShareIcon from '@material-ui/icons/Share';
// import classnames from 'classnames';
import Accordion from "./accordion";

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  }
};

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

class SimpleCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      clicked: false
    };
  }

  toggleFavorite() {
    if (this.state.clicked === false) {
      this.setState({ clicked: true });
    } else if (this.state.clicked === true) {
      this.setState({ clicked: false });
    }
  }

  handleClick = id => {
    this.props.detailsView(this.props.item);
  };
  componentDidMount() {
    if (this.props.type === "favorite") {
      this.toggleFavorite();
    }
    // <button onClick={() => this.props.setItemDetails(this.props.item)}>
    // More Info{" "}
    // </button>
  }

  render() {
    const { classes } = this.props;
    // const bull = <span className={classes.bullet}>•</span>;

    return (
      <div>
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
          <FavoriteIcon
            id={this.props.id}
            onClick={event => {
              this.toggleFavorite(event);
              this.props.favoriteClick(event, this.props.item);
            }}
            style={this.state.clicked ? { fill: "red" } : { fill: "grey" }}
          />
        </CardContent>

        <Accordion
          className={classes.root}
          item={this.props.item}
          comments={this.props.comments}
          sendComment={this.props.sendComment}
          deleteComment={this.props.deleteComment}
        />
      </div>
    );
  }
}

export default withStyles(styles)(SimpleCard);
