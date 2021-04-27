import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import { casesTypeColors } from "./util";

const options = {
  plugins: {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltip: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem) {
          return numeral(tooltipItem.parsed.y).format("+0,0");
        },
      },
    },
  },
  scales: {
    xAxes: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        callback: function (val, index) {
          // Hide the label of every 2nd dataset
          return numeral(this.getLabelForValue(val)).format("0a");
        },
      },
    },
  },
};

function LineGraph({ caseType, country, ...props }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const url =
      country === "Worldwide"
        ? "https://disease.sh/v3/covid-19/historical/all?lastdays=120"
        : `https://disease.sh/v3/covid-19/historical/${country}?lastdays=120`;
    const fetchData = async () => {
      await fetch(url)
        .then((res) => res.json())
        .then((data) => {
          let filteredData = country === "Worldwide" ? data : data.timeline;
          const lineData = buildLineData(filteredData, caseType);
          setData(lineData);
        });
    };
    fetchData();
  }, [caseType, country]);

  const buildLineData = (data, caseType) => {
    const lineDataArr = [];
    let lastDataPoint;
    Object.keys(data.cases).forEach((date) => {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[caseType][date] - lastDataPoint,
        };
        lineDataArr.push(newDataPoint);
      }
      lastDataPoint = data[caseType][date];
    });
    return lineDataArr;
  };

  return (
    <div className={props.className}>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                data: data,
                fill: true,
                borderColor: casesTypeColors[caseType].hex,
                backgroundColor: casesTypeColors[caseType].half_op,
                pointRadius: 0,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;
