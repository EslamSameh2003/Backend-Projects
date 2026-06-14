import { DataTypes } from 'sequelize';
import { sequelize } from '../connection.js';


const Blog = sequelize.define('Blog', {
    id: {
        type: DataTypes.INTEGER, 
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false ,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },



},
{
    timestamps:true,

}

);


export default Blog;
