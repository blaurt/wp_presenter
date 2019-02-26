import * as React from 'react';
import * as styles from './ProgressBar.scss';
import { countPercent } from '../../utils/common/percent';

interface Props {
  progressOfTotal: number;
  total: number;
}

export const ProgressBar = (props: Props) => {
  const { total, progressOfTotal } = props;
  const percent = `${countPercent(progressOfTotal, total) || 0}%`;

  return (
    <div className={styles.progressBar}>
      <div className={styles.progressLine} style={{ width: percent }} />
      <span className={styles.progressState}>{percent}</span>
    </div>
  );
};
