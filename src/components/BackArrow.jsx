import React from 'react'
import {Link} from 'react-router-dom';
import { ArrowLeft } from 'phosphor-react';


export function BackArrow(prop) {
  //where the link will go
  const location = prop.data
  return (
    <div>
      <Link to={`/${location}`}><ArrowLeft className = 'backArrow' /></Link>

    </div>
  )
}

