import { ReactNode } from 'react';
import { TimeRange } from '../time.range';
import { QuickItem } from '../type';
import * as styles from '../time.select.panel/style.less';

export default function QuickSelect({
  value,
  items,
  onClickItem,
}: {
  value?: TimeRange;
  items: Array<{
    label: ReactNode | string;
    value: TimeRange;
  }>;
  onClickItem: (item: TimeRange) => void;
}) {
  return (
    <>
      {items.map((item) => {
        const key = (item.value as unknown as QuickItem).key;
        return (
          <div
            onClick={() => {
              onClickItem(item.value);
            }}
            key={key}
            className={`${styles.select_panel_right_item} ${key === value?.key ? styles.select_panel_right_item_selected : ''}`}
          >
            {item.label}
          </div>
        );
      })}
    </>
  );
}
