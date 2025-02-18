import { useMutation } from '@tanstack/react-query';

import { authService } from '../auth.service';
import { authQueryKeys } from '../auth.keys';
import { AxiosError } from 'axios';
import { ApiError403 } from '../../types/api';

export const useLoginMutation = (
  onSuccess: (data: { accessToken: string; refreshToken: string }) => void,
) => {
  return useMutation<
    any,
    AxiosError<ApiError403>,
    { email: string; password: string },
    any
  >({
    mutationKey: [authQueryKeys.login()],
    mutationFn: authService.login,
    onSuccess,
  });
};
