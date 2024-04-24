// theme/themeConfig.ts
import type { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
  token: {
    fontSize: 13,
    colorPrimary: '#000',
    fontFamily: 'Gilroy-Regular',
  },
  components: {
    Button: {
      colorPrimary: '#fff',
      colorPrimaryHover: '#000',
      fontSize: 13,
      fontFamily: 'Gilroy-Bold',
      fontFamilyCode: 'Gilroy-Bold',
    },
    Checkbox: {
      fontFamily: 'Gilroy-Bold',
    },
  },
};

export default theme;
