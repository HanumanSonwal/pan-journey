import PDFDocument from "pdfkit";

export const createPdfBuffer = async (callback) => {
  const doc = new PDFDocument({
    margin: 40,
    size: "A4",
  });

  const buffers = [];

  doc.on("data", (chunk) => {
    buffers.push(chunk);
  });

  const pdfPromise = new Promise((resolve) => {
    doc.on("end", () => {
      resolve(Buffer.concat(buffers));
    });
  });

  callback(doc);

  doc.end();

  return await pdfPromise;
};
