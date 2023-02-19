import axios from 'axios';
import FormData from 'form-data';

const Sitemap = () => {};

export const getServerSideProps = async ({ res }) => {
  const baseUrl = {
    development: 'http://localhost:3000',
    production: process.env.NEXT_PUBLIC_DOMAIN
  }[process.env.NODE_ENV];
  var formData = new FormData();

  formData.append('secret', process.env.NEXT_PUBLIC_SECRET);
  formData.append('appId', process.env.NEXT_PUBLIC_APP_ID);
  formData.append('version', process.env.NEXT_PUBLIC_VERSION);
  formData.append('limit', 1);
  // // formData.append("order", "web_online_date DESC");
  // //   formData.append("limit", 20);
  const headers = {
    ...formData.getHeaders(),
    'Content-Length': formData.getLengthSync()
  };

  const response = await axios.post(`http://localhost:3000`, formData, {
    headers
  });

  const totalNews = response.headers['x-pagination-total-count'];
  const totalPages = Math.ceil(totalNews / 500);
  let dynamicRoutes = [];
  const latestDate = new Date(response.data[0]?.date).toISOString();
  for (let i = 1; i <= totalPages; i++) {
    dynamicRoutes = [
      ...dynamicRoutes,
      `sitemap-news${i === 1 ? '' : `-${i}`}.xml`
    ];
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>

  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  
     <sitemap>
        <loc>${baseUrl}/sitemap-static.xml</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
     </sitemap>
  
     <sitemap>
        <loc>${baseUrl}/sitemap-models.xml</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
     </sitemap>

     ${dynamicRoutes
       ?.map(
         route => `
    <sitemap>
    <loc>${baseUrl}/${route}</loc>
    <lastmod>${latestDate}</lastmod>
  </sitemap>
    `
       )
       .join('')}
  </sitemapindex>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {}
  };
};

export default Sitemap;
