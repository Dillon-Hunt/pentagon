interface Tile {
    x: number,
    y: number,
    type: string,
    valid: boolean,
    poweredGreen: boolean,
    poweredPurple: boolean,
}

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

export function weightedRandom(weights: number[]) {
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

export function decodeMap(rawMap: number[]) {
    return rawMap.map((tile, id) => {
        const type = weightedRandom([1, 20, 1])

        return {
            x: id % 8,
            y: Math.floor(id / 8),
            type: tile === -1 ? tiles[type].type : tiles[tile].type,
            valid: tile === -1 ? tiles[type].valid : tiles[tile].valid,
            poweredGreen: tile === -1 ? tiles[type].poweredGreen : tiles[tile].poweredGreen,
            poweredPurple: tile === -1 ? tiles[type].poweredPurple : tiles[tile].poweredPurple,
        }
    })
}

export function checkRadiusPoweredGreen(game: Tile[], x: number, y: number) {
    let powered = false;

        if ((
                  x % 2 === 1 && 
            (
                 (game[y * 8 + x + 1] !== undefined && game[y * 8 + x + 1].poweredGreen === true)
              || (game[y * 8 + x - 1] !== undefined && game[y * 8 + x - 1].poweredGreen === true)
              || (game[(y - 1) * 8 + x] !== undefined && game[(y - 1) * 8 + x].poweredGreen === true)
              || (game[(y + 1) * 8 + x] !== undefined && game[(y + 1) * 8 + x].poweredGreen === true)
              || (game[(y + 1) * 8 + x + 1] !== undefined && game[(y + 1) * 8 + x + 1].poweredGreen === true)
              || (game[(y + 1) * 8 + x - 1] !== undefined && game[(y + 1) * 8 + x - 1].poweredGreen === true)
            )) || (x % 2 === 0 && (
                (game[y * 8 + x + 1] !== undefined && game[y * 8 + x + 1].poweredGreen === true)
             || (game[y * 8 + x - 1] !== undefined && game[y * 8 + x - 1].poweredGreen === true)
             || (game[(y + 1) * 8 + x] !== undefined && game[(y + 1) * 8 + x].poweredGreen === true)
             || (game[(y - 1) * 8 + x] !== undefined && game[(y - 1) * 8 + x].poweredGreen === true)
             || (game[(y - 1) * 8 + x + 1] !== undefined && game[(y - 1) * 8 + x + 1].poweredGreen === true)
             || (game[(y - 1) * 8 + x - 1] !== undefined && game[(y - 1) * 8 + x - 1].poweredGreen === true)
        ))) {
            powered = true;
        };

        return powered;
}

export function checkRadiusPoweredPurple(game: Tile[], x: number, y: number) {
    let powered = false;

        if ((
                  x % 2 === 1 && 
            (
                 (game[y * 8 + x + 1] !== undefined && game[y * 8 + x + 1].poweredPurple === true)
              || (game[y * 8 + x - 1] !== undefined && game[y * 8 + x - 1].poweredPurple === true)
              || (game[(y - 1) * 8 + x] !== undefined && game[(y - 1) * 8 + x].poweredPurple === true)
              || (game[(y + 1) * 8 + x] !== undefined && game[(y + 1) * 8 + x].poweredPurple === true)
              || (game[(y + 1) * 8 + x + 1] !== undefined && game[(y + 1) * 8 + x + 1].poweredPurple === true)
              || (game[(y + 1) * 8 + x - 1] !== undefined && game[(y + 1) * 8 + x - 1].poweredPurple === true)
            )) || (x % 2 === 0 && (
                (game[y * 8 + x + 1] !== undefined && game[y * 8 + x + 1].poweredPurple === true)
             || (game[y * 8 + x - 1] !== undefined && game[y * 8 + x - 1].poweredPurple === true)
             || (game[(y + 1) * 8 + x] !== undefined && game[(y + 1) * 8 + x].poweredPurple === true)
             || (game[(y - 1) * 8 + x] !== undefined && game[(y - 1) * 8 + x].poweredPurple === true)
             || (game[(y - 1) * 8 + x + 1] !== undefined && game[(y - 1) * 8 + x + 1].poweredPurple === true)
             || (game[(y - 1) * 8 + x - 1] !== undefined && game[(y - 1) * 8 + x - 1].poweredPurple === true)
        ))) {
            powered = true;
        };

        return powered;
}

export function checkRadiusGreenStart(game: Tile[], x: number, y: number) {
    let green = false;

        if ((
                  x % 2 === 1 && 
            (
                 (game[y * 8 + x + 1] !== undefined && game[y * 8 + x + 1].type === 'greenStart')
              || (game[y * 8 + x - 1] !== undefined && game[y * 8 + x - 1].type === 'greenStart')
              || (game[(y - 1) * 8 + x] !== undefined && game[(y - 1) * 8 + x].type === 'greenStart')
              || (game[(y + 1) * 8 + x] !== undefined && game[(y + 1) * 8 + x].type === 'greenStart')
              || (game[(y + 1) * 8 + x + 1] !== undefined && game[(y + 1) * 8 + x + 1].type === 'greenStart')
              || (game[(y + 1) * 8 + x - 1] !== undefined && game[(y + 1) * 8 + x - 1].type === 'greenStart')
            )) || (x % 2 === 0 && (
                (game[y * 8 + x + 1] !== undefined && game[y * 8 + x + 1].type === 'greenStart')
             || (game[y * 8 + x - 1] !== undefined && game[y * 8 + x - 1].type === 'greenStart')
             || (game[(y + 1) * 8 + x] !== undefined && game[(y + 1) * 8 + x].type === 'greenStart')
             || (game[(y - 1) * 8 + x] !== undefined && game[(y - 1) * 8 + x].type === 'greenStart')
             || (game[(y - 1) * 8 + x + 1] !== undefined && game[(y - 1) * 8 + x + 1].type === 'greenStart')
             || (game[(y - 1) * 8 + x - 1] !== undefined && game[(y - 1) * 8 + x - 1].type === 'greenStart')
        ))) {
            green = true;
        };

        return green;
}

export function checkRadiusPurpleStart(game: Tile[], x: number, y: number) {
    let purple = false;

        if ((
                  x % 2 === 1 && 
            (
                 (game[y * 8 + x + 1] !== undefined && game[y * 8 + x + 1].type === 'purpleStart')
              || (game[y * 8 + x - 1] !== undefined && game[y * 8 + x - 1].type === 'purpleStart')
              || (game[(y - 1) * 8 + x] !== undefined && game[(y - 1) * 8 + x].type === 'purpleStart')
              || (game[(y + 1) * 8 + x] !== undefined && game[(y + 1) * 8 + x].type === 'purpleStart')
              || (game[(y + 1) * 8 + x + 1] !== undefined && game[(y + 1) * 8 + x + 1].type === 'purpleStart')
              || (game[(y + 1) * 8 + x - 1] !== undefined && game[(y + 1) * 8 + x - 1].type === 'purpleStart')
            )) || (x % 2 === 0 && (
                (game[y * 8 + x + 1] !== undefined && game[y * 8 + x + 1].type === 'purpleStart')
             || (game[y * 8 + x - 1] !== undefined && game[y * 8 + x - 1].type === 'purpleStart')
             || (game[(y + 1) * 8 + x] !== undefined && game[(y + 1) * 8 + x].type === 'purpleStart')
             || (game[(y - 1) * 8 + x] !== undefined && game[(y - 1) * 8 + x].type === 'purpleStart')
             || (game[(y - 1) * 8 + x + 1] !== undefined && game[(y - 1) * 8 + x + 1].type === 'purpleStart')
             || (game[(y - 1) * 8 + x - 1] !== undefined && game[(y - 1) * 8 + x - 1].type === 'purpleStart')
        ))) {
            purple = true;
        };

        return purple;
}

export function updatePowerStateGreen(game: Tile[]) {
    const newGame = [...game];

    for (let i = 0; i < newGame.length; i++) {
        if (newGame[i].type === 'green') {
            newGame[i].poweredGreen = false;
        };
    };

    let changes = true;
    while (changes === true) {
        let newChanges = false;
        for (let i = 0; i < newGame.length; i++) {
            if (newGame[i].type === 'green' && newGame[i].poweredGreen === false) {
                if (checkRadiusPoweredGreen(newGame, newGame[i].x, newGame[i].y)) {
                    newGame[i].poweredGreen = true;
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

export function updatePowerStatePurple(game: Tile[]) {
    const newGame = [...game];

    for (let i = 0; i < newGame.length; i++) {
        if (newGame[i].type === 'purple') {
            newGame[i].poweredPurple = false;
        };
    };

    let changes = true;
    while (changes === true) {
        let newChanges = false;
        for (let i = 0; i < newGame.length; i++) {
            if (newGame[i].type === 'purple' && newGame[i].poweredPurple === false) {
                if (checkRadiusPoweredPurple(newGame, newGame[i].x, newGame[i].y)) {
                    newGame[i].poweredPurple = true;
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