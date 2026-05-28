import { CAN, CHI, NUM_CN, NUM_VI, ZODIAC } from "@/components/constants";

function digitsToNumber(text) {
  let num = 0;
  for (const ch of text) {
    const d = NUM_CN[ch];
    if (d === undefined) return NaN;
    num = num * 10 + d;
  }
  return num;
}

function compoundToNumber(text) {
  let num = 0;
  let i = 0;
  while (i < text.length) {
    const ch = text[i];
    if (ch === "初") {
      i++;
      continue;
    }
    if (ch === "十") {
      num = num === 0 ? 10 : num * 10;
      i++;
      continue;
    }
    if (ch === "廿") {
      num = 20;
      i++;
      continue;
    }
    if (ch === "卅") {
      num = 30;
      i++;
      continue;
    }
    const d = NUM_CN[ch];
    if (d === undefined) {
      i++;
      continue;
    }
    num += d;
    i++;
  }
  return num;
}

function dayToVietnamese(number) {
  if (number === 1) return "Mùng 1";
  if (number >= 2 && number <= 9) return `Mùng ${NUM_VI[number].toLowerCase()}`;
  if (number === 10) return "Mùng mười";
  if (number >= 11 && number <= 19) {
    const u = NUM_VI[number - 10].toLowerCase();
    return `Ngày mười ${u === "một" ? "mốt" : u === "năm" ? "lăm" : u}`;
  }
  if (number === 20) return "Ngày hai mươi";
  if (number === 21) return "Ngày hai mươi mốt";
  if (number >= 22 && number <= 29) {
    const u = number % 10;
    const t = Math.floor(number / 10);
    const units =
      u === 1 ? "mốt" : u === 5 ? "lăm" : NUM_VI[u]?.toLowerCase() || "";
    return `Ngày ${NUM_VI[t].toLowerCase()} mươi ${units}`;
  }
  return `Ngày ${number}`;
}

export function translateGanZhi(text) {
  return [...text]
    .map((ch) => CAN[ch]?.label || CHI[ch]?.label || ch)
    .join(" ");
}

export function tinhNguHanhNapAm(text) {
  let can = 0;
  let chi = 0;
  [...text].forEach((ch) => {
    if (CAN[ch]) can = CAN[ch]?.value;
    if (CHI[ch]) chi = CHI[ch]?.value;
  });

  const result = (can + chi) % 5;

  return result === 0 ? 5 : result;
}

export function translateZodiac(chinese) {
  return ZODIAC[chinese] || chinese;
}

export function translateYear(chinese) {
  const num = digitsToNumber(chinese);
  return Number.isNaN(num) ? chinese : `Năm ${num}`;
}

export function translateMonth(chinese, isLeap) {
  const prefix = isLeap ? "Tháng nhuận " : "Tháng ";
  let text = chinese;
  if (text.startsWith("闰")) text = text.slice(1);
  if (text === "正") return `${prefix}Giêng`;
  const num = compoundToNumber(text);
  return num ? `${prefix}${num}` : prefix + text;
}

export function translateDay(chinese) {
  const num = compoundToNumber(chinese);
  return num ? dayToVietnamese(num) : chinese;
}
