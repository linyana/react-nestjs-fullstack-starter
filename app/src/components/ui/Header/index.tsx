import {
  Flex,
  Typography,
} from 'antd'

const {
  Title,
  Text,
} = Typography

type IPropsType = {
  icon?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
}

export const Header = ({
  icon,
  title,
  description,
  action,
}: IPropsType) => (
  <Flex
    align="center"
    justify="space-between"
    style={{
      margin: '12px 0',
    }}
    wrap="wrap"
  >
    <Flex
      align="center"
      gap="middle"
    >
      <Flex
        justify="center"
        align="center"
      >
        {icon}
      </Flex>
      <Flex
        vertical
      >
        <Title
          level={5}
          style={{
            margin: 0,
          }}
        >
          {title}
        </Title>
        <Text
          type="secondary"
          style={{
            whiteSpace: 'normal',
          }}
        >
          {description}
        </Text>
      </Flex>
    </Flex>
    <div>
      {action}
    </div>
  </Flex>
)
