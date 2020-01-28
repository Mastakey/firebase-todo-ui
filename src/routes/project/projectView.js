import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { getProject, deleteProject } from "../../redux/actions/projectActions";

//Components
import ViewProject from "../../components/app/project/ViewProject";
import LoadingBasic from "../../components/loading/LoadingBasic";
import PageHeader from "../../components/nav/PageHeader";
import ErrorHandler from "../../components/error/ErrorHandler";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

const styles = {
  pageHeader: {
    marginBottom: "20px"
  }
};

class projectView extends Component {
  async componentDidMount() {
    const id = this.props.match.params.id;
    await this.props.getProject(id);
  }
  async deleteProject() {
    const id = this.props.match.params.id;
    await this.props.deleteProject(id, this.props.history);
  }
  render() {
    const project = this.props.project.project;
    const loading = this.props.project.readLoading;
    const error = this.props.project.error;
    let header = (
      <PageHeader
        ancestors={[
          { name: "Home", url: "/" },
          { name: "Projects", url: "/project" }
        ]}
        currentPage={{ name: project.name, url: "/project" }}
        title={"Projects"}
      />
    );
    let body;
    let footer;
    if (loading) {
      body = (
        <Grid container item xs={12}>
          <LoadingBasic />
        </Grid>
      );
    } else {
      body = <ViewProject project={project} deleteProject={this.deleteProject.bind(this)} />;
    }
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {header}
          {Object.keys(error).length === 0 && error.constructor === Object ? (
            <Fragment>{body}</Fragment>
          ) : (
            <ErrorHandler error={error} />
          )}
          {footer}
        </Grid>
      </Grid>
    );
  }
}

projectView.propTypes = {
  classes: PropTypes.object.isRequired,
  deleteProject: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ project: state.project });

export default connect(mapStateToProps, { getProject, deleteProject })(
  withStyles(styles)(projectView)
);
