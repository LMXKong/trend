import { FunctionComponent, ReactElement, ReactNode } from 'react';
import { TimeRange } from '../time.range';
import { OffsetTimeUnit, TIMETYPE } from '../type';
import { refreshView, t } from '@rootcloud/rc-decorator';
import QuickSelect from '../quick.select';
import OffsetTime from '../offset.time';
import StaticTime from '../static.time';
import dayjs from 'dayjs';

export default class TimeSelectPanelModel {
  private value?: TimeRange;
  private type?: TIMETYPE;

  @refreshView
  public setValue(value?: TimeRange) {
    this.value = value;
    this.setType(value?.type);
  }

  @refreshView
  public setType(type?: TIMETYPE) {
    this.type = type;
  }

  public getType() {
    return this.type || TIMETYPE.QUICK;
  }

  public getValue(): TimeRange | undefined {
    return this.value;
  }

  public getItemClassName(type: TIMETYPE, styles: any) {
    if (this.getType() === type) {
      return `${styles.select_panel_left_item} ${styles.select_panel_left_item_selected}`;
    }
    return `${styles.select_panel_left_item}`;
  }

  public getSelectPanelElement(onChange: (value?: TimeRange, close?: boolean) => void, format?: string): ReactNode {
    switch (this.getType()) {
      case TIMETYPE.QUICK:
        return (
          <QuickSelect
            value={this.value?.type === TIMETYPE.QUICK ? this.value : undefined}
            items={this.getQuickItems()}
            onClickItem={(value) => {
              this.setValue(value);
              onChange(value);
            }}
          />
        );
      case TIMETYPE.OFFSETTIME:
        return (
          <OffsetTime
            value={this.value?.type === TIMETYPE.OFFSETTIME ? this.value : undefined}
            onChange={(value?: TimeRange) => {
              this.setValue(value);
              onChange(value);
            }}
          />
        );
      default:
        return (
          <StaticTime
            onChange={(value?: TimeRange) => {
              this.setValue(value);
              onChange(value);
            }}
            format={format}
            value={this.value}
          />
        );
    }
  }

  public getQuickItems(): Array<{
    label: ReactNode | string;
    value: TimeRange;
  }> {
    return [
      {
        label: t('过去3天'),
        value: TimeRange.createQuickTimeRange({
          key: '3day',
          name: t('过去3天'),
          // offsetTime: 3 * 24 * 60 * 60 * 1000,
          getValue: () => [dayjs(new Date()).subtract(2, 'day'), dayjs()],
        }),
      },
      {
        label: t('过去7天'),
        value: TimeRange.createQuickTimeRange({
          key: '7day',
          name: t('过去7天'),
          // offsetTime: 7 * 24 * 60 * 60 * 1000,
          getValue: () => [dayjs(new Date()).subtract(6, 'day'), dayjs()],
        }),
      },
      {
        label: t('过去10天'),
        value: TimeRange.createQuickTimeRange({
          key: '10day',
          name: t('过去10天'),
          // offsetTime: 10 * 24 * 60 * 60 * 1000,
          getValue: () => [dayjs(new Date()).subtract(9, 'day'), dayjs()],
        }),
      },
      {
        label: t('过去15天'),
        value: TimeRange.createQuickTimeRange({
          key: '15day',
          name: t('过去15天'),
          // offsetTime: 15 * 24 * 60 * 60 * 1000,
          getValue: () => [dayjs(new Date()).subtract(14, 'day'), dayjs()],
        }),
      },
      {
        label: t('本周'),
        value: TimeRange.createQuickTimeRange({
          key: 'current_week',
          name: t('本周'),
          getValue: () => {
            return [dayjs().startOf('week'), dayjs().endOf('week')];
          },
        }),
      },
      {
        label: t('本月'),
        value: TimeRange.createQuickTimeRange({
          key: 'current_month',
          name: t('本月'),
          getValue: () => [dayjs().startOf('month'), dayjs().endOf('month')],
        }),
      },
    ];
  }
}
