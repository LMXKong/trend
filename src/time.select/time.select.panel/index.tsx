import { RightOutlined } from '@ant-design/icons';
import * as styles from './style.less';
import TimeSelectPanelModel from './model';
import { t, useModel } from '@rootcloud/rc-decorator';
import { TIMETYPE } from '../type';
import { TimeRange } from '../time.range';

export default function TimeSelectPanel(props: { model: TimeSelectPanelModel; onChange: (value?: TimeRange, close?: boolean) => void; format?: string }) {
  const model = useModel(() => props.model);
  return (
    <>
      <div className={styles.select_panel}>
        <div className={styles.select_panel_left}>
          <div className={model.getItemClassName(TIMETYPE.QUICK, styles)} onClick={() => model.setType(TIMETYPE.QUICK)}>
            {t('快速选择')}
            <RightOutlined className={styles.select_panel_left_item_icon} />
          </div>
          <div className={model.getItemClassName(TIMETYPE.OFFSETTIME, styles)} onClick={() => model.setType(TIMETYPE.OFFSETTIME)}>
            {t('自定义动态时间')}
            <RightOutlined className={styles.select_panel_left_item_icon} />
          </div>
          <div className={model.getItemClassName(TIMETYPE.INPUT, styles)} onClick={() => model.setType(TIMETYPE.INPUT)}>
            {t('自定义静态时间')}
            <RightOutlined className={styles.select_panel_left_item_icon} />
          </div>
        </div>
        <div className={styles.select_panel_right} key={model.getType()}>
          {model.getSelectPanelElement(props.onChange, props.format)}
        </div>
      </div>
    </>
  );
}
