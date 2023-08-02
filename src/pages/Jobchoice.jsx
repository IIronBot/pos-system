import {Link} from 'react-router-dom'
import './Jobchoice.css'
export function JobChoice (){

  return (
    <div className='jobchoice'>
      <Link to = '/cashier'><button>Cashier</button></Link>
      <Link><button>Buser</button></Link>
      <Link to ='/cook'><button>Cook</button></Link>

    </div>
  )
}

