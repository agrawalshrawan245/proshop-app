import React, { useState } from "react"
import { Form, Button } from 'react-bootstrap'



const SearchBox = ({history}) => {
    const [keyword, setKeyword] = useState('')


    const submitHandler = (e) =>{
        e.preventDefault()
        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        }else{
            history.push('/')
        }
    }

    return (
        // <Form onSubmit={submitHandler} inline>
        //     {/* <Form.Group controlId='searchBox'> */}
        //         <Form.Control type='text' value={keyword} onChange={ e => setKeyword(e.target.value)} ></Form.Control>
        //         <Button variant='primary' className='p-2'>Submit</Button>
        //     {/* </Form.Group> */}
        // </Form>
    // <Form onSubmit={submitHandler} inline>
    //   <Form.Control
    //     type='text'
    //     name='q'
    //     onChange={(e) => setKeyword(e.target.value)}
    //     placeholder='Search Products...'
    //     className='mr-sm-2 ml-sm-5'
    //   ></Form.Control>
    //   <Button type='submit' variant='outline-success' className='p-2'>
    //     Search
    //   </Button>
    // </Form>    
<form onSubmit={submitHandler}>
  <input type="text" id="search" name="search"  placeholder='Search Products...' onChange={(e) => setKeyword(e.target.value)} className="p-2"/>
  <input type="submit" value="Submit" className="py-2 px-3 bg-success"/>
</form>
)

}

export default SearchBox

