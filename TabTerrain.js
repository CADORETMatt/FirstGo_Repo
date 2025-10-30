const solData = { size: 500, GRID_SIZE: 50 };

function createNewTerrain(terrainStatut) {
  if (terrainStatut == "master") {
    // === Terrain de départ ===
    const CELL_SIZE = solData.size / solData.GRID_SIZE;
    // Création d'un tableau 50x50 rempli de null (cases vides)
    const terrainGrid = Array.from({ length: solData.GRID_SIZE }, () => Array(solData.GRID_SIZE).fill(null));
    //Construction Object
    function batiment(name, place, color, statut) {
      this.nomBat = name;
      this.placeBat = place;  // [x1, y1, x2, y2]
      this.colorBat = color;
      this.statutBat = statut;
      //this.integrer=function(){       }
    }
    let centre = new batiment("Grotte", [25, 25, 26, 26], "grey", true);

    for (let x = centre.placeBat[0]; x <= centre.placeBat[2]; x++) {
      for (let y = centre.placeBat[1]; y <= centre.placeBat[3]; y++) {
        terrainGrid[x][y] = centre;
      }
    }
    /*
// Placement de la Mairie au centre (2x2)
    const center = sol.GRID_SIZE / 2; // = 5
    terrainGrid[center - 1][center - 1] = "Mairie";
    terrainGrid[center][center - 1] = "Mairie";
    terrainGrid[center - 1][center] = "Mairie";
    terrainGrid[center][center] = "Mairie";

    terrainGrid[1][1] = {bat:'mine', active:'true'};
*/
    //console.log (terrainGrid);
    return { terrainGrid, CELL_SIZE };
  }
}

// let { terrainGrid, CELL_SIZE } = createNewTerrain('master');
console.log(terrainGrid[25][25].nomBat);
console.log(CELL_SIZE);

// Dessin du sol
/*
ctx.fillStyle = "#00FF00";
ctx.fillRect(sol.x, sol.y, sol.size, sol.size);

// Dessin de la grille et des bâtiments
for (let i = 0; i < GRID_SIZE; i++) {
  for (let j = 0; j < GRID_SIZE; j++) {
    const cellX = sol.x + i * CELL_SIZE;
    const cellY = sol.y + j * CELL_SIZE;

    // Grille
    ctx.strokeStyle = "rgba(0,0,0,0.2)";
    ctx.lineWidth = 1;
    ctx.strokeRect(cellX, cellY, CELL_SIZE, CELL_SIZE);

    // Contenu
    if (terrainGrid[i][j] === "Mairie") {
      ctx.fillStyle = "#FFD700";
      ctx.fillRect(cellX + 2, cellY + 2, CELL_SIZE - 4, CELL_SIZE - 4);
      ctx.fillStyle = "#000";
      ctx.font = `${CELL_SIZE / 3}px Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("M", cellX + CELL_SIZE / 2, cellY + CELL_SIZE / 2f);
    }
  }
}
*/
