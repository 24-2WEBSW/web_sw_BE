const db = require('../config/dbConfig');

exports.findByCompany = async (company) => {
    const query = company === 'hyundai' ? 
        'SELECT product_name, pattern, coating FROM hyundai_materials' : 
        'SELECT product_name, category FROM lx_materials';
    return db.query(query);
};

exports.findDetails = async (company, productName) => {
    const query = company === 'hyundai' ? 
        'SELECT * FROM hyundai_materials WHERE product_name = ?' : 
        'SELECT * FROM lx_materials WHERE product_name = ?';
    const [result] = await db.query(query, [productName]);
    return result[0];
};
