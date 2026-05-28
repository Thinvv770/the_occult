import { ConfigProvider } from 'antd';
import './globals.css';

export const metadata = {
  title: 'Tử Vi - Lịch Âm Dương',
  description: 'Chuyển đổi ngày dương lịch sang âm lịch và ngược lại',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#6c63ff',
              borderRadius: 8,
            },
          }}
        >
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
