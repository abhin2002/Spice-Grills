const url = 'Spice&Grill Menu_compressed.pdf';
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

const container = document.getElementById('pdf-container');

pdfjsLib.getDocument(url).promise.then(pdf => {
  const totalPages = pdf.numPages;

  // Create placeholders
  for (let i = 1; i <= totalPages; i++) {
    const canvas = document.createElement('canvas');
    canvas.id = `page${i}`;
    canvas.classList.add('pdf-page');
    canvas.dataset.pageNumber = i;
    canvas.style.minHeight = '500px';
    container.appendChild(canvas);
  }

  // Sequential render function
  const renderPageSequentially = (pageNum = 1) => {
    if (pageNum > totalPages) return;

    const canvas = document.getElementById(`page${pageNum}`);
    const context = canvas.getContext('2d');

    pdf.getPage(pageNum).then(page => {
      const viewport = page.getViewport({ scale: 1.5 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      page.render({ canvasContext: context, viewport }).promise.then(() => {
        // Once one page is done, move to the next
        renderPageSequentially(pageNum + 1);
      });
    });
  };

  // Start sequential rendering
  renderPageSequentially();
});
