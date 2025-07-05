'use clinet'
import TwistAPlayerWraper from '../twist-aplayer'
import type { AudioInfo } from 'twist-aplayer'
import { useMemo } from 'react'
import { useIsMobile } from '@/hooks/useIsMobile'

function LayoutAplayer() {
  const isMobile = useIsMobile()
  const layoutAudioList: AudioInfo[] = useMemo(() => ([
    {
      name: 'Special One',
      artist: 'AGA / Eason',
      url: 'https://assets.razzh.cn/audio/special-one.mp3',
      cover: 'https://p2.music.126.net/NN4xDzXxeVo3qtOjNJiy4Q==/109951168898930405.jpg?param=130y130',
      lrc: '[00:25.70]A: 行为怪诞无从触摸 常人配你不起\n[00:31.95]你有触角你会黑面十全十美\n[00:38.33]旁人冷语为何一起 旁人劝我心死\n[00:44.73]你更失控我更喜爱怪人像你\n[00:50.53]A: 天生孤僻所以更爱你 E:（越接触你）\n[00:53.40]A: 不依规则的爱更细腻 E:（越吓惊你）\n[00:56.56]A: 和你相比 难以相比 庸俗的美 E:（和我相比 难以欢喜 庸俗心理）\n[01:03.41]A: 让你羡慕自己 E:（别要待薄自己）\n[01:07.03]A: 非一般的完美 E:（要吞声忍气）\n[01:09.98]A: 羊群如何离弃\n[01:13.51]A: 打击你我包庇 E:（打击我你包庇）\n[01:16.65]A: 惨得过是我欢喜 E:（只不过代价不菲）\n[01:21.59]A: 笑着去迎合你 E:（自欺）\n[01:28.96]A: 做你像做自己 E:（面对大量是非）\n[01:32.77]A: 我喜欢听歪理 E:（对你很多不利）\n[01:35.69]A: 情人毫无常理 另有趣味 E:（未免乏味）\n[01:42.61]A: 享受怪物美\n[01:47.36]E: 欣赏我委屈你\n[01:55.45]合: 遗忘世界遗忘标准 离群更有惊喜\n[02:01.60]A: 爱你的我怪兽一样合情合理 E:（一样合情合理）\n[02:07.18]A: 彼此天生荒诞我似你 E:（越疼惜你）\n[02:10.51]A: 一起根本不要太贴地 E:（越怕伤你）\n[02:13.56]A: 神化一起 奇怪一起 离地嬉戏 E:（神化一起 奇怪一起 难敌风气）\n[02:20.12]A: 让你羡慕自己 E:（别要待薄自己）\n[02:23.98]A: 非一般的完美 E:（要吞声忍气）\n[02:26.87]A: 羊群如何离弃\n[02:30.47]A: 打击你我包庇 E:（打击我你包庇）\n[02:33.81]A: 惨得过是我欢喜 E:（只不过代价不菲）\n[02:38.51]A: 笑着去迎合你 E:（自欺）\n[02:45.95]A: 做你像做自己 E:（面对大量是非）\n[02:49.51]A: 我喜欢听歪理 E:（对你很多不利）\n[02:52.41]A: 情人毫无常理 另有趣味 E:（未免乏味）\n[02:59.45]合: 享受怪物美 欣赏你这种美\n[03:04.25]合: 情感本应古怪 喜不喜欢为何尚有顾忌\n[03:30.67]E: 让我羡慕自己 也许超出歪理 A:（这么辛苦你）\n[03:37.75]E: 是你离奇神化 喜欢我怪的美 A:（喜欢你美不美）\n[03:43.99]A: 蝙蝠与异兽一起 E:（蝙蝠与异兽一起）\n[03:48.71]合: 你像我怪癖 怪物最明白你\n[03:56.37]E: 做个独特自己 爱多么的诡秘 A:（爱多么的诡秘）\n[04:02.84]E: 情人离奇神秘 越有趣味 A:（越有趣味）\n[04:10.06]合: 享受你是你 不必世界审美\n[04:19.64]不用说道理\n[04:24.50]A: 只因怪得起 E:（怪得起）\n'
    },
    {
      name: '陀飞轮',
      artist: '陈奕迅',
      url: 'https://assets.razzh.cn/audio/tuofeilun.mp3',
      cover: 'http://p1.music.126.net/90Hf_rzZe79hWdf5S-wiAg==/109951170448806800.jpg?param=130y130',
      lrc: '[00:01.00]监制：Alvin Leong\n[00:15.59]过去十八岁没戴表\n[00:18.31]不过有时间\n[00:22.60]够我没有后顾 野性贪玩\n[00:29.59]霎眼廿七岁 时日无多\n[00:33.17]方不敢偷懒\n[00:35.27]宏愿纵未了 奋斗总不太晚\n[00:41.49]然后突然今秋\n[00:45.16]望望身边 应该有 已尽有\n[00:49.60]我的美酒跑车相机金表\n[00:53.38]也讲究\n[00:56.81]直到世间个个也妒忌\n[01:01.07]仍不怎么富有\n[01:04.76]用我尚有换我没有\n[01:08.01]其实已用尽所拥有\n[01:11.09]曾付出 几多心跳\n[01:14.60]来换取一堆堆的发票\n[01:18.30]人值得 命中减少几秒\n[01:22.80]多买一只表\n[01:26.08]秒速 捉得紧了\n[01:28.89]而皮肤竟偷偷松了\n[01:32.52]为何用到尽了\n[01:34.98]至知哪样紧要\n[01:53.25]劳力是无止境\n[01:56.77]活着多好 不需要靠物证\n[02:01.29]也不以高薪高职高级品\n[02:05.57]搏尊敬 no\n[02:08.52]就算搏到伯爵那地位\n[02:12.29]和肖邦的隽永\n[02:16.20]卖了任性 日拼夜拼\n[02:19.45]忘掉了为甚麼高兴\n[02:22.73]曾付出 几多心跳\n[02:26.19]来换取一堆堆的发票\n[02:29.85]人值得 命中减少几秒\n[02:34.33]多买一只表\n[02:37.54]秒速 捉得紧了\n[02:40.46]而皮肤竟偷偷松了\n[02:44.12]为何用到尽了\n[02:46.49]至知哪样紧要\n[02:51.91]记住那关于光阴的教训\n[02:55.61]回头走 天已暗\n[02:58.52]你献出了十寸时和分\n[03:03.10]可有换到十寸金\n[03:09.23]还剩下 几多心跳\n[03:12.79]人面跟水晶表面对照\n[03:16.46]连自己亦都分析不了\n[03:20.90]得到多与少\n[03:24.16]也许真的疯了\n[03:27.14]那个倒影 多麼可笑\n[03:30.75]灵魂若变卖了\n[03:33.22]上链也没心跳\n[03:38.07]银或金 都不紧要\n[03:41.54]谁造机芯 一样了\n[03:44.68]计划了 照做了 得到了\n[03:47.83]时间却太少 no...\n[03:52.33]还剩下 几多心跳\n[03:55.71]还在数 赶不及了\n[04:00.35]昂贵是这刻 我觉悟了\n[04:07.52]在时计里 看破一生\n[04:16.19]渺渺\n'
    },
    {
      name: '听你说',
      artist: {
        name: '梁博',
        url: 'https://music.163.com/#/artist?id=166010'
      },
      url: 'https://assets.razzh.cn/audio/tingnishuo.mp3',
      cover:
        'https://p1.music.126.net/21b5gCKyLrxGNJ6jifCemg==/109951171015962680.jpg?param=130y130',
      lrc: '[00:03.14]听你说 - 梁博\n[00:06.91]词：梁博\n[00:09.61]曲：梁博\n[00:37.79]你的壳 像钻石一样硬\n[00:44.97]你的心 软弱到无形\n[00:51.74]你的事 像风雪里的冰 清醒我至今\n[00:59.71]只是你 有一点点疼\n[01:04.27]听你说 听你说你有一点点疼\n[01:13.93]你觉得 我会不会心疼\n[01:21.18]每个夜 你提着一盏灯\n[01:25.70]问我几点钟到黎明\n[01:28.46]我只能与你同行\n[01:46.31]先要去感受泥泞\n[01:53.43]才能够步履轻盈\n[02:00.60]你看你 小小一个人 为何不害羞\n[02:07.57]敢去唱这世间风情\n[02:12.15]听你说 听你说这有一点点疼\n[02:21.68]你觉得 我会不会心疼\n[02:29.01]每个夜 你提着一盏灯\n[02:33.62]问我几点钟到黎明\n[02:36.30]我只能与你同行\n[02:43.26]有个人\n[02:44.94]在阳光下播种\n[02:47.78]万里粮田为美梦\n[02:50.38]种下爱驱散乌云和痛\n[02:54.92]千分之一也敢做\n[02:58.33]梦里登上过山车\n[03:01.95]雨里游过了小河\n[03:05.67]已置换时空\n'
    },
    {
      name: 'Hotel california (live)',
      artist: 'Eagles',
      url: 'https://assets.razzh.cn/audio/hotel-california.mp3',
      cover: 'https://p1.music.126.net/aEMzfmJT4S46Jw4dTRoHGA==/109951167661766933.jpg?param=130y130',
      lrc: `[02:08.93]On a dark desert highway cool wind in my hair\n[02:15.37]Warm smell of colitas rising up through the air\n[02:21.74]Up ahead in the distance I saw a shimmering light\n[02:28.16]My head grew heavy and my sight grew dim\n[02:31.38]I had to stop for the night\n[02:34.59]There she stood in the doorway\n[02:37.69]I heard the mission bell\n[02:40.94]And I was thinking to myself\n[02:43.34]This could be Heaven or this could be Hell\n[02:47.40]Then she lit up a candle and she showed me the way\n[02:53.77]There were voices down the corridor\n[02:57.01]I thought I heard them say\n[03:00.07]Welcome to the Hotel California\n[03:05.79]Such a lovely place\n[03:07.66]Such a lovely face\n[03:08.97]Such a lovely face\n[03:12.53]Plenty of rooms at the Hotel California\n[03:18.69]Any time of year you can find it here\n[03:25.75]Her mind is Tiffany- twisted\n[03:28.96]She got the Mercedes Benz\n[03:32.20]She got a lot of pretty pretty boys\n[03:35.44]That she calls friends\n[03:38.57]How they dance in the courtyard\n[03:41.44]Sweet summer sweat\n[03:44.87]Some dance to remember\n[03:48.10]Some dance to forget\n[03:51.32]So I called up the Captain\n[03:54.55]Please bring me my wine\n[03:57.50]He said\n[03:58.27]We haven't had that spirit here since nineteen sixty nine\n[04:04.11]And still those voices are calling from far away\n[04:10.55]Wake you up in the middle of the night\n[04:13.44]Just to hear them say\n[04:16.94]Welcome to the Hotel California\n[04:22.55]Such a lovely place\n[04:24.32]Such a lovely place\n[04:25.92]Such a lovely face\n[04:29.26]They living it up at the Hotel California\n[04:35.39]What nice surprise\n[04:37.03]What nice surprise\n[04:38.77]Bring your alibis\n[04:42.96]Mirrors on the ceiling\n[04:45.98]Pink champagne on ice\n[04:48.51]She said\n[04:49.44]We are all just prisoners here\n[04:52.67]Of our own device\n[04:55.89]In the master's chambers\n[04:59.27]They gathered for the feast\n[05:02.45]They stabbed it with their steely knives\n[05:05.30]But they just can't kill the beast\n[05:08.97]Last thing I remember\n[05:11.69]I was running for the door\n[05:15.46]I had to find the passage Back\n[05:17.76]To the place I was before\n[05:22.09]Relax said the night man\n[05:24.60]We are programmed to receive\n[05:28.28]You can check out any time you like\n[05:31.60]But you can never leave\n`
    }
  ]), [])

  return (
    !isMobile ? (
      <TwistAPlayerWraper
        audio={layoutAudioList}
        appearance='fixed'
        mini
        listFolded
        mutex
      />
    ) : null
  )
}

export default LayoutAplayer