let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let playerSchema = new Schema();

export default mongoose.model('sohu_player', playerSchema, 'sohu_players');
