import React,{useState} from 'react'
import axios from 'axios'

export const AddCar = ({handleChange}) => {

  const [name,setName] = useState('')
  const [engine, setEngine] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [horsePower, setHorsePower] = useState('')
  const [categories, setCategories] = useState('')

  const handleAddrCar =async()=>{
    try{
      const response = await axios.post('http://localhost:8000/api/addCars',{
        name,engine,imageUrl,horsePower,categories})
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div>
      {<input className='add' type="text" placeholder="name..." onChange={(e)=>setName(e.target.value)}/>}
      {<input className='add' type="text" placeholder="engine..."onChange={(e)=>setEngine(e.target.value)}/>}
      {<input className='add' type="text" placeholder="imageUrl..."onChange={(e)=>setImageUrl(e.target.value)}/>}
      {<input className='add' type="text" placeholder="horsePower..."onChange={(e)=>setHorsePower(e.target.value)}/>}
      {<input className='add' type="text" placeholder="categories..."onChange={(e)=>setCategories(e.target.value)}/>}
      {<button className='container' onClick={(e)=>{handleAddrCar()&&handleChange('','carsList')}} >Add Car</button>}
    </div>
  )
}

export default AddCar