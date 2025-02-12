import { useMutation } from "@tanstack/react-query";

import { authService } from "../auth.service";
import { authQueryKeys } from "../auth.keys";

export const useRefreshTokenMutation = () => {
	return useMutation({
		mutationKey: [authQueryKeys.refreshToken()],
		mutationFn: authService.refreshToken,
	});
};
