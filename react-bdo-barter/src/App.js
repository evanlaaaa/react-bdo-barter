import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [parley, setParley] = useState(12198);
  const [hakovenThreshold, setHakovenThreshold] = useState(100);
  const [margoThreshold , setMargoThreshold] = useState(70);
  const [hakovenTrade, setHakovenTrade] = useState(0);
  const [margoTrade, setMargoTrade] = useState(0);
  const [t4restock, setT4Restock] = useState(20);
  const [t4Stock, setT4Stock] = useState([21, 22, 20, 23, 20, 23, 23, 24, 24, 26, 27, 22, 21, 26])
  const [t4Check, setT4Check] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [total, setTotal] = useState(0);

  const t5s = ['alcohol', 'butterfly', 'candle', 'cloth', 'dragon', 'flower', 'octa', 'photo', 'quartz', 'scale', 'stone', 'tear', 'water', 'worm'];
  const t4s = ['book', 'candle-t4', 'chest', 'dagger', 'dragon-head', 'egg', 'green', 'helmet', 'key', 'lava', 'purple', 'shell', 'spear', 'tong'];

  const onT4Check = (index) => {
    let temp = [...t4Check];
    temp[index] = !temp[index];
    setT4Check(temp);
  }

  const onMargoTradeChange = (e) => {
    let {value} = e.target;
    setMargoTrade(value);
  }

  const onHakovenTradeChange = (e) => {
    let {value} = e.target;
    setHakovenTrade(value);
  }

  useEffect(() => {
    calculate()
  }
  ,[t4Check, hakovenTrade, margoTrade]
  );

  const calculate = () => {
    let h = hakovenTrade >= hakovenThreshold ? 43780+(29430*2)+36420 : 0;
    let m = 1250 * margoThreshold / 100 <= margoTrade ? (46544*3)+(58180*4) : 0;

    var counts = 0;
    var t4rcount = 0;

    for (var i = 0; i < t4Check.length; i++) {
      if(t4Check[i]) {
        counts++;
        if(t4Stock[i] - 4 < t4restock) {
          t4rcount++;
        }
      }
    }

    console.log(t4rcount);

    let total = 1000000 
    - (hakovenTrade >= hakovenThreshold ? 37383+(25130*2)+31098 : 0) 
    - (1250 * margoThreshold / 100 <= margoTrade ? (39743*3)+(49679*4) : 0) 
    - (counts * 12198 * 4)
    - (t4rcount * 12198 * 6);

    setTotal(total);
  }

  return (
    <div className="App">
      <div className="p-3 col-5 bg-light text-start d-block">
        <div className="row">
          <div className="col-auto align-self-center">
            <label>Enter parley cost:</label>
          </div>
          <div className="col">
            <input value={parley} className='form-control'/>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-auto align-self-center">
            <label>Enter hakoven threshold (last trade):</label>
          </div>
          <div className="col">
            <input value={hakovenThreshold} className='form-control'/>
          </div>
          <div className="col-auto align-self-center">
            <label>Enter margo run threshold %:</label>
          </div>
          <div className="col">
            <input value={margoThreshold} className='form-control'/>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-auto align-self-center">
            <label>Enter hakoven (last trade):</label>
          </div>
          <div className="col">
            <input value={hakovenTrade} onChange={onHakovenTradeChange} className='form-control'/>
          </div>
          <div className="col-auto align-self-center">
            <label>Total margo:</label>
          </div>
          <div className="col">
            <input value={margoTrade} onChange={onMargoTradeChange} className='form-control'/>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-auto align-self-center">
            <label>T4 Restock threshold</label>
          </div>
          <div className="col">
            <input value={t4restock} className='form-control'/>
          </div>
        </div>
        <p className='pt-3 fw-bold' style={{fontSize: '24px'}}>Check item for t5s</p>
        <div>
          {
            t4s.map((v, i) => 
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" onChange={(e) => onT4Check(i)} />
                <img src={process.env.PUBLIC_URL + '/' + v + '.png'} />
              </div>
            )
          }
        </div>
        <p className='pt-3 fw-bold' style={{fontSize: '24px'}}>Result</p>
        <div className="row">
          <p>
            <span className='me-2 d-inline-block'>Hakoven run</span>
            <span className='mx-2 d-inline-block fw-bold' style={{color: hakovenTrade >= hakovenThreshold ? 'green' : 'red'}}>
              {
                hakovenTrade >= hakovenThreshold ? 'Yes' : 'No'
              }
            </span>
          </p>
        </div>
        <div className="row">
          <p>
            <span className='me-2 d-inline-block'>Margo run</span>
            <span className='mx-2 d-inline-block fw-bold' style={{color: 1250 * margoThreshold / 100 <= margoTrade ? 'green' : 'red'}}>
              {
                1250 * margoThreshold / 100 <= margoTrade ? 'Yes': 'No'
              }
            </span>
          </p>
        </div>
        <div className="row">
          <p>
            <span className='me-2 d-inline-block'>Result after t5 trade</span>
          </p>
        </div>
        <div className="d-block">
          {
            t4s.map((v, i) => 
            <div className="d-inline-block me-4 border px-3 py-2">
              <img src={process.env.PUBLIC_URL + '/' + v + '.png'} />
              <span className={'ms-2 d-inline-block '} style={{color: t4Check[i] ? t4Stock[i] - 4 < t4restock ? 'red' : 'green': 'green'}}>{t4Check[i] ? t4Stock[i] - 4 : t4Stock[i]}</span>
            </div>)
          }
        </div>
        <div className="row">
          <p>
            <span className='me-2 d-inline-block'>Left over parley after above trade</span>
            <span className='mx-2 d-inline-block fw-bold'>
              {total
              }
            </span>
          </p>
        </div>
        <div className="row">
          <p>
            <span className='me-2 d-inline-block'>Remaining trade count</span>
            <span className='mx-2 d-inline-block fw-bold'>{(total.toFixed() / parley.toFixed()).toFixed()}</span>
          </p>
        </div>
        {total < 0 &&
          <>
            <div className="row">
              <p>
                <span className='me-2 d-inline-block'>After using voucher</span>
                <span className='mx-2 d-inline-block fw-bold'>{total + 250000}</span>
              </p>
            </div>
            <div className="row">
              <p>
                <span className='me-2 d-inline-block'>After using voucher count</span>
                <span className='mx-2 d-inline-block fw-bold'>{((total + 250000)/parley).toFixed()}</span>
              </p>
            </div>
          </>
        }
      </div>
    </div>
  );
}

export default App;
