import axios from 'axios'
import cheerio from 'cheerio'

let searchKey = "黑客帝国"
let homePageUrl = "http://www.pianyuan.tv"
let searchUrlPrefix = "http://www.pianyuan.tv/search?q="


let hrefRule = "div.litpic > a"
let imgRule = "div.litpic > a > img"

export async function getVideoInfo(searchKey: string, homePageUrl: string, searchUrlPrefix: string, hrefRule: string, imgRule: string) {

  let searchUrl = encodeURI(searchUrlPrefix.concat(searchKey));
  console.log(searchUrl);
  return await axios.get(searchUrl)
    .catch((error: any) => console.log(error))
    .then((response: any) => {
        let result = new Array();
        let html = response.data;
        const $ = cheerio.load(html);
        const hrefs = $(hrefRule).get().map(x => $(x).attr('href'));
        const imgs = $(imgRule).get().map(x => $(x).attr('src'));
        for (let i = 0; i < hrefs.length; i++) {
          result.push({"href": homePageUrl + hrefs[i], "imgUrl": homePageUrl + imgs[i]})
        }
        return result
      }
    )

}

export async function getVideo(){
    await axios.get("http://www.imomoe.ai/player/7346-0-2.html")
      .catch((error: any) => console.log(error))
      .then((response: any) => {
        let html = response.data;
        console.log("-------------",html)
        const $ = cheerio.load(html);
        const video = $("div.dplayer-video-wrap").get();
        console.log('--------------------------',video)
        return video
      })
}

export function f1() {
  getVideoInfo(searchKey, homePageUrl, searchUrlPrefix, hrefRule, imgRule)
}
