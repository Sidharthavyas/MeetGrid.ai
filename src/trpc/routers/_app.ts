import { meetingssRouter } from '@/modules/meetings/server/procedures';
import {  createTRPCRouter } from '../init';

import { agentsRouter } from '@/modules/agents/server/procedures';
export const appRouter = createTRPCRouter({
  agents:agentsRouter,
  meetings:meetingssRouter,

});
// export type definition of API
export type AppRouter = typeof appRouter;