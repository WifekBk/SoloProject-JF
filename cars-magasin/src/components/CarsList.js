import React,{useState,useEffect} from 'react'
import axios from 'axios'

const CarsList = ({carName}) => {

    const [cars , setCars] = useState([])
    const [show, setShow] = useState(false)
    const [id, setId] = useState('')
    const [updateName, setUpdateName] = useState('');
    const [updateEngine, setUpdateEngine] = useState('');
    const [updateImageUrl, setUpdateImageUrl] = useState('');
    const [updateHorsePower, setUpdateHorsePower] = useState('');
    const [updateCategories, setUpdateCategories] = useState('');

    useEffect(() =>{
      axios.get("http://localhost:8000/api/cars")
      .then(({data})=>{
        setCars(data)
      })
      .catch((err)=>{
        console.log(err)
      })
    },[])

    const fetchCars = () => {
      axios.get("http://localhost:8000/api/cars")
        .then(({ data }) => {
          setCars(data);
          setShow(false)
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const handleDeleteCar = (carId)=>{
      axios.delete(`http://localhost:8000/api/deleteCar/${carId}`)
      .then(({data})=>{
        fetchCars()
      })
      .catch((err)=>{
        console.log(err)
      })
    }

    const handleCarUpdate = (carId) => {
      axios.put(`http://localhost:8000/api/updateCar/${carId}`, {
        name: updateName,
        engine: updateEngine,
        imageUrl: updateImageUrl,
        horsePower: updateHorsePower,
        categories: updateCategories,
      })
        .then(({data}) => {
          setShow(false)
          fetchCars()
        })
        .catch((err) => {
          console.log(err)
        });
    };

    const handleUpdate = (car) => {
      setUpdateName(car.name);
      setUpdateEngine(car.engine);
      setUpdateImageUrl(car.imageUrl);
      setUpdateHorsePower(car.horsePower);
      setUpdateCategories(car.categories);
      setShow(true);
    }



  return (
    <div className='cars-list'>
      {cars.filter((car)=>car.name.toLowerCase().includes(carName.toLowerCase())).map((c,i) => {
                return (
                  <div className="cars-card"onClick={(e)=>{setId(c._id)}}>
                  <div className="cars-card">
                    <img className='cars-image' src={c.imageUrl} alt='img' />
                  </div>
                  <div className="cars-card">
                    <h2>{c.name}</h2>
                    <li>{c.engine}</li>
                    <li>{c.horsePower}</li>
                    <li>{c.categories}</li>
                    <button className='update'onClick={(e)=>{handleDeleteCar(c._id)}}>delete</button>
                    {show === false && <button className='update'onClick={(e)=>{handleUpdate(c)&&console.log(c._id)}}>update</button>}
                  </div>
                </div>
                )})
      }
      <>
      {show === true && <input className='add' type="text" value={updateName} onChange={(e) => setUpdateName(e.target.value)} />}
      {show === true && <input className='add' type="text" value={updateEngine} onChange={(e) => setUpdateEngine(e.target.value)}/>}
      {show === true && <input className='add' type="text" value={updateImageUrl} onChange={(e) => setUpdateImageUrl(e.target.value)} />}
      {show === true && <input className='add' type="text" value={updateHorsePower} onChange={(e) => setUpdateHorsePower(e.target.value)}/>}
      {show === true && <input className='add' type="text" value={updateCategories} onChange={(e) => setUpdateCategories(e.target.value)}/>}
      {show === true && <button className='update'onClick={(e) => {handleCarUpdate(id)}}>update</button>}
      </>
              
    </div>
  )

}

export default CarsList