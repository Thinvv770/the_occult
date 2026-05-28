# Tử Vi - Lịch Âm Dương Converter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Initialize Next.js project with a form for date input and solar-to-lunar calendar conversion using `lunar-javascript`.

**Architecture:** Single-page Next.js App Router application. Client-side conversion using `lunar-javascript` library. Form component handles input, utility module wraps conversion logic, result component displays output.

**Tech Stack:** Next.js 14+, JavaScript, `lunar-javascript`

---

### Task 1: Initialize Next.js project

**Files:**
- Create: Full project scaffold via `create-next-app`

- [ ] **Step 1: Create Next.js project**

Run from workspace root:

```bash
npx create-next-app@latest the-occult --js --app --no-tailwind --no-src-dir --import-alias "@/*" --use-npm
```

Expected: Next.js project created with App Router, JavaScript, no Tailwind (we'll use plain CSS).

- [ ] **Step 2: Install lunar-javascript dependency**

```bash
npm install lunar-javascript
```

Expected: `lunar-javascript` added to `package.json` dependencies.

- [ ] **Step 3: Verify project runs**

```bash
npm run dev
```

Expected: Next.js dev server starts on localhost:3000, shows default Next.js page.

- [ ] **Step 4: Create src directory structure**

Move app files into `src/` folder:

```bash
mkdir src
mv app src/app
mv public src/public
```

Update `jsconfig.json` paths if needed.

---

### Task 2: Create utility module for calendar conversion

**Files:**
- Create: `src/utils/lunar.js`

- [ ] **Step 1: Create lunar utility module**

```javascript
// src/utils/lunar.js
import { Solar, Lunar } from 'lunar-javascript';

export function solarToLunar(year, month, day) {
  const solar = Solar.fromYmd(year, month, day);
  const lunar = solar.getLunar();
  return {
    lunarYear: lunar.getYear(),
    lunarMonth: lunar.getMonth(),
    lunarDay: lunar.getDay(),
    isLeap: lunar.isLeap(),
    yearInChinese: lunar.getYearInChinese(),
    monthInChinese: lunar.getMonthInChinese(),
    dayInChinese: lunar.getDayInChinese(),
    ganZhiYear: lunar.getYearInGanZhi(),
    ganZhiMonth: lunar.getMonthInGanZhi(),
    ganZhiDay: lunar.getDayInGanZhi(),
    zodiac: lunar.getYearShengXiao(),
    fullString: lunar.toFullString(),
  };
}

export function lunarToSolar(year, month, day, isLeap = false) {
  const lunar = Lunar.fromYmd(year, month, day);
  if (isLeap) {
    lunar.setLeap(true);
  }
  const solar = lunar.getSolar();
  return {
    solarYear: solar.getYear(),
    solarMonth: solar.getMonth(),
    solarDay: solar.getDay(),
    fullString: solar.toFullString(),
  };
}
```

---

### Task 3: Build DateForm component

**Files:**
- Create: `src/components/DateForm.js`
- Create: `src/components/DateForm.module.css`

- [ ] **Step 1: Create DateForm component**

```javascript
// src/components/DateForm.js
'use client';

import { useState } from 'react';
import styles from './DateForm.module.css';

export default function DateForm({ onResult }) {
  const [calendarType, setCalendarType] = useState('solar');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);

    if (!d || !m || !y || d < 1 || m < 1 || m > 12) {
      setError('Vui lòng nhập ngày/tháng/năm hợp lệ');
      return;
    }

    onResult({ calendarType, day: d, month: m, year: y });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.radioGroup}>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="calendarType"
            value="solar"
            checked={calendarType === 'solar'}
            onChange={() => setCalendarType('solar')}
          />
          Dương lịch
        </label>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="calendarType"
            value="lunar"
            checked={calendarType === 'lunar'}
            onChange={() => setCalendarType('lunar')}
          />
          Âm lịch
        </label>
      </div>

      <div className={styles.inputGroup}>
        <div className={styles.inputField}>
          <label>Ngày</label>
          <input
            type="number"
            min="1"
            max="31"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            placeholder="1"
          />
        </div>
        <div className={styles.inputField}>
          <label>Tháng</label>
          <input
            type="number"
            min="1"
            max="12"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            placeholder="1"
          />
        </div>
        <div className={styles.inputField}>
          <label>Năm</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="1990"
          />
        </div>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <button type="submit" className={styles.submitBtn}>
        Xem kết quả
      </button>
    </form>
  );
}
```

- [ ] **Step 2: Create CSS module**

```css
/* src/components/DateForm.module.css */
.form {
  max-width: 400px;
  margin: 0 auto;
  padding: 24px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.radioGroup {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  justify-content: center;
}

.radioLabel {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 15px;
}

.inputGroup {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.inputField {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.inputField label {
  font-size: 13px;
  color: #666;
}

.inputField input {
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  text-align: center;
  outline: none;
  transition: border-color 0.2s;
}

.inputField input:focus {
  border-color: #6c63ff;
}

.error {
  color: #e74c3c;
  font-size: 14px;
  text-align: center;
  margin-bottom: 12px;
}

.submitBtn {
  width: 100%;
  padding: 12px;
  background: #6c63ff;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}

.submitBtn:hover {
  background: #5a52d5;
}
```

---

### Task 4: Build LunarResult component

**Files:**
- Create: `src/components/LunarResult.js`
- Create: `src/components/LunarResult.module.css`

- [ ] **Step 1: Create LunarResult component**

```javascript
// src/components/LunarResult.js
'use client';

import styles from './LunarResult.module.css';

export default function LunarResult({ data, calendarType }) {
  if (!data) return null;

  const isSolarInput = calendarType === 'solar';

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>
        {isSolarInput ? 'Kết quả Âm lịch' : 'Kết quả Dương lịch'}
      </h2>

      <div className={styles.infoGrid}>
        {isSolarInput ? (
          <>
            <InfoItem label="Ngày" value={data.dayInChinese} />
            <InfoItem label="Tháng" value={data.monthInChinese} />
            <InfoItem label="Năm" value={data.yearInChinese} />
            <InfoItem label="Thiên Can Địa Chi" value={`${data.ganZhiYear} - ${data.ganZhiMonth} - ${data.ganZhiDay}`} />
            <InfoItem label="Cầm tinh" value={data.zodiac} />
            {data.isLeap && <InfoItem label="Tháng nhuận" value="Có" />}
          </>
        ) : (
          <>
            <InfoItem label="Ngày" value={`${data.solarDay}`} />
            <InfoItem label="Tháng" value={`${data.solarMonth}`} />
            <InfoItem label="Năm" value={`${data.solarYear}`} />
          </>
        )}
      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className={styles.infoItem}>
      <span className={styles.label}>{label}:</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
}
```

- [ ] **Step 2: Create CSS module**

```css
/* src/components/LunarResult.module.css */
.card {
  max-width: 400px;
  margin: 24px auto 0;
  padding: 24px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.title {
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #333;
}

.infoGrid {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.infoItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.infoItem:last-child {
  border-bottom: none;
}

.label {
  font-size: 14px;
  color: #888;
}

.value {
  font-size: 15px;
  color: #333;
  font-weight: 500;
}
```

---

### Task 5: Wire up main page

**Files:**
- Modify: `src/app/page.js`
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.js`

- [ ] **Step 1: Update globals.css**

```css
/* src/app/globals.css */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 40px 16px;
}
```

- [ ] **Step 2: Update layout.js**

```javascript
// src/app/layout.js
import './globals.css';

export const metadata = {
  title: 'Tử Vi - Lịch Âm Dương',
  description: 'Chuyển đổi ngày dương lịch sang âm lịch và ngược lại',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Update page.js**

```javascript
// src/app/page.js
'use client';

import { useState } from 'react';
import DateForm from '@/components/DateForm';
import LunarResult from '@/components/LunarResult';
import { solarToLunar, lunarToSolar } from '@/utils/lunar';

export default function Home() {
  const [result, setResult] = useState(null);
  const [inputType, setInputType] = useState(null);

  function handleDateSubmit({ calendarType, day, month, year }) {
    try {
      let data;
      if (calendarType === 'solar') {
        data = solarToLunar(year, month, day);
      } else {
        data = lunarToSolar(year, month, day);
      }
      setResult(data);
      setInputType(calendarType);
    } catch (err) {
      console.error('Conversion error:', err);
      setResult(null);
    }
  }

  return (
    <main style={{ width: '100%', maxWidth: 500 }}>
      <h1 style={{
        textAlign: 'center',
        color: '#fff',
        fontSize: 28,
        marginBottom: 24,
        fontWeight: 700,
      }}>
        Xem Tử Vi
      </h1>
      <DateForm onResult={handleDateSubmit} />
      <LunarResult data={result} calendarType={inputType} />
    </main>
  );
}
```

---

### Task 6: Verify project runs

- [ ] **Step 1: Start dev server and verify**

```bash
npm run dev
```

Expected: Server starts on localhost:3000. Open in browser, form renders, entering a solar date (e.g., 29/5/1986) shows lunar result.

- [ ] **Step 2: Test conversion**

Input: Dương lịch, Ngày=29, Tháng=5, Năm=1986
Expected: Âm lịch result shows "廿一" (ngày 21), "四月" (tháng 4), "一九八六年" (năm 1986), "丙寅" (year Can Chi), hổ (zodiac).

Input: Âm lịch, Ngày=21, Tháng=4, Năm=1986
Expected: Dương lịch result shows 29/5/1986.
