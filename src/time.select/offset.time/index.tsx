import * as styles from '../time.select.panel/style.less';
import { Button, Input, InputNumber, Select } from 'antd';
import { TimeRange } from '../time.range';
import { OffsetTime as OffsetTimeType, OffsetTimeUnit } from '../type';
import { useState } from 'react';
import { t } from '@rootcloud/rc-decorator';

export default function OffsetTime(props: { value?: TimeRange; onChange: (value?: TimeRange) => void }) {
  const [unit, setUnit] = useState((props.value?.item as OffsetTimeType)?.unit ?? OffsetTimeUnit.DAY);
  const [offset, setOffset] = useState<number | null>((props.value?.item as OffsetTimeType)?.offset ?? null);

  return (
    <div className={styles.select_panel_right_offset}>
      <div className={styles.select_panel_right_offset_title}>{t('过去')}</div>
      <Input.Group compact>
        <InputNumber
          style={{ width: 120 }}
          value={offset}
          onChange={(value: number | null) => {
            setOffset(value);
          }}
        />
        <Select
          value={unit}
          onChange={(v) => {
            setUnit(v);
          }}
          style={{ width: 80 }}
          options={[
            { label: t('天'), value: OffsetTimeUnit.DAY },
            { label: t('周'), value: OffsetTimeUnit.WEEK },
            { label: t('月'), value: OffsetTimeUnit.MONTH },
          ]}
        />
      </Input.Group>
      <Button
        style={{ position: 'absolute', bottom: 10, right: 10 }}
        onClick={() => {
          if (!offset) {
            props.onChange();
          }
          const time = TimeRange.createOffsetTimeRange(offset as number, unit);
          props.onChange(time);
        }}
      >
        {t('确定')}
      </Button>
    </div>
  );
}
