import { refreshView } from '@rootcloud/rc-decorator';
import { TimeRange } from './time.range';
import TimeSelectPanelModel from './time.select.panel/model';

export interface Param {
  value?: TimeRange;
  defaultValue?: TimeRange;
  formart?: string;
}
export default class TimeSelectModel {
  private panelModel!: TimeSelectPanelModel;
  private open: boolean = false;
  private format: string = 'YYYY-MM-DD';

  constructor(param: Param) {
    this.panelModel = new TimeSelectPanelModel();
    this.setValue(param?.defaultValue);
    this.format = param.formart || 'YYYY-MM-DD';
  }


  public formatValue(format: string) {
    const value = this.panelModel.getValue();
    return value?.formatValue(format) || '';
  }

  @refreshView
  public setOpen(open: boolean) {
    this.open = open;
    if (!open) {
      const value = this.getValue();
      this.panelModel = new TimeSelectPanelModel();
      this.panelModel.setValue(value);
    }
  }

  public getOpen() {
    return this.open;
  }

  @refreshView
  public setValue(value?: TimeRange) {
    this.panelModel.setValue(value);
  }

  public getValue() {
    return this.panelModel.getValue();
  }

  public getPanelModel() {
    return this.panelModel;
  }
}
