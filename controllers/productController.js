import Product from "../models/productModel.js";

// שליפת כל המוצרים
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "בעיה בטעינת נכסים" });
  }
};

// שליפת מוצר לפי ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // תוקן מ-_id ל-id
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "נכס לא נמצא" });
    }
  } catch (error) {
    res.status(500).json({ message: "שגיאה בשליפת נכס" });
  }
};

// יצירת מוצר חדש
const createProduct = async (req, res) => {
  const { name, image, location, price, rooms, hasPool, description } =
    req.body;

  try {
    const product = new Product({
      name,
      image,
      location,
      price,
      rooms,
      hasPool,
      description,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: "לא ניתן ליצור נכס חדש" });
  }
};

// מחיקת מוצר לפי ID
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "נכס לא נמצא" });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "הנכס נמחק בהצלחה" });
  } catch (error) {
    res.status(500).json({ message: "שגיאה במחיקת נכס" });
  }
};

export { getProducts, getProductById, createProduct, deleteProduct };
