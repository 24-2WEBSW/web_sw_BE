const consultationModel = require('../models/consultationModel');

exports.create = async (data) => {
    await consultationModel.insert(data);
};

exports.fetchAll = async () => {
    return await consultationModel.findAll(); // 수정 불필요
};

exports.authenticate = async (id, password) => {
    const consultation = await consultationModel.findById(id);
    if (consultation && consultation.password === password) {
        return consultation;
    }
    return null;
};

exports.fetchById = async (id) => {
    return await consultationModel.findById(id);
};

exports.delete = async (id) => {
    await consultationModel.deleteById(id);
};

exports.update = async (id, data) => {
    await consultationModel.updateById(id, data);
};
