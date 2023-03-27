import { getAccessTokenAnyway } from '@/auth/lib/jwt';
import { GroupStatus, ManitoGroup } from '@/manito_group/model';

export const fetchGroupList = async (status: GroupStatus, accessToken?: any) => {
  const at = accessToken ?? (await getAccessTokenAnyway());

  const groups = await createDummyGroups();
  return groups;
};

const createDummyGroups = async () => {
  console.log(`called createDummyGroups`);
  return new Promise<ManitoGroup[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: 'group01',
          startDate: new Date(),
          endDate: new Date(),
          maxMemberCount: 5,
          status: GroupStatus.ENDED,
        },
        {
          id: 2,
          name: 'group02',
          startDate: new Date(),
          endDate: new Date(),
          maxMemberCount: 5,
          status: GroupStatus.ONGOING,
        },
      ]);
    }, 500);
  }).then((data) => {
    return data;
  });
};
