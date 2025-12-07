
const markdownIt = require("markdown-it");
const mdAnchor = require("markdown-it-anchor");
const mdToc = require("markdown-it-table-of-contents");
const mdKatex = require("markdown-it-katex");
const slugify = require("slugify");

module.exports = function(eleventyConfig) {
  // Copy assets as-is
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({"src/assets/favicon.ico": "favicon.ico"});
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  // Watch JS/CSS
  eleventyConfig.addWatchTarget("src/assets");

  // Filters
  eleventyConfig.addFilter("date", (dateObj) => {
    const d = new Date(dateObj);
    const pad = (n) => n.toString().padStart(2,'0');
    return `${d.getFullYear()}.${pad(d.getMonth()+1)}.${pad(d.getDate())}`;
  });
  eleventyConfig.addFilter("limit", (arr, n) => arr ? arr.slice(0, n) : []);
  eleventyConfig.addFilter("readingTime", (content) => {
    const words = (content || '').split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.round(words / 250));
    return `${minutes} min`;
  });
  eleventyConfig.addFilter("slug", (str) => slugify(str || "", {lower:true, strict:true}));

  // Collections
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/**/*.{md,html}").sort((a,b) => b.date - a.date);
  });

  eleventyConfig.addCollection("tagList", function(collectionApi) {
    const tagCount = {};
    collectionApi.getAll().forEach(item => {
      (item.data.tags || []).forEach(t => {
        if(t === "post") return;
        tagCount[t] = (tagCount[t] || 0) + 1;
      });
    });
    const list = Object.entries(tagCount).map(([tag,count]) => ({tag, count})).sort((a,b)=>b.count-a.count);
    return list;
  });

  // Markdown config
  const md = markdownIt({
    html: true,
    linkify: true,
    typographer: true,
    breaks: false
  })
  .use(mdKatex)
  .use(mdAnchor, {slugify: s => slugify(s, {lower:true, strict:true})})
  .use(mdToc, {includeLevel:[2,3,4], containerHeaderHtml: '<div class="toc-title">章节预览</div>'});

  eleventyConfig.setLibrary("md", md);

  // Truncate filter (add after setLibrary)
  eleventyConfig.addFilter("truncate", function(str, n) {
    if(!str) return "";
    str = String(str);
    return str.length > n ? str.slice(0, n) + "…" : str;
  });
  // indexOf for collections
  eleventyConfig.addFilter("indexOf", function(arr, page) {
    return arr.findIndex(i => i.url === page.url);
  });
  // url filter passthrough
  eleventyConfig.addFilter("url", function(u){ return u; });

  // Path Prefix for GitHub Pages (repo name)
  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    pathPrefix: "/forelang/"
  };
};
