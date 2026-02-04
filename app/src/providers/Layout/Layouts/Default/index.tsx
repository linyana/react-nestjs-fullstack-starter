import { Flex, Layout, theme } from 'antd';
import { useEffect } from 'react';
import { LAYOUT } from '@/config';
import type { IRouteType } from '@/types';
import { Banner } from '../../Banner';
import { LayoutBottomMenu, LayoutMenu } from '../../Menu';
import { Header } from '../../Header';
import { Footer } from '../../Footer';
import { useGlobal, useMobile } from '@/hooks';
import { UserProfile } from './Profile';

type IPropsType = {
  children: React.ReactNode;
  routes: IRouteType[];
};

export const DefaultLayout = ({ routes, children }: IPropsType) => {
  const isMobile = useMobile();
  const {
    token: { colorBorderSecondary },
  } = theme.useToken();
  const { collapsed, actions } = useGlobal();

  const border = `1px solid ${colorBorderSecondary}`;
  useEffect(() => {
    actions.set({
      collapsed: isMobile,
    });
  }, [isMobile]);

  return (
    <Layout>
      <Layout.Sider
        collapsed={collapsed}
        width={LAYOUT.SIDER_WIDTH}
        style={{
          height: '100vh',
          position: 'sticky',
          top: 0,
          insetInlineStart: 0,
          borderRight: border,
          overflow: 'hidden',
          zIndex: 1000,
        }}
        theme="light"
      >
        <Flex
          vertical
          style={{
            height: '100%',
          }}
        >
          <div
            style={{
              height: LAYOUT.HEADER_HEIGHT,
              borderBottom: border,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Banner />
          </div>
          <div
            style={{
              flex: 1,
              overflow: 'auto',
              scrollbarWidth: 'thin',
            }}
          >
            <LayoutMenu routes={routes} />
          </div>
          <LayoutBottomMenu routes={routes} />
          <UserProfile />
        </Flex>
      </Layout.Sider>

      <Layout
        style={{
          minWidth: 0,
        }}
      >
        <Layout.Header
          style={{
            padding: 0,
            position: 'fixed',
            top: 0,
            right: 0,
            width: `calc(100% - ${collapsed ? '80px' : LAYOUT.SIDER_WIDTH})`,
            transition: 'width 0.2s ease',
            zIndex: 1000,
            height: LAYOUT.HEADER_HEIGHT,
            borderBottom: border,
            backdropFilter: 'blur(6px)',
          }}
        >
          <Flex
            style={{
              height: '100%',
              padding: `${LAYOUT.SMALL_PADDING} ${LAYOUT.PADDING}`,
              boxSizing: 'border-box',
            }}
            align="center"
          >
            <Header />
          </Flex>
        </Layout.Header>

        <Layout
          style={{
            minWidth: 0,
            marginTop: LAYOUT.HEADER_HEIGHT,
            overflowX: 'auto',
          }}
        >
          <Layout.Content
            style={{
              margin: `${LAYOUT.PADDING} ${LAYOUT.PADDING} 0`,
            }}
          >
            <div
              style={{
                minWidth: 300,
              }}
            >
              {children}
            </div>
          </Layout.Content>

          <Layout.Footer
            style={{
              padding: LAYOUT.PADDING,
            }}
          >
            <Footer />
          </Layout.Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};
