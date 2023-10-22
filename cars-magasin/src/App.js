import React,{useState} from 'react';
import './App.css'
import Search from './components/Search'
import BrandsList from './components/BrandsList';
import CarsList from './components/CarsList'
import  AddBrand  from './components/AddBrand';
import AddCar from './components/AddCar';
const App = () => {
  const [carName,setCarName] = useState("")
  const [view,setView] = useState('brandsList')

  const handleChange = (name,view) => {
    setCarName(name)
    setView(view)
  }
  
  const changeView = (x)=>{
    {x!=="brandsList"&& x!=="carsList"&& x!=="addBrand"&& x!=="addCar"?
    (setCarName(x)):(setView(x))}
  }
  

  return (
    <div className='App'>
      <div className='nav' onClick={()=>changeView('brandsList') }>
        <span className='logo'>Cars-Magazin</span>
      </div>
      {<Search handleChange={handleChange}/>}
      <button className='container' onClick={(e)=>{handleChange('','carsList')}} >show All</button>
      {view==='brandsList'&&<button className='container' onClick={()=>{changeView('addBrand')}} >Add Brands</button>}
      {view==='addBrand'&&<AddBrand handleChange={handleChange}/>}
      {view==='brandsList' &&<BrandsList handleChange={handleChange}/>}
      {view==='carsList'&&<button className='container' onClick={()=>{changeView('addCar')}} >Add Cars</button>}
      {view==='addCar'&&<AddCar handleChange={handleChange}/>}
      {view==='carsList' &&<CarsList carName={carName}/>}
    </div>
  )
}

export default App