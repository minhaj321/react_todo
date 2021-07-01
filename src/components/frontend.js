import axios from 'axios';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import React, { useState,useEffect} from 'react';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
const FrontEnd = () => {
    const [input,setInput]=useState('');
    const [arr,setArr]=useState([]);
    var arrays=[];
    useEffect(()=>{
        const fetch=async()=>{
            setArr([]);
            const {data}=await axios.get('http://localhost:3001/');
            arrays=data;
            data.map((v)=>{
                arr.push(v);
            })
            setArr(arr);
                console.log(arr);
        }
        fetch();

    },[])

    const addItem=  async ()=>{
        // arr.push(input);
        var obj={
            data:input
        };
        // setArr(arr);
        setInput('');
        await axios.post('http://localhost:3001/',obj)
    }

    const deleteItem= async(id,i,edit,value)=>{
        if(edit){
            setInput(value)
        }
        console.log('delete it')
        arr.splice(i,1);
        setArr(arr);
        await axios.delete(`http://localhost:3001/${id}`);

    }
    
    return ( 
            <Container className='container'>
                <div className='input_div'>
                <TextField id="standard-basic" label="Standard"
                value={input} 
                onChange={(e)=>setInput(e.target.value)}
                />
                <Button variant="contained"
                onClick={()=>{addItem()
                }}
                >
                Link    
                </Button>
                </div>
                <div>
                    {
                        arr.map((v,i)=>{
                            return(
                            <div key={i}>
                                <p>
                                    {v.todoItem}
                                </p>
                                 <DeleteOutlineIcon
                                 onClick={()=>{
                                     deleteItem(v._id,i,false,v.todoItem)
                                 }}
                                 />
                                 <EditIcon
                                 onClick={()=>deleteItem(v._id,i,true,v.todoItem)
                                 }
                                 />   
                            </div>
                            )
                        })
                    }
                </div>    
            </Container>
    );
}
 
export default FrontEnd;