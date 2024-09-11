export function initializeTable() {
    const rows = 4;
    const cols = 6;
    const table = document.getElementById('bangbooTV');
    
    // 生成表格
    for (let i = 0; i < rows; i++) {
        const row = table.insertRow();
        for (let j = 0; j < cols; j++) {
            row.insertCell();
        }
    }

    // 生成隨機位置
    const randomRow = Math.floor(Math.random() * rows);
    const randomCol = Math.floor(Math.random() * cols);

    // 填充GIF
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = table.rows[i].cells[j];
            const img = document.createElement('img');
            
            if (i === randomRow && j === randomCol) {
                // 隨機單元格的不同GIF
                img.src = './assets/bangboo_idle.gif';
                img.alt = 'Bangboo';
            } else {
                // 普通單元格的GIF
                img.src = '.assets/blank.gif';
                img.alt = '空白GIF';
            }
            
            cell.appendChild(img);
        }
    }

    return {pos: {row: randomRow, col: randomCol}};
};