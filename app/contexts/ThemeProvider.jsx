import { ConfigProvider } from "antd";

const themeValues = {
  borderRadius: 5,
  hoverColor: "#28391350",
  Button: {
    staticColor: "#283913",
  },
};

export const AntThemeProvider = ({ children }) => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: themeValues.hoverColor,
        borderRadius: themeValues.borderRadius,
        fontFamily: "M PLUS Rounded 1c",
      },
      components: {
        Button: {
          colorPrimary: themeValues.Button.staticColor,
        },
        Input: {
          componentSize: "large",
        },
        Spin: {
          colorPrimary: "#fd356e",
        },
      },
    }}
  >
    {children}
  </ConfigProvider>
);
