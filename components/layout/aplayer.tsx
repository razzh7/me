'use clinet'
import TwistAPlayerWraper from '../twist-aplayer'
import type { AudioInfo } from 'twist-aplayer'
import { useMemo } from 'react'
import { useIsMobile } from '@/hooks/useIsMobile'

function LayoutAplayer() {
  const isMobile = useIsMobile()
  const layoutAudioList: AudioInfo[] = useMemo(() => ([
    {
      name: '戒网',
      artist: '村西&王馨悦',
      url: 'https://assets.razzh.cn/audio/jiewang.mp3',
      cover: 'https://assets.razzh.cn/cover/jiewang.webp',
      lrc: '[00:32.22]男：山海半生漂泊 一叶孤舟\n[00:44.95]女：天地两世零落 几处离愁\n[00:56.91]男：本是一处同飞鸟 余生无所求\n[01:04.48]女：空把青丝等白头\n[01:09.69]男：清泉无垢倒映着 我的心\n[01:16.5]女：恨到归时方始休\n[01:22.520004]男：为何心有灵犀 从来难长久\n[01:28.92]女：得见青天总在雨打风吹后\n[01:34.95]男：知我千万头绪烦忧\n[01:38.93]女：不知谓我何求\n[01:42.21]男：可否执子之手\n[01:45.32]女：来抓住我的手\n[01:48.240005]男：为何相见恨晚 情深却不寿\n[01:54.64]女：管他虚情假意花落水自流\n[02:00.63]男：知我千万头绪烦忧\n[02:04.51]女：不知谓我何求\n[02:07.74]合：待尽扫西风去 乌有\n[02:40.1]男：踏破银河无觅 玉颜红袖\n[02:52.91]女：寻遍宫阙不见 良人佳偶\n[03:04.94]男：一夜雨声多少事 月下强说愁\n[03:12.5]女：红豆如何敢消受\n[03:17.72]男：功名休问几时成 今朝酒\n[03:24.51]女：更无一个肯回头\n[03:30.5]男：纵然意合情投 怎能长相守\n[03:36.86]女：如醉方醒原来情钟不自由\n[03:42.95999]男：知我千万头绪烦忧\n[03:46.92]女：不知谓我何求\n[03:50.15]男：世事不如山丘\n[03:53.31]女：山青不如水秀\n[03:56.14]男：为何相见恨晚 情深却不寿\n[04:02.5]女：管他虚情假意花落水自流\n[04:08.53]男：知我千万头绪烦忧\n[04:12.46]女：不知谓我何求\n[04:15.7]合：待尽扫西风去 乌有\n[04:43.82]男：独立小桥等风满袖\n[04:47.74]女：去年此门依旧\n[04:50.99]合：夜灯为君留 归来否\n'
    },
    {
      name: '想念',
      artist: '梁博',
      url: 'https://assets.razzh.cn/audio/xiangnian.mp3',
      cover: 'https://p1.music.126.net/5-xvSZZxcQgvvk7sJ0-xPg==/109951169775167100.jpg?param=130y130',
      lrc: '[00:37.02]其实孤独从来都和那些节日无关\n[00:42.38]像外面曾与我无关\n[00:48.25]就像曾经熟悉的那些单纯的笑脸\n[00:53.55]现在也和你无关\n[00:58.96]我们都相遇在这里的同一个地点\n[01:04.46]又分别在同一时间\n[01:09.89]那时候都说好要记住你的诺言\n[01:15.25]你的诺言不变\n[01:20.2]想念昨天的风\n[01:22.47]也想念昨天的雨\n[01:25.31]也想念昨天的黄昏和海岸\n[01:31.01]想念那时的你\n[01:33.61]也想念那时的我\n[01:36.18]也想念那时的一切都简单\n[01:41.92]想念冬天的雪\n[01:44.4]也想念家人的暖\n[01:47.11]也想念离开时的那个夜晚\n[01:52.75]我在想念\n[01:54.770004]是否你也在想念\n[01:57.479996]是否也远在天边\n[02:00.31]默默地祝愿\n[02:04.43]有些快乐就定格在离开家的那天\n[02:09.66]那是个永恒的节点\n[02:15.45]从此风雨兼程地走用心地追赶\n[02:20.62]可是彩虹永远在天边\n[02:26.34]因为相信也因为不信所以去冒险\n[02:31.6]看看一切的另一面\n[02:37.22]难过时候犹豫的我就看到你的脸\n[02:42.3]出现在我心里面\n[02:47.35]想念家乡的风\n[02:49.85]也想念家乡的路\n[02:52.52]也想念家乡的黄昏和海岸\n[02:58.29001]想念那时的你\n[03:00.74]也想念那时的我\n[03:03.44]也想念那时的一切都简单\n[03:09.24]想念冬天的雪\n[03:11.64]也想念家人的暖\n[03:14.3]也想念离开时的那个夜晚\n[03:20.14]我在想念\n[03:22.01]是否你也在想念\n[03:24.72]是否也远在天边\n[03:27.52]默默地祝愿\n[03:52.91]想念家乡的风\n[03:55.19]也想念家乡的雨\n[03:58.0]也想念家乡的黄昏和海岸\n[04:03.79]想念那时的你\n[04:06.13]也想念那时的我\n[04:08.81]也想念那时的一切都简单\n[04:14.68]想念冬天的雪\n[04:17.07]也想念家人的暖\n[04:19.75]也想念离开时的那个夜晚\n[04:25.65]我在想念\n[04:27.5]是否你也在想念\n[04:30.23]是否也远在天边\n[04:32.99]默默地祝愿\n[04:59.04]想家 想家 为什么想家\n[05:01.87]不说 不说 你也知道吗\n[05:04.55]想她 想她 为什么想她\n[05:07.18]Na na na na na na na na\n[05:09.86]想家 想家 为什么想家\n[05:12.73]不说 不说 你也知道吗\n[05:15.41]想她 想她 为什么想她\n[05:18.06]Na na na na na na na na\n[05:20.79]想家 想家 为什么想家\n[05:23.59]不说 不说 你也知道吗\n[05:26.28]想她 想她 为什么想她\n[05:28.98]Na na na na na na na na\n[05:31.79]想家 想家 为什么想家\n[05:34.53]不说 不说 你也知道吗\n[05:37.13]想她 想她\n[05:38.8]Na na na na na na na na\n'
    },
    {
      name: 'Special One',
      artist: 'AGA&Eason',
      url: 'https://assets.razzh.cn/audio/special-one.mp3',
      cover: 'https://p2.music.126.net/NN4xDzXxeVo3qtOjNJiy4Q==/109951168898930405.jpg?param=130y130',
      lrc: '[00:25.70]A: 行为怪诞无从触摸 常人配你不起\n[00:31.95]你有触角你会黑面十全十美\n[00:38.33]旁人冷语为何一起 旁人劝我心死\n[00:44.73]你更失控我更喜爱怪人像你\n[00:50.53]A: 天生孤僻所以更爱你 E:（越接触你）\n[00:53.40]A: 不依规则的爱更细腻 E:（越吓惊你）\n[00:56.56]A: 和你相比 难以相比 庸俗的美 E:（和我相比 难以欢喜 庸俗心理）\n[01:03.41]A: 让你羡慕自己 E:（别要待薄自己）\n[01:07.03]A: 非一般的完美 E:（要吞声忍气）\n[01:09.98]A: 羊群如何离弃\n[01:13.51]A: 打击你我包庇 E:（打击我你包庇）\n[01:16.65]A: 惨得过是我欢喜 E:（只不过代价不菲）\n[01:21.59]A: 笑着去迎合你 E:（自欺）\n[01:28.96]A: 做你像做自己 E:（面对大量是非）\n[01:32.77]A: 我喜欢听歪理 E:（对你很多不利）\n[01:35.69]A: 情人毫无常理 另有趣味 E:（未免乏味）\n[01:42.61]A: 享受怪物美\n[01:47.36]E: 欣赏我委屈你\n[01:55.45]合: 遗忘世界遗忘标准 离群更有惊喜\n[02:01.60]A: 爱你的我怪兽一样合情合理 E:（一样合情合理）\n[02:07.18]A: 彼此天生荒诞我似你 E:（越疼惜你）\n[02:10.51]A: 一起根本不要太贴地 E:（越怕伤你）\n[02:13.56]A: 神化一起 奇怪一起 离地嬉戏 E:（神化一起 奇怪一起 难敌风气）\n[02:20.12]A: 让你羡慕自己 E:（别要待薄自己）\n[02:23.98]A: 非一般的完美 E:（要吞声忍气）\n[02:26.87]A: 羊群如何离弃\n[02:30.47]A: 打击你我包庇 E:（打击我你包庇）\n[02:33.81]A: 惨得过是我欢喜 E:（只不过代价不菲）\n[02:38.51]A: 笑着去迎合你 E:（自欺）\n[02:45.95]A: 做你像做自己 E:（面对大量是非）\n[02:49.51]A: 我喜欢听歪理 E:（对你很多不利）\n[02:52.41]A: 情人毫无常理 另有趣味 E:（未免乏味）\n[02:59.45]合: 享受怪物美 欣赏你这种美\n[03:04.25]合: 情感本应古怪 喜不喜欢为何尚有顾忌\n[03:30.67]E: 让我羡慕自己 也许超出歪理 A:（这么辛苦你）\n[03:37.75]E: 是你离奇神化 喜欢我怪的美 A:（喜欢你美不美）\n[03:43.99]A: 蝙蝠与异兽一起 E:（蝙蝠与异兽一起）\n[03:48.71]合: 你像我怪癖 怪物最明白你\n[03:56.37]E: 做个独特自己 爱多么的诡秘 A:（爱多么的诡秘）\n[04:02.84]E: 情人离奇神秘 越有趣味 A:（越有趣味）\n[04:10.06]合: 享受你是你 不必世界审美\n[04:19.64]不用说道理\n[04:24.50]A: 只因怪得起 E:（怪得起）\n'
    },
    {
      name: '可惜我是水瓶座',
      artist: '杨千嬅&毛不易',
      url: 'https://assets.razzh.cn/audio/shuipingzuo.mp3',
      cover: 'http://p1.music.126.net/lmWvAv4FUzzn9ZW3669lKA==/109951167616255787.jpg?param=130y130',
      lrc: '[00:00.0]可惜我是水瓶座 (Live) - 杨千嬅/毛不易\n[00:00.09]曲：雷颂德\n[00:00.11]原唱：杨千嬅\n[00:01.45]杨千嬅：\n[00:01.69]十年后或现在失去\n[00:05.73]反正到最尾也唏嘘\n[00:10.60]够绝情我都赶我自己出去\n[00:26.71]毛不易：\n[00:33.57]原来你这样珍惜我\n[00:39.15]从前在热恋中都未听讲过\n[00:44.39]别说这种行货 哪里留得住我\n[00:50.38]到底是为什么分手你很清楚\n[00:55.24]合：\n[00:55.99]如何笨到底 但到底还是我\n[01:01.67]谁人待我好 待我差 太清楚\n[01:06.44]毛不易：\n[01:07.24]想继续装傻 却又无力受折磨\n[01:12.55]合：\n[01:12.91]心里羡慕那些人 盲目到不计后果\n[01:20.22]毛不易：\n[01:20.77]我就回去 别引出我泪水\n[01:25.9]杨千嬅：\n[01:26.35]尤其明知水瓶座最爱是流泪\n[01:30.97]毛不易：\n[01:31.47]若然道别是下一句\n[01:34.18]可以闭上了你的嘴\n[01:36.63]合：\n[01:36.91]无谓再会要是再会更加心碎\n[01:42.85]毛不易：\n[01:43.24]要是回去没有止痛药水\n[01:48.47]杨千嬅：\n[01:48.91]拿来长岛冰茶换我\n[01:51.55]合：\n[01:51.71]半晚安睡\n[01:53.4]毛不易：\n[01:53.88]十年后或现在失去\n[01:56.3]杨千嬅：\n[01:56.71]反正到最尾也唏嘘\n[01:59.22]毛不易：\n[01:59.64]够绝情\n[02:00.56]合：\n[02:00.8]我都赶我自己出去\n[02:25.61]杨千嬅：\n[02:27.78]犹如最结实的堡垒\n[02:33.40]原来在逐点崩溃逐点粉碎\n[02:38.76]极固执的如我 也会捱不下去\n[02:44.77]每天扮着幸福始终有些心虚\n[02:49.94]合：\n[02:50.29]如何笨到底 但到底还是我\n[02:56.04]谁人待我好 待我差 太清楚\n[03:01.19]杨千嬅：\n[03:01.67]想继续装傻 却又无力受折磨\n[03:06.86]合：\n[03:07.18]心里羡慕那些人 盲目到不计后果\n[03:13.2]杨千嬅：\n[03:13.69]我就回去 别引出我泪水\n[03:18.84]合：\n[03:19.20]尤其明知水瓶座最爱是流泪\n[03:23.78]杨千嬅：\n[03:24.20]若然道别是下一句\n[03:27.07]可以闭上了你的嘴\n[03:29.57]合：\n[03:29.85]无谓再会要是再会更加心碎\n[03:36.19]要是回去没有止痛药水\n[03:41.80]拿来长岛冰茶换我半晚安睡\n[03:46.33]杨千嬅：\n[03:46.79]十年后或现在失去\n[03:49.25]合：\n[03:49.57]反正到最尾也唏嘘\n[03:52.44]够绝情我都赶我自己出去\n[03:57.79]毛不易：\n[03:58.45]原来你这样珍惜我\n[04:03.79]杨千嬅：\n[04:09.53]犹如最结实的堡垒\n[04:16.36]合：\n[04:17.86]十年后或现在失去\n[04:20.66]反正到最尾也唏嘘\n[04:27.23]够绝情我都赶我自己出去'
    },
    {
      name: '爱得太迟',
      artist: '古巨基&泳儿',
      url: 'https://assets.razzh.cn/audio/aidetaichi.mp3',
      cover: 'https://p1.music.126.net/6guSl-fJ7LtTiPdpfw7x7A==/109951170312094045.jpg?param=130y130',
      lrc: '[00:00.00]爱得太迟 (Live) - 古巨基/泳儿\n[00:01.08]曲：杨镇邦\n[00:01.54]原唱：古巨基/周慧敏\n[00:21.50]泳儿：\n[00:21.77]我过去那死党 早晚共对\n[00:25.86]各也扎职以后 没法畅聚\n[00:29.94]而终于相约到\n[00:32.20]但无言共对 疏淡如水\n[00:36.35]古巨基：\n[00:38.00]日夜做 见爸爸 刚好想呻\n[00:42.28]却霎眼 看出他 多了皱纹\n[00:46.33]而他的苍老感\n[00:48.67]是从来未觉 太内疚担心\n[00:53.95]泳儿：\n[00:54.86]最心痛是 爱得太迟\n[00:58.79]有些心意 不可等某个日子\n[01:02.74]古巨基：\n[01:03.17]盲目地发奋 忙忙忙其实自私\n[01:06.96]梦中也习惯 有压力要我得志\n[01:10.80]合：\n[01:11.03]最可怕是 爱需要及时\n[01:15.20]只差一秒 心声都已变历史\n[01:19.08]泳儿：\n[01:19.40]忙极亦放肆\n[01:20.68]古巨基：\n[01:21.12]见我爱见的相知\n[01:22.92]合：\n[01:23.09]要抱要吻要怎么也好\n[01:26.54]偏要推说等下一次\n[01:47.25]古巨基：\n[01:49.97]我也觉 我体质 仿似下降\n[01:54.00]看了症得到是 别要太忙\n[01:58.05]而影碟 都扫光\n[02:00.44]但从来未看 因有事赶\n[02:04.55]泳儿：\n[02:06.24]日夜做 储的钱 都应该够\n[02:10.35]到圣诞 正好讲 跟我白头\n[02:14.26]合：\n[02:14.43]谁知她开了口 未能挨下去\n[02:18.49]已恨我很久\n[02:22.56]古巨基：\n[02:23.01]错失太易 爱得太迟\n[02:26.97]我怎想到\n[02:28.64]合：\n[02:28.86]她忍不到那日子\n[02:30.81]古巨基：\n[02:31.20]盲目地发奋\n[02:32.43]合：\n[02:32.61]忙忙忙从来未知\n[02:34.97]泳儿：\n[02:35.31]幸福会掠过 再也没法说钟意\n[02:38.91]古巨基：\n[02:39.43]爱一个字 也需要及时\n[02:43.38]只差一秒\n[02:45.03]合：\n[02:45.20]心声都已变历史\n[02:47.50]为何未放肆 见我爱见的相知\n[02:51.13]要抱要吻要怎么也好\n[02:54.81]不要相信一切有下次\n[02:58.41]古巨基：\n[02:58.91]相拥我所爱又花几多秒\n[03:02.41]泳儿：\n[03:02.72]这几秒\n[03:04.60]古巨基：\n[03:05.08]能够做到又有多少\n[03:07.41]泳儿：\n[03:07.70]虽一秒\n[03:08.22]古巨基：\n[03:08.65]未算少\n[03:09.67]合：\n[03:09.91]足够遗憾忘掉\n[03:11.57]古巨基：\n[03:12.18]多少抱憾(泳儿：不要)\n[03:14.19]多少过路人(泳儿：抖震)\n[03:16.26]太懂估计\n[03:17.88]合：\n[03:18.08]却不懂爱锡自身\n[03:20.33]人人在发奋 想起他朝都兴奋\n[03:24.02]古巨基：\n[03:24.47]但今晚未过 你要过也很吸引\n[03:28.42]纵不信运\n[03:30.18]泳儿：\n[03:30.67]纵不信运 你不过是人\n[03:34.75]理想很远 爱于咫尺却在等\n[03:38.74]合：\n[03:38.89]来日别操心\n[03:40.30]趁你有能力开心\n[03:42.30]世界有太多东西发生\n[03:45.93]不要等到天上俯瞰\n[03:56.85]泳儿：\n[03:58.06]来日别操心\n[04:02.40]趁你有能力开心\n[04:05.65]古巨基：\n[04:07.52]世界有太多东西发生\n[04:13.12]合：\n[04:14.51]不要等到天上俯瞰'
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
      name: '黄金时代',
      artist: '陈奕迅',
      url: 'https://assets.razzh.cn/audio/golden-era.mp3',
      cover: 'https://p1.music.126.net/LLwcJY9QWi0S2UDthkmn5A==/109951168369175665.jpg?param=130y130',
      lrc: '[00:13.74]买了球鞋再买玩具\n[00:18.97]甚至想\n[00:22.31]花光一切买新居\n[00:27.04]爱上谈情再爱入睡\n[00:32.24]直到想\n[00:35.37]躺进陌生者的家里\n[00:40.5]你我永远不肯定爱不爱谁\n[00:46.56]约不约定谁\n[00:50.09]黄金广场内分手\n[00:53.01]在时代门外再聚\n[00:56.7]你和谁结伴前来\n[01:00.0]是否比我精采\n[01:03.37]自从前爱到现在\n[01:06.37]是哪个可一可再\n[01:10.09]你回来你不回来\n[01:13.270004]尽管天蹋下来\n[01:16.67]但仍然值得与你\n[01:19.729996]用余下时间谈论爱\n[01:37.08]吃喝完成再去玩乐\n[01:42.56]甚至想\n[01:45.770004]天光之际看星光\n[01:50.43]吻你眉头吻至寂寞\n[01:55.520004]直到想\n[01:59.14]拥吻漫画中的主角\n[02:03.76]你我永远不肯定爱不爱谁\n[02:10.12]约不约定谁\n[02:13.64]黄金广场内分手\n[02:16.43]在时代门外再聚\n[02:19.93]你和谁结伴前来\n[02:23.4]是否比我精采\n[02:26.70999]自从前爱到现在\n[02:29.72]是哪个可一可再\n[02:33.28]你回来你不回来\n[02:36.70999]尽管天蹋下来\n[02:40.18]但仍然值得与你\n[02:43.05]没错过什么再分开\n[03:00.7]你与我凑巧经过\n[03:03.42]就像在咖啡座\n[03:06.44]一个两个三个\n[03:09.41]太闷或是太多\n[03:16.45999]你和谁结伴前来\n[03:19.87]是否比我精采\n[03:23.4]自从前爱到现在\n[03:26.44]是哪个可一可再\n[03:30.02]你回来你不回来\n[03:33.13]尽管天蹋下来\n[03:36.73]但仍然值得与你\n[03:39.69]没错过什么再分开\n'
    },
    {
      name: '岁月如歌',
      artist: '陈奕迅',
      url: 'https://assets.razzh.cn/audio/suiyueruge.mp3',
      cover: 'https://p1.music.126.net/c9G5m3D3GQxqbTt6MqJIgw==/18956679974612526.jpg?param=130y130',
      lrc: '[00:14.36]爱上了 看见你\n[00:15.88]如何不懂谦卑\n[00:17.78]去讲心中理想 不会俗气\n[00:22.75]犹如看得见晨曦\n[00:26.14]才能欢天喜地\n[00:28.02]抱着你 我每次\n[00:29.74]回来多少惊喜\n[00:31.45]也许一生太短 陪着你\n[00:36.47]情感有若行李\n[00:39.86]仍然沉重待我整理\n[00:42.85]天气不似预期\n[00:45.94]但要走 总要飞\n[00:49.77]道别不可再等你\n[00:53.67]不管有没有机\n[00:56.71]给我体贴入微\n[00:59.6]但你手 如明日便要远离\n[01:04.37]愿你可以\n[01:06.15]留下共我曾愉快的忆记\n[01:11.520004]当世事再没完美\n[01:14.91]可远在岁月如歌中找你\n[01:33.130005]再见了 背向你\n[01:34.71]眉头多少伤悲\n[01:36.43]也许不必再讲 所有道理\n[01:41.58]何时放松我自己\n[01:45.130005]才能花天酒地\n[01:46.96]抱着你 我说过\n[01:48.380005]如何一起高飞\n[01:50.1]这天只想带走 还是你\n[01:55.39]如重温往日邮寄\n[01:58.65]但会否疲倦了嬉戏\n[02:25.99]天气不似预期\n[02:28.72]但要走 总要飞\n[02:32.57]道别不可再等你\n[02:36.13]不管有没有机\n[02:39.48]给我体贴入微\n[02:42.42]但你手 如明日便要远离\n[02:47.18]愿你可以\n[02:48.8]留下共我曾愉快的忆记\n[02:54.47]当世事再没完美\n[02:57.76]可远在岁月如歌中找你\n'
    }
  ]), [])

  return (
    !isMobile ? (
      <TwistAPlayerWraper
        audio={layoutAudioList}
        appearance='fixed'
        mini
        mutex
      />
    ) : null
  )
}

export default LayoutAplayer