import React from 'react'

export default function InputBox(props) {
  return (
    <div style={{marginBottom:'10px'}}>
        <input type={props.type} name={props.name} placeholder={props.placeholder} style={{padding:'8px',width:'40%',textAlign:'center',borderRadius:'6px'}} onChange={props.onChange}/>
    </div>
  )
}
