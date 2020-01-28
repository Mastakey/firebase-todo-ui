import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
};

class SimpleBreadcrumbs extends Component {
  render() {
    const ancestors = this.props.ancestors;
    const currentPage = this.props.currentPage;
    let pages = [];
    ancestors.forEach(an => {
      pages.push();
    });
    return (
      <Grid container item xs={12}>
        <Breadcrumbs aria-label="breadcrumb">
        {ancestors.map(an => {
          let key = 'nokey';
          if (an && an.name){
            key = an.name;
            return (
              <Link key={key} href={an.url}>
                {an.name}
              </Link>
            );
          }
          return <CircularProgress key={key} size={20} />;
        })}
          {currentPage && currentPage.name && (<Link href={"#"}>{currentPage.name}</Link>)}
        </Breadcrumbs>
      </Grid>
    );
  }
}

SimpleBreadcrumbs.propTypes = {
  classes: PropTypes.object.isRequired,
  ancestors: PropTypes.array.isRequired,
  currentPage: PropTypes.object.isRequired
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(SimpleBreadcrumbs));
