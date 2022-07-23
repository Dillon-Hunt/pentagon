import './Game.css';

import Pentagon from '../components/Game/Pentagon';
import { useState } from 'react';

interface Tile {
    x: number,
    y: number,
    type: string,
    valid: boolean,
    powered: boolean,
}

const tiles = [
    {
        type: 'void',
        valid: false,
        powered: false,
    },
    {
        type: 'empty',
        valid: true,
        powered: false,
    },
    {
        type: 'blocked',
        valid: false,
        powered: false,
    },
    {
        type: 'goal',
        valid: false,
        powered: false,
    },
    {
        type: 'start',
        valid: false,
        powered: true,
    },
    {
        type: 'green',
        valid: false,
        powered: true,
    }
]

function weightedRandom(weights: number[]) {
    const sum = weights.reduce((a, b) => a + b, 0);
    const random = Math.random() * sum;

    let total = 0;

    for (let i = 0; i < weights.length; i++) {
        total += weights[i];
        if (random < total) {
            return i;
        }
    }

    return 0;
}

function decodeMap(rawMap: number[]) {
    return rawMap.map((tile, id) => {
        const type = weightedRandom([0, 8, 0])

        return {
            x: id % 8,
            y: Math.floor(id / 8),
            type: tile === -1 ? tiles[type].type : tiles[tile].type,
            valid: tile === -1 ? tiles[type].valid : tiles[tile].valid,
            powered: tile === -1 ? tiles[type].powered : tiles[tile].powered,
        }
    })
}

function checkRadiusPowered(game: Tile[], x: number, y: number) {
    let powered = false;

        if ((
                  x % 2 === 1 && 
            (
                 (game[y * 8 + x + 1] !== undefined && game[y * 8 + x + 1].powered === true)
              || (game[y * 8 + x - 1] !== undefined && game[y * 8 + x - 1].powered === true)
              || (game[(y - 1) * 8 + x] !== undefined && game[(y - 1) * 8 + x].powered === true)
              || (game[(y + 1) * 8 + x] !== undefined && game[(y + 1) * 8 + x].powered === true)
              || (game[(y + 1) * 8 + x + 1] !== undefined && game[(y + 1) * 8 + x + 1].powered === true)
              || (game[(y + 1) * 8 + x - 1] !== undefined && game[(y + 1) * 8 + x - 1].powered === true)
            )) || (x % 2 === 0 && (
                (game[y * 8 + x + 1] !== undefined && game[y * 8 + x + 1].powered === true)
             || (game[y * 8 + x - 1] !== undefined && game[y * 8 + x - 1].powered === true)
             || (game[(y + 1) * 8 + x] !== undefined && game[(y + 1) * 8 + x].powered === true)
             || (game[(y - 1) * 8 + x] !== undefined && game[(y - 1) * 8 + x].powered === true)
             || (game[(y - 1) * 8 + x + 1] !== undefined && game[(y - 1) * 8 + x + 1].powered === true)
             || (game[(y - 1) * 8 + x - 1] !== undefined && game[(y - 1) * 8 + x - 1].powered === true)
        ))) {
            powered = true;
        };

        return powered;
}

function checkRadiusGoal(game: Tile[], x: number, y: number) {
    let goal = false;

        if ((
                  x % 2 === 1 && 
            (
                 (game[y * 8 + x + 1] !== undefined && game[y * 8 + x + 1].type === 'goal')
              || (game[y * 8 + x - 1] !== undefined && game[y * 8 + x - 1].type === 'goal')
              || (game[(y - 1) * 8 + x] !== undefined && game[(y - 1) * 8 + x].type === 'goal')
              || (game[(y + 1) * 8 + x] !== undefined && game[(y + 1) * 8 + x].type === 'goal')
              || (game[(y + 1) * 8 + x + 1] !== undefined && game[(y + 1) * 8 + x + 1].type === 'goal')
              || (game[(y + 1) * 8 + x - 1] !== undefined && game[(y + 1) * 8 + x - 1].type === 'goal')
            )) || (x % 2 === 0 && (
                (game[y * 8 + x + 1] !== undefined && game[y * 8 + x + 1].type === 'goal')
             || (game[y * 8 + x - 1] !== undefined && game[y * 8 + x - 1].type === 'goal')
             || (game[(y + 1) * 8 + x] !== undefined && game[(y + 1) * 8 + x].type === 'goal')
             || (game[(y - 1) * 8 + x] !== undefined && game[(y - 1) * 8 + x].type === 'goal')
             || (game[(y - 1) * 8 + x + 1] !== undefined && game[(y - 1) * 8 + x + 1].type === 'goal')
             || (game[(y - 1) * 8 + x - 1] !== undefined && game[(y - 1) * 8 + x - 1].type === 'goal')
        ))) {
            goal = true;
        };

        return goal;
}

function updatePowerState(game: Tile[]) {
    const newGame = [...game];

    for (let i = 0; i < newGame.length; i++) {
        if (newGame[i].type === 'green') {
            newGame[i].powered = false;
        };
    };

    let changes = true;
    while (changes === true) {
        let newChanges = false;
        for (let i = 0; i < newGame.length; i++) {
            if (newGame[i].type === 'green' && newGame[i].powered === false) {
                if (checkRadiusPowered(newGame, newGame[i].x, newGame[i].y)) {
                    newGame[i].powered = true;
                    newChanges = true;
                };
            };
        };
        if (!newChanges) {
            changes = false
        }
    };

    return newGame;
}

function Game() {

    let rawMap = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,]
    
    const endPosition = Math.floor((Math.random() * rawMap.length / 3));
    
    rawMap[endPosition] = 3;
    rawMap[Math.abs(rawMap.length - endPosition - 1)] = 4;

    const [game, setGame] = useState(decodeMap(rawMap));

    const setTile = (x: number, y: number) => {

        let type = null;

        if (game[y * 8 + x].type === 'empty') {
            type = 5;
        } else if (game[y * 8 + x].type === 'void') {
            type = 1;
        }

        if (type === 5 && game[y * 8 + x] !== undefined && game[y * 8 + x].valid === true && checkRadiusPowered(game, x, y)) {

            let newGame = [...game];

            newGame[y * 8 + x].type = tiles[type].type;
            newGame[y * 8 + x].powered = tiles[type].powered;
            newGame[y * 8 + x].valid = tiles[type].valid;
            
            if (checkRadiusGoal(game, x, y)) {
                setTimeout(() => setGame(decodeMap(rawMap)), 400);
            };

            const destroy = Math.floor(Math.random() * game.length);

            if (destroy !== y * 8 + x && newGame[destroy].type !== 'goal' && newGame[destroy].type !== 'start') {
                newGame[destroy].type = 'void';
                newGame[destroy].valid = false;
                newGame[destroy].powered = false;
            };

            newGame = updatePowerState(newGame);
            
            setGame(newGame);

        } else if (type === 1) {
            let newGame = [...game];

            newGame[y * 8 + x].type = tiles[type].type;
            newGame[y * 8 + x].powered = tiles[type].powered;
            newGame[y * 8 + x].valid = tiles[type].valid;

            const destroy = Math.floor(Math.random() * game.length);

            if (destroy !== y * 8 + x && newGame[destroy].type !== 'goal' && newGame[destroy].type !== 'start') {
                newGame[destroy].type = 'void';
                newGame[destroy].valid = false;
                newGame[destroy].powered = false;
            };

            newGame = updatePowerState(newGame);

            setGame(newGame);
        }
    };

    const props = { setTile: setTile };

    return (
        <div className="Game">
            <div className='Game__Map'>
                <div className='Game__Map__Grid'>
                    {
                        game.map((tile, idx) => {
                            return <Pentagon key={idx} tile={tile} {...props} />
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Game;