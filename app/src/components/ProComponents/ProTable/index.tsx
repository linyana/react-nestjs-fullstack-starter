import type { IPaginationType } from '@projectname/shared';
import { Table, Typography, type TableProps } from 'antd';

type IPropsType<T> = TableProps<T> & {
  selectedProps?: {
    length?: number;
  };
  setFilter: React.Dispatch<React.SetStateAction<any>>;
  pagination: IPaginationType;
};

const { Paragraph } = Typography;

export const PaginationTable = <T extends object>({
  setFilter,
  pagination,
  selectedProps,
  ...props
}: IPropsType<T>) => {
  const { totalCount, offset, limit } = pagination;
  const start = totalCount === 0 ? 0 : offset + 1;
  const end = Math.min(offset + limit, totalCount);

  return (
    <>
      {selectedProps?.length ? (
        <Paragraph
          style={{
            marginTop: 8,
            marginBottom: 0,
          }}
        >
          {`${selectedProps?.length} item${selectedProps?.length === 1 ? '' : 's'} selected`}
        </Paragraph>
      ) : (
        <></>
      )}
      <Table<T>
        onChange={({ current = 1, pageSize = 10 }, _filter, sorter: any) => {
          const orderMap: Record<string, 'asc' | 'desc' | undefined> = {
            ascend: 'asc',
            descend: 'desc',
          };
          setFilter((prev: any) => ({
            ...prev,
            sort_by: sorter.field,
            order_by: orderMap[sorter?.order as string],
            offset: (current - 1) * pageSize,
            limit: pageSize,
          }));
        }}
        rowKey="id"
        scroll={{
          x: true,
        }}
        {...props}
        pagination={{
          total: totalCount,
          pageSize: limit,
          current: Math.floor(offset / limit) + 1,
          showSizeChanger: true,
          showTotal: () => `Showing ${start} - ${end} from ${totalCount} items`,
          showQuickJumper: true,
        }}
      />
    </>
  );
};
