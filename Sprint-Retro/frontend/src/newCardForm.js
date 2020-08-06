import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

var createReactClass = require('create-react-class');
var NewCardForm = createReactClass({
  getInitialState() {
    return { title: this.props.title || ''};
  },
  _handleTitleChange: function(e) {
    this.setState({
        title: e.target.value
    });
  },
  handleSubmit: function() {
    var newCard
    if (this.props.editCard) {
      newCard = { id: this.props.cardId,
          title: this.state.title, columnid: this.props.cardColumn };
    } else{
      newCard = { boardid: this.props.boardId, title: this.state.title,
                  columnid: this.props.cardColumn, votes: 0 };
    }
    this.serverRequest =
      axios
        .post("http://localhost:3001/api/cards", newCard)
        .then(function(result) {
            console.log(newCard)
            });
    this.props.closeDialog()
  },
  render: function () {
      return(
        <form>
          <DialogContent>
          <DialogContentText style={{display:'none'}}>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            required
            multiline
            rows="4"
            autoFocus
            margin="dense"
            id="name"
            label="Enter Content"
            type="text"
            onChange={this._handleTitleChange}
            variant="outlined"
            fullWidth
          />
          <br />
          </DialogContent>
          <DialogActions>

            <Button onClick={this.handleSubmit} color="primary">
            Submit
          </Button>
          </DialogActions>
        </form>
      );
  }
});

export default NewCardForm;
