[My personal website](https://razzh.cn) powered by [NextJS](https://nextjs.org/)  

[razzh.cn](https://razzh.cn)  
[vercel.app](https://razzh.vercel.app/)

Article builds use [uv](https://docs.astral.sh/uv/) to generate a variable WOFF2
for each article's opening text. The first build downloads the pinned Adobe
font into `.next/cache/article-font`. Later builds reuse the generated files
in `public/fonts/intro` when the opening characters are unchanged.
