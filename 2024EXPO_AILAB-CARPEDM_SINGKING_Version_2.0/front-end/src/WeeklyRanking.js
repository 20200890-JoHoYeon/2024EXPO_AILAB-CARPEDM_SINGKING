import React from 'react';

const WeeklyRanking = ({ rankingData }) => {
    // rankingData가 배열인지 확인
    if (!Array.isArray(rankingData) || rankingData.length === 0) {
        return <div>No ranking data available.</div>;
    }

    return (
        <div className="ranking_container">
            {rankingData.slice(0,5).map((item, index) => (
                <div key={index} className="ranking_item">
                    <span className="rank">{item.rank}</span>
                    <span className="user_name">{item.user_name}</span>
                    <span className="score">{item.score}</span>
                </div>
            ))}
        </div>
    );
}

export default WeeklyRanking;
