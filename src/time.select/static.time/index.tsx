import { Button, DatePicker } from 'antd';
import * as styles from '../time.select.panel/style.less';
import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { TimeRange } from '../time.range';
import { TIMETYPE } from '../type';
import { t } from '@rootcloud/rc-decorator';

export default function StaticTime(props: { onChange: (time?: TimeRange) => void; value?: TimeRange; format?: string }) {
  const [value, setValue] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(() => {
    if (props.value?.type === TIMETYPE.INPUT) {
      const vs = props.value.getValues() || [];
      if (vs[0] && vs[1]) {
        return vs as [dayjs.Dayjs, dayjs.Dayjs];
      }
    }
    return null;
  });
  const hasTime = useMemo(() => {
    if (props.format) {
      return ['HH', 'hh', 'mm', 'ss'].some((tag) => props.format?.includes(tag));
    }
    return false;
  }, [props.format]);
  const stateArr = useMemo<Array<string>>(() => [], []);
  return (
    <div className={styles.select_panel_right_static}>
      <div className={styles.select_panel_right_static_title}>{t('时间范围')}</div>
      <DatePicker.RangePicker
        open
        onCalendarChange={(vs) => {
          setValue(vs as any);
          if (hasTime) {
            stateArr.push('');
            const v = new TimeRange(vs as any, TIMETYPE.INPUT);
            stateArr.length > 1 && props.onChange(v);
          }
        }}
        showTime={hasTime}
        defaultValue={value}
        placeholder={[t('开始'), t('结束')]}
        allowClear={false}
        getPopupContainer={() => document.querySelector(`.${styles.select_panel_right_static_body}`) as any}
      />
      {/** range picker 面板容器 */}
      <div className={styles.select_panel_right_static_body}></div>

      {!hasTime && (
        <div style={{ textAlign: 'right' }}>
          <Button
            onClick={() => {
              if (value && value[0] && value[1]) {
                const v = new TimeRange(value, TIMETYPE.INPUT);
                props.onChange(v);
                return;
              }
              props.onChange();
            }}
          >
            {t('确定')}
          </Button>
        </div>
      )}
    </div>
  );
}
