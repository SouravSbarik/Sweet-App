import Sweet from '../models/sweetModel.js';

export const addSweet = async (req, res) => {
  const { name, category, price, quantity } = req.body;
  try {
    const sweet = new Sweet({ name, category, price, quantity });
    const createdSweet = await sweet.save();
    res.status(201).json(createdSweet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find({});
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSweet = async (req, res) => {
  const { name, category, price, quantity } = req.body;
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (sweet) {
      sweet.name = name || sweet.name;
      sweet.category = category || sweet.category;
      sweet.price = price || sweet.price;
      sweet.quantity = quantity !== undefined ? quantity : sweet.quantity;
      const updatedSweet = await sweet.save();
      res.json(updatedSweet);
    } else {
      res.status(404).json({ message: 'Sweet not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (sweet) {
      await sweet.deleteOne();
      res.json({ message: 'Sweet removed' });
    } else {
      res.status(404).json({ message: 'Sweet not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchSweets = async (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;
  const query = {};
  if (name) query.name = { $regex: name, $options: 'i' };
  if (category) query.category = { $regex: category, $options: 'i' };
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }
  try {
    const sweets = await Sweet.find(query);
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const purchaseSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }
    if (sweet.quantity > 0) {
      sweet.quantity -= 1;
      await sweet.save();
      res.json({ message: 'Purchase successful', sweet });
    } else {
      res.status(400).json({ message: 'Out of stock' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const restockSweet = async (req, res) => {
  const { amount } = req.body;
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }
    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ message: 'Invalid restock amount' });
    }
    sweet.quantity += amount;
    const updatedSweet = await sweet.save();
    res.json({ message: 'Restock successful', sweet: updatedSweet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};