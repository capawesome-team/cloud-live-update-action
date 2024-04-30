import archiver from 'archiver';

export const zipFolder = async (sourceFolder) => {
  return new Promise((resolve, reject) => {
    const archive = archiver('zip', { zlib: { level: 9 } });
    const buffers = [];

    archive.on('data', (data) => buffers.push(data));
    archive.on('error', (err) => reject(err));
    archive.on('end', () => resolve(Buffer.concat(buffers)));

    archive.directory(sourceFolder, false);
    archive.finalize();
  });
};

export const isZipped = (path) => {
  return path.endsWith('.zip');
}