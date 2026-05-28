"use client";

import { Card, Descriptions, Tag } from "antd";
import { NGU_HANH } from "./constants";

export default function LunarResult({ data, calendarType }) {
  if (!data) return null;

  const isSolarInput = calendarType === "solar";

  console.log(data, "data");

  const items = isSolarInput
    ? [
        { key: "day", label: "Ngày", children: data.vi.day },
        { key: "month", label: "Tháng", children: data.vi.month },
        { key: "year", label: "Năm", children: data.vi.year },
        { key: "ganZhi", label: "Thiên Can Địa Chi", children: data.vi.ganZhi },
        {
          key: "zodiac",
          label: "Cầm tinh",
          children: <Tag color="purple">{data.vi.zodiac}</Tag>,
        },

        ...(data.isLeap
          ? [
              {
                key: "leap",
                label: "Tháng nhuận",
                children: <Tag color="orange">Có</Tag>,
              },
            ]
          : []),
        ...(data.hourName
          ? [{ key: "hour", label: "Giờ", children: data.hourName }]
          : []),
        ...(data.vi.nguHanh
          ? [
              {
                key: "nguHanh",
                label: "Ngũ Hành Nạp Âm",
                children: (
                  <Tag color="purple">{NGU_HANH[data.vi.nguHanh].value}</Tag>
                ),
              },
            ]
          : []),
      ]
    : [
        { key: "day", label: "Ngày", children: data.solarDay },
        { key: "month", label: "Tháng", children: data.solarMonth },
        { key: "year", label: "Năm", children: data.solarYear },
        ...(data.hourName
          ? [{ key: "hour", label: "Giờ", children: data.hourName }]
          : []),
      ];

  return (
    <Card className="w-full max-w-md mt-6 shadow-lg rounded-xl">
      <Descriptions
        title={isSolarInput ? "Kết quả Âm lịch" : "Kết quả Dương lịch"}
        column={1}
        size="middle"
        bordered
      >
        {items.map((item) => (
          <Descriptions.Item key={item.key} label={item.label}>
            {item.children}
          </Descriptions.Item>
        ))}
      </Descriptions>
    </Card>
  );
}
