import { initializeTable } from "./init.js";
import { handleTableMovement } from "./movement.js";

document.addEventListener('DOMContentLoaded', (event) => {
    let player = initializeTable();
    handleTableMovement(player);
});