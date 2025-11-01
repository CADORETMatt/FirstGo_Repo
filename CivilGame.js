    // === Configuration ===
    const WORLD_SIZE = { w: 2500, h: 2500 };
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const posHUD = document.getElementById('playerPos');


    let point = { x: 1250, y: 1250, size: 10 };
    let target = null;
    const speed = 5;

    const sol = { x: 1000, y: 1000, size: 500, color: '#006400' };
    let viewport = { width: 600, height: 600, x: sol.x + sol.size / 2 - 300, y: sol.y + sol.size / 2 - 300 };

    const ZOOM_FACTOR = 1.2;
    const MIN_VIEW = 100;
    const MAX_VIEW = WORLD_SIZE.w;

    const keys = {};
    document.addEventListener('keydown', e => { keys[e.key.toLowerCase()] = true; e.preventDefault(); });
    document.addEventListener('keyup', e => { keys[e.key.toLowerCase()] = false; });

    // Mise à jour vers la cible
    function updateTarget() {
      if (!target) return;
      const dx = target.x - point.x, dy = target.y - point.y;
      const dist = Math.hypot(dx, dy);
      if (dist < speed) { point.x = target.x; point.y = target.y; target = null; return; }
      const nx = point.x + (dx / dist) * speed;
      const ny = point.y + (dy / dist) * speed;
      if (nx < sol.x || nx > sol.x + sol.size || ny < sol.y || ny > sol.y + sol.size) { target = null; return; }
      point.x = nx; point.y = ny;
    }
//*/
    // Dessin
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const sx = canvas.width / viewport.width;
      const sy = canvas.height / viewport.height;
      ctx.save();
      ctx.scale(sx, sy);
      ctx.translate(-viewport.x, -viewport.y);

      ctx.fillStyle = sol.color;
      ctx.fillRect(sol.x, sol.y, sol.size, sol.size);

      /*
      // === Grille de terrain ===
        //IL FAUT AJOUTER LES COORDONNÉES DU TERRAIN 
        
      if (terrainGrid) {
    for (let gx = 0; gx < terrainGrid.length; gx++) {
      for (let gy = 0; gy < terrainGrid[gx].length; gy++) {
        const cell = terrainGrid[gx][gy];
        if (cell) {
          // coordonnées monde de la cellule
          const x = sol.x + gx * CELL_SIZE;
          const y = sol.y + gy * CELL_SIZE;

          ctx.fillStyle = cell.colorBat || "gray";
          ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
        }
      }
    }
  }
   */

      ctx.fillStyle = 'red';
      const s = point.size;
      ctx.fillRect(point.x - s / 2, point.y - s / 2, s, s);

      if (target) {
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;
        ctx.strokeRect(target.x - 5, target.y - 5, 10, 10);
      }
      ctx.restore();
    }

    // Initialisation terrain depuis TabTerrain.js
    //let terrainStatut = "master";
    let { terrainGrid, CELL_SIZE } = createNewTerrain('master');
    // où terrainGrid est le tableau 50x50 et CELL_SIZE la taille, en pixel, d'une case

    // Boucle principale
    function gameLoop() {
      handleKeyboardMovement();
      updateTarget();
      clampViewport();
      draw();
      updateHUD();
      requestAnimationFrame(gameLoop);
    }
    requestAnimationFrame(gameLoop);
