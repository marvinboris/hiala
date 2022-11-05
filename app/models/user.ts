import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import sequelize from '../../lib/mysql';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>
    declare username: string
    declare email: string
    declare name: string
    declare phone: CreationOptional<string | null>
    declare roles: string | string[]
    declare password: string
    declare isactivate: number
    declare facebook_id: CreationOptional<number>
    declare google_id: CreationOptional<number>
    declare avatar: CreationOptional<string>
    declare userid: number
    declare bouquets: CreationOptional<string | number[]>
}

User.init({
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER({ length: 11 }),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING(255),
        allowNull: false,
        key: "username",
    },
    email: {
        type: DataTypes.STRING(255),
        key: "email",
    },
    name: {
        type: DataTypes.STRING(255),
        key: "name",
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        key: "password",
    },
    roles: {
        type: DataTypes.STRING(255),
        key: "roles",
    },
    phone: DataTypes.STRING(255),
    isactivate: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
        key: "isactivate",
    },
    facebook_id: DataTypes.INTEGER({ length: 11 }),
    google_id: DataTypes.INTEGER({ length: 11 }),
    avatar: DataTypes.STRING(255),
    userid: DataTypes.INTEGER({ length: 11 }),
    bouquets: DataTypes.STRING(255),
}, {
    sequelize,
    timestamps: false,
    tableName: 'user',
    underscored: true,
});

export default User