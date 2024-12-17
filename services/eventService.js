const eventModel = require('../models/eventModel');

exports.fetchAll = async () => {
    const [rows] = await eventModel.findAll();
    return rows;
};

exports.create = async (data) => {
    await eventModel.insert(data);
};

exports.fetchById = async (id) => {
    const result = await eventModel.findById(id);
    return result; // 단순히 반환된 객체를 반환
};

exports.delete = async (id) => {
    await eventModel.deleteById(id);
};

exports.update = async (id, data) => {
    await eventModel.updateById(id, data);
};