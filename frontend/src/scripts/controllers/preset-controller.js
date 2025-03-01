import * as Config from "../config";
import * as DB from "../db";
import * as Notifications from "../elements/notifications";
import * as TestLogic from "../test/test-logic";
import * as TagController from "./tag-controller";

export function apply(_id) {
  // console.log(DB.getSnapshot().presets);
  DB.getSnapshot().presets.forEach((preset) => {
    if (preset._id == _id) {
      Config.apply(JSON.parse(JSON.stringify(preset.config)));
      TagController.clear(true);
      if (preset.config.tags) {
        preset.config.tags.forEach((tagid) => {
          TagController.set(tagid, true, false);
        });
      }
      TestLogic.restart();
      Notifications.add("Preset applied", 1, 2);
      Config.saveToLocalStorage();
    }
  });
}
