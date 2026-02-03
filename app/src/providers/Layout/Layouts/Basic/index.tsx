import { Flex, Layout, theme } from 'antd';
import { LAYOUT } from '@/config';
import { Footer } from '../../Footer';
import { useMobile } from '@/hooks';
import banner from '@/assets/banner/banner.svg';

type IPropsType = {
  children: React.ReactNode;
};

const { useToken } = theme;

export const BasicLayout = ({ children }: IPropsType) => {
  const mobile = useMobile();
  const { token } = useToken();

  return (
    <Layout style={{ height: '100vh' }}>
      <Flex
        vertical={mobile}
        style={{
          height: '100%',
          padding: mobile ? LAYOUT.PADDING : 0,
        }}
      >
        {!mobile && (
          <Flex
            justify="center"
            align="center"
            style={{
              width: '50%',
              backgroundColor: token.colorPrimary,
            }}
          >
            <div style={{ width: '50%' }}>
              <img style={{ width: '100%' }} src={banner} alt="Login Banner" />
            </div>
          </Flex>
        )}

        <Flex
          vertical
          style={{
            width: mobile ? '100%' : '50%',
            height: '100%',
          }}
        >
          <Layout.Content
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: mobile ? LAYOUT.PADDING : 0,
            }}
          >
            {children}
          </Layout.Content>

          <Layout.Footer
            style={{
              padding: LAYOUT.PADDING,
              backgroundColor: 'transparent',
            }}
          >
            <Footer />
          </Layout.Footer>
        </Flex>
      </Flex>
    </Layout>
  );
};
