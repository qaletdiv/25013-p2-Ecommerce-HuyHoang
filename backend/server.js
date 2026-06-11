const jwt = require('jsonwebtoken');
const express = require('express');
const cors = require('cors')
const app = express();
const port = 3000;

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hi world from Express")
});
let categories = [
    {
        id: "c1",
        name: "Thời trang nam",
        slug: "thoi-trang-nam",
    },
    {
        id: "c2",
        name: "Thời trang nữ",
        slug: "thoi-trang-nu",
    },
    {
        id: "c3",
        name: "Thời trang trẻ em",
        slug: "thoi-trang-tre-em",
    },
];
let variants = [
    // ===== P1 =====
    { id: "v1", productId: "p1", size: "S", color: "Trắng", price: 179000, stock: 10 },
    { id: "v2", productId: "p1", size: "M", color: "Trắng", price: 179000, stock: 10 },
    { id: "v3", productId: "p1", size: "S", color: "Đen", price: 199000, stock: 12 },
    { id: "v4", productId: "p1", size: "M", color: "Đen", price: 199000, stock: 12 },

    // ===== P2 =====
    { id: "v5", productId: "p2", size: "S", color: "Trắng", price: 259000, stock: 8 },
    { id: "v6", productId: "p2", size: "M", color: "Trắng", price: 259000, stock: 8 },
    { id: "v7", productId: "p2", size: "S", color: "Xanh", price: 279000, stock: 6 },
    { id: "v8", productId: "p2", size: "M", color: "Xanh", price: 279000, stock: 6 },

    // ===== P3 =====
    { id: "v9", productId: "p3", size: "30", color: "Xanh đậm", price: 499000, stock: 7 },
    { id: "v10", productId: "p3", size: "32", color: "Xanh đậm", price: 499000, stock: 5 },
    { id: "v11", productId: "p3", size: "30", color: "Xanh nhạt", price: 519000, stock: 7 },
    { id: "v12", productId: "p3", size: "32", color: "Xanh nhạt", price: 519000, stock: 5 },

    // ===== P4 =====
    { id: "v13", productId: "p4", size: "M", color: "Xám", price: 379000, stock: 6 },
    { id: "v14", productId: "p4", size: "L", color: "Xám", price: 379000, stock: 4 },
    { id: "v15", productId: "p4", size: "M", color: "Đen", price: 399000, stock: 6 },
    { id: "v16", productId: "p4", size: "L", color: "Đen", price: 399000, stock: 4 },

    // ===== P5 =====
    { id: "v17", productId: "p5", size: "S", color: "Hồng", price: 189000, stock: 10 },
    { id: "v18", productId: "p5", size: "M", color: "Hồng", price: 189000, stock: 8 },
    { id: "v19", productId: "p5", size: "S", color: "Trắng", price: 199000, stock: 10 },
    { id: "v20", productId: "p5", size: "M", color: "Trắng", price: 199000, stock: 8 },

    // ===== P6 =====
    { id: "v21", productId: "p6", size: "S", color: "Đỏ", price: 349000, stock: 5 },
    { id: "v22", productId: "p6", size: "M", color: "Đỏ", price: 349000, stock: 4 },
    { id: "v23", productId: "p6", size: "S", color: "Vàng", price: 369000, stock: 5 },
    { id: "v24", productId: "p6", size: "M", color: "Vàng", price: 369000, stock: 4 },

    // ===== P7 =====
    { id: "v25", productId: "p7", size: "M", color: "Trắng", price: 279000, stock: 6 },
    { id: "v26", productId: "p7", size: "L", color: "Trắng", price: 279000, stock: 5 },
    { id: "v27", productId: "p7", size: "M", color: "Be", price: 299000, stock: 6 },
    { id: "v28", productId: "p7", size: "L", color: "Be", price: 299000, stock: 5 },

    // ===== P8 =====
    { id: "v29", productId: "p8", size: "27", color: "Xanh", price: 459000, stock: 7 },
    { id: "v30", productId: "p8", size: "28", color: "Xanh", price: 459000, stock: 6 },
    { id: "v31", productId: "p8", size: "27", color: "Đen", price: 479000, stock: 7 },
    { id: "v32", productId: "p8", size: "28", color: "Đen", price: 479000, stock: 6 },

    // ===== P9 =====
    { id: "v33", productId: "p9", size: "XS", color: "Vàng", price: 129000, stock: 10 },
    { id: "v34", productId: "p9", size: "S", color: "Vàng", price: 129000, stock: 9 },
    { id: "v35", productId: "p9", size: "XS", color: "Xanh", price: 139000, stock: 10 },
    { id: "v36", productId: "p9", size: "S", color: "Xanh", price: 139000, stock: 9 },

    // ===== P10 =====
    { id: "v37", productId: "p10", size: "S", color: "Đỏ", price: 299000, stock: 6 },
    { id: "v38", productId: "p10", size: "M", color: "Đỏ", price: 299000, stock: 5 },
    { id: "v39", productId: "p10", size: "S", color: "Xanh", price: 319000, stock: 6 },
    { id: "v40", productId: "p10", size: "M", color: "Xanh", price: 319000, stock: 5 },

    // ===== P11 =====
    { id: "v41", productId: "p11", size: "S", color: "Cam", price: 159000, stock: 8 },
    { id: "v42", productId: "p11", size: "M", color: "Cam", price: 159000, stock: 7 },
    { id: "v43", productId: "p11", size: "S", color: "Xám", price: 169000, stock: 8 },
    { id: "v44", productId: "p11", size: "M", color: "Xám", price: 169000, stock: 7 },

    // ===== P12 =====
    { id: "v45", productId: "p12", size: "S", color: "Hồng", price: 249000, stock: 6 },
    { id: "v46", productId: "p12", size: "M", color: "Hồng", price: 249000, stock: 5 },
    { id: "v47", productId: "p12", size: "S", color: "Tím", price: 269000, stock: 6 },
    { id: "v48", productId: "p12", size: "M", color: "Tím", price: 269000, stock: 5 },
    // ===== P13 =====
    { id: "v25", productId: "p13", size: "M", color: "Trắng", price: 299000, stock: 8 },
    { id: "v26", productId: "p13", size: "L", color: "Trắng", price: 299000, stock: 8 },
    { id: "v27", productId: "p13", size: "M", color: "Đen", price: 319000, stock: 8 },
    { id: "v28", productId: "p13", size: "L", color: "Đen", price: 319000, stock: 8 },

    // ===== P14 =====
    { id: "v29", productId: "p14", size: "S", color: "Hồng", price: 459000, stock: 6 },
    { id: "v30", productId: "p14", size: "M", color: "Hồng", price: 459000, stock: 6 },
    { id: "v31", productId: "p14", size: "S", color: "Trắng", price: 479000, stock: 6 },
    { id: "v32", productId: "p14", size: "M", color: "Trắng", price: 479000, stock: 6 },

    // ===== P15 =====
    { id: "v33", productId: "p15", size: "XS", color: "Xanh", price: 199000, stock: 10 },
    { id: "v34", productId: "p15", size: "S", color: "Xanh", price: 199000, stock: 10 },
    { id: "v35", productId: "p15", size: "XS", color: "Vàng", price: 209000, stock: 10 },
    { id: "v36", productId: "p15", size: "S", color: "Vàng", price: 209000, stock: 10 },
];
let products = [
    // ===== NAM =====
    {
        id: "p1",
        name: "Áo thun nam basic",
        hot : true,
        slug: "ao-thun-nam-basic",
        description: "Áo thun nam chất liệu cotton 100%, mềm mại.",
        categoryId: "c1",
        thumbnail: "https://owen.cdn.vccloud.vn/media/catalog/product/cache/d52d7e242fac6dae82288d9a793c0676/t/s/tsn253676._2.jpg",
        images: [
            "https://owen.cdn.vccloud.vn/media/catalog/product/cache/01755127bd64f5dde3182fd2f139143a/t/s/tsn253676._1.jpg",
            "https://owen.cdn.vccloud.vn/media/catalog/product/cache/01755127bd64f5dde3182fd2f139143a/t/s/tsn253676._4.jpg"
        ]
    },

    {
        id: "p2",
        name: "Áo sơ mi nam",
        slug: "ao-so-mi-nam",
        description: "Áo sơ mi nam lịch lãm.",
        categoryId: "c1",
        thumbnail: "https://owen.cdn.vccloud.vn/media/catalog/product/cache/01755127bd64f5dde3182fd2f139143a/a/b/ab260047nt_1_1.jpg",
        images: [
            "https://owen.cdn.vccloud.vn/media/catalog/product/cache/01755127bd64f5dde3182fd2f139143a/a/b/ab260047nt_1_1.jpg",
            "https://owen.cdn.vccloud.vn/media/catalog/product/cache/01755127bd64f5dde3182fd2f139143a/a/b/ab260047nt-1.jpg"
        ]
    },

    {
        id: "p3",
        name: "Quần jean nam",
        slug: "quan-jean-nam",
        categoryId: "c1",
        thumbnail: "https://owen.cdn.vccloud.vn/media/catalog/product/cache/01755127bd64f5dde3182fd2f139143a/q/j/qjt263077_1.jpg",
        images: [
            "https://owen.cdn.vccloud.vn/media/catalog/product/cache/01755127bd64f5dde3182fd2f139143a/q/j/qjr258016_1_copy_11zon.jpg",
            "https://owen.cdn.vccloud.vn/media/catalog/product/cache/01755127bd64f5dde3182fd2f139143a/q/j/qjr251248._1_1.jpg"
        ]
    },

    {
        id: "p4",
        name: "Áo len nam",
        slug: "ao-len-nam",
        categoryId: "c1",
        thumbnail: "https://owen.cdn.vccloud.vn/media/catalog/product/cache/01755127bd64f5dde3182fd2f139143a/a/l/ald231659-grm._90.jpg",
        images: [
            "https://owen.cdn.vccloud.vn/media/catalog/product/cache/01755127bd64f5dde3182fd2f139143a/a/l/ald231658-bl._62.jpg",
            "https://owen.cdn.vccloud.vn/media/catalog/product/cache/01755127bd64f5dde3182fd2f139143a/a/l/ald231664._2-2_1.jpg"
        ]
    },

    {
        id: "p5",
        name: "Áo Polo Classic Men",
        slug: "ao-polo-classic-men",
        categoryId: "c1",
        thumbnail: "https://owen.cdn.vccloud.vn/media/catalog/product/cache/01755127bd64f5dde3182fd2f139143a/a/p/apv262040.jpg",
        images: [
            "https://owen.cdn.vccloud.vn/media/catalog/product/cache/363cbe3e3c7a6595a5cd38ffb3fa943a/a/p/apv262051_1.jpg",
            "https://owen.cdn.vccloud.vn/media/catalog/product/cache/01755127bd64f5dde3182fd2f139143a/a/p/apv261093_3_.jpg"
        ]
    },

    // ===== NỮ =====
    {
        id: "p6",
        name: "Áo thun nữ",
        hot : true,
        slug: "ao-thun-nu",
        categoryId: "c2",
        thumbnail: "https://sixdo.vn/images/products/2026/original/z7899593367776_0e1856e601d1026f563e1ba79fd61821-1780553880.jpg",
        images: [
            "https://sixdo.vn/images/products/2026/large/z7899593374170_eda1aec7838f09f7d5fbde361e351afd.jpg",
            "https://sixdo.vn/images/products/2026/large/z7899593371682_3e684f4e7e484a776b62279b872d3fa1.jpg"
        ]
    },

    {
        id: "p7",
        name: "Váy mùa hè",
        slug: "vay-mua-he",
        categoryId: "c2",
        thumbnail: "https://sixdo.vn/images/products/2026/original/vnq05054-copy-1780288431.jpg",
        images: [
            "https://sixdo.vn/images/products/2026/large/VNQ05069%20copy.jpg",
            "https://sixdo.vn/images/products/2026/large/VNQ05041%20copy.jpg"
        ]
    },

    {
        id: "p8",
        name: "Áo sơ mi nữ",
        slug: "ao-so-mi-nu",
        categoryId: "c2",
        thumbnail: "https://sixdo.vn/images/products/2026/large/_lb_5653-1778815403.jpg",
        images: [
            "https://sixdo.vn/images/products/2026/large/_1778815386_LB_5591_1.jpg",
            "https://sixdo.vn/images/products/2026/large/_1778815391_LB_5595_1.jpg"
        ]
    },

    {
        id: "p9",
        name: "Quần áo dài",
        slug: "quan-ao-dai",
        categoryId: "c2",
        thumbnail: "https://sixdo.vn/images/products/2025/original/vnq01371-sao-che%CC%81p-1765877816.jpg",
        images: [
            "https://sixdo.vn/images/products/2025/large/_1765877773VNQ01358%20sao%20che%CC%81p_1.jpg",
            "https://sixdo.vn/images/products/2025/large/_1765877777VNQ01383%20sao%20che%CC%81p_1.jpg"
        ]
    },

    {
        id: "p10",
        name: "Váy Midi Elegant",
        slug: "vay-midi-elegant",
        categoryId: "c2",
        thumbnail: "https://sixdo.vn/images/products/2024/large/dsc05406-copy-1727239256.jpg",
        images: [
            "https://sixdo.vn/images/products/2024/large/_1727239249DSC05412%20copy_1.jpg",
            "https://sixdo.vn/images/products/2024/large/_1727239251DSC05416%20copy_1.jpg"
        ]
    },

    // ===== TRẺ EM =====
    {
        id: "p11",
        name: "Áo thun trẻ em",
        hot : true,
        slug: "ao-thun-tre-em",
        categoryId: "c3",
        thumbnail: "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/483428/item/vngoods_61_483428_3x4.jpg?width=400",
        images: [
            "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/483428/sub/vngoods_483428_sub3_3x4.jpg?width=400",
            "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/483428/sub/vngoods_483428_sub4_3x4.jpg?width=400"
        ]
    },

    {
        id: "p12",
        name: "Áo khoác trẻ em",
        slug: "ao-khoac-tre-em",
        categoryId: "c3",
        thumbnail: "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/488841/item/vngoods_01_488841_3x4.jpg?width=400",
        images: [
            "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/488841/sub/vngoods_488841_sub3_3x4.jpg?width=400",
            "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/488841/sub/vngoods_488841_sub4_3x4.jpg?width=400"
        ]
    },

    {
        id: "p13",
        name: "Quần short trẻ em",
        slug: "quan-short-tre-em",
        categoryId: "c3",
        thumbnail: "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/487746/sub/vngoods_487746_sub11_3x4.jpg?width=400",
        images: [
            "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/487746/sub/goods_487746_sub14_3x4.jpg?width=400",
            "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/487746/sub/goods_487746_sub21_3x4.jpg?width=400"
        ]
    },

    {
        id: "p14",
        name: "Váy bé gái",
        slug: "vay-be-gai",
        categoryId: "c3",
        thumbnail: "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/484924/item/vngoods_69_484924_3x4.jpg?width=400",
        images: [
            "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/484924/sub/vngoods_484924_sub3_3x4.jpg?width=400",
            "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/484924/sub/goods_484924_sub14_3x4.jpg?width=400"
        ]
    },

    {
        id: "p15",
        name: "Áo UT MARIO Movie",
        hot : true,
        slug: "set-be-trai-summer",
        categoryId: "c3",
        thumbnail: "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/483707/sub/vngoods_483707_sub11_3x4.jpg?width=400",
        images: [
            "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/483707/sub/goods_483707_sub14_3x4.jpg?width=400",
            "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/483707/item/vngoods_00_483707_3x4.jpg?width=400"
        ]
    }
];

let users = [
    {
        id: "1",
        name: "Nguyễn Văn A",
        email: "a@gmail.com",
        password: "123456",
        role: "user"
    },
    {
        id: "2",
        name: "Nguyễn Văn B",
        email: "b@gmail.com",
        password: "123456",
        role: "admin"
    }
];

let payments = [   
    {
      "id": "cod",
      "name": "Thanh toán khi nhận hàng",
      "type": "cash",
      "description": "Thanh toán trực tiếp khi nhận hàng"
    },
    {
      "id": "bank",
      "name": "Chuyển khoản ngân hàng",
      "type": "bank",
      "bankName": "MB Bank",
      "accountNumber": "123456789",
      "accountName": "NGUYEN VAN A"
    },
    {
      "id": "momo",
      "name": "Ví MoMo",
      "type": "qr",
      "qr": "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=MOMO-0901234567"
    },
    {
      "id": "zalopay",
      "name": "ZaloPay",
      "type": "qr",
      "qr": "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=ZALOPAY-0901234567"
    },
    {
      "id": "vnpay",
      "name": "VNPay",
      "type": "qr",
      "qr": "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=VNPAY-001"
    }
];

let orders = [
    {
        id: "o1",
        userId: "1",
        name: "Nguyễn Văn A",
        phone: "0901234567",
        address: "123 Đường ABC, Quận XYZ, TP. HCM",
        items: [
            { productId: "p1", variantId: "v1", quantity: 2 },
            { productId: "p6", variantId: "v21", quantity: 1 }
        ],
        total: 507000,
        paymentMethod: "cod",
        status: "pending",
        createdAt: "2024-06-01T10:00:00Z"
    },
];


// Lấy tất cả user 
app.get('/api/users', (req, res) => {
    res.json(users);
});

// Lấy tất cả sản phẩm kèm biến thể và danh mục
app.get('/api/products', (req, res) => {
    const allProducts = products.map(product => {
        const category = categories.find(cat => cat.id === product.categoryId);
        const productVariants = variants.filter(variant => variant.productId === product.id);
        return {
            ...product,
            category: category ? { id: category.id, name: category.name, slug: category.slug } : null,
            variants: productVariants.map(variant => ({
                id: variant.id,
                size: variant.size,
                color: variant.color,
                price: variant.price,
                stock: variant.stock,
            })),
        };
    });
    res.json(allProducts);
});
// Lấy chi tiết sản phẩm theo slug
app.get('/api/products/:slug', (req, res) => {
    const { slug } = req.params;
    const product = products.find(p => p.slug === slug);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    const category = categories.find(cat => cat.id === product.categoryId);
    const productVariants = variants.filter(variant => variant.productId === product.id);
    res.json({
        ...product,
        category: category ? { id: category.id, name: category.name, slug: category.slug } : null,
        variants: productVariants.map(variant => ({
            id: variant.id,
            size: variant.size,
            color: variant.color,
            price: variant.price,
            stock: variant.stock,
        })),
    });
});
// Sản phẩm liên quan theo slug sản phẩm có chứa variant
app.get('/api/productsrelated/:slug', (req, res) => {
    const { slug } = req.params;
    const product = products.find(p => p.slug === slug);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    const category = categories.find(cat => cat.id === product.categoryId);
    const relatedProducts = products.filter(p => p.categoryId === product.categoryId && p.id !== product.id);
    const relatedProductsWithVariants = relatedProducts.map(relProduct => {
        const relCategory = categories.find(cat => cat.id === relProduct.categoryId);
        const relVariants = variants.filter(variant => variant.productId === relProduct.id);
        return {
            ...relProduct,
            category: relCategory ? { id: relCategory.id, name: relCategory.name, slug: relCategory.slug } : null,
            variants: relVariants.map(variant => ({
                id: variant.id,
                size: variant.size,
                color: variant.color,
                price: variant.price,
                stock: variant.stock,
            })),
        };
    });
    res.json(relatedProductsWithVariants);
});
// Chức năng đăng ký 
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email and password are required" });
    }

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = {
        id: String(users.length + 1),
        name,
        email,
        password,
        role: "customer"
    };
    users.push(newUser);

    res.status(201).json({ message: "User registered successfully" });
});
// Chức năng đăng nhập
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user.id, name: user.name, email: user.email, role: user.role }, 'your_jwt_secret_key', { expiresIn: '1h' });
    res.json({ message: "Login successful", token });
});
// Lấy tất cả phương thức thanh toán
app.get('/api/payments', (req, res) => {
    res.json(payments);
});

// Tạo đơn hàng mới 
app.post('/api/orders', (req, res) => {
    const { userId, name, phone, address, items, paymentMethod } = req.body;
    if (!userId || !name || !phone || !address || !items || !paymentMethod) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    let total = 0;
    for (const item of items) {
        const variant = variants.find(v => v.id === item.variantId);
        if (!variant) {
            return res.status(404).json({ message: `Variant with id ${item.variantId} not found` });
        }
        if (variant.stock < item.quantity) {
            return res.status(400).json({ message: `Insufficient stock for variant ${item.variantId}` });
        }
        total += variant.price * item.quantity;
    }
    const newOrder = {
        id: `o${orders.length + 1}`,
        userId,
        name,
        phone,
        address,
        items,
        total,
        paymentMethod,
        status: "pending",
        createdAt: new Date().toISOString()
    };
    orders.push(newOrder);
    for (const item of items) {
        const variant = variants.find(v => v.id === item.variantId);
        variant.stock -= item.quantity;
    }
    res.status(201).json({ message: "Order created successfully", orderId: newOrder.id });
});

// Lấy đơn hàng theo userId
app.get('/api/orders/:userId', (req, res) => {
    const { userId } = req.params;
    const userOrders = orders.filter(order => order.userId === userId);
    res.json(userOrders);
});

app.listen(port, () => {
    console.log(`Server listening at <http://localhost>:${port}`);

})