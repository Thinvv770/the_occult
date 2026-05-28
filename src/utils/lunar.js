import { Solar, Lunar } from "lunar-javascript";
import {
  translateYear,
  translateMonth,
  translateDay,
  translateGanZhi,
  translateZodiac,
  tinhNguHanhNapAm,
} from "./vietnamese";

export function solarToLunar(year, month, day) {
  const solar = Solar.fromYmd(year, month, day);
  const lunar = solar.getLunar();
  const lunarMonth = lunar.getMonth();
  const isLeap = lunarMonth < 0;
  return {
    lunarYear: lunar.getYear(),
    lunarMonth: Math.abs(lunarMonth),
    lunarDay: lunar.getDay(),
    isLeap,
    yearInChinese: lunar.getYearInChinese(),
    monthInChinese: lunar.getMonthInChinese(),
    dayInChinese: lunar.getDayInChinese(),
    ganZhiYear: lunar.getYearInGanZhi(),
    ganZhiMonth: lunar.getMonthInGanZhi(),
    ganZhiDay: lunar.getDayInGanZhi(),
    zodiac: lunar.getYearShengXiao(),
    fullString: lunar.toFullString(),
    vi: {
      year: translateYear(lunar.getYearInChinese()),
      month: translateMonth(lunar.getMonthInChinese(), isLeap),
      day: translateDay(lunar.getDayInChinese()),
      ganZhi: `${translateGanZhi(lunar.getYearInGanZhi())} - ${translateGanZhi(lunar.getMonthInGanZhi())} - ${translateGanZhi(lunar.getDayInGanZhi())}`,
      ganZhiYear: translateGanZhi(lunar.getYearInGanZhi()),
      ganZhiMonth: translateGanZhi(lunar.getMonthInGanZhi()),
      ganZhiDay: translateGanZhi(lunar.getDayInGanZhi()),
      zodiac: translateZodiac(lunar.getYearShengXiao()),
      nguHanh: tinhNguHanhNapAm(lunar.getYearInGanZhi()),
    },
  };
}

export function lunarToSolar(year, month, day) {
  const lunar = Lunar.fromYmd(year, month, day);
  const solar = lunar.getSolar();
  return {
    solarYear: solar.getYear(),
    solarMonth: solar.getMonth(),
    solarDay: solar.getDay(),
    fullString: solar.toFullString(),
  };
}
