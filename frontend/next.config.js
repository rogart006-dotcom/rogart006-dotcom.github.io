const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX || "";

module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  output: "export",
  assetPrefix,
  images: {
    domains: ["images.unsplash.com"]
  },
  exportPathMap: async function () {
    return {
      "/": { page: "/" },
      "/contact": { page: "/contact" },
      "/dashboard": { page: "/dashboard" },
      "/404": { page: "/404" }
    };
  }
};
