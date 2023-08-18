import './Skeleton.scss';

export const Skeleton: React.FC<{ times: number }> = ({ times }) => {
  const boxes = Array(times)
    .fill(0)
    .map((_, i) => (
      <div key={i} className="task-excerpt-skeleton ">
        <div className="task-excerpt-skeleton__main">
          <div className="skeleton skeleton-text skeleton-text--title"></div>

          <div className="task-actions skeleton"></div>
        </div>

        <div className="task-excerpt-skeleton__sub">
          <div className="skeleton skeleton-text skeleton-text--paragraph"></div>
        </div>
      </div>
    ));
  return <div>{boxes}</div>;
};
