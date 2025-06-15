const container = document.getElementById('pdf-container');
const totalPages = 15; // Change if more/less images
const folderPath = 'SpiceGrillMenu/'; // Path where images are hosted

function renderImagePage(pageNumber) {
  const fileName = `page_${pageNumber}.png`; // or .png
  const url = `extracted-pages/${fileName}`;

  const img = document.createElement('img');
  img.src = url;
  img.alt = `Menu Page ${pageNumber}`;
  img.classList.add('pdf-page');  // << this class is critical
  img.id = `page${pageNumber}`;
  
  container.appendChild(img);
}


async function loadPagesSerially() {
  for (let i = 1; i <= totalPages; i++) {
    renderImagePage(i);
  }
}

loadPagesSerially();
