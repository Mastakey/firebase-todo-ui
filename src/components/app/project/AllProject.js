import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Components
import SimpleCard from "../../view/SimpleCard";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {};

class AllProject extends Component {
  render() {
    const projects = this.props.projects;
    return (
      <Fragment>
        {projects &&
          projects.length > 0 &&
          projects.map(project => {
            if (project.status !== "done") {
              const topHeader = project.username;
              const title = project.name;
              const subTitle = project.status;
              const content = "";
              const link = {
                title: "Open Project",
                url: `/project/${project.id}`
              };
              return (
                <SimpleCard
                  key={project.id}
                  topHeader={topHeader}
                  title={title}
                  subTitle={subTitle}
                  content={content}
                  link={link}
                />
              );
            }
            return <Fragment key={project.id}></Fragment>;
          })}
      </Fragment>
    );
  }
}

AllProject.propTypes = {
  classes: PropTypes.object.isRequired,
  projects: PropTypes.array.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(withStyles(styles)(AllProject));
