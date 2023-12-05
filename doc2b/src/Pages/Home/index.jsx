import React, { useEffect, useRef, useMemo, useState } from 'react';
import './style.css';
import { useGlobalContext } from '../../Context/Context';
import DocumentSlider from '../../Components/DocumentsSlider';
import MyEventCalendar from '../../Components/MyEventCalendar';
import AddCompanyPopUp from '../../Components/AddCompanyPopUp';
import Popup from 'reactjs-popup';
import { NavLink } from 'react-router-dom';
import { ROUTE_NAMES } from '../../Routes';

import Document from '../../assets/Images/Document.png';
import CaseIcon from '../../assets/Icons/CaseIcon.png';

import { GetAllCompanies } from '../../Platform/CompanyRequests';

export default function Home() {
  const { darkMode, setPopUpOpen } = useGlobalContext();
  const canvasRef = useRef(null);
  const [hasCompanies, setHasCompnaies] = useState(false);
  let firstPerc = 60;
  let secondPerc = 30;
  let thirdPerc = 10;

  const data = useMemo(
    () => [
      {
        name: 'Աշխատողի նախաձեռնությամբ',
        percentage: firstPerc,
        color1: firstPerc === 0 ? '#dcdcdc' : '#00d4e3',
        color2: firstPerc === 0 ? '#a6a6a6' : '#00adba',
      },
      {
        name: 'Աշխատավարձի փոփոխման համաձայնագիր',
        percentage: secondPerc,
        color1: secondPerc === 0 ? '#dcdcdc' : '#ee02fa',
        color2: secondPerc === 0 ? '#a6a6a6' : '#ac00bf',
      },
      {
        name: 'Այլ',
        percentage: thirdPerc,
        color1: thirdPerc === 0 ? '#dcdcdc' : '#0080ff',
        color2: thirdPerc === 0 ? '#a6a6a6' : '#005ebd',
      },
    ],
    []
  );

  const applications = [];

  // const applications = [
  //   {
  //     name: 'Աշխատակցի ազատման ծանուցում 1',
  //     person: 'Անուն Ազգանուն',
  //     date: '13 Հուլ 2023',
  //     category: 'Accepted',
  //   },
  //   {
  //     name: 'Աշխատակցի ազատման ծանուցում 2',
  //     person: 'Անուն Ազգանուն',
  //     date: '13 Հուլ 2023',
  //     category: 'Declined',
  //   },
  //   {
  //     name: 'Աշխատակցի ազատման ծանուցում 3',
  //     person: 'Անուն Ազգանուն',
  //     date: '13 Հուլ 2023',
  //     category: 'In Process',
  //   },
  //   {
  //     name: 'Աշխատակցի ազատման ծանուցում 4',
  //     person: 'Անուն Ազգանուն',
  //     date: '13 Հուլ 2023',
  //     category: 'Accepted',
  //   },
  //   {
  //     name: 'Աշխատակցի ազատման ծանուցում 5',
  //     person: 'Անուն Ազգանուն',
  //     date: '13 Հուլ 2023',
  //     category: 'Declined',
  //   },
  //   {
  //     name: 'Աշխատակցի ազատման ծանուցում 6',
  //     person: 'Անուն Ազգանուն',
  //     date: '13 Հուլ 2023',
  //     category: 'In Process',
  //   },
  // ];

  const getCompaniesList = async () => {
    const result = await GetAllCompanies();
    if (result) {
      if (result.data.length > 1) {
        setHasCompnaies(true);
      }
    }
  };

  useEffect(() => {
    getCompaniesList();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext('2d');
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY);
      let gap = 0;

      if (firstPerc === 0 && secondPerc === 0 && thirdPerc === 0) {
        // All percentages are 0, so no gap is needed for a full circle
        gap = 0;
      } else {
        // gap = 0.02 * Math.PI;
      }

      let startAngle = -0.5 * Math.PI;

      data.forEach((item) => {
        let percentage =
          firstPerc === 0 && secondPerc === 0 && thirdPerc === 0
            ? 100
            : item.percentage;
        const endAngle =
          startAngle + (percentage / 100) * (2 * Math.PI - data.length * gap);

        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, item.color1);
        gradient.addColorStop(1, item.color2);

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle, false);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();

        // if (!firstPerc === 0 && !secondPerc === 0 && !thirdPerc === 0) {
        //   ctx.strokeStyle = "#fff";
        //   ctx.lineWidth = 2.5;
        //   ctx.stroke();
        // }

        startAngle = endAngle + gap;
      });
    }
  }, [data, firstPerc, secondPerc, thirdPerc]);

  return (
    <div>
      <div className='GroupedBlocks'>
        <div className={'NumbersBlock dashBlock' + (darkMode ? ' Dark' : '')}>
          <div className='NumberBlock1'>
            <h3>23</h3>
            <h5>Ընթացիկ փաստաթղթեր</h5>
          </div>
          <div className='NumberBlock2'>
            <h3>247</h3>
            <h5>Ստեղծված փաստաթղթեր</h5>
          </div>
        </div>
        <div className={'dashBlock' + (darkMode ? ' Dark' : '')}>
          <div className='Chart'>
            <div className='labels'>
              {data.map((item, index) => (
                <div key={index} className='chartlabel'>
                  <span
                    className='label-percentage'
                    style={{
                      background: `linear-gradient(45deg, ${item.color2}, ${item.color1})`,
                    }}
                  >{`${item.percentage}%`}</span>
                  <span
                    className={'label-text' + (darkMode ? ' whiteElement' : '')}
                  >
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
            <div>
              <div
                className={
                  'chartFilters' + (darkMode ? ' darkChartFilters' : '')
                }
              >
                <input
                  type='radio'
                  id='filterChoice1'
                  name='chartFilter'
                  value='Տարի'
                  defaultChecked
                />
                <label
                  htmlFor='filterChoice1'
                  className={darkMode ? ' whiteElement' : ''}
                >
                  Տարի
                </label>

                <input
                  type='radio'
                  id='filterChoice2'
                  name='chartFilter'
                  value='Ամիս'
                />
                <label
                  htmlFor='filterChoice2'
                  className={darkMode ? ' whiteElement' : ''}
                >
                  Ամիս
                </label>
              </div>
              <canvas
                className='pieChart'
                ref={canvasRef}
                width={140}
                height={140}
              ></canvas>
            </div>
          </div>
        </div>
        <div className='AddsSection'></div>
      </div>
      <div className='GroupedBlocks'>
        <div className='GroupedBlocksTwo'>
          {!hasCompanies && (
            <div className={'empty-content' + (darkMode ? ' Dark' : '')}>
              <div className='welcome-section'>
                <h5>Բարի գալուստ,</h5>
                <h3 className={darkMode ? ' whiteElement' : ''}>Անուն Ազգանուն</h3>
              </div>
              <div
                className={
                  'empty-content-image-block' + (darkMode ? ' darkWelcome' : '')
                }
              >
                <img src={CaseIcon} alt='CaseIcon' />
                <h5>
                  Ավելացրեք կազմակերպություն, որպեսզի սկսեք ձեր աշխատանքը
                  համակարգում
                </h5>
              </div>
              <div>
                <Popup
                  trigger={
                    <div>
                      <button className='welcome-btn'>Ավելացնել</button>
                    </div>
                  }
                  position='top center'
                  onOpen={() => setPopUpOpen(true)}
                  onClose={() => setPopUpOpen(false)}
                >
                  {(close) => (
                    <AddCompanyPopUp darkMode={darkMode} close={close} />
                  )}
                </Popup>
              </div>
            </div>
          )}

          {applications.length > 0 ? (
            <div
              className={'dashBlock sliderBlock' + (darkMode ? ' Dark' : '')}
            >
              <div className='sliderHeaderBlock'>
                <h3 className={darkMode ? 'whiteElement' : ''}>
                  Իմ Գործողությունները
                </h3>
                <NavLink to={ROUTE_NAMES.ACTIVITES}>
                  <button>Դիտել Բոլորը</button>
                </NavLink>
              </div>
              <DocumentSlider documnets={applications} />
            </div>
          ) : (
            <div
              className={
                'dashBlock sliderBlock no-staff-content' +
                (darkMode ? ' Dark' : '')
              }
            >
              <div className='welcome-section'>
                <h5>Դուք դեռ չունեք</h5>
                <h3 className={darkMode ? ' whiteElement' : ''}>Փաստաթղթեր</h3>
              </div>
              <div
                className={
                  'empty-content-image-block' + (darkMode ? ' darkWelcome' : '')
                }
              >
                <img src={Document} alt='Document' />
                <h5>
                  Ավելացրեք փաստաթղթեր, որպեսզի ստուգեք ներբեռնած փաստաթղթերը և
                  ընթացիկ թարմացումները
                </h5>
              </div>
            </div>
          )}
        </div>
        <MyEventCalendar />
      </div>
    </div>
  );
}
