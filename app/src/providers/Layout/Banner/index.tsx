import { Flex, Typography } from 'antd';
import { LAYOUT } from '@/config';

import logo from '@/assets/logo/logo.svg';

const { Title, Paragraph } = Typography;

type IPropsType = {
  collapsed: boolean;
};

export const Banner = ({ collapsed }: IPropsType) => (
  <Flex
    align="center"
    justify="center"
    style={{
      height: '100%',
      paddingInline: LAYOUT.PADDING,
    }}
  >
    <img
      src={logo}
      alt="logo"
      style={{
        height: collapsed ? `calc(100% - ${LAYOUT.PADDING} - ${LAYOUT.PADDING})` : 48,
        flexShrink: 0,
        transition: 'height 0.2s ease, transform 0.2s ease',
      }}
    />

    <div
      style={{
        maxWidth: collapsed ? 0 : 200,
        overflow: 'hidden',
        transition: 'max-width 0.2s ease',
        marginLeft: collapsed ? 0 : LAYOUT.SMALL_PADDING,
      }}
    >
      <div
        style={{
          margin: 0,
          whiteSpace: 'nowrap',
          opacity: collapsed ? 0 : 1,
          transform: collapsed ? 'translateX(-6px)' : 'translateX(0)',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
          pointerEvents: collapsed ? 'none' : 'auto',
        }}
      >
        <Title
          level={5}
          style={{
            margin: 0,
          }}
        >
          ProjectName
        </Title>
        <Paragraph
          style={{
            marginBottom: 0,
            fontSize: 12,
          }}
        >
          ProjectName
        </Paragraph>
      </div>
    </div>
  </Flex>
);
