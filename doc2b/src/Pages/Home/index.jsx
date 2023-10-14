import React, { useEffect, useRef, useMemo } from "react";
import "./style.css";
import DocumentSlider from "../../Components/DocumentsSlider";
import MyEventCalendar from "../../Components/MyEventCalendar";

export default function Home() {
  const canvasRef = useRef(null);

  const data = useMemo(() => [
    {
      name: "Աշխատողի նախաձեռնությամբ",
      percentage: 60,
      color1: "#00d4e3",
      color2: "#00adba"
    },
    {
      name: "Աշխատավարձի փոփոխման համաձայնագիր",
      percentage: 30,
      color1: "#ee02fa",
      color2: "#ac00bf"
    },
    {
      name: "Այլ",
      percentage: 10,
      color1: "#0080ff",
      color2: "#005ebd"
    },
  ], []);

  const documents = [
    {
      name: "Աշխատակցի ազատման ծանուցում 1",
      date: "13 Հուլ 2023"
    },
    {
      name: "Աշխատակցի ազատման ծանուցում 2",
      date: "13 Հուլ 2023"
    },
    {
      name: "Աշխատակցի ազատման ծանուցում 3",
      date: "13 Հուլ 2023"
    },
    {
      name: "Աշխատակցի ազատման ծանուցում 4",
      date: "13 Հուլ 2023"
    },
    {
      name: "Աշխատակցի ազատման ծանուցում 5",
      date: "13 Հուլ 2023"
    },
  ];

  const applications = [
    {
      name: "Աշխատակցի ազատման ծանուցում 1",
      date: "13 Հուլ 2023",
      category: 'Accepted'
    },
    {
      name: "Աշխատակցի ազատման ծանուցում 2",
      date: "13 Հուլ 2023",
      category: 'Declined'
    },
    {
      name: "Աշխատակցի ազատման ծանուցում 3",
      date: "13 Հուլ 2023",
      category: 'In Process'
    },
    {
      name: "Աշխատակցի ազատման ծանուցում 4",
      date: "13 Հուլ 2023",
      category: 'Accepted'
    },
    {
      name: "Աշխատակցի ազատման ծանուցում 5",
      date: "13 Հուլ 2023",
      category: 'Declined'
    },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext("2d");
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY);
      const gap = 0.02 * Math.PI;

      let startAngle = -0.5 * Math.PI;

      data.forEach((item) => {
        const endAngle =
          startAngle + (item.percentage / 100) * (2 * Math.PI - data.length * gap);

        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, item.color1);
        gradient.addColorStop(1, item.color2);

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle, false);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2.5;
        ctx.stroke();

        startAngle = endAngle + gap;
      });
    }
  }, [data]);

  
  return (
    <div >
      <div className="GroupedBlocks">
        <div className="NumbersBlock dashBlock">
          <div className="NumberBlock1">
            <h3>23</h3>
            <h5>Ընթացիկ փաստաթղթեր</h5>
          </div>
          <div className="NumberBlock2">
            <h3>247</h3>
            <h5>Ստեղծված փաստաթղթեր</h5>
          </div>
        </div>
        <div className="dashBlock">
          <div className="Chart">
            <div className="labels">
              {data.map((item, index) => (
                <div key={index} className="chartlabel">
                  <span className="label-percentage" style={{background: `linear-gradient(45deg, ${item.color2}, ${item.color1})`}}>{`${item.percentage}%`}</span>
                  <span className="label-text">{item.name}</span>
                </div>
              ))}
            </div>
            <div>
              <div className="chartFilters">
                <input type="radio" id="FilterChoice1" name="chartFilter" value="Տարի" defaultChecked/>
                <label htmlFor="filterChoice1">Տարի</label>

                <input type="radio" id="filterChoice2" name="chartFilter" value="Ամիս" />
                <label htmlFor="filterChoice2">Ամիս</label>
              </div>
              <canvas className="pieChart" ref={canvasRef} width={160} height={160}></canvas>
            </div>
          </div>
        </div>
        <div className="AddsSection">
        </div>
      </div>
      <div className="GroupedBlocks">
        <div className="GroupedBlocksTwo">
          <div className="dashBlock sliderBlock">
              <div className="sliderHeaderBlock">
                <h3>Իմ Փաստաթղթերը</h3>
                <button>Դիտել Բոլորը</button>
              </div>
              <DocumentSlider documnets={documents}/>
          </div>
          <div className="dashBlock sliderBlock">
              <div className="sliderHeaderBlock">
                <h3>Իմ Հայտերը</h3>
                <button>Դիտել Բոլորը</button>
              </div>
              <DocumentSlider documnets={applications}/>
          </div>
        </div>
        <MyEventCalendar/>
      </div>
    </div>
  );
}
