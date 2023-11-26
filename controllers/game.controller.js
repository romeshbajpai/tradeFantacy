const Game = require('../model/game.model');

const createGame = async (req, res) => { 
    const { userId, score, level, no_of_moves } = req.body;
    try {
        const existUser = await Game.findOne({ userId });
        if (existUser) {
         return   res.status(402).json({message:'Game is already created with this ID'})
         }
        const game = new Game({ userId, score, level, no_of_moves });
        await game.save();
        return res.json(game);
    } catch (error) {
        console.error('Error  in creating Game', error)
        return res.status(500).json({error:'Internal server error'})
    }
}


const getGameData = async (req, res) => { 
    const { userId } = req.params;
    try {
        const gameData = await Game.find({userId});
        return  res.json(gameData);
    } catch (error) {
        console.error('Error  in retrieving Game Data', error)
        return res.status(500).json({error:'Internal server error'})
    }
}

const updateGameData = async (req, res) => { 
    const { userId } = req.params;
    const { score , level} = req.body
    try {
        const game = await Game.findOne({ userId });
        if (!game) { 
            return res.status(404).json({error: "Game Data not found"})
        }
        game.score = score || game.score;
        game.level = level || game.level;

        await game.save();
        return   res.json(game);
    } catch (error) {
        console.error('Error  in updating Game Data', error)
        return res.status(500).json({error:'Internal server error'})
    }
}


const deleteGameData = async (req, res) => {
    const { userId } = req.params;
    try {
        const deleteGame = await Game.findOneAndDelete({ userId });
        if (!deleteGame) {
            return res.status(404).json({ error: "Game Data not found" })
        }
        res.json(deleteGame);
    } catch (error) {
        console.error('Error  in deleting Game Data', error)
        return  res.status(500).json({ error: 'Internal server error' })
    }
};

module.exports = {
    createGame,
    getGameData,
    updateGameData,
    deleteGameData
};