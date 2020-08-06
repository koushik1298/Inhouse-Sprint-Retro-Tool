import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import axios from 'axios';
import NewCardForm from './newCardForm.js';
import 'typeface-roboto';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import Rating from '@material-ui/lab/Rating';
import VoteButton from './voteButton.js';
var bgColors = ['red', '#009688', '#e91e63','#9c27b0']
const StyledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  },
})(Rating);

const styles = {
    card: {
        width:'75%',
        minHeight:'60%',
        wordBreak: 'break-word',
        marginLeft: "5rem",
        marginBottom: '2rem',
        marginRight: '2rem',
        display: "inline-block",
        verticalAlign: "top",
        position: 'relative',
      
    },
    indCard: {
        height: "200px"
    },

    text: {
    color:'white',
    fontFamiy:'Roboto',
    minHeight: '19px',
    paddingTop: '.1em',
    paddingRight: '15px',
    paddingLeft: '.5em',
    fontSize: '13px',
    wordBreak: 'break-word',
    whiteSpace: 'pre-line'
    },

    cardActions: {
        bottom:'0',
        width: '100%'
    },
    voteDiv: {
      float:'left',
        width: '5%',
        margin: '0 auto'
    },
    form: {
        margin: '0 auto',
        width: '30%'
    }
}
var createReactClass = require('create-react-class');

var EPFCard = createReactClass({
  getInitialState() {
    return { starType: 'star-empty',
              showDialog: false,
              cardColumn:this.props.cardColumn };
  },
  close: function() {
      this.setState({ showDialog: false });
    },
  closeEdit() {
    this.setState({ showDialog: false });
  },
  openEdit() {
      this.setState({ showDialog: true });
    },
  toggleVote() {
    if (this.state.starType === "star-empty") {
      this.setState({ starType: 'star' });
    } else {
      this.setState({ starType: 'star-empty' });
    }
  },
  onDelete() {
    var deleteData = {id: this.props.cardId};
    this.serverRequest =
      axios({
          method: 'delete',
          url: 'http://localhost:3001/api/cards',
          data: deleteData
        });
  },
  render: function() {
      const title = (<h3>{this.props.title}</h3>);
      return (
          <Typography>
          <div>
            <Card style={{...styles.card,backgroundColor:bgColors[this.props.cardColumn]}}>
            <CardContent style={styles.text}>{title}</CardContent>
                <CardActions>
                  <IconButton
                    tooltip="Edit Card"
                    onClick={this.openEdit}
                    style={{float: 'left'}}
                  >
                    <EditIcon  />
                  </IconButton>
                  <IconButton
                    onClick={this.onDelete}
                    tooltip="Delete Card"
                    
                  >
                    <DeleteIcon  />
                  </IconButton>
              
                          <VoteButton
                              cardId={this.props.cardId}
                              votes={this.props.votes}
                              showVotes={this.props.showVotes}
                          />
                </CardActions>
          </Card>
          <Dialog
            fullWidth
            contentStyle={styles.form}
            title="Edit Card"
            modal={false}
            open={this.state.showDialog}
            onClose={this.close}
          >
          <DialogTitle id="form-dialog-title">Edit Card</DialogTitle>
          <NewCardForm
              component={'span'}
              style={styles.form}
              title={this.props.title}
              cardId={this.props.cardId}
              editCard={true}
              closeDialog={this.closeEdit}
          />
          </Dialog>
        </div>
        </Typography>
      );
  }
});

var Cards = createReactClass({
  getInitialState: function() {
    return {cardsData: []};
  },
    loadCardsFromServer: function() {
    var url = ("http://localhost:3001/api/cards/?columnid=" + this.props.cardColumn + "&boardid=" + this.props.boardId);
    console.log(url);
    var _this=this;
   this.serverRequest =
      axios
        .get(url)
        .then(function(result) {
          
   console.log(result.data);
          _this.setState({
              cardsData: result.data
            });
      });
  },
  componentDidMount: function() {
    this.loadCardsFromServer();
    setInterval(this.loadCardsFromServer, 1000);
  },
  render: function () {
    var showVotes = this.props.showVotes
    var cardMap = this.state.cardsData.map(function(card) {
      return (<EPFCard
                  cardColumn={card.columnid}
                  key={card.id}
                  cardId={card.id}
                  title={card.title}
                  votes={card.votes}
                  showVotes={showVotes}/>);
    });
    return (
      <div>
        {cardMap}
        <div style={{height: '150px'}}></div>
      </div>
    );
  }
});

export default Cards;
