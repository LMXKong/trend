
import dayjs from 'dayjs';
import { OffsetTime, OffsetTimeUnit, OffsetTimeUnitText, QuickItem, TIMETYPE, UnitMS } from './type';
import { t } from '@rootcloud/rc-decorator';

export function getTime(startOffset: number): [dayjs.Dayjs, dayjs.Dayjs] {
  const endTime = dayjs();
  const startTime = dayjs(endTime.valueOf() - startOffset);
  return [startTime, endTime];
}

// export const TIMETYPE;

export function formatter(value: number) {
  if (value < 10) {
    return `0${value}`;
  }
  return `${value}`;
}
export function parser(value: string) {
  return parseInt(value, 10);
}

// const OffsetUnit = OffsetTimeInputModel.pastUnitOptions.map(option => option.key);

export class TimeRange {
  item: QuickItem | OffsetTime | [dayjs.Dayjs?, dayjs.Dayjs?] = [];
  type: TIMETYPE;
  key?: string;
  name?: string;
  format?: string;

  /**
   * 创建偏移时间/快速选择时间
   * @param offsetTime 偏移时间量 最终时间为 offsetTime * unit
   * @param unit 偏移单位
   * @returns TimeRange
   */
  static createOffsetTimeRange(offsetTime: number, unit: OffsetTimeUnit, type?: TIMETYPE.OFFSETTIME | TIMETYPE.QUICK): TimeRange {
    return new TimeRange(
      {
        unit,
        type: type || TIMETYPE.OFFSETTIME,
        offset: offsetTime,
        getValue(item: OffsetTime) {
          const end = dayjs();
          let start: number = 0;
          switch (item.unit) {
            case OffsetTimeUnit.WEEK:
            case OffsetTimeUnit.MONTH:
              if (!item.offset) {
                return [];
              }
              start =
                end.valueOf() -
                end
                  .clone()
                  .subtract(item.offset - 1, item.unit)
                  .startOf(item.unit)
                  .valueOf();
              break;
            default:
              start = offsetTime * UnitMS[unit]();
          }
          return [end.clone().subtract(start, 'ms'), end];
        },
      } as unknown as OffsetTime,
      type || TIMETYPE.OFFSETTIME,
    );
  }

  static createQuickTimeRange(timerange: { key: string; name: string; getValue?: () => [dayjs.Dayjs, dayjs.Dayjs]; offsetTime?: number }) {
    let time;
    if (timerange.offsetTime) {
      time = TimeRange.createOffsetTimeRange(timerange.offsetTime, OffsetTimeUnit.MILLISECOND, TIMETYPE.QUICK);
      timerange.getValue && ((time.item as QuickItem).getValue = timerange.getValue);
      // time.key = timerange.key;
      // time.name = timerange.name;
      // return time;
    } else {
      time = new TimeRange(
        {
          ...timerange,
          value: timerange.key,
          type: TIMETYPE.QUICK,
        } as unknown as QuickItem,
        TIMETYPE.QUICK,
      );
    }
    time.key = timerange.key;
    time.name = timerange.name;
    return time;
  }

  static createTimeRange(timerange: QuickItem | OffsetTime | [dayjs.Dayjs?, dayjs.Dayjs?]) {
    return new TimeRange(timerange, TIMETYPE.INPUT);
  }

  constructor(item: OffsetTime | QuickItem | [dayjs.Dayjs?, dayjs.Dayjs?], type: TIMETYPE) {
    this.item = item;
    this.type = type;
  }

  formatValue(format = 'YYYY-MM-DD') {
    switch (this.type) {
      case TIMETYPE.QUICK:
        return this.name;
      case TIMETYPE.OFFSETTIME:
        const v = this.item as OffsetTime;
        return t('过去{{offset}}{{unit}}', { offset: v.offset || '', unit: OffsetTimeUnitText[v.unit]?.() ?? '' });
      default:
        const { startTime, endTime } = this;
        return `${startTime?.format?.(format) ?? ''} - ${endTime?.format?.(format) ?? ''}  `;
    }
  }

  getValues(): null | [dayjs.Dayjs?, dayjs.Dayjs?] {
    if (!this.item) {
      return null;
    }
    if ((this.item as QuickItem).getValue) {
      // 是偏移时间
      if ((this.item as OffsetTime).type === TIMETYPE.OFFSETTIME) {
        return (this.item as OffsetTime).getValue(this.item as OffsetTime);
      }
      return (this.item as QuickItem).getValue(this.item as OffsetTime);
    }
    return this.item as [dayjs.Dayjs?, dayjs.Dayjs?];
  }

  getTimeInterval(): number {
    const values = this.getValues();
    if (!values || !values[0] || !values[1]) {
      return 0;
    }
    return values[1].valueOf() - values[0].valueOf();
  }

  /**
   * values === 过去5分钟|过去一小时|。。。 每次获取实时计算
   */
  get startTime(): dayjs.Dayjs | undefined {
    return this.getValues()?.[0];
  }
  /**
   * values === 过去5分钟|过去一小时|。。。 每次获取实时计算
   */
  get endTime(): dayjs.Dayjs | undefined {
    return this.getValues()?.[1];
  }
}

export interface TimeValue {
  value: TimeRange;
}
