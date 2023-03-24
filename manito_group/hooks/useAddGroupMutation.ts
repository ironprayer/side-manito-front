import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MANITO_GROUP_LIST_QUERY_KEY } from '../constant/query_key';
import { ManitoGroup } from '../model/manito_group';

const useAddGroupMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newGroup: ManitoGroup) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(newGroup);
        }, 1000);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([MANITO_GROUP_LIST_QUERY_KEY]);
    },
  });

  return mutation;
};

export default useAddGroupMutation;
