// Resize canvas pour garder le ratio
function resizeCanvasToWindow() {
    const maxW = window.innerWidth, maxH = window.innerHeight;
    const ratio = viewport.width / viewport.height;
    let displayW = maxW, displayH = displayW / ratio;
    if (displayH > maxH) { displayH = maxH; displayW = displayH * ratio; }
    canvas.style.width = Math.round(displayW) + 'px';
    canvas.style.height = Math.round(displayH) + 'px';
}
window.addEventListener('resize', resizeCanvasToWindow);
resizeCanvasToWindow();

// Convertit clic/touch en coord monde
function cssPointToWorld(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    const nx = (clientX - rect.left) / rect.width;
    const ny = (clientY - rect.top) / rect.height;
    return { x: viewport.x + nx * viewport.width, y: viewport.y + ny * viewport.height };
}

 /*   // Mise à jour vers la cible
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


// Pointer pour déplacer le point
function onPointerDown(e) {
    const p = e.touches ? e.touches[0] : e;
    const w = cssPointToWorld(p.clientX, p.clientY);
    if (w.x >= sol.x && w.x <= sol.x + sol.size && w.y >= sol.y && w.y <= sol.y + sol.size) {
        target = { x: w.x, y: w.y };
    }
}
//canvas.addEventListener('mousedown', onPointerDown);
//canvas.addEventListener('touchstart', onPointerDown, { passive: true });
canvas.addEventListener('pointerdown', onPointerDown);
canvas.addEventListener('click', onPointerDown);


// Déplacement clavier
function handleKeyboardMovement() {
    let dx = 0, dy = 0;
    if (keys['z']) dy -= speed;
    if (keys['s']) dy += speed;
    if (keys['q']) dx -= speed;
    if (keys['d']) dx += speed;
    if (dx !== 0 || dy !== 0) {
        const nx = point.x + dx, ny = point.y + dy;
        if (nx >= sol.x && nx <= sol.x + sol.size && ny >= sol.y && ny <= sol.y + sol.size) {
            point.x = nx; point.y = ny;
        }
    }
}

// Clamp viewport et suivi automatique
function clampViewport() {
    if (viewport.x < 0) viewport.x = 0;
    if (viewport.y < 0) viewport.y = 0;
    if (viewport.x + viewport.width > WORLD_SIZE.w) viewport.x = WORLD_SIZE.w - viewport.width;
    if (viewport.y + viewport.height > WORLD_SIZE.h) viewport.y = WORLD_SIZE.h - viewport.height;

    // Centrage automatique autour du point
    viewport.x = point.x - viewport.width / 2;
    viewport.y = point.y - viewport.height / 2;
    if (viewport.x < 0) viewport.x = 0;
    if (viewport.y < 0) viewport.y = 0;
    if (viewport.x + viewport.width > WORLD_SIZE.w) viewport.x = WORLD_SIZE.w - viewport.width;
    if (viewport.y + viewport.height > WORLD_SIZE.h) viewport.y = WORLD_SIZE.h - viewport.height;
}

// Mise à jour du HUD (position du joueur)
function updateHUD() {
    posHUD.textContent = `x: ${point.x.toFixed(1)}, y: ${point.y.toFixed(1)}`;
}


// HUD zoom uniquement
function zoom(factor) {
    const newW = Math.max(MIN_VIEW, Math.min(MAX_VIEW, viewport.width / factor));
    const newH = Math.max(MIN_VIEW, Math.min(MAX_VIEW, viewport.height / factor));
    const cx = viewport.x + viewport.width / 2, cy = viewport.y + viewport.height / 2;
    viewport.width = newW; viewport.height = newH;
    viewport.x = cx - viewport.width / 2; viewport.y = cy - viewport.height / 2;
    resizeCanvasToWindow();
}
document.getElementById('zoomIn').addEventListener('click', () => zoom(ZOOM_FACTOR));
document.getElementById('zoomOut').addEventListener('click', () => zoom(1 / ZOOM_FACTOR));

// Empêche double-tap zoom mobile
let lastTouch = 0;
canvas.addEventListener('touchend', e => {
    const t = Date.now();
    if (t - lastTouch < 300) e.preventDefault();
    lastTouch = t;
}, { passive: false });
