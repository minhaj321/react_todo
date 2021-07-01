const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');

const app=express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/todo',
 {useCreateIndex:true , useNewUrlParser: true,useUnifiedTopology: true}
);

const connection=mongoose.connection;

connection.once('open',()=>{
console.log('google');
})


const todoSchema = mongoose.Schema({
    todoItem : String,
})

const todo=mongoose.model('todos',todoSchema);


app.get('/',(req,res)=>{
    todo.find().then(response=>res.json(response)
        )
})

app.post('/',(req,res)=>{
    const newItem=new todo({
        todoItem:req.body.data
    })
    newItem.save();
})


app.delete('/:id',(req,res)=>{
    
    const id=req.params.id;
    console.log(id)
    todo.deleteOne({_id:id},function(err){
        if(err){
            console.log('err===>',err);
        }
    });
})



app.listen(3001,()=>{
    console.log('the app is runnng on 3001')
});