import { getServerSideSitemap } from 'next-sitemap';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ctx => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')

  const fields = [
    {
      loc: 'https://example.com', // Absolute url
      lastmod: new Date().toISOString()
      // changefreq
      // priority
    },
    {
      loc: 'https://example.com/dynamic-path-2', // Absolute url
      lastmod: new Date().toISOString()
      // changefreq
      // priority
    }
  ];

  return getServerSideSitemap(ctx, fields);
};
// Default export to prevent next.js errors
export default function Sitemap() {}

// const femaleCastingModels = models
// ?.filter(
//   (el) => el?.model_categories?.filter((val) => val?.id === "8")?.length
// )
// .map((item) => {
//   return {
//     loc: `http:localhost:3000/models/women/casting/${item.id}-${slugify(
//       item.nickname
//     )}`,
//     lastmod: item?.updated_date,
//   };
// });
// const fields = [
//   ...staticLinks,
//   ...maleMainbaordModels,
//   ...maleCastingModels,
//   ...maleCommercialModels,
//   ...femaleMainbaordModels,
//   ...femaleCastingModels,
//   ...femaleCommercialModels,
// ];
