const router = require('express').Router()
const conexion = require('./config/conexion')


//agregamos las rutas
//get productos
router.get('/',(req,res)=>{
    let sql = 'select * from Productos'
    conexion.query(sql,(error,rows,fields)=>{
        if(error) throw error;
        else{
            res.json(rows)
        }
    })

})
//------------------------------

//get producto
router.get('/:id',(req,res)=>{
    const {id} = req.params
    let sql = 'select * from Productos where id_producto = ?'
    conexion.query(sql,[id],(error,rows,fields)=>{
        if(error) throw error;
        else{
            if(rows.length > 0){
                res.json(rows[0])
            }else{
                res.status(404).json({message:'No existe el producto'});
            }
        }
    })
})



//agregar producto
router.post('/',(req,res)=>{
    console.log(req.body); // Añade esto para hacer seguimiento a los datos que recibes.
    
    const {nombre_producto, descripcion, cantidad_inventario, precio, id_categoria} = req.body
    let sql = `insert into Productos (nombre_producto, descripcion, cantidad_inventario, precio, id_categoria) values('${nombre_producto}','${descripcion}','${cantidad_inventario}','${precio}','${id_categoria}')`
    conexion.query(sql,(error,rows,fields)=>{
        if(error) throw error
        else{
            res.json({status:'Producto agregado'})
        }
    })
})


//eliminar producto
router.delete('/:id',(req,res)=>{
    const {id} = req.params
    let sql = `delete from Productos where id_producto = ${id}`
    conexion.query(sql,(error,rows,fields)=>{
        if(error) throw error
        else{
            res.json({status:'Producto eliminado'})
        }
    })
})


//modificar producto
router.put('/:id',(req,res)=>{
    const {id} = req.params
    const {nombre_producto, descripcion, cantidad_inventario, precio, id_categoria} = req.body
    let sql = `update Productos set 
                nombre_producto = '${nombre_producto}', 
                descripcion = '${descripcion}', 
                cantidad_inventario = '${cantidad_inventario}', 
                precio = '${precio}', 
                id_categoria = '${id_categoria}' 
                where id_producto = ${id}`
    
    conexion.query(sql,(error,rows,fields)=>{
        if(error) throw error
        else{
            res.json({status:'Producto modificado'})
        }
    })
})



module.exports = router;
