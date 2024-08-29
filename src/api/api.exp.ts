import { globalModel } from "src/global.modal";

export async function requestExp() {
  return await globalModel.fetch(`${__DEV__ ? '/dev/api' : ''}/api/serchdata`);
}