import { useEffect } from "react";
import TimeSelect from "./time.select";
import { globalModel } from "./global.modal";

export default function ContentTest() {
  useEffect(() => {
    globalModel.fetch('/dev/api/api/idp/tags/history/records', {
      method: 'POST',
      body: JSON.stringify({
        "optType": 4,
        "tagIdList": [
            9236
        ],
        "startTimeStamp": 1724989264344,
        "endTimeStamp": 1724989268344,
        "maxNum": 10
      })
    })
  })
  return <><TimeSelect/></>
}