/** @type {import('next-sitemap').IConfig} */

const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
module.exports = {
  siteUrl: siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
    additionalSitemaps: [
      `${siteUrl}/sitemap.xml`,
      `${siteUrl}/server-sitemap.xml`
    ]
  }
};
