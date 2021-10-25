import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class SampleList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: []
        }


        this.handleDelete=this.handleDelete.bind(this);

    }

    componentDidMount() {
       this.getData();
    }


    getData(){

         axios.get('/sample').then(response => {
            this.setState({
                items: response.data
            })
        })

    }



 handleDelete(e) {
    e.preventDefault();
 

     const id=e.target.id.value;

    console.log(id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
   if (result.isConfirmed) {
       axios.delete('/sample/'+id)
       .then((response) => {
        this.getData();
           Swal.fire({
                  icon: 'success',
                   text: 'Data deleted successfully.',
                   showConfirmButton: true,
                   timer: 6000
                })
             
           

       });
    }
   })
     
    
      
  }


    render() {
        const { items } = this.state

        return (
          
          <div className="content-wrapper" >
    
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>Sample management</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active">Sample</li>
              <li className="breadcrumb-item active">List</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    
    <section className="content">
      <div className="container-fluid">
        
        
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">All sample list</h3>

                <div className="card-tools">
                  <div className="input-group input-group-sm" >
                  <Link to='/create' className="btn btn-primary float-right" >Create sample</Link>

                  </div>
                </div>
              </div>
              
              <div className="card-body table-responsive p-0">
              {this.state.items.length!==0 ? 
                <table className="table table-hover text-nowrap">
                  <thead>
                     <th>SL</th>
                     <th>Title</th>
                     <th>Edit</th>
                     <th>Delete</th>
                  </thead>

                {this.state.items.map((item,i)=>(
               <tbody>
                    <tr>
                       <td>{i+1}</td>
                       <td> {item.title}</td>
                       <td> 
                          <Link   className='btn btn-info'  to={`sample/${item.id}/edit`} key={item.id}  >
                             Edit 
                          </Link>
                       </td>
                       <td>
                          <form onSubmit={this.handleDelete} >
                          <input type="hidden" name="id" value={item.id}  />
                          <button type="submit"  className="btn btn-danger">Delete</button>
                          </form>
                       </td>
                    </tr>
              </tbody>
               ))}
             </table>
            : <div> No item added yet !</div> 
            }


              </div>
              
            </div>
            
          </div>
        </div>
        
        
      </div>
    </section>
   
  </div>

        )
    }
}

export default SampleList
