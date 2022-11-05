import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import sequelize from '../../../lib/mysql/xtream';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>
    declare member_id: number
    declare username: string
    declare password: string
    declare exp_date: CreationOptional<number>
    declare admin_enabled: number
    declare enabled: number
    declare admin_notes: string
    declare reseller_notes: string
    declare bouquet: string | number[]
    declare max_connections: number
    declare is_restreamer: number
    declare allowed_ips: string
    declare allowed_ua: string
    declare is_trial: number
    declare created_at: number
    declare created_by: number
    declare pair_id: CreationOptional<number>
    declare is_mag: number
    declare is_e2: number
    declare force_server_id: number
    declare is_isplock: number
    declare as_number: CreationOptional<string | null>
    declare isp_desc: string
    declare forced_country: string
    declare is_stalker: number
    declare bypass_ua: number
    declare play_token: string
}

User.init({
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER({ length: 11 }),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    member_id: {
        type: DataTypes.INTEGER({ length: 11 }),
        key: "member_id",
    },
    username: {
        type: DataTypes.STRING(255),
        allowNull: false,
        key: "username",
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        key: "password",
    },
    exp_date: {
        type: DataTypes.INTEGER({ length: 11 }),
        key: "exp_date",
    },
    admin_enabled: {
        type: DataTypes.INTEGER({ length: 11 }),
        allowNull: false,
        defaultValue: 1,
        key: "admin_enabled",
    },
    enabled: {
        type: DataTypes.INTEGER({ length: 11 }),
        allowNull: false,
        defaultValue: 1,
        key: "enabled",
    },
    admin_notes: {
        type: DataTypes.TEXT('medium'),
        allowNull: false,
    },
    reseller_notes: {
        type: DataTypes.TEXT('medium'),
        allowNull: false,
    },
    bouquet: {
        type: DataTypes.TEXT('medium'),
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('bouquet') as string
            return rawValue ? JSON.parse(rawValue) : null
        },
    },
    max_connections: {
        type: DataTypes.INTEGER({ length: 11 }),
        allowNull: false,
        defaultValue: 1,
    },
    is_restreamer: {
        type: DataTypes.TINYINT({ length: 4 }),
        allowNull: false,
        defaultValue: 0,
        key: "is_restreamer"
    },
    allowed_ips: {
        type: DataTypes.TEXT('medium'),
        allowNull: false,
    },
    allowed_ua: {
        type: DataTypes.TEXT('medium'),
        allowNull: false,
    },
    is_trial: {
        type: DataTypes.TINYINT({ length: 4 }),
        allowNull: false,
        defaultValue: 0,
        key: "is_trial",
    },
    created_at: {
        type: DataTypes.INTEGER({ length: 11 }),
        allowNull: false,
        key: "created_at",
    },
    created_by: {
        type: DataTypes.INTEGER({ length: 11 }),
        allowNull: false,
        key: "created_by",
    },
    pair_id: {
        type: DataTypes.INTEGER({ length: 11 }),
        key: "pair_id",
    },
    is_mag: {
        type: DataTypes.TINYINT({ length: 4 }),
        allowNull: false,
        defaultValue: 0,
        key: "is_mag",
    },
    is_e2: {
        type: DataTypes.TINYINT({ length: 4 }),
        allowNull: false,
        defaultValue: 0,
        key: "is_e2",
    },
    force_server_id: {
        type: DataTypes.TINYINT({ length: 4 }),
        allowNull: false,
        defaultValue: 0,
    },
    is_isplock: {
        type: DataTypes.TINYINT({ length: 4 }),
        allowNull: false,
        defaultValue: 0,
    },
    as_number: DataTypes.STRING(30),
    isp_desc: {
        type: DataTypes.TEXT('medium'),
        allowNull: false,
    },
    forced_country: {
        type: DataTypes.STRING(3),
        allowNull: false,
    },
    is_stalker: {
        type: DataTypes.TINYINT({ length: 4 }),
        allowNull: false,
        defaultValue: 0,
    },
    bypass_ua: {
        type: DataTypes.TINYINT({ length: 4 }),
        allowNull: false,
        defaultValue: 0,
    },
    play_token: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    sequelize,
    timestamps: false,
    tableName: 'users',
    underscored: true,
});

export default User