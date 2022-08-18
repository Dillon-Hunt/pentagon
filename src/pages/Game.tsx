import './Game.css';

import Pentagon from '../components/Game/Pentagon';
import { useState } from 'react';

import { decodeMap, updatePowerStatePurple, updatePowerStateGreen, checkRadiusGreenStart, checkRadiusPurpleStart, checkRadiusPoweredPurple, checkRadiusPoweredGreen } from './Helper'

const tiles = [
    {
        type: 'void',
        valid: false,
        poweredPurple: false,
        poweredGreen: false,
    },
    {
        type: 'empty',
        valid: true,
        poweredPurple: false,
        poweredGreen: false,
    },
    {
        type: 'blocked',
        valid: false,
        poweredPurple: false,
        poweredGreen: false,
    },
    {
        type: 'purpleStart',
        valid: false,
        poweredPurple: true,
        poweredGreen: false,
    },
    {
        type: 'purple',
        valid: false,
        powered: true,
        poweredPurple: true,
        poweredGreen: false,
    },
    {
        type: 'greenStart',
        valid: false,
        poweredPurple: false,
        poweredGreen: true,
    },
    {
        type: 'green',
        valid: false,
        poweredPurple: false,
        poweredGreen: true,
    },
]

function Game() {

    // Random Map
    let rawMap = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,]
    
    // Set green and purple start / end
    const endPosition = Math.floor((Math.random() * rawMap.length / 3));
    rawMap[endPosition] = 3;
    rawMap[Math.abs(rawMap.length - endPosition - 1)] = 5;

    const [game, setGame] = useState(decodeMap(rawMap));
    const [turn, setTurn] = useState('green')

    // Player turn function
    const setTile = (x: number, y: number) => {

        let type = 0;
        let replaceType = 0;
        let newGame = [...game];

        const update = () => {
            setTurn(turn === 'green' ? 'purple' : 'green')

            const destroy = Math.floor(Math.random() * game.length);

            if (destroy !== y * 8 + x && newGame[destroy].type !== 'greenStart' && newGame[destroy].type !== 'purpleStart') {
                newGame[destroy].type = 'void';
                newGame[destroy].valid = false;
                newGame[destroy].poweredGreen = false;
                newGame[destroy].poweredPurple = false;
            };

            newGame = updatePowerStateGreen(newGame);
            newGame = updatePowerStatePurple(newGame);

            setGame(newGame);
        }

        if (game[y * 8 + x].type === 'empty') {
            type = turn === 'green' ? 6 : 4;
        } else if (game[y * 8 + x].type === 'void') {
            type = 1;
        } else if (game[y * 8 + x].type === 'green') {
            replaceType = 4;
        } else if (game[y * 8 + x].type === 'purple') {
            replaceType = 6;
        };

        if ((type === 6 || type === 4) && (game[y * 8 + x] !== undefined) && (game[y * 8 + x].valid === true) && (turn === 'green' ? checkRadiusPoweredGreen(game, x, y) : checkRadiusPoweredPurple(game, x, y))) {
            newGame[y * 8 + x] = {
                ...newGame[y * 8 + x],
                ...tiles[type]
            };
            
            if (turn === 'green' ? checkRadiusPurpleStart(game, x, y) : checkRadiusGreenStart(game, x, y)) {
                setTimeout(() => setGame(decodeMap(rawMap)), 400);
            };

            update()

        } else if (type === 1) {
            newGame[y * 8 + x] = {
                ...newGame[y * 8 + x],
                ...tiles[type]
            };
            update()

        } else if ((replaceType === 4 || replaceType === 6) && (turn === 'green' ? checkRadiusPoweredGreen(game, x, y) : checkRadiusPoweredPurple(game, x, y))) {
            newGame[y * 8 + x] = {
                ...newGame[y * 8 + x],
                ...tiles[(turn === 'green' ? 6 : 4)]
            };

            if (turn === 'green' ? checkRadiusPurpleStart(game, x, y) : checkRadiusGreenStart(game, x, y)) {
                setTimeout(() => setGame(decodeMap(rawMap)), 400);
            };

            update()
        }
    };

    // Props
    const props = { setTile: setTile, turn: turn };
    const containerProps = { turn: turn.toString() }

    return (
        <div className="Game__Container" {...containerProps} >
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
        </div>
    );
}

export default Game;