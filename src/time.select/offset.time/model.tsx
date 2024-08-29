import { TimeRange } from '../time.range';
import { OffsetTime, OffsetTimeUnit } from '../type';

export class OffsetTimeModel {
  // private unit?: OffsetTimeUnit

  private value?: TimeRange;
  public getUnit(): OffsetTimeUnit {
    return (this.value?.item as OffsetTime)?.unit;
  }

  public setUnit(unit: OffsetTimeUnit) {}
}
