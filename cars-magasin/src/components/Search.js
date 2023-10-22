import React,{useState}from 'react'
const Search = ({handleChange}) => {
   const [input,setInput] = useState("")

   const resetInput = () => {
    setInput('')
   }

   const handleInput = () => {
    handleChange(input,'carsList')
    resetInput()
   } 

    return (
        <div className ='searchForm' >
            <input className='search' type="text" placeholder="............." onChange={(e)=>setInput(e.target.value)}/>
            <button className='searchButton' onClick={(e)=>{handleInput()}} >Search</button>
        </div>
    )
}
export default Search