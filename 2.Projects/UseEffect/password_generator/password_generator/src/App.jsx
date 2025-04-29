import { useCallback, useEffect, useState,useRef } from 'react'
import './App.css'
function App() {
  const [length,setLength]=useState(8)
  const[numberAllowed,setNumberAllowed]=useState(false)
  const[character,setCharacterAllowed]=useState(false)

  const [password,setPassword]=useState("")


  //useRef hook
  const passwordRef=useRef(null)

  //method to generate passowrd
  const passwordGenerator=useCallback(()=>{
    let pass="" // right now empty , the gneerated password will be held , and we will add to passowrd using setPassword

    let str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"


    //when either number or hcaracter checkbox is opted
    if(numberAllowed) str+="0123456789"
    if(character) str+="!#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"


    //now when we are deciding the length
    for(let i=1;i<=length;i++)
    {
      let char=Math.floor(Math.random()*str.length+1) //+1 to avoid 0th value

      pass+=str.charAt(char);
    }

    setPassword(pass)

  },[numberAllowed,length,character,setPassword])

  //method to copy the password to clipboard
  const copyPasswordToClipBoard = useCallback(()=>{
    passwordRef.current?.select();  //? - to optionally correct , what if curretn value is zero
    // passwordRef.current?.setSelectionRange(0,3) // to select a particular range
    window.navigator.clipboard.writeText(password)
    setButtonColor('bg-green-500');
  },[password])

useEffect(()=>{
  passwordGenerator()
},[length,numberAllowed,character,passwordGenerator])




  //HTML COntent
  return(
  <>
  <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-blue-950'>
    <h2 className=' text-2xl text-orange text-center my-3'>Password Generator</h2>
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input type="text" 
      value={password}
      className='outline-none w-full py-1 px-3 bg-white'
      placeholder='password'
      readOnly
      ref={passwordRef}
      
      />
      <button 
      onClick={copyPasswordToClipBoard} 
      className='outline-none bg-blue-800 rounded-none text-white px-3 py-0.5 shrink=0'>
        copy</button>

    </div>
    <div className='flex text-sm gap-x-2'>
      <div className=' flex items-center gap-x-1'>
        <input type="range"
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'  
        onChange={ (e)=> {setLength(e.target.value)}} />
      
        <label>Length:{length}</label>

      </div>
      <div className=' flex items-center gap-x-1'>
      <input type="checkbox"
       defaultChecked={numberAllowed}  
       id="numberInput"
        onChange={ ()=> {setNumberAllowed((prev)=> !prev)

        }} />
        <label htmlFor="numberInput">Numbers</label>


      </div>
      <div className=' flex items-center gap-x-1'>
      <input type="checkbox"
       defaultChecked={character}  
       id="charInput"
        onChange={ ()=> {setCharacterAllowed((prev)=> !prev)

        }} />
        <label htmlFor="charInput">Characters</label>


      </div>
    </div>
  </div>


  </>
  )

}

export default App
