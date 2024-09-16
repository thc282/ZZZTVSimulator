export function sleepBehaviorInit(table, playerPosition) {
    let lastInteractionTime = Date.now();
    const IDLE_TIMEOUT = 3000; // 30秒後開始睡眠動畫
    const TO_SLEEP_DURATION = 2720; // 2.72秒後進入睡眠狀態
    const SLEEPANIMATIONS = ['bangboo_idle', 'bangboo_toSleep', 'bangboo_sleep'];
    let currentAnimationIndex = 0;
    let sleepTimeout = null;

    function sleepAnimation(){
        const playerImg = table.rows[playerPosition.row].cells[playerPosition.col].children[0];
        playerImg.src = `./assets/${SLEEPANIMATIONS[currentAnimationIndex]}.gif`;
    }

    // 定期檢查閒置狀態
    setInterval(checkIdleState, 1000);

    function checkIdleState() {
        const now = Date.now();
        if (now - lastInteractionTime > IDLE_TIMEOUT && currentAnimationIndex === 0) {
            // 開始 toSleep 動畫
            currentAnimationIndex = 1;
            sleepAnimation();
            
            // 設置 timeout 以切換到 sleep 狀態
            sleepTimeout = setTimeout(() => {
                currentAnimationIndex = 2;
                sleepAnimation();
            }, TO_SLEEP_DURATION);
        } 
    }

    function resetIdleTimer(playerPosition) {
        lastInteractionTime = Date.now();
        if (currentAnimationIndex !== 0) {
            currentAnimationIndex = 0;
            sleepAnimation();
            if (sleepTimeout) {
                clearTimeout(sleepTimeout);
                sleepTimeout = null;
            }
        }
    }

    return { resetIdleTimer };
}