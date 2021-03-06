import React, { Component } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { createTodo } from "../../redux/actions/todoActions";

//Components
import CreateTodo from "../../components/app/todo/CreateTodo";
import LoadingBasic from "../../components/loading/LoadingBasic";
import PageHeader from "../../components/nav/PageHeader";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

const styles = {};

class todoCreate extends Component {
  async createTodo(data) {
    await this.props.createTodo(data, this.props.history);
  }
  render() {
    const loading = this.props.todo.loading;
    const error = this.props.todo.error;
    let header = (
      <PageHeader
        ancestors={[
          { name: "Home", url: "/" },
          { name: "Todos", url: "/todo" }
        ]}
        currentPage={{ name: "Create", url: "#" }}
        title={"Create Todo"}
      />
    );
    let footer;
    let body;

    //loading
    if (loading) {
      body = <LoadingBasic />;
    } else {
      body = (
        <CreateTodo
          loading={loading}
          createTodo={this.createTodo.bind(this)}
          error={error}
          projectId={this.props.match.params.id}
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

todoCreate.propTypes = {
  classes: PropTypes.object.isRequired,
  createTodo: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  todo: state.todo
});

export default connect(mapStateToProps, { createTodo })(
  withStyles(styles)(todoCreate)
);
