import React,{useEffect,useState} from 'react';
import axios from 'axios';


const BrandsList = ({handleChange}) => {
  const [brands , setBrands] = useState([])
  const [show , setShow] = useState(false)
  const [id, setId] = useState('')
  const [updateName , setUpdateName] = useState('')
  const [updateUrl , setUpdateUrl] = useState('')

 
  useEffect(() =>{
    axios.get("http://localhost:8000/api/brands")
    .then(({data})=>{
      setBrands(data)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])

  const fetchBrands = () => {
    axios.get("http://localhost:8000/api/brands")
      .then(({ data }) => {
        setBrands(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const handleDeleteBrand = (brandId)=>{
    axios.delete(`http://localhost:8000/api/deleteBrand/${brandId}`)
    .then(({data})=>{
      fetchBrands()
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const handleUpdate = (brand) => {
    setUpdateName(brand.name);
    setUpdateUrl(brand.imageUrl);
    setShow(true)
  }

  const handleBrandUpdate = (brandId) => {
    axios.put(`http://localhost:8000/api/updateBrand/${brandId}`, {
      name: updateName, 
      imageUrl: updateUrl, 
    })
      .then(({ data }) => {
        setShow(false);
        fetchBrands();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  
  
  return (
    <div>
      
      <div className ='brand-list'>
      {brands.map((brand,index)=>{
        return(
          <div className="brand-card" onClick={(e)=>{setId(brand._id)}}>
          <div >
          <h1 onClick={(e)=>{handleChange(e.target.textContent,"carsList")}}>{brand.name}</h1>
          </div>
          <img className='brand-image' src={brand.imageUrl} alt='img'/>
          <div>
          <button className='update'onClick={(e)=>{handleDeleteBrand(brand._id)}}>delete</button>
          {show === false && <button className='update' onClick={(e)=>{handleUpdate(brand)}}>update</button>}
          </div>
          </div>
        ) 
      })}
      <>
      {show === true && <input className='add' type="text" value={updateName} onChange={(e) => setUpdateName(e.target.value)} />}
          {show === true && <input className='add' type="text" value={updateUrl} onChange={(e) => setUpdateUrl(e.target.value)}/>}
          {show === true && <button className='update'onClick={(e) => handleBrandUpdate(id)}>update</button>}
      </>
      
      </div>
      
    </div>
  )
}

export default BrandsList
