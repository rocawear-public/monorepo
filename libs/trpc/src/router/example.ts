import { router, publicProcedure } from "../trpc";
import { observable } from "@trpc/server/observable";
import { ee } from "@habbo-extension/server/events";

import { floorItems } from "@habbo-extension/shared";

export const exampleRouter = router({
  floorItems: publicProcedure.subscription(() => {
    return observable<floorItems>((emit) => {
      const onNewData = (data: floorItems) => {
        emit.next(data);
      };
      ee.on("floorItems", onNewData);

      return () => {
        ee.off("floorItems", onNewData);
      };
    });
  }),
});
