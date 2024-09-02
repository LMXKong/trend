import { t } from "@rootcloud/rc-decorator";
import { message } from "antd";

type Fetch = typeof window.fetch;

function getRequestId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

class GlobalModel {

  onQuery?: Fetch;

  fetch: Fetch = (input: string | RequestInfo | URL, init?: RequestInit & { body: any}) => {
    let res;
    const headers = {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
      "request-id": getRequestId()
    }
    const option: RequestInit = {
      mode: 'cors',
      credentials: 'same-origin',
      ...init,
      headers
    }
    if (this.onQuery) {
      res = this.onQuery(input, option);
    } else {
      res = fetch(input, option);
    }
    return res.then(response => {
      if (response.json) {
        return response.json();
      }
      return response;
    }).catch(err => {
      message.error(err.message || t('接口请求错误'));
      throw err;
    });
  }
}

export const globalModel =  new GlobalModel();