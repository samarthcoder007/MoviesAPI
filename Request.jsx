import "./Request.css"
export function Request({post,deletemovie,getmoviesOne,getmoviesAll}){

    function val() {
      const value1 = document.getElementById('dropdown')
      const value2 = document.getElementById('query')

      const selected1 = value1.value
      const selected2 = value2.value

      if(selected1==="get" && selected2===""){
        getmoviesAll()
      }
      else if(selected1==="get" && typeof selected2 === 'string'){
        getmoviesOne(selected2)
      }
      else if(selected1==="post"){
        try{
          const parsedData = JSON.parse(selected2);
          post(parsedData)
        }catch(err){
          console.log(err.message)
        }
      }
      else if(selected1==="delete" && selected2!==""){
        deletemovie(selected2)
      }
    }

    return (
    <>
      <div className="input-container">
  <div>
    <select id="dropdown">
      <option value="get">GET</option>
      <option value="post">POST</option>
      <option value="delete">DELETE</option>
      <option value="patch">PATCH</option>
      <option value="put">PUT</option>
    </select>
  </div>
  <input type="text" id="query"/>
  <button id='btn' onClick={val}>Send</button>
 </div>
    </>
    )
}