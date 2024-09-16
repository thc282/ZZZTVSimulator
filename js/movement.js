export function handleTableMovement(table, playerPosition, sleepBehavior) {
    function updatePlayerPosition(newRow, newCol){
        const oldCell = table.rows[playerPosition.row].cells[playerPosition.col];
        const newCell = table.rows[newRow].cells[newCol];
        
        // 獲取玩家圖像和目標單元格的圖像
        const playerImg = oldCell.children[0];
        const targetImg = newCell.children[0];
        
        // 交換兩個單元格的圖像
        [playerImg.src, targetImg.src] = [targetImg.src, playerImg.src];
        [playerImg.alt, targetImg.alt] = [targetImg.alt, playerImg.alt];
        
        // 更新玩家位置
        playerPosition.row =  newRow
        playerPosition.col = newCol

        sleepBehavior.resetIdleTimer();
    }

    function movement({ axis, dir }) {
        let newRow = playerPosition.row;
        let newCol = playerPosition.col;

        if (axis === 'y') {
            newRow = Math.max(0, Math.min(table.rows.length - 1, newRow + dir));
        } else if (axis === 'x') {
            newCol = Math.max(0, Math.min(table.rows[0].cells.length - 1, newCol + dir));
        }

        if (newRow !== playerPosition.row || newCol !== playerPosition.col) {
            updatePlayerPosition(newRow, newCol);
        }
    }

    // 為表格添加點擊事件監聽器
    table.addEventListener('click', (event) => {
        const cell = event.target.closest('td');
        if (cell) {
            const row = cell.parentNode.rowIndex;
            const col = cell.cellIndex;
            movePlayer(row, col);
        }

        sleepBehavior.resetIdleTimer();
    });

    function movePlayer(targetRow, targetCol) {
        const path = findPath(playerPosition.row, playerPosition.col, targetRow, targetCol);
        animatePath(path);
    }

    function findPath(startRow, startCol, endRow, endCol) {
        const path = [];
        let currentRow = startRow;
        let currentCol = startCol;

        while (currentRow !== endRow || currentCol !== endCol) {
            if (currentRow < endRow) {
                path.push({ axis: 'y', dir: 1 });
                currentRow++;
            } else if (currentRow > endRow) {
                path.push({ axis: 'y', dir: -1 });
                currentRow--;
            } else if (currentCol < endCol) {
                path.push({ axis: 'x', dir: 1 });
                currentCol++;
            } else if (currentCol > endCol) {
                path.push({ axis: 'x', dir: -1 });
                currentCol--;
            }
        }

        return path;
    }

    function animatePath(path) {
        if (path.length === 0) return;

        const move = path.shift();
        movement(move);

        if (path.length > 0) {
            setTimeout(() => animatePath(path), 200); // 每200毫秒移動一次
        }
    }

    // WASD 鍵盤控制
    document.addEventListener('keydown', (event) => {
        const key = event.key.toLowerCase();
        switch (key) {
            case 'w': movement({ axis: 'y', dir: -1 }); break;
            case 's': movement({ axis: 'y', dir: 1 }); break;
            case 'a': movement({ axis: 'x', dir: -1 }); break;
            case 'd': movement({ axis: 'x', dir: 1 }); break;
            default: sleepBehavior.resetIdleTimer();
        }
    });
}