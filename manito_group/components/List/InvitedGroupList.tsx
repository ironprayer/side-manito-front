import useManitoGroupListQuery from '@/manito_group/hooks/useManitoGroupListQuery';
import { GroupStatus } from '@/manito_group/model';

const InvitedGroupList = ({ active }: { active: boolean }) => {
  const { data, isLoading, isFetching } = useManitoGroupListQuery(GroupStatus.INVITED);
  return (
    <section className='pl-10' style={{ display: active ? 'block' : 'none' }}>
      <h2 className='text-xl font-semibold'>초대받은 마니또 그룹 목록</h2>
      <ul>
        {(isLoading || isFetching) && <li>loading...</li>}
        {data?.map((g) => (
          <li key={g.id}>{g.name}</li>
        ))}
      </ul>
    </section>
  );
};

export default InvitedGroupList;
