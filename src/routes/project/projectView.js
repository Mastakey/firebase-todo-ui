import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { getProject, deleteProject } from "../../redux/actions/projectActions";
import { getTodosByProject } from "../../redux/actions/todoActions";

//Components
import ViewProject from "../../components/app/project/ViewProject";
import LoadingBasic from "../../components/loading/LoadingBasic";
import PageHeader from "../../components/nav/PageHeader";
import ErrorHandler from "../../components/error/ErrorHandler";
import ProjectTodo from "../../components/app/todo/ProjectTodo";

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
    this.props.getProject(id);
    this.props.getTodosByProject(id);
  }
  async deleteProject() {
    const id = this.props.match.params.id;
    await this.props.deleteProject(id, this.props.history);
  }
  render() {
    const project = this.props.project.project;
    const projectId = this.props.match.params.id;
    const todos = this.props.todo.todos;
    const loading = this.props.project.readLoading;
    const todosLoading = this.props.todo.todosLoading;
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
    if (loading || todosLoading) {
      body = (
        <Grid container item xs={12}>
          <LoadingBasic />
        </Grid>
      );
    } else {
      body = (
        <Fragment>
          <ViewProject
            project={project}
            deleteProject={this.deleteProject.bind(this)}
          />
          <ProjectTodo todos={todos} projectId={projectId}/>
        </Fragment>
      );
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
  getProject: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  getTodosByProject: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ project: state.project, todo: state.todo });

export default connect(mapStateToProps, {
  getProject,
  deleteProject,
  getTodosByProject
})(withStyles(styles)(projectView));
