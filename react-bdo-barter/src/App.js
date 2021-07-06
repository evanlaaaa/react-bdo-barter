import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [parley, setParley] = useState(localStorage.getItem('parley') === null ? 14.61 : localStorage.getItem('parley'));
  const [hakovenThreshold, setHakovenThreshold] = useState(localStorage.getItem('hakt') === null ? 100 : localStorage.getItem('hakt'));
  const [margoThreshold , setMargoThreshold] = useState(localStorage.getItem('margot') === null ? 70 : localStorage.getItem('margot'));
  const [hakovenTrade, setHakovenTrade] = useState(localStorage.getItem('hakoven_trade') === null ? 0 : localStorage.getItem('hakoven_trade'));
  const [margoTrade, setMargoTrade] = useState(localStorage.getItem('margo_trade') === null ? 0 : localStorage.getItem('margo_trade'));
  const [t4restock, setT4Restock] = useState(localStorage.getItem('t4stockt') === null ? 20 : localStorage.getItem('t4stockt'));
  const [t4Stock, setT4Stock] = useState(localStorage.getItem('stock') === null ? [21, 22, 20, 23, 20, 23, 23, 24, 24, 26, 27, 22, 21, 26] : JSON.parse(localStorage.getItem('stock')))
  const [t4Check, setT4Check] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [total, setTotal] = useState(0);

  const t5s = ['alcohol', 'butterfly', 'candle', 'cloth', 'dragon', 'flower', 'octa', 'photo', 'quartz', 'scale', 'stone', 'tear', 'water', 'worm'];
  const t4s = ['book', 'candle-t4', 'chest', 'dagger', 'dragon-head', 'egg', 'green', 'helmet', 'key', 'lava', 'purple', 'shell', 'spear', 'tong'];

  const onT4Check = (index) => {
    let temp = [...t4Check];
    temp[index] = !temp[index];
    setT4Check(temp);
  }

  useEffect(
    () => {
      if(localStorage.getItem('parley') === null) {
        localStorage.setItem('parley', 14.61);
      }
      if(localStorage.getItem('hakt') === null) {
        localStorage.setItem('hakt', 100);
      }
      if(localStorage.getItem('margot') === null) {
        localStorage.setItem('margot', 70);
      }
      if(localStorage.getItem('hakoven_trade') === null) {
        localStorage.setItem('hakoven_trade', 0);
      }
      if(localStorage.getItem('margo_trade') === null) {
        localStorage.setItem('margo_trade', 0);
      }
      if(localStorage.getItem('t4stockt') === null) {
        localStorage.setItem('t4stockt', 20);
      }
      if(localStorage.getItem('stock') === null) {
        localStorage.setItem('stock', JSON.stringify([21, 22, 20, 23, 20, 23, 23, 24, 24, 26, 27, 22, 21, 26]));
      }
      if(localStorage.getItem('t4stockt') === null) {
        localStorage.setItem('t4stockt', 20);
      }
    }, []
  )

  const onMargoTradeChange = (e) => {
    let {value} = e.target;
    localStorage.setItem('margo_trade', value);
    setMargoTrade(value);
  }

  const onHakovenTradeChange = (e) => {
    let {value} = e.target;
    localStorage.setItem('hakoven_trade', value);
    setHakovenTrade(value);
  }

  useEffect(() => {
    calculate()
  }
  ,[t4Check, hakovenTrade, margoTrade, t4Stock]
  );

  const calculate = () => {
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

    let total = 1000000 
    - (parseInt(hakovenTrade) >= parseInt(hakovenThreshold) ? (43780-(43780*parley/100))+((29430-(29430*parley/100))*2)+(36420-(36420*parley/100)) : 0) 
    - (1250 * margoThreshold / 100 <= margoTrade ? ((46544-(46544*parley/100))*3)+((58180-(58180*parley/100))*4) : 0) 
    - (counts * (14286-(14286*parley/100)) * 4)
    - (t4rcount * (14286-(14286*parley/100)) * 6);

    setTotal(total);
  }

  const onStockChange = (e, i) => {
    let {value} = e.target;
    let temp = [...t4Stock];

    temp[i] = value;

    localStorage.setItem('stock', JSON.stringify(temp));

    setT4Stock(temp);
  }

  const onStockSync = () => {
    let temp = [...t4Stock];
    for(var i = 0; i < t4Stock.length; i++) {
      if(t4Check[i]) {
        temp[i] = temp[i] - 4;
        if(t4Stock[i] - 4 < t4restock) {
          temp[i] = temp[i] + 12;
        }
      }
    }

    localStorage.setItem('stock', JSON.stringify(temp));

    setHakovenTrade(0);
    setMargoTrade(0);
    setT4Stock(temp);
  }

  const onParleyChange = e => {
    let {value} = e.target;
    localStorage.setItem('parley', value);
    setParley(value);
  }

  const onHakTChange = e => {
    let {value} = e.target;
    localStorage.setItem('hakt', value);
    setHakovenThreshold(value);
  }

  const onMargoTChange = e => {
    let {value} = e.target;
    localStorage.setItem('margot', value);
    setMargoThreshold(value);
  }

  const onT4Tchange = e => {
    let {value} = e.target;
    localStorage.setItem('t4stockt', value);
    setT4Restock(value);
  }

  return (
    <div className="App d-flex">
      <div className="p-3 col-5 bg-light text-start d-block">
        <div className="row">
          <div className="col-auto align-self-center">
            <label>Enter parley discount %:</label>
          </div>
          <div className="col">
            <input value={parley} onChange={onParleyChange} className='form-control'/>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-auto align-self-center">
            <label>Enter hakoven threshold (last trade):</label>
          </div>
          <div className="col">
            <input value={hakovenThreshold} onChange={onHakTChange} className='form-control'/>
          </div>
          <div className="col-auto align-self-center">
            <label>Enter margo run threshold %:</label>
          </div>
          <div className="col">
            <input value={margoThreshold} onChange={onMargoTChange} className='form-control'/>
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
            <input value={t4restock} onChange={onT4Tchange} className='form-control'/>
          </div>
        </div>
        <p className='pt-3 fw-bold' style={{fontSize: '24px'}}>Check item for t5s</p>
        <div>
          {
            t4s.map((v, i) => 
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" onChange={(e) => onT4Check(i)} />
                <img src={process.env.PUBLIC_URL + '/' + v + '.png'} />
              </div>
            )
          }
        </div>
        <p className='pt-3 fw-bold' style={{fontSize: '24px'}}>Result</p>
        <div className="row">
          <p>
            <span className='me-2 d-inline-block'>Hakoven run</span>
            <span className='mx-2 d-inline-block fw-bold' style={{color: parseInt(hakovenTrade) >= parseInt(hakovenThreshold) ? 'green' : 'red'}}>
              {
                parseInt(hakovenTrade) >= parseInt(hakovenThreshold) ? 'Yes' : 'No'
              }
            </span>
          </p>
        </div>
        <div className="row">
          <p>
            <span className='me-2 d-inline-block'>Margo run</span>
            <span className='mx-2 d-inline-block fw-bold' style={{color: 1250 * margoThreshold / 100 <= margoTrade ? 'green' : 'red'}}>
              {
                1250 * parseInt(margoThreshold) / 100 <= parseInt(margoTrade) ? 'Yes': 'No'
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
          {t4Stock &&
            t4s.map((v, i) => 
            <div className="d-inline-block me-4 border px-3 py-2">
              <img src={process.env.PUBLIC_URL + '/' + v + '.png'} />
              <span className={'ms-2 d-inline-block '} style={{color: t4Check[i] ? t4Stock[i] - 4 < t4restock ? 'red' : 'green': t4Stock[i] < t4restock ? 'red' : 'green'}}>{t4Check[i] ? t4Stock[i] - 4 : t4Stock[i]}</span>
            </div>)
          }
        </div>
        <div className="row">
          <p>
            <span className='me-2 d-inline-block'>Left over parley after above trade</span>
            <span className='mx-2 d-inline-block fw-bold'>
              {Math.trunc(total)
              }
            </span>
          </p>
        </div>
        <div className="row">
          <p>
            <span className='me-2 d-inline-block'>Remaining trade count</span>
            <span className='mx-2 d-inline-block fw-bold'>{Math.trunc((total / Math.trunc((14286-(14286*parley/100)))))}</span>
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
                <span className='mx-2 d-inline-block fw-bold'>{Math.trunc(((total + 250000)/Math.trunc((14286-(14286*parley/100)))))}</span>
              </p>
            </div>
          </>
        }
      </div>
      <div className="col-3 p-3">
        <div className="row">
          <p className='pt-3 fw-bold' style={{fontSize: '24px'}}>T4s stocks</p>
          <div>
            {t4Stock &&
              t4s.map((v, i) => 
                <div className="form-inline">
                  <input onChange={(e) => onT4Check(i)} value={t4Stock[i]} onChange={(e) => onStockChange(e, i)}/>
                  <img src={process.env.PUBLIC_URL + '/' + v + '.png'} />
                </div>
              )
            }
          </div>
        </div>
      </div>
      <button onClick={onStockSync}>Set to stock</button>
    </div>
  );
}

export default App;
