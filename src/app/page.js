'use client';

import { useState } from 'react';
import { Typography } from 'antd';
import DateForm from '@/components/DateForm';
import LunarResult from '@/components/LunarResult';
import { solarToLunar, lunarToSolar } from '@/utils/lunar';

export default function Home() {
  const [result, setResult] = useState(null);
  const [inputType, setInputType] = useState(null);

  function handleDateSubmit({ calendarType, day, month, year, hour, hourName }) {
    try {
      let data;
      if (calendarType === 'solar') {
        data = solarToLunar(year, month, day);
      } else {
        data = lunarToSolar(year, month, day);
      }
      data.hourName = hourName;
      data.hourIndex = hour;
      setResult(data);
      setInputType(calendarType);
    } catch (err) {
      console.error('Conversion error:', err);
      setResult(null);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2] flex flex-col items-center px-4 py-10">
      <Typography.Title level={2} className="!text-white !mb-6 !text-center">
        Xem Tử Vi
      </Typography.Title>
      <DateForm onResult={handleDateSubmit} />
      <LunarResult data={result} calendarType={inputType} />
    </div>
  );
}
