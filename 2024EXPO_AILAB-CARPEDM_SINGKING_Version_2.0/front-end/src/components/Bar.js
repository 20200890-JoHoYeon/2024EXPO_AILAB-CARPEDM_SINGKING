import React, { useState, useEffect } from 'react';

const Bar = ({ initialPercent }) => {
  const [percent, setPercent] = useState(0);
  const [targetPercent, setTargetPercent] = useState(initialPercent);

  useEffect(() => {
    if (percent < targetPercent) {
      const interval = setInterval(() => {
        setPercent(prev => {
          const newPercent = Math.min(prev + 1, targetPercent);
          if (newPercent === targetPercent) {
            clearInterval(interval);
          }
          return newPercent;
        });
      }, 20); // 20ms 간격으로 1씩 증가
      return () => clearInterval(interval);
    }
  }, [targetPercent, percent]);

  const handleChange = (e) => {
    const value = Math.max(0, Math.min(100, e.target.value)); // 0에서 100 사이로 제한
    setTargetPercent(value);
  };

  return (
    <div>
      <div className="bar_container">
        <div className="bar" style={{ width: `${percent}%` }}>
          <span className="bar_label">{percent}%</span>
        </div>
      </div>
    </div>
  );
}

export default Bar;