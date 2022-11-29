import * as _ from 'lodash-contrib'
import * as jstat from 'jstat'

var result = {
  n: 0,
  jumlah: 0,
  avg: 0,
  modus: 0,
  min:0,
  max: 0,
  jangkauan:0,
  'q1': 0,
  'q2': 0,
  'q3': 0,
  sr: 0,
  sb: 0,
  v: 0
}

function meanDeviation(data) {
  const avg = jstat.mean(data);
  const n = data.length
  let _absValue = 0
  for (let i = 0; i < data.length; i++) {
    const c = data[i];
    _absValue += Math.abs(c - avg)
  }
  return _absValue / n
}

function setInvalid() {
  document.getElementById('input').classList.add('is-invalid')
  document.getElementById('errMsg').classList.remove('d-none')
}

function setNotInvalid() {
  document.getElementById('input').classList.remove('is-invalid')
  document.getElementById('errMsg').classList.add('d-none')
}

function renderResult(r) {
  const _keys = Object.keys(r)

  for (let i = 0; i < _keys.length; i++) {
    const key = _keys[i];
    document.getElementById(`result_${key}`).innerHTML = result[key]
  }
}

const handleClickButton = (e) => {
  let isError = false
  const rawInputValue = input.value.split(',')
  let inputValue = []
  for (let i = 0; i < rawInputValue.length; i++) {
      if(_.isNumeric(rawInputValue[i])){
        inputValue.push(parseInt(rawInputValue[i]))        
      }else{
        setInvalid()
        isError = true
        break
      }
  }

  // n
  result.n = inputValue.length
  
  // jumlah
  result.jumlah = jstat.sum(inputValue)

  // avg
  result.avg = jstat.mean(inputValue)

  // modus
  result.modus = jstat.mode(inputValue)

  // min
  result.min = jstat.min(inputValue)

  // max
  result.max = jstat.max(inputValue)

  // jangkauan
  result.jangkauan = jstat.range(inputValue)

  // q1
  result.q1 = jstat.quartiles(inputValue)[0]

  // q2
  result.q2 = jstat.quartiles(inputValue)[1]
  
  // q3
  result.q3 = jstat.quartiles(inputValue)[2]

  // sr 
  result.sr = jstat.meandev(inputValue)

  // sb
  result.sb = jstat.stdev(inputValue)

  // variansi
  result.v = jstat.variance(inputValue)

  // urut
  document.getElementById('result_urut').innerHTML = `urut = ${_.sortBy(inputValue)}`

  console.log(jstat.quartiles(inputValue));
  if (!isError){
    renderResult(result)    
  } 

  
}

const handleChangeInput = (e) => {
  setNotInvalid()
}

const input = document.getElementById('input');
const calculateButton = document.getElementById('calculate')

calculateButton.addEventListener('click', handleClickButton)
input.addEventListener('change', handleChangeInput)