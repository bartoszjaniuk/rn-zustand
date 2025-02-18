import { useQuery } from '@tanstack/react-query';
import { userQueryKeys } from '../user.keys';
import { userService } from '../user.service';

export const useUserInfoQuery = () => {
  return useQuery({
    queryKey: [userQueryKeys.userInfo()],
    staleTime: Infinity,
    queryFn: userService.getUserInfo,
  });
};
