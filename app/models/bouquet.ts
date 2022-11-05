import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import sequelize from '../../lib/mysql';

class Bouquet extends Model<InferAttributes<Bouquet>, InferCreationAttributes<Bouquet>> {
    declare id: CreationOptional<number>
    declare price: string
    declare isactive: number
    declare name: string
    declare created: CreationOptional<number>
    declare chanelids: CreationOptional<string | number[]>
    declare bouquetid: number
}

Bouquet.init({
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER({ length: 11 }),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    price: {
        type: DataTypes.STRING(255),
        allowNull: false,
        key: "price",
    },
    name: {
        type: DataTypes.STRING(255),
        key: "name",
    },
    isactive: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
        key: "isactive",
    },
    created: DataTypes.INTEGER({ length: 11 }),
    chanelids: DataTypes.STRING(255),
    bouquetid: DataTypes.INTEGER({ length: 11 }),
}, {
    sequelize,
    timestamps: false,
    tableName: 'bouquet',
    underscored: true,
});

export default Bouquet