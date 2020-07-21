const config = require('config');

const mapper = (report) => {
  const baseUrl = config.get('assetsBaseUrl');
  const mapImage = (image) => ({
    url: `${baseUrl}${image.fileName}_full.jpg`,
    thumbnailUrl: `${baseUrl}${image.fileName}_thumb.jpg`,
  });

  return {
    ...report,
    images: report.images.map(mapImage),
  };
};

module.exports = mapper;
