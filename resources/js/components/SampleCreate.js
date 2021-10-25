import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'


    class SampleCreate extends Component {
      constructor (props) {
        super(props)
        this.state = {
          title: '',
          body: '',
          errors: []
        }

        this.handleCreateNewItem = this.handleCreateNewItem.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)

        this.input = React.createRef();  


      }

      

      handleCreateNewItem (event) {
        event.preventDefault();

 
        const { title,body } = event.target

        const { history } = this.props

        const data = {
          title: title.value,
          body: body.value,
        }

        axios.post('/sample', data)
          .then(response => {
            // redirect to the homepage
            Swal.fire(
              'Saved!',
              'Data saved successfully.',
              'success'
            )
            history.push('/samplelist')
          })
          .catch(error => {
            this.setState({
              errors: error.response.data.errors
            })
          })

          
      }

      hasErrorFor (field) {
        return !!this.state.errors[field]
      }

      renderErrorFor (field) {
        if (this.hasErrorFor(field)) {
          return (
            <span className='invalid-feedback'>
              <strong>{this.state.errors[field][0]}</strong>
            </span>
          )
        }
      }

      render () {
        return (
          <div className="content-wrapper">
          <div className='container py-4'>
            <div className='row justify-content-center'>
            
              <div className='col-md-12'>

              <Link className='btn btn-primary btn-sm mb-3' to='/samplelist'>
                      Back to listing
                </Link>

                <div className='card'>
                  <div className='card-header'>Add New  </div>
                  <div className='card-body'>
                    <form onSubmit={this.handleCreateNewItem}>
                      
                      <div className='form-group'>
                        <label htmlFor='title'>  Title</label>
                        <input
                          id='title'
                          type='text'
                          className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : ''}`}
                          name='title'
                          ref={this.input}
                        />
                        {this.renderErrorFor('title')}
                      </div>
                      
                      <div className='form-group'>
                        <label htmlFor='body'>  Description</label>
                        <textarea
                          id='body'
                          className={`form-control ${this.hasErrorFor('description') ? 'is-invalid' : ''}`}
                          name='body'
                          rows='10'
                         ref={this.input}
                        />
                        {this.renderErrorFor('body')}
                      </div>
                      <button className='btn btn-primary'>Create</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        )
      }
    }

    export default SampleCreate