import type { Tone } from "@/types/canto";

export type VocabItem = {
  char: string;
  jyutping: string;
  tone_number: Tone;
  mandarin_meaning: string;
};

type SeedItem = [char: string, jyutping: string, tone_number: Tone, mandarin_meaning: string];

export const TONES: Tone[] = [1, 2, 3, 4, 5, 6];

// Batch 1-2: curated daily core (verbs, nouns, adjectives).
const BATCH_1: SeedItem[] = [
  ["我", "ngo5", 5, "我"], ["你", "nei5", 5, "你"], ["佢", "keoi5", 5, "他/她"], ["您", "nei5", 5, "您"],
  ["呢", "ni1", 1, "这"], ["嗰", "go2", 2, "那"], ["係", "hai6", 6, "是"], ["有", "jau5", 5, "有"],
  ["冇", "mou5", 5, "没有"], ["唔", "m4", 4, "不"], ["去", "heoi3", 3, "去"], ["嚟", "lai4", 4, "来"],
  ["返", "faan1", 1, "回"], ["出", "ceot1", 1, "出"], ["入", "jap6", 6, "进"], ["食", "sik6", 6, "吃"],
  ["飲", "jam2", 2, "喝"], ["睇", "tai2", 2, "看"], ["聽", "teng1", 1, "听"], ["講", "gong2", 2, "说"],
  ["做", "zou6", 6, "做"], ["學", "hok6", 6, "学"], ["教", "gaau3", 3, "教"], ["寫", "se2", 2, "写"],
  ["讀", "duk6", 6, "读"], ["開", "hoi1", 1, "开"], ["關", "gwaan1", 1, "关"], ["買", "maai5", 5, "买"],
  ["賣", "maai6", 6, "卖"], ["畀", "bei2", 2, "给"], ["收", "sau1", 1, "收"], ["送", "sung3", 3, "送"],
  ["要", "jiu3", 3, "要"], ["想", "soeng2", 2, "想"], ["知", "zi1", 1, "知道"], ["識", "sik1", 1, "认识"],
  ["會", "wui5", 5, "会"], ["得", "dak1", 1, "可以/得"], ["可", "ho2", 2, "可"], ["應", "jing1", 1, "应该"],
  ["使", "si2", 2, "使"], ["用", "jung6", 6, "用"], ["試", "si3", 3, "试"], ["幫", "bong1", 1, "帮"],
  ["等", "dang2", 2, "等"], ["搵", "wan2", 2, "找"], ["問", "man6", 6, "问"], ["答", "daap3", 3, "答"],
  ["愛", "oi3", 3, "爱"], ["喜", "hei2", 2, "喜"], ["歡", "fun1", 1, "欢"], ["怕", "paa3", 3, "怕"],
  ["笑", "siu3", 3, "笑"], ["喊", "haam3", 3, "哭"], ["行", "haang4", 4, "走"], ["跑", "paau2", 2, "跑"],
  ["坐", "co5", 5, "坐"], ["企", "kei5", 5, "站"], ["瞓", "fan3", 3, "睡"], ["醒", "sing2", 2, "醒"],
  ["沖", "cung1", 1, "冲"], ["洗", "sai2", 2, "洗"], ["着", "zoek3", 3, "穿"], ["除", "ceoi4", 4, "脱"],
  ["拎", "ling1", 1, "拿"], ["放", "fong3", 3, "放"], ["搬", "bun1", 1, "搬"], ["整", "zing2", 2, "弄"],
  ["修", "sau1", 1, "修"], ["借", "ze3", 3, "借"], ["還", "waan4", 4, "还"], ["拖", "to1", 1, "拖"],
  ["推", "teoi1", 1, "推"], ["拉", "laai1", 1, "拉"], ["轉", "zyun2", 2, "转"], ["停", "ting4", 4, "停"],
  ["起", "hei2", 2, "起"], ["落", "lok6", 6, "落"], ["過", "gwo3", 3, "过"], ["住", "zyu6", 6, "住"],
  ["先", "sin1", 1, "先"], ["再", "zoi3", 3, "再"], ["已", "ji5", 5, "已"], ["仲", "zung6", 6, "还"],
  ["就", "zau6", 6, "就"], ["都", "dou1", 1, "都"], ["又", "jau6", 6, "又"], ["同", "tung4", 4, "同"],
  ["跟", "gan1", 1, "跟"], ["同", "tung4", 4, "和"], ["比", "bei2", 2, "比"], ["對", "deoi3", 3, "对"],
  ["向", "hoeng3", 3, "向"], ["喺", "hai2", 2, "在"], ["由", "jau4", 4, "由"], ["為", "wai6", 6, "为"],
  ["把", "baa2", 2, "把"], ["將", "zoeng1", 1, "将"], ["被", "bei6", 6, "被"], ["畀", "bei2", 2, "被/给"],
];

const BATCH_2: SeedItem[] = [
  ["人", "jan4", 4, "人"], ["男", "naam4", 4, "男"], ["女", "neoi5", 5, "女"], ["仔", "zai2", 2, "儿子"],
  ["囡", "naam4", 4, "女儿"], ["爸", "baa1", 1, "爸"], ["媽", "maa1", 1, "妈"], ["哥", "go1", 1, "哥"],
  ["姐", "ze2", 2, "姐"], ["弟", "dai6", 6, "弟"], ["妹", "mui6", 6, "妹"], ["友", "jau5", 5, "朋友"],
  ["師", "si1", 1, "老师"], ["生", "saang1", 1, "学生"], ["工", "gung1", 1, "工"], ["醫", "ji1", 1, "医"],
  ["護", "wu6", 6, "护"], ["警", "ging2", 2, "警"], ["司", "si1", 1, "司"], ["機", "gei1", 1, "机"],
  ["家", "gaa1", 1, "家"], ["屋", "uk1", 1, "屋"], ["房", "fong4", 4, "房"], ["門", "mun4", 4, "门"],
  ["窗", "coeng1", 1, "窗"], ["床", "cong4", 4, "床"], ["枱", "toi2", 2, "桌"], ["櫈", "dang3", 3, "凳"],
  ["椅", "ji2", 2, "椅"], ["燈", "dang1", 1, "灯"], ["電", "din6", 6, "电"], ["水", "seoi2", 2, "水"],
  ["火", "fo2", 2, "火"], ["風", "fung1", 1, "风"], ["雨", "jyu5", 5, "雨"], ["雪", "syut3", 3, "雪"],
  ["雲", "wan4", 4, "云"], ["天", "tin1", 1, "天"], ["地", "dei6", 6, "地"], ["海", "hoi2", 2, "海"],
  ["山", "saan1", 1, "山"], ["河", "ho4", 4, "河"], ["路", "lou6", 6, "路"], ["橋", "kiu4", 4, "桥"],
  ["街", "gaai1", 1, "街"], ["巷", "hong6", 6, "巷"], ["車", "ce1", 1, "车"], ["船", "syun4", 4, "船"],
  ["機", "gei1", 1, "飞机"], ["站", "zaam6", 6, "站"], ["店", "dim3", 3, "店"], ["市", "si5", 5, "市"],
  ["場", "coeng4", 4, "场"], ["廠", "cong2", 2, "厂"], ["校", "haau6", 6, "校"], ["院", "jyun2", 2, "院"],
  ["館", "gun2", 2, "馆"], ["書", "syu1", 1, "书"], ["字", "zi6", 6, "字"], ["紙", "zi2", 2, "纸"],
  ["筆", "bat1", 1, "笔"], ["包", "baau1", 1, "包"], ["袋", "doi6", 6, "袋"], ["衫", "saam1", 1, "衣服"],
  ["褲", "fu3", 3, "裤"], ["鞋", "haai4", 4, "鞋"], ["襪", "mat6", 6, "袜"], ["帽", "mou6", 6, "帽"],
  ["錢", "cin4", 4, "钱"], ["卡", "kaa1", 1, "卡"], ["票", "piu3", 3, "票"], ["證", "zing3", 3, "证"],
  ["號", "hou6", 6, "号"], ["碼", "maa5", 5, "码"], ["名", "ming4", 4, "名"], ["姓", "sing3", 3, "姓"],
  ["日", "jat6", 6, "日"], ["月", "jyut6", 6, "月"], ["年", "nin4", 4, "年"], ["時", "si4", 4, "时"],
  ["分", "fan1", 1, "分"], ["秒", "miu5", 5, "秒"], ["今", "gam1", 1, "今"], ["明", "ming4", 4, "明"],
  ["昨", "zok3", 3, "昨"], ["早", "zou2", 2, "早"], ["晏", "aan3", 3, "晚"], ["夜", "je6", 6, "夜"],
  ["春", "ceon1", 1, "春"], ["夏", "haa6", 6, "夏"], ["秋", "cau1", 1, "秋"], ["冬", "dung1", 1, "冬"],
  ["東", "dung1", 1, "东"], ["西", "sai1", 1, "西"], ["南", "naam4", 4, "南"], ["北", "bak1", 1, "北"],
  ["前", "cin4", 4, "前"], ["後", "hau6", 6, "后"], ["左", "zo2", 2, "左"], ["右", "jau6", 6, "右"],
];

const ALL_BATCHES = [BATCH_1, BATCH_2];

export const VOCAB: VocabItem[] = ALL_BATCHES.flatMap((batch) =>
  batch.map(([char, jyutping, tone_number, mandarin_meaning]) => ({
    char,
    jyutping,
    tone_number,
    mandarin_meaning,
  })),
).filter((item, index, arr) => arr.findIndex((it) => it.char === item.char) === index);

export const DEMO_BY_TONE: Record<Tone, VocabItem> = {
  1: { char: "詩", jyutping: "si1", tone_number: 1, mandarin_meaning: "诗" },
  2: { char: "史", jyutping: "si2", tone_number: 2, mandarin_meaning: "史" },
  3: { char: "試", jyutping: "si3", tone_number: 3, mandarin_meaning: "试" },
  4: { char: "時", jyutping: "si4", tone_number: 4, mandarin_meaning: "时" },
  5: { char: "市", jyutping: "si5", tone_number: 5, mandarin_meaning: "市" },
  6: { char: "是", jyutping: "si6", tone_number: 6, mandarin_meaning: "是" },
};

if (process.env.NODE_ENV !== "production") {
  for (const word of VOCAB) {
    const parsedTone = Number(word.jyutping.slice(-1));
    if (parsedTone !== word.tone_number) {
      throw new Error(`Tone mismatch for ${word.char}: ${word.jyutping} vs tone ${word.tone_number}`);
    }
  }
}
