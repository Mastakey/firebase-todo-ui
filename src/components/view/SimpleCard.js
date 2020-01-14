import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    minWidth: 275,
    marginRight: "20px",
    marginBottom: "20px"
  },
  cardLink: {
    color: "#000000"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

class SimpleCard extends Component {
  render() {
    const classes = this.props.classes;
    const topHeader = this.props.topHeader;
    const title = this.props.title;
    const subTitle = this.props.subTitle;
    const content = this.props.content;
    const link = this.props.link;
    return (
      <Card className={classes.card} elevation={3}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {topHeader}
          </Typography>
          <Link to={link.url} className={classes.cardLink}>
            <Typography variant="h6" component="h6">
              {title}
            </Typography>
          </Link>
          <Typography className={classes.pos} color="textSecondary">
            {subTitle}
          </Typography>
          <Typography variant="body2" component="p">
            {content}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

SimpleCard.propTypes = { classes: PropTypes.object.isRequired };

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(withStyles(styles)(SimpleCard));
