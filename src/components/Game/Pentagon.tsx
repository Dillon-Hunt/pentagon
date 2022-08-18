import './Pentagon.css';

interface Tile {
    x: number,
    y: number,
    type: string,
    valid: boolean,
    poweredPurple: boolean,
    poweredGreen: boolean,
}

interface Props {
    tile: Tile,
    setTile: any,
    turn: string,
}

function Pentagon(props: Props) {
    const { tile, setTile } = props;

    return (
        <div className="Pentagon" color={tile.type === 'green' ? tile.poweredGreen ? 'poweredGreen' : 'green' : tile.type === 'purple' ? tile.poweredPurple ? 'poweredPurple' : 'purple' : tile.type } onClick={() => setTile(tile.x, tile.y)}>
                <svg width="98" height="88" viewBox="0 0 98 88" xmlns="http://www.w3.org/2000/svg">
                    <clipPath id='Pentagon__Clip'>
                        <path d="M2.31976 39.25L21.5463 5.94873C23.2433 3.00942 26.3795 1.19873 29.7735 1.19873H68.2265C71.6205 1.19873 74.7567 3.00942 76.4537 5.94873L95.6802 39.25C97.3773 42.1893 97.3773 45.8107 95.6802 48.75L76.4537 82.0513C74.7567 84.9906 71.6205 86.8013 68.2265 86.8013H29.7735C26.3795 86.8013 23.2433 84.9906 21.5463 82.0513L2.31976 48.75C0.622753 45.8107 0.622752 42.1893 2.31976 39.25Z"/>
                    </clipPath>
                </svg>
            {/* <p className='Pentagon__Location'>({tile.x}, {tile.y})</p> */}
        </div>
    )
}

export default Pentagon;