import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
//Creating Reusable list of component Develop a reusable ListComponent that takes
//array of items pops.
const Create = () => {
       const[title,setTitle]=useState('');
       const[body,setBody]=useState('');
       const[author,setAuthor]=useState('');
       const[isPending,setIsPending]=useState(false);
       const history=useHistory();
       
       const handleSubmit=(e)=>{
         e.preventDefault();
         const blog={title,body, author};
         setIsPending(true);
        fetch('http://localhost:8000/blogs',
       {
              method: 'POST',
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify(blog)
        }).then(()=>{
              console.log('new blog a added');
              setIsPending(false);
              
             //Dynamic display to home 
              history.push('/');
        });
       }
    return ( 
    <div className="create">
           <h2>Add new blog</h2>
           <form onSubmit={handleSubmit}>
              <label htmlFor="">Blog title</label>
              <input type="text"required 
              value={title}
              onChange={(e)=>setTitle(e.target.value)}/>

              <label htmlFor="">Blog Body</label>
              <textarea required
              value={body}
              onChange={(e)=>setBody(e.target.value)} ></textarea>
              
               
              <label htmlFor="">Blog Author</label>
              <select
               value={author}
               onChange={(e)=>setAuthor(e.target.value)}>
             
                     <option value="mario">mario</option>
                     <option value="yoshi">yoshi</option>
              </select>
             {!isPending && <button>Add blog</button>}
             {isPending && <button disabled>Adding blog...</button>}
              
           </form>
    </div>
     );
}
 
export default Create;