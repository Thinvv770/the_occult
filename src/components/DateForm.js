'use client';

import { useState } from 'react';
import { Card, Radio, InputNumber, Select, Button, Typography } from 'antd';
import { HOUR_NAMES, HOURS } from './constants';

export default function DateForm({ onResult }) {
  const [calendarType, setCalendarType] = useState('solar');
  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [hour, setHour] = useState('');
  const [error, setError] = useState('');

  function handleSubmit() {
    setError('');

    if (!day || !month || !year || day < 1 || month < 1 || month > 12) {
      setError('Vui lòng nhập ngày/tháng/năm hợp lệ');
      return;
    }
    
    if (!hour) {
      setError('Vui lòng chọn giờ sinh');
      return;
    }

    onResult({
      calendarType,
      day,
      month,
      year,
      hour: hour !== '' ? parseInt(hour, 10) : null,
      hourName: hour !== '' ? HOUR_NAMES[parseInt(hour, 10)] : null,
    });
  }

  return (
    <Card className="w-full max-w-md shadow-lg rounded-xl">
      <div className="flex flex-col gap-4">
        <Radio.Group
          value={calendarType}
          onChange={(e) => setCalendarType(e.target.value)}
          className="flex justify-center"
          optionType="button"
          buttonStyle="solid"
          size="large"
        >
          <Radio.Button value="solar">Dương lịch</Radio.Button>
          <Radio.Button value="lunar">Âm lịch</Radio.Button>
        </Radio.Group>

        <div className="flex gap-3">
          <div className="flex-1">
            <Typography.Text type="secondary" className="!text-xs block mb-1">Ngày</Typography.Text>
            <InputNumber
              min={1}
              max={31}
              value={day}
              onChange={setDay}
              placeholder="Nhập ngày sinh"
              className="!w-full"
              size="large"
            />
          </div>
          <div className="flex-1">
            <Typography.Text type="secondary" className="!text-xs block mb-1">Tháng</Typography.Text>
            <InputNumber
              min={1}
              max={12}
              value={month}
              onChange={setMonth}
              placeholder="Nhập tháng sinh"
              className="!w-full"
              size="large"
            />
          </div>
          <div className="flex-1">
            <Typography.Text type="secondary" className="!text-xs block mb-1">Năm</Typography.Text>
            <InputNumber
              value={year}
              onChange={setYear}
              placeholder="Nhập năm sinh"
              className="!w-full"
              size="large"
            />
          </div>
        </div>

        <div>
          <Typography.Text type="secondary" className="!text-xs block mb-1">Giờ sinh</Typography.Text>
          <Select
            value={hour}
            onChange={setHour}
            className="!w-full"
            size="large"
            placeholder="-- Chọn giờ --"
          >
            {HOURS.map((h) => (
              <Select.Option key={h.value} value={h.value}>{h.label}</Select.Option>
            ))}
          </Select>
        </div>

        {error && (
          <Typography.Text type="danger" className="!text-center">{error}</Typography.Text>
        )}

        <Button type="primary" size="large" onClick={handleSubmit} block>
          Xem kết quả
        </Button>
      </div>
    </Card>
  );
}
