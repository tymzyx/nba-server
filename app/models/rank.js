let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let rankSchema = new Schema();

export default mongoose.model('rank', rankSchema, 'rank');
