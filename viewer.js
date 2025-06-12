const url = 'Spice&Grill Menu.pdf';

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

const container = document.getElementById('pdf-container');

pdfjsLib.getDocument(url).promise.then(pdf => {
  for (let i = 1; i <= pdf.numPages; i++) {
    const canvas = document.createElement('canvas');
    canvas.id = `page${i}`;
    canvas.dataset.pageNumber = i;
    canvas.style.minHeight = '500px'; // pre-reserved height
    container.appendChild(canvas);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const canvas = entry.target;
        const pageNum = parseInt(canvas.dataset.pageNumber);

        if (!canvas.dataset.loaded) {
          pdf.getPage(pageNum).then(page => {
            const viewport = page.getViewport({ scale: 1.5 });
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            page.render({
              canvasContext: canvas.getContext('2d'),
              viewport
            });

            canvas.dataset.loaded = "true"; // mark as loaded
          });
        }
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('canvas').forEach(c => observer.observe(c));
});
