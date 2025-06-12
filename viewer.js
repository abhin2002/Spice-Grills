const url = 'Spice&Grill Menu.pdf';  // Your PDF filename

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

const container = document.getElementById('pdf-container');

pdfjsLib.getDocument(url).promise.then(pdf => {
  for (let i = 1; i <= pdf.numPages; i++) {
    pdf.getPage(i).then(page => {
      const canvas = document.createElement('canvas');
      canvas.id = `page${i}`;
      container.appendChild(canvas);

      const context = canvas.getContext('2d');
      const viewport = page.getViewport({ scale: 2 }); // High quality
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      page.render({ canvasContext: context, viewport });
    });
  }
});


