import { Layout } from 'antd';
import { LAYOUT } from '@/config';
import { Footer } from '../../Footer';

type IPropsType = {
  children: React.ReactNode;
};

export const CenteredLayout = ({ children }: IPropsType) => (
  <Layout
    style={{
      minHeight: '100vh',
    }}
  >
    <Layout.Content
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}
    >
      {children}
    </Layout.Content>
    <Layout.Footer
      style={{
        padding: LAYOUT.PADDING,
        backgroundColor: '#fff',
      }}
    >
      <Footer />
    </Layout.Footer>
  </Layout>
);
