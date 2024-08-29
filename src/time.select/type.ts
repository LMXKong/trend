import { t } from '@rootcloud/rc-decorator';
import dayjs from 'dayjs';

export enum TIMETYPE {
  QUICK = 'quick',
  OFFSETTIME = 'OFFSETTIME',
  INPUT = 'input',
}

export interface QuickItem {
  key: string;
  value: string;
  name: string;
  type: TIMETYPE.QUICK;
  getValue: (offset: OffsetTime) => [dayjs.Dayjs?, dayjs.Dayjs?];
}

export enum OffsetTimeUnit {
  MILLISECOND = 'millisecond',
  SECOND = 'second',
  MINITE = 'minite',
  HOUR = 'hour',
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
}
export const OffsetTimeUnitText: {
  [key in OffsetTimeUnit]: () => string;
} = {
  [OffsetTimeUnit.MILLISECOND]: function (): string {
    return t('毫秒');
  },
  [OffsetTimeUnit.SECOND]: function (): string {
    return t('秒');
  },
  [OffsetTimeUnit.MINITE]: function (): string {
    return t('分钟');
  },
  [OffsetTimeUnit.HOUR]: function (): string {
    return t('小时');
  },
  [OffsetTimeUnit.DAY]: function (): string {
    return t('天');
  },
  [OffsetTimeUnit.WEEK]: function (): string {
    return t('周');
  },
  [OffsetTimeUnit.MONTH]: function (): string {
    return t('月');
  },
};

export const UnitMS: {
  [key in OffsetTimeUnit]: () => number;
} = {
  [OffsetTimeUnit.MILLISECOND]: () => 1,
  [OffsetTimeUnit.SECOND]: () => 1000,
  [OffsetTimeUnit.MINITE]: () => 60000,
  [OffsetTimeUnit.HOUR]: () => 60 * 60000,
  [OffsetTimeUnit.DAY]: () => 24 * 60 * 60000,
  [OffsetTimeUnit.WEEK]: () => {
    return dayjs().valueOf() - dayjs(new Date()).startOf('week').valueOf();
  },
  [OffsetTimeUnit.MONTH]: () => {
    return dayjs().valueOf() - dayjs(new Date()).startOf('months').valueOf();
  },
};

export interface OffsetTimeOption {
  key: string;
  label: string | JSX.Element;
  type: TIMETYPE.OFFSETTIME;
  unit: OffsetTimeUnit;
  offset?: number;
}
export interface OffsetTime extends OffsetTimeOption {
  getValue: (item: OffsetTime) => [dayjs.Dayjs?, dayjs.Dayjs?];
}
