import {useState, useEffect } from "react";
//Using UseState
const useFetch= (url)=>
{
    const [data, setData] = useState(null);
    const[isPending, setIsPending]=useState(true);
    const[error,setError]=useState(null);

    //Using useEffect  and hooks 
    useEffect(()=>

        {
         const abortCont=new AbortController();

        setTimeout(()=>{
            fetch(url, {signal: abortCont.signal}) 
        .then(res=>
        {
           if(!res.ok){
            throw Error('Cloud not fetch the data for that resources');
           }
            return res.json();
        })

        .then(data=>
        {
            setData(data)
            setIsPending(false)
            setError(null)
           })
           .catch(err=>
        { if(err.name==='AbortError')
          {
             console.log('Fetch abortd')
          }else
          { 
             setIsPending(false)
            setError(err.message);    
          }
            
           })
        },1000)
        return ()=>{ abortCont.abort()

        };
    },[url]);
       return {
        data,isPending,error
       }
}

export default useFetch;