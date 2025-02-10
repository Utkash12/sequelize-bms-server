import { Sequelize } from'sequelize';
export const sequelize = new Sequelize('demo','root','164@KrishnaNagar',{
    host: 'localhost',
    dialect: 'mysql'
});

export const Dbconnect= async()=>{
    try{
        await sequelize.authenticate();
        console.log('Connection Successful.');
    }catch(error){
        console.error('Unsuccessful to connect!!!!', error);
    }
}