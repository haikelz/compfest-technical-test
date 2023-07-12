import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  client: {
    VITE_MOVIES_API: z.string().url().min(1),
    VITE_PASSWORD_ACCOUNT: z.string().min(1),
    VITE_COOKIES_VALUE: z.string().min(1),
    VITE_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  },
  clientPrefix: "VITE_",
  runtimeEnvStrict: {
    VITE_MOVIES_API: import.meta.env.VITE_MOVIES_API,
    VITE_PASSWORD_ACCOUNT: import.meta.env.VITE_PASSWORD_ACCOUNT,
    VITE_COOKIES_VALUE: import.meta.env.VITE_COOKIES_VALUE,
    VITE_CLERK_PUBLISHABLE_KEY: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
  },
});
