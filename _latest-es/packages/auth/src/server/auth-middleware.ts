import { Elysia } from "elysia";

import { auth } from ".";

export const AuthMiddleware = new Elysia({ name: "AuthMiddleware" }).macro({
  authorize: {
    async resolve({ request, status }) {
      const authSession = await auth.api.getSession({ headers: request.headers });

      if (!authSession) {
        return status(401, {
          code: "UNAUTHORIZED",
          message: "Authentication is required",
        });
      }

      return {
        user: authSession.user,
        session: authSession.session,
      };
    },
  },
});
