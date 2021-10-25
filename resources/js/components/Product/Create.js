import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

    class ProductCreate extends Component {
      
      constructor (props) {
        super(props)
        this.state = {
          product_name: '',
          product_code: '',
          product_image: '',
          product_price: '',
          errors: []
        }


        this.handleCreateNewItem = this.handleCreateNewItem.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)

        this.input = React.createRef();
        


      }
      handleChange = (e) => {
        this.setState({
          product_image: e.target.files[0]
        })
      }


      handleCreateNewItem (event) {
        event.preventDefault();
        
        const data = new FormData() 
        data.append('product_name', product_name.value)
        data.append('product_code', product_code.value)
        data.append('product_image', this.state.product_image)
        data.append('product_price', product_price.value)
        
        
        axios.post('/product-store', data )
          .then(response => {
            
            Swal.fire(
              'Saved!',
              'Data saved successfully.',
              'success'
            )
            this.context.history.push('/samplelist')
            //history.push('/samplelist')
            
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

                <Link className='btn btn-primary btn-sm mb-3' to='/productlist'>
                      Back to listing
                </Link>

                <div className='card'>
                  <div className='card-header'>Add New  </div>
                  <div className='card-body'>
                    <form onSubmit={this.handleCreateNewItem} encType="multipart/form-data" id="imageForm" >
                      
                      <div className='form-group'>
                        <label htmlFor='product_name'>  Product name</label>
                        <input
                          id='product_name'
                          type='text'
                          className={`form-control ${this.hasErrorFor('product_name') ? 'is-invalid' : ''}`}
                          name='product_name'
                          ref={this.input}
                        />
                        {this.renderErrorFor('product_name')}
                      </div>
                      
                      <div className='form-group'>
                        <label htmlFor='product_code'>  Product code</label>
                        <input
                          id='product_code'
                          type='text'
                          className={`form-control ${this.hasErrorFor('product_code') ? 'is-invalid' : ''}`}
                          name='product_code'
                          ref={this.input}
                        />
                        {this.renderErrorFor('product_code')}
                      </div>

                      <div className='form-group'>
                        <label htmlFor='product_image'>  Product image</label>
                        <input
                          id='product_image'
                          type='file'
                          className={`form-control ${this.hasErrorFor('product_image') ? 'is-invalid' : ''}`}
                          name='product_image' onChange={this.handleChange} 
                          ref={this.input}
                        />
                        {this.renderErrorFor('product_image')}
                      </div>

                      <div className='form-group'>
                        <label htmlFor='product_price'>  Product price</label>
                        <input
                          id='product_price'
                          type='number'
                          className={`form-control ${this.hasErrorFor('product_price') ? 'is-invalid' : ''}`}
                          name='product_price'
                          ref={this.input}
                        />
                        {this.renderErrorFor('product_price')}
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

    export default ProductCreate