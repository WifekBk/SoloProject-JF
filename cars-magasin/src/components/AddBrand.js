import React, {useState} from 'react'
import axios from 'axios'

export const AddBrand = ({handleChange}) => {
  const [name,setName] = useState('')
  const [url,setUrl]= useState('')
  
  const handleAddBrand =async()=>{
    try{
      const response = await axios.post('http://localhost:8000/api/addBrands',{ 
        name, 
        imageUrl: url})
    }
    catch(err){
      console.log(err)
    }
  }
  

  return (
    <div>
      {<input className='add' type="text" placeholder="name..." onChange={(e)=>setName(e.target.value)}/>}
      {<input className='add' type="text" placeholder="imageUrl..." onChange={(e)=>setUrl(e.target.value)}/>}
      {<button className='container' onClick={(e)=>{
        handleAddBrand () && handleChange('','brandsList')}} >Add Brands</button>}
    </div>
  )
}
export default AddBrand 