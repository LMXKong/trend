import { globalModel } from "src/global.modal";

export const apipre = __DEV__ ? '/dev/api' : ''

export async function requestExp() {
  return await globalModel.fetch(`${apipre}/api/serchdata`);
}