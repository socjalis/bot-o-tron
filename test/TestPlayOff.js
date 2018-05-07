const test = require("tape");

const PlayOff = require("../src/PlayOff");
const LegalMovePlayer = require("../src/LegalMovePlayer");

const player1 = new LegalMovePlayer();
const player2 = new LegalMovePlayer();

test("playOff draw", function(t) {
  const playOff = new PlayOff(player1, player2);
  t.equal(playOff.score(player1), 0.5, "score starts at 0.5");
  t.equal(playOff.score(player2), 0.5, "score starts at 0.5");
  playOff.play(2);
  t.equal(playOff.score(player1), 0.5, "draw after 1 move each");
  t.equal(playOff.score(player2), 0.5, "draw after 1 move each");
  t.end();
});

test("playOff white win", function(t) {
  const playOff = new PlayOff(player1, player2, ["e2e4", "a7a6", "f1c4", "a8a7", "d1h5", "a7a8"]);
  playOff.play(8);
  t.equal(playOff.score(player1), 1, "white win checkmate");
  t.equal(playOff.score(player2), 0, "black loss checkmate");
  t.end();
});


const stalemate = "e3 a5 Qh5 Ra6 Qxa5 h5 h4 Rah6 Qxc7 f6 Qxd7+ Kf7 Qxb7 Qd3 Qxb8 Qh7 Qxc8 Kg6".split(" ");

test("playOff white stalemate", function(t) {
  const playOff = new PlayOff({ getNextMove: function(x) { return "Qe6"; } }, player2, stalemate);
  playOff.play(20);
  t.equal(playOff.score(player1), 0.5, "white played stalemate");
  t.end();
});

test("materialResult for balck", function(t) {
  const playOff = new PlayOff(player1, player2, "e4 Nf6 Qh5 Nxh5".split(" "));
  playOff.materialResult();
  t.equal(playOff.score(player1), 0, "white down a queen");
  t.equal(playOff.score(player2), 1, "black up a queen");
  t.end();
});

test("materialResult for white", function(t) {
  const playOff = new PlayOff(player1, player2, "d3 Nh6 Bxh6".split(" "));
  playOff.materialResult();
  t.equal(playOff.score(player1), 1, "white up a knight");
  t.equal(playOff.score(player2), 0, "black down a knight");
  t.end();
});
