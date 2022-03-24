import react from 'react';
import "./playersList.css"
import { useState,useEffect } from 'react';
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
  
  const images = importAll(require.context('./playerImages', false, /\.(png|jpe?g|svg)$/));


export const List=()=>{
    const[formData,setFormData]=useState([])
    function search(){
      setFormData(formData.filter(function (el) {
        return el.TName === ser || el.PFName === ser 
      }));
      }
      const [ser,setSer]=useState("");
      function handleChange(e){
        e.preventDefault();
        setSer(e.target.value);
        }
    const getplayer=async()=>{
      const response=await fetch("https://api.npoint.io/20c1afef1661881ddc9c");
      const ex=await response.json();
      setFormData(ex.playerList.sort((a,b)=>a.Value-b.Value));
    }
    useEffect(()=>{
        getplayer();
        console.log(formData)
    },[])
 function display(time){
  var date = new Date(`${time} UTC`);
  date.toString();
  return date.toTimeString();
 }
  return (
      
      <>
      <input placeholder='Search player' value={ser} type="text" onChange={handleChange}></input>
      <button onClick={search}>Search</button>
      {formData.map((e,i)=>{
          return (
          <div key={i} className="box">
              <img src={images[`${e.Id}.jpg`]} alt=" Sorry! image not available"/>
             <div>
             <h2>Player's Name {e.PFName}</h2>
              
              <h4>Skills {e.SkillDesc}</h4>
             
              <h4>Value - ${e.Value}</h4>
              <h4>Upcoming Matches - </h4>
              <div>
                {e.UpComingMatchesList.map((mat,i)=>(
                  <div key={i}>
                  <h4>Match {i+1}</h4>
                  <h4>{mat.CCode} vs {mat.VsCCode}</h4>
                  <h4>Match Date - {display(mat.MDate)}</h4>
                  </div>
                ))}
              </div>
              
             </div>
              
          </div>)
      })}
     
        
      </>
  )  
}