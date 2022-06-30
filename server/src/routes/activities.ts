import { Router } from "express";
import { Activity, ActivityInput } from "../entities/Activity";
import {
  definedOnly,
  validActivityType,
  validAttachments,
  validDate,
  validText,
} from "../utils/validations";
import { dateDiff } from "../utils/dateDiff";
import { MyContext } from "../middleware/withContext";

const router = Router();

router.get("/", async (req: MyContext, res) => {
  let filterOptions = [];
  const [after, before] = [
    validDate(req.query.after),
    validDate(req.query.before),
  ];
  if ([after, before].includes("Invalid Date")) {
    res.send(`Invalid dates! you entered: after: ${after} & before: ${before}`);
    return;
  }
  if (!!after) {
    req.em?.setFilterParams("after", { after: after });
    filterOptions.push("after");
  }
  if (!!before) {
    req.em?.setFilterParams("before", { before: before });
    filterOptions.push("before");
  }

  const allActivities = await req.em?.find(
    Activity,
    {},
    {
      filters: filterOptions,
      orderBy: { [`type`]: "ASC" },
      populate: ["type"],
    }
  );

  const report = new Map();
  allActivities?.forEach((a) => {
    if (!report.has(a.type)) {
      report.set(a.type, {
        totalElapsed: a.elapsedTime,
        activities: [definedOnly(a)],
      });
    } else {
      report.get(a.type).totalElapsed += a.elapsedTime;
      report.get(a.type).activities.push(definedOnly(a));
    }
  });

  res.json(Array.from(report));
});

router.get("/:id", async (req: MyContext, res) => {
  const activityId = parseInt(req.params.id);
  const activity = await req.em?.findOne(Activity, { id: activityId });
  res.json(activity);
});

router.post("/", async (req: MyContext, res) => {
  const options: Partial<ActivityInput> = {
    firmId: req.session.firmId,
    name: req.body.name,
    type: validActivityType(req.body.type),
    startTime: validDate(req.body.startTime),
    endTime: validDate(req.body.endTime),
    attachments: validAttachments(req.body.attachments),
  };
  const elapsedTime = dateDiff(options);
  console.log(elapsedTime);

  if (!options.type) {
    res.send("invalid activity type!");
    return;
  }
  if (!options.attachments && !!req.body.attachments) {
    res.send(
      `bad attachments!, attachments should be {"id": int, "name": string}`
    );
    return;
  }
  if (options.type !== "email" && !!options.attachments) {
    res.send(`${options.type}'s don't have attachments!`);
    return;
  }

  const activity = req.em?.create(Activity, { ...options, elapsedTime } as any);
  if (activity) {
    await req.em?.persistAndFlush(activity);
  }
  res.json(activity);
});

router.put("/:id", async (req: MyContext, res) => {
  const activityId = parseInt(req.params.id);
  let options: Partial<ActivityInput> = definedOnly({
    name: validText(req.body.name),
    startTime: validDate(req.body.startTime),
    endTime: validDate(req.body.endTime),
  });
  const elapsedTime = dateDiff(options);

  if (!options) {
    res.send("no options given");
    return;
  }
  const activity = await req.em?.findOne(Activity, { id: activityId });
  if (!activity) {
    res.send("invalid activity number or authentication");
    return;
  }
  const done = await req.em?.persistAndFlush(
    Object.assign(activity, { ...options, elapsedTime })
  );
  res.json(!!done);
});

router.delete("/:id", async (req: MyContext, res) => {
  const activityId = parseInt(req.params.id);
  const done = await req.em?.nativeDelete(Activity, { id: activityId });
  res.json(!!done);
});

export const activitiesRouter = router;
