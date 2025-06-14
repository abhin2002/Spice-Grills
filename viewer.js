// Setup PDF.js worker
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

    const container = document.getElementById('pdf-container');
    const totalPages = 15; // Update this as needed
    const folderPath = 'extracted-pages/'; // For GitHub Pages hosting under repo

    function renderSinglePagePDF(pageNumber) {
      const fileName = `SpiceGrillMenu-${pageNumber}.pdf`;
      const url = encodeURI(`${folderPath}${fileName}`);

      const canvas = document.createElement('canvas');
      canvas.id = `page${pageNumber}`;
      canvas.classList.add('pdf-page');
      container.appendChild(canvas);

      return pdfjsLib.getDocument(url).promise.then(pdf => {
        return pdf.getPage(1).then(page => {
          const scale = window.innerWidth < 768 ? 1.0 : 1.5;
          const viewport = page.getViewport({ scale });

          canvas.width = viewport.width;
          canvas.height = viewport.height;

          const context = canvas.getContext('2d');
          return page.render({ canvasContext: context, viewport }).promise;
        });
      }).catch(err => {
        console.error(`Error loading page ${pageNumber}:`, err.message);
      });
    }

    // Load each PDF serially to avoid heavy loading at once
    async function loadPagesSerially() {
      for (let i = 1; i <= totalPages; i++) {
        await renderSinglePagePDF(i);
      }
    }

    loadPagesSerially();