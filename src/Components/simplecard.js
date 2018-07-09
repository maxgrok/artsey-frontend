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
import Modal from './modal'
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
// import classnames from 'classnames';
import Accordion from './accordion';

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

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

class SimpleCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClick = id => {
    this.props.detailsView(id, this.props.type);
  };

  favoriteClick = (event, id) => {
    // add card to favorites
    console.log(event)
    debugger;
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
        </CardContent>
        <CardActions>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
            onButtonClick={this.handleClick}
            id={this.props.id}
          >
            <div style={getModalStyle()} className={classes.paper}>
              <CardContent>
                <img
                  src={classes.bgImage}
                  alt="image here"
                  style={{ width: "290px", height: "164px" }}
                />
                <Typography variant="headline" component="h2">
                  {this.props.name}
                </Typography>
                <Typography component="p">{this.props.description}</Typography>
              </CardContent>
            </div>
          </Modal>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton
              aria-label="Add to favorites"
              style={{ margin: "0 0 0 100px " }}
            >
              <FavoriteIcon onClick={this.favoriteClick} />
            </IconButton>
            </CardActions>
          </CardActions>
        <Accordion className={classes.root} />
      </div>
    );
  }
}

export default withStyles(styles)(SimpleCard);
