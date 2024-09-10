const rows = 4;
const cols = 6;
document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('gifTable');
    
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
                img.src = './assests/bangboo_idle.gif';
                img.alt = '不同的GIF';
            } else {
                // 普通單元格的GIF
                img.src = 'https://example.com/different.gif';
                img.alt = '普通GIF';
            }
            
            cell.appendChild(img);
        }
    }
});