import { ConfigProvider } from 'antd';

type IPropsType = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: IPropsType) => (
  <>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#333333',
          controlItemBgActive: '#e0e0e0',
          fontFamily:
            "Inter, 'Noto Sans SC', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        },
        components: {
          Layout: {
            headerBg: 'rgba(255, 255, 255, 0.85)',
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  </>
);
