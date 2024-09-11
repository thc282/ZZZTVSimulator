export function handleTableMovement(player){
    const table = document.getElementById('bangbooTV');
    let playerPosition = player.pos;
    console.log(playerPosition);
    
    function updatePlayerPosition(newRow, newCol){
        const oldCell = table.rows[playerPosition.row].cells[playerPosition.col];
        //console.log(oldCell);
        const playerImg = oldCell.children[0];
        oldCell.innerHTML = '';
        const blankImg = document.createElement('img');
        blankImg.src = './assets/blank.gif';
        blankImg.alt = '空白GIF';
        oldCell.appendChild(blankImg);

        // 在新位置添加玩家圖像
        const newCell = table.rows[newRow].cells[newCol];
        newCell.innerHTML = '';
        newCell.appendChild(playerImg);

        // 更新玩家位置
        playerPosition = { row: newRow, col: newCol };
    }

    document.addEventListener('keydown', (event) => {
        const key = event.key.toLowerCase();
        let newRow = playerPosition.row;
        let newCol = playerPosition.col;

        switch (key) {
            case 'w': newRow = Math.max(0, playerPosition.row - 1); break;
            case 's': newRow = Math.min(table.rows.length - 1, playerPosition.row + 1); break;
            case 'a': newCol = Math.max(0, playerPosition.col - 1); break;
            case 'd': newCol = Math.min(table.rows[0].cells.length - 1, playerPosition.col + 1); break;
            default: return; // 如果不是 WASD 鍵，不做任何操作
        }

        // 移動玩家
        if (newRow !== playerPosition.row || newCol !== playerPosition.col) {
            updatePlayerPosition(newRow, newCol);
        }
    });
}