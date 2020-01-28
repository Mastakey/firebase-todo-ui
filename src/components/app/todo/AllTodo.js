import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Components
import SimpleCard from "../../view/SimpleCard";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {};

class AllTodo extends Component {
  render() {
    const todos = this.props.todos;
    return (
      <Fragment>
        {todos &&
          todos.length > 0 &&
          todos.map(todo => {
            if (todo.status !== "done") {
              const topHeader = todo.username;
              const title = todo.name;
              const subTitle = todo.status;
              const content = "";
              const link = {
                title: "Open Todo",
                url: `/todo/${todo.id}`
              };
              return (
                <SimpleCard
                  key={todo.id}
                  topHeader={topHeader}
                  title={title}
                  subTitle={subTitle}
                  content={content}
                  link={link}
                />
              );
            }
            return <Fragment key={todo.id}></Fragment>;
          })}
      </Fragment>
    );
  }
}

AllTodo.propTypes = {
  classes: PropTypes.object.isRequired,
  todos: PropTypes.array.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(withStyles(styles)(AllTodo));
