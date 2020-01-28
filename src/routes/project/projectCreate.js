import React, { Component } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { createProject } from "../../redux/actions/projectActions";

//Components
import CreateProject from "../../components/app/project/CreateProject";
import LoadingBasic from "../../components/loading/LoadingBasic";
import PageHeader from "../../components/nav/PageHeader";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

const styles = {};

class projectCreate extends Component {
  async createProject(data) {
    await this.props.createProject(data, this.props.history);
  }
  render() {
    const loading = this.props.project.loading;
    const error = this.props.project.error;
    let header = (
      <PageHeader
        ancestors={[
          { name: "Home", url: "/" },
          { name: "Projects", url: "/project" }
        ]}
        currentPage={{ name: "Create", url: "#" }}
        title={"Create Project"}
      />
    );
    let footer;
    let body;

    //loading
    if (loading) {
      body = <LoadingBasic />;
    } else {
      body = (
        <CreateProject
          loading={loading}
          createProject={this.createProject.bind(this)}
          error={error}
        />
      );
    }

    return (
      <Grid container alignItems="center">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {header}
            {body}
            {footer}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

projectCreate.propTypes = {
  classes: PropTypes.object.isRequired,
  createProject: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  project: state.project
});

export default connect(mapStateToProps, { createProject })(
  withStyles(styles)(projectCreate)
);
