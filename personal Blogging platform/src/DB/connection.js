import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('BlogPlatform', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const connecionDB = async () => {
    try {   
         await sequelize.authenticate();            
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }   
}


export {connecionDB,sequelize};


export const Test_connct = async () => {

    try {
        await sequelize.sync({ alter: true });
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to synchronize the models:', error);
    }

}

Test_connct();
     
