const materialService = require('../services/materialService');

exports.getMaterials = async (req, res) => {
    try {
        const { company } = req.params;
        const materials = await materialService.fetchMaterialsByCompany(company);
        res.status(200).json(materials);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch materials' });
    }
};

exports.getMaterialDetails = async (req, res) => {
    try {
        const { company, productName } = req.params;
        const material = await materialService.fetchMaterialDetails(company, productName);
        if (!material) return res.status(404).json({ message: 'Material not found' });
        res.status(200).json(material);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch material details' });
    }
};
