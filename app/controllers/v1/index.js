import Player from '../../models/player'
import Rank from '../../models/rank'

class Acquire {
    constructor() {
        this.name = 'acquire class';

        this.getRank = this.getRank.bind(this);
        this.getPlayerDetail = this.getPlayerDetail.bind(this);
    }

    getPlayer(req, res) {
        console.log('getPlayer is to do');
        let {playerId} = req.query;
        Player.findOne({playerId: playerId}, function(err, player) {
            if (err) {
                res.send({
                    code: '0',
                    name: 'ERROR_FIND',
                    message: err,
                });
            }
            res.send(player);
        });
    }

    async getRank(req, res) {
        let _this = this;
        let {type} = req.query;
        if (!type) {
            res.send({
                code: '0',
                name: 'ERROR_QUERY_TYPE',
				        message: '参数错误',
            });
            return;
        }
        Rank.find({type: type}).sort({data: -1}).limit(15).exec(
            async function(err, docs) {
                if (err) {
                    res.send({
                        code: '0',
                        name: 'ERROR_FIND',
                        message: err,
                    });
                }
                let response = await _this.getPlayerDetail(docs);
                res.send(response);
            }
        )
    }

    async getPlayerDetail(docs) {
        let res = [];
        try {
            for (let info of docs) {
                let player = await Player.findOne({playerId: info._doc.playerId}).exec();
                res.push({
                    name: player._doc.name,
                    id: player._doc.playerId,
                    data: info._doc.data,
                    type: info._doc.type,
                    avatar: player._doc.avatar,
                    team: player._doc.team
                })
            }
            return res;
        } catch(err) {
            return {
                code: '0',
                name: 'ERROR_FIND',
                message: err,
            };
        }
    }
}

export default new Acquire();