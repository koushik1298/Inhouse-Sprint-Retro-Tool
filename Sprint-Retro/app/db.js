var massive = require('massive');
var connectionString = "postgres://koushik:password@localhost:5433/project";
var db = massive.connectSync({connectionString: connectionString});


//Card Logic

var createTables = function() {
    db.boardsTable.create_boards_table(function(err, result) {
    console.log("Created Boards Table", err, result)
  });
    db.cardsTable.create_cards_table(function(err, result) {
    console.log("Created Cards Table", err, result)
  });
}

var insertCard = function(newCard) {
  console.log("Inserting New Card", newCard)
  db.cards.save(newCard, function(err,result){
    console.log(result);
  });
}

var getCards = function(columnid, boardid) {
  var res = db.cards.findSync({columnid: columnid, boardid: boardid});
  return res;
}

var deleteCard = function(deleteCard) {
    console.log("Deleting ", deleteCard);
    db.cards.destroy(deleteCard, function(err, res) {
      console.log("Deleted ", res);
    });
}

var voteCard = function(cardData) {
  db.cards.find(cardData.cardId ,function(err,res) {
    if (!cardData.voted){
      db.cards.save({id: cardData.cardId, votes: res.votes-1 }, function(err, res) {
        console.log("Removed Vote", res);
      });
    } else {
      db.cards.save({id: cardData.cardId, votes: res.votes+1 }, function(err, res) {
        console.log("Added Voted", res);
      });
    }
  });
}

//Board Logic

var addBoard = function(boardData) {
  console.log("Adding Board")
  console.log(db.boards.save)
  db.boards.save(boardData, function(err,result){
    console.log(result);
  });
}

var getBoards = function() {
  var res = db.runSync("select * from boards");
  return res;
}

var deleteBoard = function(deleteBoard) {
    console.log("Deleting ", deleteBoard);
    db.boards.destroy(deleteBoard, function(err, res) {
      console.log("Deleted ", res);
    });
}

module.exports = {
  createTables,
  insertCard,
  getCards,
  deleteCard,
  voteCard,
  addBoard,
  getBoards,
  deleteBoard
}
