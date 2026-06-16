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

    // ===== P16 =====
    { id: "v61", productId: "p16", size: "M", color: "Đen", price: 599000, stock: 10 },
    { id: "v62", productId: "p16", size: "L", color: "Đen", price: 599000, stock: 10 },
    { id: "v63", productId: "p16", size: "M", color: "Xanh Navy", price: 619000, stock: 10 },
    { id: "v64", productId: "p16", size: "L", color: "Xanh Navy", price: 619000, stock: 10 },

    // ===== P17 =====
    { id: "v65", productId: "p17", size: "30", color: "Be", price: 449000, stock: 10 },
    { id: "v66", productId: "p17", size: "32", color: "Be", price: 449000, stock: 10 },
    { id: "v67", productId: "p17", size: "30", color: "Đen", price: 469000, stock: 10 },
    { id: "v68", productId: "p17", size: "32", color: "Đen", price: 469000, stock: 10 },

    // ===== P18 =====
    { id: "v69", productId: "p18", size: "30", color: "Trắng", price: 449000, stock: 10 },
    { id: "v70", productId: "p18", size: "32", color: "Trắng", price: 449000, stock: 10 },
    { id: "v71", productId: "p18", size: "30", color: "Xanh Navy", price: 469000, stock: 10 },
    { id: "v72", productId: "p18", size: "32", color: "Xanh Navy", price: 469000, stock: 10 },
    // ===== P19 =====
    { id: "v73", productId: "p19", size: "30", color: "Xanh", price: 399000, stock: 12 },
    { id: "v74", productId: "p19", size: "32", color: "Xanh", price: 399000, stock: 8 },
    { id: "v75", productId: "p19", size: "30", color: "Đen", price: 419000, stock: 10 },
    { id: "v76", productId: "p19", size: "32", color: "Đen", price: 419000, stock: 7 },

    // ===== P20 =====
    { id: "v77", productId: "p20", size: "M", color: "Ghi", price: 499000, stock: 9 },
    { id: "v78", productId: "p20", size: "L", color: "Ghi", price: 499000, stock: 6 },
    { id: "v79", productId: "p20", size: "M", color: "Nâu", price: 519000, stock: 8 },
    { id: "v80", productId: "p20", size: "L", color: "Nâu", price: 519000, stock: 5 },

    // ===== P21 =====
    { id: "v81", productId: "p21", size: "S", color: "Đen", price: 329000, stock: 10 },
    { id: "v82", productId: "p21", size: "M", color: "Đen", price: 329000, stock: 7 },
    { id: "v83", productId: "p21", size: "S", color: "Be", price: 349000, stock: 9 },
    { id: "v84", productId: "p21", size: "M", color: "Be", price: 349000, stock: 6 },

    // ===== P22 =====
    { id: "v85", productId: "p22", size: "S", color: "Xanh", price: 389000, stock: 11 },
    { id: "v86", productId: "p22", size: "M", color: "Xanh", price: 389000, stock: 8 },
    { id: "v87", productId: "p22", size: "S", color: "Trắng", price: 409000, stock: 9 },
    { id: "v88", productId: "p22", size: "M", color: "Trắng", price: 409000, stock: 7 },

    // ===== P23 =====
    { id: "v89", productId: "p23", size: "27", color: "Đen", price: 449000, stock: 10 },
    { id: "v90", productId: "p23", size: "28", color: "Đen", price: 449000, stock: 7 },
    { id: "v91", productId: "p23", size: "27", color: "Xanh", price: 469000, stock: 9 },
    { id: "v92", productId: "p23", size: "28", color: "Xanh", price: 469000, stock: 6 },

    // ===== P24 =====
    { id: "v93", productId: "p24", size: "S", color: "Hồng", price: 279000, stock: 12 },
    { id: "v94", productId: "p24", size: "M", color: "Hồng", price: 279000, stock: 8 },
    { id: "v95", productId: "p24", size: "S", color: "Tím", price: 299000, stock: 10 },
    { id: "v96", productId: "p24", size: "M", color: "Tím", price: 299000, stock: 6 },

    // ===== P25 =====
    { id: "v97", productId: "p25", size: "S", color: "Đen", price: 559000, stock: 7 },
    { id: "v98", productId: "p25", size: "M", color: "Đen", price: 559000, stock: 5 },
    { id: "v99", productId: "p25", size: "S", color: "Xanh Navy", price: 579000, stock: 8 },
    { id: "v100", productId: "p25", size: "M", color: "Xanh Navy", price: 579000, stock: 6 },

    // ===== P26 =====
    { id: "v101", productId: "p26", size: "XS", color: "Xanh", price: 199000, stock: 11 },
    { id: "v102", productId: "p26", size: "S", color: "Xanh", price: 199000, stock: 9 },
    { id: "v103", productId: "p26", size: "XS", color: "Vàng", price: 219000, stock: 10 },
    { id: "v104", productId: "p26", size: "S", color: "Vàng", price: 219000, stock: 8 },

    // ===== P27 =====
    { id: "v105", productId: "p27", size: "27", color: "Xanh", price: 329000, stock: 10 },
    { id: "v106", productId: "p27", size: "28", color: "Xanh", price: 329000, stock: 7 },
    { id: "v107", productId: "p27", size: "27", color: "Đen", price: 349000, stock: 9 },
    { id: "v108", productId: "p27", size: "28", color: "Đen", price: 349000, stock: 6 },

    // ===== P28 =====
    { id: "v109", productId: "p28", size: "XS", color: "Trắng", price: 229000, stock: 12 },
    { id: "v110", productId: "p28", size: "S", color: "Trắng", price: 229000, stock: 9 },
    { id: "v111", productId: "p28", size: "XS", color: "Xanh", price: 249000, stock: 10 },
    { id: "v112", productId: "p28", size: "S", color: "Xanh", price: 249000, stock: 8 },

    // ===== P29 =====
    { id: "v113", productId: "p29", size: "S", color: "Hồng", price: 399000, stock: 11 },
    { id: "v114", productId: "p29", size: "M", color: "Hồng", price: 399000, stock: 8 },
    { id: "v115", productId: "p29", size: "S", color: "Vàng", price: 419000, stock: 9 },
    { id: "v116", productId: "p29", size: "M", color: "Vàng", price: 419000, stock: 6 },

    // ===== P30 =====
    { id: "v117", productId: "p30", size: "XS", color: "Xanh", price: 269000, stock: 10 },
    { id: "v118", productId: "p30", size: "S", color: "Xanh", price: 269000, stock: 7 },
    { id: "v119", productId: "p30", size: "XS", color: "Đen", price: 289000, stock: 9 },
    { id: "v120", productId: "p30", size: "S", color: "Đen", price: 289000, stock: 6 },
];
let products = [
    // ===== NAM =====
    {
        id: "p1",
        name: "Áo thun nam basic",
        hot: true,
        slug: "ao-thun-nam-basic",
        description: "Áo thun nam chất liệu cotton 100%, mềm mại và thoáng khí, phù hợp cho mặc hàng ngày.",
        specs: [
            "Chất liệu: 100% cotton",
            "Form áo: Regular fit",
            "Kiểu cổ: Cổ tròn",
            "Thấm hút tốt và không gây bí da"
        ],
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
        description: "Áo sơ mi nam lịch lãm, dễ dàng phối cùng quần âu hoặc quần jean cho phong cách công sở.",
        specs: [
            "Chất liệu: Cotton pha polyester",
            "Form áo: Slim fit",
            "Cổ áo: Cổ đứng",
            "Dễ giặt và ít nhăn"
        ],
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
        description: "Quần jean nam bền và co giãn nhẹ, phù hợp cho mọi hoạt động hàng ngày.",
        specs: [
            "Chất liệu: 98% cotton, 2% elastane",
            "Form: Mid-rise, straight leg",
            "Chi tiết: Co giãn nhẹ, bền màu",
            "Bảo quản: Giặt máy ở nhiệt độ thấp"
        ],
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
        description: "Áo len nam giữ ấm nhẹ, phom dáng chuẩn và dễ phối cùng áo sơ mi hoặc áo thun.",
        specs: [
            "Chất liệu: Len pha acrylic",
            "Form: Relaxed fit",
            "Kiểu cổ: Cổ tròn",
            "Phù hợp: Mùa thu đông"
        ],
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
        description: "Áo Polo nam cổ điển, chất liệu mềm mại và phom dáng thanh lịch cho mọi dịp.",
        specs: [
            "Chất liệu: Cotton pique",
            "Form: Regular fit",
            "Cổ áo: Polo có cúc",
            "Dễ phối đồ và thoáng mát"
        ],
        categoryId: "c1",
        thumbnail: "https://owen.cdn.vccloud.vn/media/catalog/product/cache/01755127bd64f5dde3182fd2f139143a/a/p/apv262040.jpg",
        images: [
            "https://owen.cdn.vccloud.vn/media/catalog/product/cache/363cbe3e3c7a6595a5cd38ffb3fa943a/a/p/apv262051_1.jpg",
            "https://owen.cdn.vccloud.vn/media/catalog/product/cache/01755127bd64f5dde3182fd2f139143a/a/p/apv261093_3_.jpg"
        ]
    },
    {
        id: "p6",
        name: "Áo khoác bomber nam",
        slug: "ao-khoac-bomber-nam",
        description: "Áo khoác bomber nam mang phong cách trẻ trung và năng động. Chất liệu cao cấp giúp giữ ấm hiệu quả nhưng vẫn đảm bảo sự thoải mái khi vận động. Thiết kế hiện đại dễ phối với quần jean hoặc quần kaki. Phù hợp cho những buổi dạo phố hoặc đi làm.",
        specs: [
            "Chất liệu: Polyester cao cấp",
            "Lót: Vải lót mềm",
            "Kiểu: Zipper trước",
            "Phù hợp: Dạo phố hoặc đi làm"
        ],
        categoryId: "c1",
        thumbnail: "https://owen.cdn.vccloud.vn/media/catalog/product/cache/01755127bd64f5dde3182fd2f139143a/j/k/jk256181_1_copy.jpg",
        images: [
            "https://owen.cdn.vccloud.vn/media/catalog/product/cache/01755127bd64f5dde3182fd2f139143a/j/k/jk256181_2_copy.jpg",
            "https://owen.cdn.vccloud.vn/media/catalog/product/cache/01755127bd64f5dde3182fd2f139143a/j/k/jk256181_3_copy.jpg"
        ]
    },
    {
        id: "p7",
        name: "Quần kaki nam",
        slug: "quan-kaki-nam",
        description: "Quần kaki nam đơn giản, dễ phối và mang lại cảm giác thoải mái khi vận động.",
        specs: [
            "Chất liệu: Cotton twill",
            "Form: Straight fit",
            "Cạp: Trung bình",
            "Chi tiết: Túi chéo tiện lợi"
        ],
        categoryId: "c1",
        thumbnail: "https://owen.cdn.vccloud.vn/media/catalog/product/cache/01755127bd64f5dde3182fd2f139143a/q/k/qkr256107_3_copy_11zon.jpg",
        images: [
            "https://owen.cdn.vccloud.vn/media/catalog/product/cache/01755127bd64f5dde3182fd2f139143a/q/k/qkr256107_4_copy_11zon.jpg",
            "https://owen.cdn.vccloud.vn/media/catalog/product/cache/01755127bd64f5dde3182fd2f139143a/q/k/qkr256107_1_copy_11zon.jpg"
        ]
    },
    {
        id: "p8",
        name: "Áo ghi lê nam",
        slug: "ao-gile-nam",
        description: "Áo ghi lê nam ấm áp, thoải mái với mũ rút dây và túi trước tiện dụng.",
        specs: [
            "Chất liệu: Cotton fleece",
            "Form: Regular fit",
            "Kiểu: Có mũ, túi kangaroo",
            "Thích hợp: Mặc hàng ngày và dạo phố"
        ],
        categoryId: "c1",
        thumbnail: "https://owen.cdn.vccloud.vn/media/catalog/product/cache/01755127bd64f5dde3182fd2f139143a/a/l/ald241279_11zon.jpg",
        images: [
            "https://owen.cdn.vccloud.vn/media/catalog/product/cache/01755127bd64f5dde3182fd2f139143a/a/l/ald241279-gr._2.jpg",
            "https://owen.cdn.vccloud.vn/media/catalog/product/cache/01755127bd64f5dde3182fd2f139143a/a/l/ald241279-gr._3.jpg"
        ]
    },
    {
        id: "p9",
        name: "Quần short nam",
        slug: "quan-short-nam",
        description: "Quần short nam nhẹ nhàng, thoáng mát, thích hợp cho các hoạt động ngoài trời và đi biển.",
        specs: [
            "Chất liệu: Cotton pha polyester",
            "Form: Regular fit",
            "Tính năng: Thấm hút mồ hôi",
            "Chi tiết: Túi hai bên"
        ],
        categoryId: "c1",
        thumbnail: "https://owen.cdn.vccloud.vn/media/catalog/product/cache/01755127bd64f5dde3182fd2f139143a/s/t/st261018.jpg",
        images: [
            "https://owen.cdn.vccloud.vn/media/catalog/product/cache/01755127bd64f5dde3182fd2f139143a/s/t/st261018-1.jpg",
            "https://owen.cdn.vccloud.vn/media/catalog/product/cache/64b6969b5a751e6599b1523a4893116c/s/t/st261018.4.jpg"
        ]
    },
    {
        id: "p10",
        name: "Áo blazer nam",
        slug: "ao-blazer-nam",
        description: "Áo blazer nam phom chuẩn, giúp tạo vẻ ngoài thanh lịch cho công sở hoặc dạo phố.",
        specs: [
            "Chất liệu: Vải dệt cao cấp",
            "Form: Slim fit",
            "Kiểu: Không tay, cúc trước",
            "Chi tiết: Túi dọc tinh tế"
        ],
        categoryId: "c1",
        thumbnail: "https://owen.cdn.vccloud.vn/media/catalog/product/cache/01755127bd64f5dde3182fd2f139143a/b/l/blr2561152_11zon.jpg",
        images: [
            "https://owen.cdn.vccloud.vn/media/catalog/product/cache/01755127bd64f5dde3182fd2f139143a/b/l/blr2561151_11zon.jpg",
            "https://owen.cdn.vccloud.vn/media/catalog/product/cache/01755127bd64f5dde3182fd2f139143a/b/l/blr2561154_11zon.jpg"
        ]
    },

    // ===== NỮ =====
    {
        id: "p11",
        name: "Áo thun nữ",
        hot: true,
        slug: "ao-thun-nu",
        description: "Áo thun nữ mềm mại, ôm dáng nhẹ và thích hợp cho mùa hè.",
        specs: [
            "Chất liệu: Cotton modal",
            "Form: Slim fit",
            "Kiểu cổ: Cổ tròn",
            "Mềm mại, thoáng khí"
        ],
        categoryId: "c2",
        thumbnail: "https://sixdo.vn/images/products/2026/original/z7899593367776_0e1856e601d1026f563e1ba79fd61821-1780553880.jpg",
        images: [
            "https://sixdo.vn/images/products/2026/large/z7899593374170_eda1aec7838f09f7d5fbde361e351afd.jpg",
            "https://sixdo.vn/images/products/2026/large/z7899593371682_3e684f4e7e484a776b62279b872d3fa1.jpg"
        ]
    },

    {
        id: "p12",
        name: "Váy mùa hè",
        slug: "vay-mua-he",
        description: "Váy mùa hè nữ nhẹ nhàng, bồng bềnh và tạo cảm giác thoải mái khi mặc trong thời tiết nắng.",
        specs: [
            "Chất liệu: Rayon pha polyester",
            "Form: A-line",
            "Độ dài: Qua gối",
            "Thích hợp: Mùa hè, dạo phố"
        ],
        categoryId: "c2",
        thumbnail: "https://sixdo.vn/images/products/2026/original/vnq05054-copy-1780288431.jpg",
        images: [
            "https://sixdo.vn/images/products/2026/large/VNQ05069%20copy.jpg",
            "https://sixdo.vn/images/products/2026/large/VNQ05041%20copy.jpg"
        ]
    },

    {
        id: "p13",
        name: "Áo sơ mi nữ",
        slug: "ao-so-mi-nu",
        description: "Áo sơ mi nữ công sở thanh lịch, vải nhẹ và giữ form tốt.",
        specs: [
            "Chất liệu: Chiffon",
            "Form: Relaxed fit",
            "Kiểu cổ: Cổ đức",
            "Dễ giặt, ít nhăn"
        ],
        categoryId: "c2",
        thumbnail: "https://sixdo.vn/images/products/2026/large/_lb_5653-1778815403.jpg",
        images: [
            "https://sixdo.vn/images/products/2026/large/_1778815386_LB_5591_1.jpg",
            "https://sixdo.vn/images/products/2026/large/_1778815391_LB_5595_1.jpg"
        ]
    },

    {
        id: "p14",
        name: "Quần áo dài",
        slug: "quan-ao-dai",
        description: "Quần dài nữ dáng suông, phối hợp linh hoạt trong trang phục hàng ngày.",
        specs: [
            "Chất liệu: Polyester pha cotton",
            "Form: Wide leg",
            "Cạp: Trung bình",
            "Phù hợp: Công sở và hoạt động hằng ngày"
        ],
        categoryId: "c2",
        thumbnail: "https://sixdo.vn/images/products/2025/original/vnq01371-sao-che%CC%81p-1765877816.jpg",
        images: [
            "https://sixdo.vn/images/products/2025/large/_1765877773VNQ01358%20sao%20che%CC%81p_1.jpg",
            "https://sixdo.vn/images/products/2025/large/_1765877777VNQ01383%20sao%20che%CC%81p_1.jpg"
        ]
    },

    {
        id: "p15",
        name: "Váy Midi Elegant",
        slug: "vay-midi-elegant",
        description: "Váy midi nữ thanh lịch, phù hợp cho dạo phố hoặc sự kiện nhẹ nhàng.",
        specs: [
            "Chất liệu: Crepe",
            "Form: Bodycon nhẹ",
            "Độ dài: Midi",
            "Khóa kéo sau lưng"
        ],
        categoryId: "c2",
        thumbnail: "https://sixdo.vn/images/products/2024/large/dsc05406-copy-1727239256.jpg",
        images: [
            "https://sixdo.vn/images/products/2024/large/_1727239249DSC05412%20copy_1.jpg",
            "https://sixdo.vn/images/products/2024/large/_1727239251DSC05416%20copy_1.jpg"
        ]
    },
    {
        id: "p16",
        name: "Chân váy xòe",
        slug: "chan-vay-xoe",
        description: "Chân váy xòe dáng bút chì, tôn dáng và phù hợp với môi trường làm việc chuyên nghiệp.",
        specs: [
            "Chất liệu: Polyester pha elastane",
            "Form: Pencil skirt",
            "Độ dài: Qua gối",
            "Chi tiết: Dây kéo sau lưng"
        ],
        categoryId: "c2",
        thumbnail: "https://leika.vn/wp-content/uploads/2026/05/Chan-vay-xoe-ly-lech-bong-eo-dinh-cuc-5.jpg.webp",
        images: [
            "https://leika.vn/wp-content/uploads/2026/05/Chan-vay-xoe-ly-lech-bong-eo-dinh-cuc-2.jpg",
            "https://leika.vn/wp-content/uploads/2026/05/Chan-vay-xoe-ly-lech-bong-eo-dinh-cuc-5.jpg"
        ]
    },
    {
        id: "p17",
        name: "Áo crop top nữ",
        slug: "ao-croptop-nu",
        description: "Áo crop top nữ trẻ trung, dễ phối cùng quần cạp cao hoặc chân váy.",
        specs: [
            "Chất liệu: Rayon pha polyester",
            "Form: Tailored fit",
            "Kiểu: Hai hàng cúc",
            "Chi tiết: Túi giả thời trang"
        ],
        categoryId: "c2",
        thumbnail: "https://leika.vn/wp-content/uploads/2026/05/Ao-kieu-CT-croptop-2-hang-cuc-TT-4.jpg.webp",
        images: [
            "https://leika.vn/wp-content/uploads/2026/05/Ao-kieu-CT-croptop-2-hang-cuc-TT-2.jpg",
            "https://leika.vn/wp-content/uploads/2026/05/Ao-kieu-CT-croptop-2-hang-cuc-TT-4.jpg"
        ]
    },
    {
        id: "p18",
        name: "Quần jean nữ",
        slug: "quan-jean-nu",
        description: "Quần jean nữ co giãn tốt, mang lại sự thoải mái và tôn dáng cho nhiều loại trang phục.",
        specs: [
            "Chất liệu: Denim co giãn",
            "Form: Slim fit",
            "Cạp: Trung bình",
            "Chi tiết: Túi jean truyền thống"
        ],
        categoryId: "c2",
        thumbnail: "https://leika.vn/wp-content/uploads/2026/02/So-mi-DT-nep-beo-cach-dieu-5.jpg.webp",
        images: [
            "https://leika.vn/wp-content/uploads/2025/12/Ao-khoac-len-tui-op-bo-phoi-ke-1.jpg",
            "https://leika.vn/wp-content/uploads/2025/12/Ao-khoac-len-det-hoa-tiet-coi-gia-1.jpg"
        ]
    },
    {
        id: "p19",
        name: "Áo croptop nữ",
        slug: "ao-croptop-nu",
        description: "Áo croptop nữ trẻ trung, dễ phối cùng quần cạp cao hoặc chân váy.",
        specs: [
            "Chất liệu: Cotton pha spandex",
            "Form: Fitted",
            "Độ dài: Cropped",
            "Chi tiết: Stretch mềm mại"
        ],
        categoryId: "c2",
        thumbnail: "https://leika.vn/wp-content/uploads/2026/05/Ao-kieu-SN-croptop-op-la-theu-bode-10.jpg.webp",
        images: [
            "https://leika.vn/wp-content/uploads/2026/05/Ao-kieu-SN-croptop-op-la-theu-bode-6.jpg",
            "https://leika.vn/wp-content/uploads/2026/05/Ao-kieu-SN-croptop-op-la-theu-bode-9.jpg"
        ]
    },
    {
        id: "p20",
        name: "Đầm dự tiệc nữ",
        slug: "dam-du-tiec-nu",
        description: "Đầm dự tiệc nữ sang trọng, thiết kế tinh tế và phù hợp cho các buổi tiệc tối.",
        specs: [
            "Chất liệu: Satin pha polyester",
            "Form: A-line",
            "Độ dài: Dưới gối",
            "Chi tiết: Dây kéo ẩn sau"
        ],
        categoryId: "c2",
        thumbnail: "https://leika.vn/wp-content/uploads/2026/02/Dam-party-kem-ao-choang-3.jpg.webp",
        images: [
            "https://leika.vn/wp-content/uploads/2026/02/Dam-party-kem-ao-choang-1.jpg",
            "https://leika.vn/wp-content/uploads/2026/02/Dam-party-kem-ao-choang-2.jpg"
        ]
    },

    // ===== TRẺ EM =====
    {
        id: "p21",
        name: "Áo thun trẻ em",
        hot: true,
        slug: "ao-thun-tre-em",
        description: "Áo thun trẻ em mềm mại, thoáng khí và an toàn cho làn da nhạy cảm của bé.",
        specs: [
            "Chất liệu: Cotton mềm",
            "Form: Regular fit",
            "Phong cách: In hình dễ thương",
            "Dễ giặt và nhanh khô"
        ],
        categoryId: "c3",
        thumbnail: "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/483428/item/vngoods_61_483428_3x4.jpg?width=400",
        images: [
            "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/483428/sub/vngoods_483428_sub3_3x4.jpg?width=400",
            "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/483428/sub/vngoods_483428_sub4_3x4.jpg?width=400"
        ]
    },

    {
        id: "p22",
        name: "Áo khoác trẻ em",
        slug: "ao-khoac-tre-em",
        description: "Áo khoác trẻ em nhẹ và chống gió, bảo vệ bé trong tiết trời se lạnh.",
        specs: [
            "Chất liệu: Nylon chống gió",
            "Lót: Polyester mềm",
            "Kiểu: Có mũ",
            "Phù hợp: Dạo chơi ngoài trời"
        ],
        categoryId: "c3",
        thumbnail: "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/488841/item/vngoods_01_488841_3x4.jpg?width=400",
        images: [
            "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/488841/sub/vngoods_488841_sub3_3x4.jpg?width=400",
            "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/488841/sub/vngoods_488841_sub4_3x4.jpg?width=400"
        ]
    },

    {
        id: "p23",
        name: "Quần short trẻ em",
        slug: "quan-short-tre-em",
        description: "Quần short trẻ em năng động, thiết kế co giãn và dễ vận động.",
        specs: [
            "Chất liệu: Cotton pha elastane",
            "Cạp: Thun co giãn",
            "Form: Suông rộng",
            "Thích hợp: Hoạt động hàng ngày"
        ],
        categoryId: "c3",
        thumbnail: "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/487746/sub/vngoods_487746_sub11_3x4.jpg?width=400",
        images: [
            "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/487746/sub/goods_487746_sub14_3x4.jpg?width=400",
            "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/487746/sub/goods_487746_sub21_3x4.jpg?width=400"
        ]
    },

    {
        id: "p24",
        name: "Váy bé gái",
        slug: "vay-be-gai",
        description: "Váy bé gái dễ thương, thiết kế nhẹ nhàng và phù hợp cho các bé đi học hoặc đi chơi.",
        specs: [
            "Chất liệu: Chiffon lụa",
            "Form: Xòe",
            "Lót: Satin mềm",
            "Chi tiết: Nơ hoặc ren"
        ],
        categoryId: "c3",
        thumbnail: "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/484924/item/vngoods_69_484924_3x4.jpg?width=400",
        images: [
            "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/484924/sub/vngoods_484924_sub3_3x4.jpg?width=400",
            "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/484924/sub/goods_484924_sub14_3x4.jpg?width=400"
        ]
    },

    {
        id: "p25",
        name: "Áo UT MARIO Movie",
        hot: true,
        slug: "set-be-trai-summer",
        description: "Áo UT trẻ em họa tiết Mario đáng yêu, phù hợp cho bé trai năng động.",
        specs: [
            "Chất liệu: Cotton jersey",
            "Form: Regular fit",
            "Kiểu dáng: Graphic print",
            "Dễ giặt và bền màu"
        ],
        categoryId: "c3",
        thumbnail: "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/483707/sub/vngoods_483707_sub11_3x4.jpg?width=400",
        images: [
            "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/483707/sub/goods_483707_sub14_3x4.jpg?width=400",
            "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/483707/item/vngoods_00_483707_3x4.jpg?width=400"
        ]
    },

    {
        id: "p26",
        name: "Bộ đồ thể thao trẻ em",
        slug: "bo-do-the-thao-tre-em",
        description: "Bộ đồ thể thao trẻ em thoáng mát, linh hoạt và dễ dàng di chuyển khi chơi thể thao.",
        specs: [
            "Chất liệu: Polyester thoáng khí",
            "Form: Thoải mái",
            "Tính năng: Khô nhanh",
            "Chi tiết: Cạp thun co giãn"
        ],
        categoryId: "c3",
        thumbnail: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/45ed24e2030c4bcb828bcdc390c9d004_9366/Bo_DJo_Det_Kim_Tre_Em_ORIGINALS_Be_KV6622_01_laydown.jpg",
        images: [
            "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/a64ddfd1530e48ea8b50bffe12ad1d9b_9366/Bo_DJo_Det_Kim_Tre_Em_ORIGINALS_Be_KV6622_02_laydown_hover.jpg",
            "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/9a7b3c90e86a46e798bb72576b7df129_9366/Bo_DJo_Det_Kim_Tre_Em_ORIGINALS_Be_KV6622_03_laydown.jpg"
        ]
    },
    {
        id: "p27",
        name: "Quần jean trẻ em",
        slug: "quan-jean-tre-em",
        description: "Quần jean trẻ em bền bỉ, co giãn nhẹ và dễ phối đồ cho các bé khi đi học hoặc đi chơi.",
        specs: [
            "Chất liệu: Denim co giãn",
            "Form: Straight fit",
            "Cạp: Thun tiện lợi",
            "Chi tiết: Gia cố tại đầu gối"
        ],
        categoryId: "c3",
        thumbnail: "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/475770/item/vngoods_62_475770_3x4.jpg",
        images: [
            "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/475770/sub/vngoods_475770_sub3_3x4.jpg",
            "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/475770/sub/goods_475770_sub15_3x4.jpg"
        ]
    },
    {
        id: "p28",
        name: "Áo sơ mi trẻ em",
        slug: "ao-so-mi-tre-em",
        description: "Áo sơ mi trẻ em phong cách lịch sự, phù hợp cho các bé mặc đến trường hoặc dự sự kiện gia đình.",
        specs: [
            "Chất liệu: Cotton poplin",
            "Form: Regular fit",
            "Kiểu cổ: Cổ đức",
            "Dễ giặt và thoáng khí"
        ],
        categoryId: "c3",
        thumbnail: "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/483436/item/vngoods_00_483436_3x4.jpg?width=400",
        images: [
            "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/483436/sub/vngoods_483436_sub3_3x4.jpg?width=400",
            "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/483436/sub/goods_483436_sub14_3x4.jpg?width=400"
        ]
    },
    {
        id: "p29",
        name: "Váy công chúa bé gái",
        slug: "vay-cong-chua-be-gai",
        description: "Váy công chúa bé gái xinh xắn, với nhiều lớp vải bồng bềnh và chi tiết ren tinh tế.",
        specs: [
            "Chất liệu: Chiffon + voan",
            "Form: Xòe",
            "Chi tiết: Ren và nơ",
            "Lót: Cotton mềm"
        ],
        categoryId: "c3",
        thumbnail: "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/489063/item/vngoods_01_489063_3x4.jpg?width=400",
        images: [
            "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/489063/sub/vngoods_489063_sub3_3x4.jpg?width=400",
            "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/489063/sub/vngoods_489063_sub4_3x4.jpg?width=400"
        ]
    },
    {
        id: "p30",
        name: "Áo khoác gió trẻ em",
        slug: "ao-khoac-gio-tre-em",
        description: "Áo khoác gió trẻ em nhẹ nhàng, chống gió và phù hợp cho bé khi đi học và vui chơi ngoài trời.",
        specs: [
            "Chất liệu: Polyester chống gió",
            "Kiểu: Có mũ",
            "Tính năng: Chống thấm nhẹ",
            "Phù hợp: Dạo phố và đi học"
        ],
        categoryId: "c3",
        thumbnail: "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/483443/item/vngoods_03_483443_3x4.jpg?width=400",
        images: [
            "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/483443/sub/vngoods_483443_sub3_3x4.jpg?width=400",
            "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/483443/sub/vngoods_483443_sub4_3x4.jpg?width=400"
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
// Sản phẩm liên quan cùng category
app.get(
  "/api/productsrelated/:slug",
  (req, res) => {
    const { slug } = req.params;

    const product =
      products.find(
        (p) => p.slug === slug
      );

    if (!product) {
      return res.status(404).json({
        message:
          "Product not found",
      });
    }

    const relatedProducts =
      products
        .filter(
          (p) =>
            p.categoryId ===
              product.categoryId &&
            p.id !== product.id
        )
        .slice(0, 4)
        .map((item) => {
          const category =
            categories.find(
              (c) =>
                c.id ===
                item.categoryId
            );

          const productVariants =
            variants.filter(
              (v) =>
                v.productId ===
                item.id
            );

          return {
            ...item,
            category: category
              ? {
                  id: category.id,
                  name: category.name,
                  slug: category.slug,
                }
              : null,

            variants:
              productVariants.map(
                (variant) => ({
                  id: variant.id,
                  size: variant.size,
                  color:
                    variant.color,
                  price:
                    variant.price,
                  stock:
                    variant.stock,
                })
              ),
          };
        });

    res.json(
      relatedProducts
    );
  }
);
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