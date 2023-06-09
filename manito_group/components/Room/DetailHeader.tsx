import { DeserializedManitoGroup, GroupStatus } from '@/manito_group/model';
import { useEffect, useState } from 'react';

const statusColorMap = {
  [GroupStatus.WAITING]: 'text-yellow-500',
  [GroupStatus.ONGOING]: 'text-green-500',
  [GroupStatus.ENDED]: 'text-stone-500',
};

export default function DetailHeader({ groupData }: { groupData: DeserializedManitoGroup }) {
  const [date, setDate] = useState<{ startDate: String; endDate: String }>({
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    setDate({
      startDate: groupData.startDate.toLocaleDateString(),
      endDate: groupData.endDate.toLocaleDateString(),
    });
  }, [groupData]);

  return (
    <div className='flex border-b-2 px-8 py-4 items-center'>
      <div className='flex-1 w-64 flex justify-end font-bold text-lg'>
        모임이름: {groupData.name}
      </div>
      <div className='flex-1 w-32 flex justify-end gap-4'>
        <div className='flex gap-1 font-bold'>
          <label>상태:</label>
          <div className={statusColorMap[groupData.status]}>{groupData.status}</div>
        </div>
        <div className='flex gap-1'>
          <label className='font-bold'>기간:</label>
          <div>
            {date.startDate} ~ {date.endDate}
          </div>
        </div>
      </div>
    </div>
  );
}
