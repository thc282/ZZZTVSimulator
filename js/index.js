import { initializeTable } from "./init.js";
import { handleTableMovement } from "./movement.js";
import { sleepBehaviorInit } from "./sleep.js";

document.addEventListener('DOMContentLoaded', (event) => {
    let player = initializeTable();
    let table = document.getElementById('bangbooTV');
    let sleepBehavior = sleepBehaviorInit(table, player.pos);
    handleTableMovement(table, player.pos, sleepBehavior);
});