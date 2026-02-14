export const siteConfig = {
    name: "SaaS Template",
    domain: "saas-template.com",
    url: "https://saas-template.com",

    // 联系信息
    contact: {
        email: "contact@saas-template.com",
    },

    // 社交媒体
    social: {
        twitter: "https://twitter.com/saas-template",
        facebook: "https://facebook.com/saas-template",
    },
} as const;

export type SiteConfig = typeof siteConfig;