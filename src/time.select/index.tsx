import { Popover } from 'antd';
import TimeSelectPanel from './time.select.panel';
import { useModel } from '@rootcloud/rc-decorator';
import TimeSelectModel from './model';
import { CalendarOutlined, CloseCircleOutlined } from '@ant-design/icons';
import * as styles from './style.less';
import { TimeRange } from './time.range';
import { useEffect, useMemo } from 'react';
import {DatePicker} from 'antd';

console.log("styles", DatePicker)
export default function TimeSelect(props: {
  defaultValue?: TimeRange;
  value?: TimeRange;
  placeholder?: string;
  open?: boolean;
  notEmpty?: boolean;
  onChange?: (value?: TimeRange) => void;
  /* 时间格式 默认 YYYY-MM-DD */
  format?: string;
  style?: React.CSSProperties;
}) {
  const model = useModel(() => new TimeSelectModel(props));
  useEffect(() => props.value && model.setValue(props.value), [props.value]);
  return (
    <>
      <Popover
        placement="bottomLeft"
        open={props.open ?? model.getOpen()}
        onOpenChange={(visible) => {
          model.setOpen(visible);
        }}
        trigger={['click']}
        destroyTooltipOnHide
        overlayClassName={styles.time_select_overlay_class}
        content={
          <TimeSelectPanel
            model={model.getPanelModel()}
            format={props.format}
            onChange={(value: TimeRange | undefined) => {
              model.setValue(value);
              props.onChange?.(value);
              model.setOpen(false);
            }}
          />
        }
      >
        <div className={`ant-picker ant-picker-range ${styles.picker_input}`} style={props.style}>
          <div className="ant-picker-input">
            <input autoComplete="off" placeholder={props.placeholder} style={{ cursor: 'pointer' }} value={model.formatValue(props.format)} readOnly />
            <span className="ant-picker-suffix">
              <CalendarOutlined />
            </span>
            {props.notEmpty || (
              <span className="ant-picker-clear" style={{ right: '0px' }}>
                <CloseCircleOutlined
                  onClick={(ev) => {
                    model.setValue();
                    props.onChange?.();
                    ev.stopPropagation();
                  }}
                />
              </span>
            )}
          </div>
        </div>
      </Popover>
    </>
  );
}
