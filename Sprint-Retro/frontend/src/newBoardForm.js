import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

var createReactClass = require('create-react-class');
var NewBoardForm = createReactClass({
  getInitialState() {
    return { name: this.props.name || ''}
  },
  _handleNameChange: function(e) {
    this.setState({
        name: e.target.value
    });
  },
  handleSubmit: function() {
    var newBoard
    newBoard = { name: this.state.name };
    this.serverRequest =
      axios
        .post("http://localhost:3001/api/boards", newBoard)
        .then(function(result) {
            console.log(newBoard)
            });
    this.props.closeDialog()
  },
  render: function () {
      return(
        <form>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Board Name"
            type="text"
            fullWidth
            onChange={this._handleNameChange}
            maxLength={50}
          />
          <Button
          label="Submit"
          primary={true}
          onClick={this.handleSubmit}>
          </Button>
        </form>
      );
  }
});

export default NewBoardForm;
